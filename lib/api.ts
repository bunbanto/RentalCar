import type { Car, CarFilters, CarsResponse, RentalPayload } from "./types";

export const API_BASE_URL = "https://car-rental-api.goit.global";
export const CARS_LIMIT = 12;
export const PRICE_OPTIONS = ["30", "40", "50", "60", "70", "80"];

function buildSearchParams(filters: CarFilters, page = 1, limit = CARS_LIMIT) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  return params;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchCars(filters: CarFilters = {}, page = 1) {
  const params = buildSearchParams(filters, page);

  return request<CarsResponse>(`/cars?${params.toString()}`, {
    next: { revalidate: 60 },
  });
}

export async function fetchBrands() {
  return request<string[]>("/brands", {
    next: { revalidate: 3600 },
  });
}

export async function fetchCarById(id: string) {
  return request<Car>(`/cars/${id}`, {
    next: { revalidate: 60 },
  });
}

export async function createRental(payload: RentalPayload) {
  const response = await fetch("/api/rentals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Rental request failed");
  }

  return response.json() as Promise<{ ok: true }>;
}

export function formatMileage(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function getAddressParts(address: string) {
  const parts = address.split(",").map((part) => part.trim());

  return {
    city: parts.at(-2) ?? "",
    country: parts.at(-1) ?? "",
  };
}
