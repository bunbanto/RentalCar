import type { Metadata } from "next";
import Link from "next/link";

import common from "@/components/common.module.css";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Premium Car Rental in Ukraine",
};

export default function Home() {
  return (
    <main className={styles.homePage}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`${common.container} ${styles.heroContent}`}>
          <h1 id="hero-title">Find your perfect rental car</h1>
          <p>Reliable and budget-friendly rentals for any journey.</p>
          <Link
            href="/catalog"
            className={`${common.button} ${common.primary} ${styles.heroButton}`}
          >
            View Catalog
          </Link>
        </div>
      </section>
    </main>
  );
}
