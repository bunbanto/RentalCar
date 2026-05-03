"use client";

import { useMemo, useRef, useState } from "react";
//import { FiCalendar } from "react-icons/fi";

import styles from "./BookingDateField.module.css";

function formatDate(value: string) {
  if (!value) {
    return "Booking date";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function BookingDateField() {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const label = useMemo(() => formatDate(value), [value]);

  function openCalendar() {
    inputRef.current?.showPicker?.();
    inputRef.current?.focus();
  }

  return (
    <label>
      <span
        className={`${styles.bookingDateControl} ${value ? styles.hasValue : ""}`}
        onClick={openCalendar}
      >
        <span>{label}</span>
        {/* <FiCalendar aria-hidden="true" /> */}
        <input
          ref={inputRef}
          name="bookingDate"
          type="date"
          required
          value={value}
          aria-label="Booking date"
          onChange={(event) => setValue(event.target.value)}
        />
      </span>
    </label>
  );
}
