import Link from "next/link";

import common from "@/components/common.module.css";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={`${common.container} ${styles.statePage}`}>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/catalog" className={`${common.button} ${common.primary}`}>
        Go to catalog
      </Link>
    </main>
  );
}
