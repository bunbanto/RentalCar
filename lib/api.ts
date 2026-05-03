import axios from "axios";

import type { Car, CarFilters, CarsResponse, RentalPayload } from "./types";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const CARS_LIMIT = 12;
export const PRICE_OPTIONS = ["30", "40", "50", "60", "70", "80"];

function getApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_BASE_URL environment variable");
  }

  return API_BASE_URL;
}

const rentalCarApi = axios.create({
  baseURL: API_BASE_URL,
});

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

export async function fetchCars(filters: CarFilters = {}, page = 1) {
  const params = buildSearchParams(filters, page);
  const { data } = await rentalCarApi.get<CarsResponse>("/cars", {
    baseURL: getApiBaseUrl(),
    params,
  });

  return data;
}

export async function fetchBrands() {
  const { data } = await rentalCarApi.get<string[]>("/brands", {
    baseURL: getApiBaseUrl(),
  });

  return data;
}

export async function fetchCarById(id: string) {
  const { data } = await rentalCarApi.get<Car>(`/cars/${id}`, {
    baseURL: getApiBaseUrl(),
  });

  return data;
}

export async function createRental(payload: RentalPayload) {
  const { data } = await axios.post<{ ok: true }>("/api/rentals", payload);

  return data;
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
