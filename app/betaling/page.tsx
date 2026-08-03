// app/betaling/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext2";

export default function BetalingPage() {
  const { cart } = useCart();
  const router = useRouter();

  const [shipping, setShipping] = useState(39);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal + shipping;

 function completeOrder() {
  if (cart.length === 0) return;

 const order = {
  orderNumber:
    "PD-" +
    new Date().toISOString().slice(0, 10).replace(/-/g, "") +
    "-" +
    Math.floor(1000 + Math.random() * 9000),

  date: new Date().toISOString(),

  shippingMethod:
    shipping === 0
      ? "Gratis levering"
      : shipping === 39
      ? "DAO Pakkeshop"
      : "DAO Hjemmelevering",

  shipping,
  subtotal,
  total,
  items: cart,
};

  sessionStorage.setItem("lastOrder", JSON.stringify(order));

  router.push("/tak-for-din-ordre");
}

  return (
    <main className="min-h-screen bg-[#F7F7F5]">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-black mb-10">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-[1fr_420px] gap-10">

          {/* Venstre side */}

          <section className="bg-white rounded-3xl shadow-sm p-8">

            <h2 className="text-2xl font-bold mb-8">
              Kontaktoplysninger
            </h2>

            <div className="space-y-10">

              <section>

                <h3 className="text-lg font-semibold mb-5">
                  Kontakt
                </h3>

                <div className="space-y-4">

                  <input
                    type="email"
                    placeholder="E-mail"
                    className="w-full border rounded-xl px-4 py-3"
                  />

                  <input
                    type="tel"
                    placeholder="Telefon"
                    className="w-full border rounded-xl px-4 py-3"
                  />

                </div>

              </section>

              <section>

                <h3 className="text-lg font-semibold mb-5">
                  Leveringsadresse
                </h3>

                <div className="grid md:grid-cols-2 gap-4">

                  <input
                    className="border rounded-xl px-4 py-3"
                    placeholder="Fornavn"
                  />

                  <input
                    className="border rounded-xl px-4 py-3"
                    placeholder="Efternavn"
                  />

                  <input
                    className="md:col-span-2 border rounded-xl px-4 py-3"
                    placeholder="Adresse"
                  />

                  <input
                    className="border rounded-xl px-4 py-3"
                    placeholder="Postnummer"
                  />

                  <input
                    className="border rounded-xl px-4 py-3"
                    placeholder="By"
                  />

                </div>

              </section>

              <section>

                <h3 className="text-lg font-semibold mb-5">
                  Levering
                </h3>

                <div className="space-y-3">

                  <label className="flex justify-between items-center border rounded-xl p-4 cursor-pointer">

                    <div className="flex items-center gap-3">

                      <input
                        type="radio"
                        name="shipping"
                        defaultChecked
                        onChange={() => setShipping(39)}
                      />

                      <span>DAO Hjemmelevering</span>

                    </div>

                    <strong>39 kr.</strong>

                  </label>

                  <label className="flex justify-between items-center border rounded-xl p-4 cursor-pointer">

                    <div className="flex items-center gap-3">

                      <input
                        type="radio"
                        name="shipping"
                        onChange={() => setShipping(49)}
                      />

                      <span>GLS Pakkeshop</span>

                    </div>

                    <strong>49 kr.</strong>

                  </label>

                  <label className="flex justify-between items-center border rounded-xl p-4 cursor-pointer">

                    <div className="flex items-center gap-3">

                      <input
                        type="radio"
                        name="shipping"
                        onChange={() => setShipping(0)}
                      />

                      <span>Afhentning</span>

                    </div>

                    <strong className="text-green-600">
                      Gratis
                    </strong>

                  </label>

                </div>

              </section>

            </div>

          </section>

          {/* Højre side */}

          <aside className="bg-white rounded-3xl shadow-sm p-8 h-fit sticky top-8">

            <h2 className="text-2xl font-bold mb-6">
              Din ordre
            </h2>

            <div className="space-y-5">

              {cart.length === 0 ? (
                <p className="text-gray-500">
                  Din kurv er tom.
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 items-center"
                  >
                    <div className="relative w-20 h-28 border rounded-xl overflow-hidden bg-gray-50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Antal: {item.quantity}
                      </p>
                    </div>

                    <strong>
                      {(item.price * item.quantity).toLocaleString("da-DK")} kr.
                    </strong>
                  </div>
                ))
              )}

            </div>

            {/* DEL 2 FORTSÆTTER HER */}
                        <div className="border-t mt-8 pt-6 space-y-3">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString("da-DK")} kr.</span>
              </div>

              <div className="flex justify-between">
                <span>Fragt</span>
                <span>{shipping.toLocaleString("da-DK")} kr.</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>{total.toLocaleString("da-DK")} kr.</span>
              </div>

              <button
                onClick={completeOrder}
                disabled={cart.length === 0}
                className="w-full mt-6 bg-black text-white rounded-xl py-4 font-semibold hover:bg-gray-800 disabled:opacity-50 transition"
              >
                Gennemfør ordre
              </button>

            </div>

          </aside>

        </div>

      </div>
    </main>
  );
}