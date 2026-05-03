"use client";

import { FormEvent, useState } from "react";

import { createRental } from "@/lib/api";
import { BookingDateField } from "./BookingDateField";
import common from "./common.module.css";
import styles from "./RentalForm.module.css";

export function RentalForm({ carId }: { carId: string }) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formVersion, setFormVersion] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const formData = new FormData(event.currentTarget);

    try {
      await createRental({
        carId,
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        bookingDate: String(formData.get("bookingDate") ?? ""),
        comment: String(formData.get("comment") ?? ""),
      });
      event.currentTarget.reset();
      setFormVersion((current) => current + 1);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className={styles.rentalForm} onSubmit={handleSubmit}>
      <div className={styles.formIntro}>
        <h2>Book your car now</h2>
        <p>Stay connected. We are always ready to help you.</p>
      </div>

      <label>
        <input name="name" type="text" placeholder="Name*" required />
      </label>
      <label>
        <input name="email" type="email" placeholder="Email*" required />
      </label>
      <BookingDateField key={formVersion} />
      <label>
        <textarea name="comment" placeholder="Comment" rows={4} />
      </label>

      <button
        type="submit"
        className={`${common.button} ${common.primary} ${styles.submitButton}`}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Send"}
      </button>

      {status === "success" && (
        <p className={common.successText} role="status">
          Your rental request was sent successfully.
        </p>
      )}
      {status === "error" && (
        <p className={common.errorText} role="alert">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
