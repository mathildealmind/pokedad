import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { CartProvider } from "./context/CartContext2";
import { FavoritesProvider } from "./context/FavoritesContext";

export const metadata: Metadata = {
  title: "PokéDad",
  description: "Pokémon Trading Cards til samlere",
};

const AUTH_COOKIE_NAME = "pokedad_private_access";

function createAccessToken(password: string) {
  return createHmac("sha256", password)
    .update("pokedad-private-site-access")
    .digest("hex");
}

function tokensMatch(received: string, expected: string) {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);

  if (receivedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(receivedBuffer, expectedBuffer);
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sitePassword = process.env.SITE_PASSWORD;
  const isProduction = process.env.NODE_ENV === "production";

  let hasAccess = !isProduction;

  if (isProduction && sitePassword) {
    const cookieStore = await cookies();
    const accessCookie = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    const expectedToken = createAccessToken(sitePassword);

    hasAccess = Boolean(
      accessCookie && tokensMatch(accessCookie, expectedToken)
    );
  }

  async function unlockSite(formData: FormData) {
    "use server";

    const password = process.env.SITE_PASSWORD;
    const enteredPassword = formData.get("password");

    if (
      !password ||
      typeof enteredPassword !== "string" ||
      enteredPassword !== password
    ) {
      return;
    }

    const cookieStore = await cookies();

    cookieStore.set(AUTH_COOKIE_NAME, createAccessToken(password), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return (
    <html lang="da">
      <body className="bg-[#F7F7F5] text-black">
        {!hasAccess ? (
          <main className="flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-8 shadow-xl">
              <div className="mb-8 text-center">
                <div className="mb-4 text-4xl">🔒</div>

                <h1 className="text-3xl font-bold tracking-tight">
                  PokéDad er under udvikling
                </h1>

                <p className="mt-3 text-sm leading-6 text-black/60">
                  Denne hjemmeside er ikke offentlig endnu.
                </p>
              </div>

              {!sitePassword ? (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                  SITE_PASSWORD mangler i Vercel.
                </div>
              ) : (
                <form action={unlockSite} className="space-y-4">
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium"
                    >
                      Adgangskode
                    </label>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-black/80"
                  >
                    Åbn PokéDad
                  </button>
                </form>
              )}
            </div>
          </main>
        ) : (
          <FavoritesProvider>
            <CartProvider>
              <Navbar />

              {children}

              <Footer />
            </CartProvider>
          </FavoritesProvider>
        )}
      </body>
    </html>
  );
}