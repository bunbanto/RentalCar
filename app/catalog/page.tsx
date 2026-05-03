import type { Metadata } from "next";

import { CatalogClient } from "@/components/CatalogClient";
import common from "@/components/common.module.css";
import { fetchBrands } from "@/lib/api";
import styles from "./catalog.module.css";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Browse and filter cars available for rental.",
};

export default async function CatalogPage() {
  const brands = await fetchBrands();

  return (
    <main className={`${common.container} ${styles.catalogPage}`}>
      <CatalogClient brands={brands} />
    </main>
  );
}
