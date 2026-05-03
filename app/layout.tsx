import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { Providers } from "./providers";
import "./globals.css";
import styles from "./layout.module.css";
import common from "@/components/common.module.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "RentalCar",
    template: "%s | RentalCar",
  },
  description:
    "RentalCar helps drivers browse, filter and book rental cars online.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <Providers>
          <header className={styles.siteHeader}>
            <div className={`${common.container} ${styles.headerInner}`}>
              <Link href="/" className={styles.logo} aria-label="RentalCar home">
                Rental<span>Car</span>
              </Link>
              <nav className={styles.mainNav} aria-label="Main navigation">
                <Link href="/">Home</Link>
                <Link href="/catalog">Catalog</Link>
              </nav>
            </div>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
