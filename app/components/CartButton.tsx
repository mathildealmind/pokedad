"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext2";

export default function CartButton() {
  const { cart } = useCart();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <Link
      href="/kurv"
      className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
    >
      <span className="text-2xl">🛒</span>

      {mounted && totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}