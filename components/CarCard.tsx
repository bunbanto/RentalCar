import Image from "next/image";
import Link from "next/link";

import type { Car } from "@/lib/types";
import { formatMileage, getAddressParts } from "@/lib/api";
import { FavoriteButton } from "./FavoriteButton";
import common from "./common.module.css";
import styles from "./CarCard.module.css";

export function CarCard({ car }: { car: Car }) {
  const { city, country } = getAddressParts(car.address);

  return (
    <article className={styles.carCard}>
      <div className={styles.carImageWrap}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="276px"
          className={styles.carImage}
        />
        <FavoriteButton carId={car.id} />
      </div>
      <div className={styles.carCardHead}>
        <h2>
          {car.brand} <span>{car.model}</span>, {car.year}
        </h2>
        <p>${car.rentalPrice}</p>
      </div>
      <ul className={styles.carMeta} aria-label="Car short details">
        <li>{city}</li>
        <li>{country}</li>
        <li>{car.rentalCompany}</li>
        <li>{car.type}</li>
        <li>{formatMileage(car.mileage)} km</li>
      </ul>
      <Link
        href={`/catalog/${car.id}`}
        rel="noopener noreferrer"
        className={`${common.button} ${common.primary} ${styles.cardButton}`}
      >
        Read more
      </Link>
    </article>
  );
}
