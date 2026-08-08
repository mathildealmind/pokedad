"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartButton from "./CartButton";
import SearchBar from "./SearchBar";
import { categories } from "../data/categories";
import { useFavorites } from "@/app/context/FavoritesContext";

export default function Navbar() {
  const { favorites } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Gå til PokéDad-forsiden"
            className="flex shrink-0 items-center transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo/pokedad-logo.webp"
              alt="PokéDad"
              width={1124}
              height={249}
              priority
              className="h-auto w-[150px] object-contain sm:w-[180px] lg:w-[190px]"
            />
          </Link>

        {/* Desktop Navigation */}
        <nav className="hidden shrink-0 items-center gap-8 font-medium lg:flex">
          {/* Shop */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 transition hover:text-red-600"
            >
              Shop
              <span className="text-xs">▼</span>
            </button>

            <div className="absolute left-0 top-full z-50 hidden pt-3 group-hover:block">
              <div className="w-80 rounded-2xl border bg-white p-6 shadow-xl">
                <h3 className="mb-5 font-bold">
                  Oversigt
                </h3>

                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category.href}>
                      <Link
                        href={category.href}
                        className="transition hover:text-red-600"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Link
            href="/nye-kort"
            className="transition hover:text-red-600"
          >
            Nye kort
          </Link>

          <Link
            href="/om-os"
            className="transition hover:text-red-600"
          >
            Om os
          </Link>

          <Link
            href="/kontakt"
            className="transition hover:text-red-600"
          >
            Kontakt
          </Link>
        </nav>

        {/* Desktop højre side */}
        <div className="hidden min-w-0 items-center gap-5 lg:flex">
          <SearchBar />

          <Link
            href="/favoritter"
            aria-label="Se favoritter"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-gray-100"
          >
            <span className="text-2xl">
              ❤️
            </span>

            {favorites.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                {favorites.length}
              </span>
            )}
          </Link>

          <div className="shrink-0">
            <CartButton />
          </div>
        </div>

        {/* Mobil højre side */}
        <div className="flex shrink-0 items-center gap-4 lg:hidden">
          <Link
            href="/favoritter"
            aria-label="Se favoritter"
            className="relative"
          >
            ❤️

            {favorites.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                {favorites.length}
              </span>
            )}
          </Link>

          <CartButton />

          <button
            type="button"
            className="relative z-[70] flex h-11 w-11 touch-manipulation items-center justify-center text-3xl"
            aria-label={mobileMenuOpen ? "Luk mobilmenu" : "Åbn mobilmenu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          >
            <span aria-hidden="true">{mobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 z-40 bg-black/20 lg:hidden"
          onClick={closeMobileMenu}
        >
          <nav
            id="mobile-navigation"
            aria-label="Mobilnavigation"
            className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <SearchBar />

            <div className="mt-6 flex flex-col gap-5 text-lg">
              <h3 className="font-bold">Shop</h3>

              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="text-gray-600"
                  onClick={closeMobileMenu}
                >
                  {category.name}
                </Link>
              ))}

              <hr />

              <Link href="/" onClick={closeMobileMenu}>
                Forside
              </Link>
              <Link href="/nye-kort" onClick={closeMobileMenu}>
                Nye kort
              </Link>
              <Link href="/favoritter" onClick={closeMobileMenu}>
                Favoritter ❤️
              </Link>
              <Link href="/om-os" onClick={closeMobileMenu}>
                Om os
              </Link>
              <Link href="/kontakt" onClick={closeMobileMenu}>
                Kontakt
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
