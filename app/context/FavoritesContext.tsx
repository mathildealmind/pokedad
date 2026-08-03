"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type FavoriteItem = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
};

type FavoritesContextType = {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Indlæs favoritter
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites");

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Kunne ikke indlæse favoritter:", error);
    }
  }, []);

  // Gem automatisk
  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  function addFavorite(item: FavoriteItem) {
    setFavorites((prev) => {
      if (prev.some((favorite) => favorite.id === item.id)) {
        return prev;
      }

      return [...prev, item];
    });
  }

  function removeFavorite(id: number) {
    setFavorites((prev) =>
      prev.filter((favorite) => favorite.id !== id)
    );
  }

  function toggleFavorite(item: FavoriteItem) {
    setFavorites((prev) => {
      const exists = prev.some(
        (favorite) => favorite.id === item.id
      );

      if (exists) {
        return prev.filter(
          (favorite) => favorite.id !== item.id
        );
      }

      return [...prev, item];
    });
  }

  function isFavorite(id: number) {
    return favorites.some(
      (favorite) => favorite.id === id
    );
  }

  function clearFavorites() {
    setFavorites([]);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites skal bruges indenfor FavoritesProvider"
    );
  }

  return context;
}