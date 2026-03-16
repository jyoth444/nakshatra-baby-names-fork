"use client";

/**
 * Custom hook for managing favourite baby names using localStorage.
 * Provides add, remove, toggle, and check functions.
 */

import { useState, useEffect, useCallback } from "react";
import type { BabyName } from "@/utils/nameFilter";

const STORAGE_KEY = "nakshatra-favourite-names";

export function useFavourites() {
  const [favourites, setFavourites] = useState<BabyName[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favourites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavourites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading favourites:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save favourites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
      } catch (error) {
        console.error("Error saving favourites:", error);
      }
    }
  }, [favourites, isLoaded]);

  // Add a name to favourites
  const addFavourite = useCallback((name: BabyName) => {
    setFavourites((prev) => {
      if (prev.some((f) => f.name === name.name)) return prev;
      return [...prev, name];
    });
  }, []);

  // Remove a name from favourites
  const removeFavourite = useCallback((name: string) => {
    setFavourites((prev) => prev.filter((f) => f.name !== name));
  }, []);

  // Toggle a name in favourites
  const toggleFavourite = useCallback((name: BabyName) => {
    setFavourites((prev) => {
      if (prev.some((f) => f.name === name.name)) {
        return prev.filter((f) => f.name !== name.name);
      }
      return [...prev, name];
    });
  }, []);

  // Check if a name is in favourites
  const isFavourite = useCallback(
    (name: string) => {
      return favourites.some((f) => f.name === name);
    },
    [favourites]
  );

  // Clear all favourites
  const clearFavourites = useCallback(() => {
    setFavourites([]);
  }, []);

  return {
    favourites,
    isLoaded,
    addFavourite,
    removeFavourite,
    toggleFavourite,
    isFavourite,
    clearFavourites,
  };
}
