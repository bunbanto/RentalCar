"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { FiHeart } from "react-icons/fi";

import common from "./common.module.css";
import styles from "./FavoriteButton.module.css";

const FAVORITES_STORAGE_KEY = "rentalcar:favorites";
const FAVORITES_EVENT = "rentalcar:favorites-change";

function readFavorites() {
  if (typeof window === "undefined") {
    return new Set<string>();
  }

  try {
    const value = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    const ids = value ? (JSON.parse(value) as string[]) : [];

    return new Set(ids);
  } catch {
    return new Set<string>();
  }
}

function writeFavorites(favorites: Set<string>) {
  window.localStorage.setItem(
    FAVORITES_STORAGE_KEY,
    JSON.stringify([...favorites]),
  );
  window.dispatchEvent(new Event(FAVORITES_EVENT));
}

interface FavoriteButtonProps {
  carId: string;
  className?: string;
}

export function FavoriteButton({ carId, className = "" }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    function syncFavoriteState() {
      setIsFavorite(readFavorites().has(carId));
    }

    syncFavoriteState();
    window.addEventListener("storage", syncFavoriteState);
    window.addEventListener(FAVORITES_EVENT, syncFavoriteState);

    return () => {
      window.removeEventListener("storage", syncFavoriteState);
      window.removeEventListener(FAVORITES_EVENT, syncFavoriteState);
    };
  }, [carId]);

  function handleToggle() {
    const favorites = readFavorites();

    if (favorites.has(carId)) {
      favorites.delete(carId);
    } else {
      favorites.add(carId);
    }

    writeFavorites(favorites);
    setIsFavorite(favorites.has(carId));
  }

  return (
    <button
      className={clsx(
        common.iconButton,
        styles.favoriteButton,
        className,
        isFavorite && styles.isFavorite,
      )}
      type="button"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
      onClick={handleToggle}
    >
      <FiHeart aria-hidden="true" />
    </button>
  );
}
