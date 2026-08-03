"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext2";

export default function CartPage() {
  const router = useRouter();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-[#F7F7F5] py-12">
      <div className="max-w-7xl mx-auto px-8">
        <h1 className="text-5xl font-black mb-10">
          Din kurv
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <p className="text-xl text-gray-500">
              Din kurv er tom.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Produktliste */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 shadow-sm flex items-center gap-6"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={110}
                    height={150}
                    className="rounded-xl object-contain"
                  />

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {item.price.toLocaleString("da-DK")} kr. pr. stk.
                    </p>

                    <div className="flex items-center gap-3 mt-5">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-10 h-10 rounded-full border text-xl hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="text-lg font-bold w-8 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-10 h-10 rounded-full border text-xl hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <p className="mt-5 font-semibold">
                      Subtotal:{" "}
                      {(item.price * item.quantity).toLocaleString("da-DK")} kr.
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-4 py-2 rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                  >
                    Fjern
                  </button>
                </div>
              ))}
            </div>

            {/* Ordreoversigt */}
            <div className="bg-white rounded-3xl p-8 shadow-sm h-fit">
              <h2 className="text-3xl font-bold mb-8">
                Ordreoversigt
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Antal varer</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-bold">
                    {total.toLocaleString("da-DK")} kr.
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-3">

                <button
  onClick={() => router.push("/betaling")}
  className="w-full bg-black text-white py-4 rounded-2xl hover:bg-neutral-800 transition"
>
  Gå til betaling
</button>

                <button
                  onClick={clearCart}
                  className="w-full border border-red-500 text-red-500 py-4 rounded-2xl hover:bg-red-500 hover:text-white transition"
                >
                  🗑 Tøm kurv
                </button>

              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}