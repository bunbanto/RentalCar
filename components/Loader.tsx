import styles from "./Loader.module.css";

export function Loader({ label = "Loading" }: { label?: string }) {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <span />
      {label}
    </div>
  );
}
