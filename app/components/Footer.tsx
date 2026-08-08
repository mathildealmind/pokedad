import Link from "next/link";
import ReviewBadge from "./ReviewBadge";

const linkClassName =
  "transition-colors hover:text-black";

export default function Footer() {
  return (
    <footer className="mt-24 border-t bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-14 md:grid-cols-4">
        {/* Logo */}
        <div>
          <h2 className="text-3xl font-black tracking-wide">
            POKÉDAD
          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-600">
            Pokémon Trading Cards til samlere.
            <br />
            Singles • Sæt • PSA • Tilbehør
          </p>

          <ReviewBadge className="mt-4 w-fit max-w-full" />
        </div>

        {/* Hjælp & information */}
        <div>
          <h3 className="mb-4 font-bold uppercase tracking-wide">
            Hjælp & information
          </h3>

          <ul className="space-y-2 text-gray-600">
            <li>
              <Link
                href="/hjaelp"
                className={linkClassName}
              >
                Hjælpecenter & FAQ
              </Link>
            </li>

            <li>
              <Link
                href="/mine-ordrer"
                className={linkClassName}
              >
                Mine ordrer
              </Link>
            </li>

            <li>
              <Link
                href="/handelsbetingelser"
                className={linkClassName}
              >
                Handelsbetingelser
              </Link>
            </li>

            <li>
              <Link
                href="/privatlivspolitik"
                className={linkClassName}
              >
                Privatlivs- & cookiepolitik
              </Link>
            </li>

            <li>
              <Link
                href="/kontakt"
                className={linkClassName}
              >
                Kontakt os
              </Link>
            </li>
          </ul>
        </div>

        {/* Firma */}
        <div>
          <h3 className="mb-4 font-bold uppercase tracking-wide">
            Firma
          </h3>

          <ul className="space-y-2 text-gray-600">
            <li>
              <Link
                href="/om-os"
                className={linkClassName}
              >
                Om PokéDad
              </Link>
            </li>

            <li>
              <Link
                href="/returpolitik"
                className={linkClassName}
              >
                Retur & fortrydelse
              </Link>
            </li>

            <li>
              <Link
                href="/levering"
                className={linkClassName}
              >
                Levering
              </Link>
            </li>
          </ul>
        </div>

        {/* Fordele */}
        <div>
          <h3 className="mb-4 font-bold uppercase tracking-wide">
            PokéDad
          </h3>

          <ul className="space-y-2 text-gray-600">
            <li>🚚 Hurtig levering</li>
            <li>🔒 Sikker betaling</li>
            <li>🇩🇰 Dansk webshop</li>
            <li>🛡️ Verificeret af PokéDad</li>
          </ul>
        </div>
      </div>

      <div className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PokéDad. Alle rettigheder forbeholdes.
      </div>
    </footer>
  );
}
