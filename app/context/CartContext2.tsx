"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  finish: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (
    item: Omit<CartItem, "quantity">
  ) => void;

  increaseQuantity: (
    id: number,
    finish?: string
  ) => void;

  decreaseQuantity: (
    id: number,
    finish?: string
  ) => void;

  removeFromCart: (
    id: number,
    finish?: string
  ) => void;

  clearCart: () => void;
};

const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );

function isSameCartItem(
  cartItem: CartItem,
  id: number,
  finish?: string
) {
  if (cartItem.id !== id) {
    return false;
  }

  // Gør, at eksisterende kode, som kun sender id,
  // stadig kan fungere.
  if (finish === undefined) {
    return true;
  }

  return cartItem.finish === finish;
}

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Indlæs kurven fra localStorage.
  useEffect(() => {
    try {
      const savedCart =
        localStorage.getItem("cart");

      if (!savedCart) {
        return;
      }

      const parsedCart = JSON.parse(
        savedCart
      ) as Partial<CartItem>[];

      // Giver gamle varer en finish,
      // hvis de blev gemt før variantsystemet.
      const updatedCart: CartItem[] =
        parsedCart
          .filter(
            (
              item
            ): item is Partial<CartItem> & {
              id: number;
              name: string;
              price: number;
              image: string;
              quantity: number;
            } =>
              typeof item.id === "number" &&
              typeof item.name === "string" &&
              typeof item.price === "number" &&
              typeof item.image === "string" &&
              typeof item.quantity === "number"
          )
          .map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
            finish:
              typeof item.finish === "string"
                ? item.finish
                : "Normal",
          }));

      setCart(updatedCart);
    } catch (error) {
      console.error(
        "Kunne ikke indlæse kurven:",
        error
      );
    }
  }, []);

  // Gem kurven, når den ændres.
  useEffect(() => {
    try {
      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error(
        "Kunne ikke gemme kurven:",
        error
      );
    }
  }, [cart]);

  function addToCart(
    item: Omit<CartItem, "quantity">
  ) {
    setCart((previousCart) => {
      const existingItem =
        previousCart.find(
          (cartItem) =>
            cartItem.id === item.id &&
            cartItem.finish === item.finish
        );

      if (existingItem) {
        return previousCart.map(
          (cartItem) =>
            cartItem.id === item.id &&
            cartItem.finish === item.finish
              ? {
                  ...cartItem,
                  quantity:
                    cartItem.quantity + 1,
                }
              : cartItem
        );
      }

      return [
        ...previousCart,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  }

  function increaseQuantity(
    id: number,
    finish?: string
  ) {
    setCart((previousCart) =>
      previousCart.map((item) =>
        isSameCartItem(item, id, finish)
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(
    id: number,
    finish?: string
  ) {
    setCart((previousCart) =>
      previousCart.flatMap((item) => {
        if (
          !isSameCartItem(
            item,
            id,
            finish
          )
        ) {
          return [item];
        }

        if (item.quantity <= 1) {
          return [];
        }

        return [
          {
            ...item,
            quantity: item.quantity - 1,
          },
        ];
      })
    );
  }

  function removeFromCart(
    id: number,
    finish?: string
  ) {
    setCart((previousCart) =>
      previousCart.filter(
        (item) =>
          !isSameCartItem(
            item,
            id,
            finish
          )
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart skal bruges indenfor CartProvider"
    );
  }

  return context;
}