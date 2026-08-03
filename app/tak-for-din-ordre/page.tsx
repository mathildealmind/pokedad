"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext2";

type OrderItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type Order = {
  orderNumber: string;
  date: string;

  shippingMethod: string;

  shipping: number;
  subtotal: number;
  total: number;

  items: OrderItem[];
};

export default function TakForDinOrdrePage() {
  const { clearCart } = useCart();

  const [order, setOrder] = useState<Order | null>(null);

 useEffect(() => {
  const savedOrder = sessionStorage.getItem("lastOrder");

  if (!savedOrder) return;

  const parsedOrder: Order = JSON.parse(savedOrder);

  setOrder(parsedOrder);

  // Ryd kurven
  clearCart();

  // Fjern ordren fra sessionStorage,
  // så den ikke kan vises igen ved genindlæsning
  sessionStorage.removeItem("lastOrder");
}, [clearCart]);

  if (!order) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-sm p-10 text-center max-w-lg">

          <h1 className="text-4xl font-black mb-4">
            Ingen ordre fundet
          </h1>

          <p className="text-gray-600 mb-8">
            Vi kunne ikke finde en ordre at vise.
          </p>

          <Link
            href="/"
            className="inline-block bg-black text-white px-8 py-4 rounded-2xl hover:bg-neutral-800 transition"
          >
            Tilbage til forsiden
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] py-16">

      <div className="max-w-3xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-sm p-10">

          <div className="text-center">

            <div className="text-6xl mb-6">
              🎉
            </div>

            <h1 className="text-5xl font-black">
              Tak for din ordre!
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Tak fordi du handlede hos <strong>PokéDad</strong>.
              <br />
              Vi pakker dine Pokémon-kort hurtigst muligt.
            </p>

          </div>

          <div className="mt-12 border rounded-2xl p-6">

            <p className="text-sm uppercase tracking-wide text-gray-500">
              Ordrenummer
            </p>

            <p className="text-2xl font-bold mt-2">
              {order.orderNumber}
            </p>

          </div>

          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-6">
              Din ordre
            </h2>

            <div className="space-y-5">

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>

                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-gray-500">
                      Antal: {item.quantity}
                    </p>

                  </div>

                  <p className="font-semibold">
                    {(item.price * item.quantity).toLocaleString("da-DK")} kr.
                  </p>

                </div>
              ))}

            </div>

            {/* DEL 2 FORTSÆTTER HER */}
                        <div className="border-t mt-8 pt-6 space-y-4">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {order.subtotal.toLocaleString("da-DK")} kr.
                </span>
              </div>

           <div className="flex justify-between items-start">
  <div>
    <p>Levering</p>

    <p className="text-sm text-gray-500">
      {order.shippingMethod}
    </p>
  </div>

  <span>
    {order.shipping.toLocaleString("da-DK")} kr.
  </span>
</div>

            </div>

          </div>

          <div className="mt-12 bg-[#F7F7F5] rounded-2xl p-6">

            <h3 className="text-2xl font-bold mb-4">
              📦 Hvad sker der nu?
            </h3>

            <ul className="space-y-3 text-gray-700">
              <li>• Vi pakker din ordre hurtigst muligt.</li>
              <li>• Du modtager en ordrebekræftelse på e-mail, når denne funktion bliver tilføjet.</li>
              <li>• Normal leveringstid er 1-3 hverdage.</li>
            </ul>

          </div>

          <Link
            href="/"
            className="block mt-10 w-full bg-black text-white text-center py-4 rounded-2xl hover:bg-neutral-800 transition"
          >
            Tilbage til forsiden
          </Link>

        </div>

      </div>

    </main>
  );
}