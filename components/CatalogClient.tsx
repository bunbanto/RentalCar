"use client";

import { FormEvent, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { PRICE_OPTIONS, fetchCars } from "@/lib/api";
import type { CarFilters } from "@/lib/types";
import { CarCard } from "./CarCard";
import { Loader } from "./Loader";
import common from "./common.module.css";
import styles from "./CatalogClient.module.css";

interface CatalogClientProps {
  brands: string[];
}

const emptyFilters: CarFilters = {
  brand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
};

export function CatalogClient({ brands }: CatalogClientProps) {
  const [draftFilters, setDraftFilters] = useState<CarFilters>(emptyFilters);
  const [filters, setFilters] = useState<CarFilters>(emptyFilters);

  const queryKey = useMemo(() => ["cars", filters], [filters]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchCars(filters, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = Number(lastPage.page);
      return currentPage < lastPage.totalPages ? currentPage + 1 : undefined;
    },
  });

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  function updateDraftFilter(name: keyof CarFilters, value: string) {
    setDraftFilters((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFilters({ ...draftFilters });
  }

  function handleReset() {
    setDraftFilters(emptyFilters);
    setFilters(emptyFilters);
  }

  return (
    <>
      <form className={styles.filterBar} onSubmit={handleSubmit}>
        <label>
          <span>Car brand</span>
          <select
            value={draftFilters.brand}
            onChange={(event) => updateDraftFilter("brand", event.target.value)}
          >
            <option value="">Choose a brand</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Price / 1 hour</span>
          <select
            value={draftFilters.rentalPrice}
            onChange={(event) =>
              updateDraftFilter("rentalPrice", event.target.value)
            }
          >
            <option value="">Choose a price</option>
            {PRICE_OPTIONS.map((price) => (
              <option key={price} value={price}>
                ${price}
              </option>
            ))}
          </select>
        </label>

        <fieldset>
          <legend>Car mileage / km</legend>
          <input
            type="number"
            min="0"
            placeholder="From"
            value={draftFilters.minMileage}
            onChange={(event) =>
              updateDraftFilter("minMileage", event.target.value)
            }
          />
          <input
            type="number"
            min="0"
            placeholder="To"
            value={draftFilters.maxMileage}
            onChange={(event) =>
              updateDraftFilter("maxMileage", event.target.value)
            }
          />
        </fieldset>

        <button
          type="submit"
          className={`${common.button} ${common.primary} ${styles.filterSubmit}`}
        >
          Search
        </button>
        <button
          type="button"
          className={`${common.button} ${common.ghost}`}
          onClick={handleReset}
        >
          Reset
        </button>
      </form>

      {isLoading && <Loader label="Loading cars" />}

      {isError && (
        <p className={common.errorText}>
          {error instanceof Error ? error.message : "Unable to load cars"}
        </p>
      )}

      {!isLoading && !isError && cars.length === 0 && (
        <p className={common.emptyText}>No cars match these filters.</p>
      )}

      <div className={styles.catalogGrid}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {hasNextPage && (
        <button
          className={`${common.button} ${styles.loadMoreButton}`}
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          Load More
        </button>
      )}

      {isFetchingNextPage && (
        <div className={styles.viewportLoader} role="status" aria-live="polite">
          <span />
        </div>
      )}
    </>
  );
}
