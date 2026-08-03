import type { Metadata } from "next";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { CartProvider } from "./context/CartContext2";
import { FavoritesProvider } from "./context/FavoritesContext";

export const metadata: Metadata = {
  title: "PokéDad",
  description: "Pokémon Trading Cards til samlere",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <body className="bg-[#F7F7F5] text-black">
        <FavoritesProvider>
          <CartProvider>
            <Navbar />

            {children}

            <Footer />
          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}