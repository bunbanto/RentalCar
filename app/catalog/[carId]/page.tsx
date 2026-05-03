import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  FiCalendar,
  FiCheckCircle,
  FiDroplet,
  FiMapPin,
  FiSettings,
} from "react-icons/fi";

import { RentalForm } from "@/components/RentalForm";
import { FavoriteButton } from "@/components/FavoriteButton";
import common from "@/components/common.module.css";
import { fetchCarById, formatMileage, getAddressParts } from "@/lib/api";
import styles from "./details.module.css";

interface CarDetailsPageProps {
  params: Promise<{
    carId: string;
  }>;
}

export async function generateMetadata({
  params,
}: CarDetailsPageProps): Promise<Metadata> {
  const { carId } = await params;

  try {
    const car = await fetchCarById(carId);

    return {
      title: `${car.brand} ${car.model}`,
      description: car.description,
    };
  } catch {
    return {
      title: "Car details",
    };
  }
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { carId } = await params;
  const car = await fetchCarById(carId).catch(() => null);

  if (!car) {
    notFound();
  }

  const { city, country } = getAddressParts(car.address);

  return (
    <main className={`${common.container} ${styles.detailsPage}`}>
      <section className={styles.detailsMedia}>
        <div className={styles.detailsImageWrap}>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            fill
            priority
            sizes="640px"
            className={styles.detailsImage}
          />
        </div>
        <RentalForm carId={car.id} />
      </section>

      <section className={styles.detailsContent}>
        <div className={styles.detailsTitleBlock}>
          <div className={styles.detailsTop}>
            <h1>
              {car.brand} {car.model}, {car.year}
            </h1>
            <FavoriteButton
              carId={car.id}
              className={styles.detailsFavoriteButton}
            />
          </div>
          <p className={styles.carId}>Id: {car.id.slice(0, 8)}</p>
          <div className={styles.detailsLocation}>
            <FiMapPin aria-hidden="true" />
            {city}, {country}
            <span>Mileage: {formatMileage(car.mileage)} km</span>
          </div>
          <p className={styles.detailsPrice}>${car.rentalPrice}</p>
          <p className={styles.detailsDescription}>{car.description}</p>
        </div>

        <div className={styles.detailsSection}>
          <h2>Rental Conditions:</h2>
          <ul className={styles.detailsList}>
            {car.rentalConditions.map((condition) => (
              <li key={condition}>
                <FiCheckCircle aria-hidden="true" />
                {condition}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.detailsSection}>
          <h2>Car Specifications:</h2>
          <ul className={styles.detailsList}>
            <li>
              <FiCalendar aria-hidden="true" />
              Year: {car.year}
            </li>
            <li>
              <FiSettings aria-hidden="true" />
              Type: {car.type}
            </li>
            <li>
              <FiDroplet aria-hidden="true" />
              Fuel Consumption: {car.fuelConsumption}
            </li>
            <li>
              <FiSettings aria-hidden="true" />
              Engine Size: {car.engineSize}
            </li>
          </ul>
        </div>

        <div className={styles.detailsSection}>
          <h2>Accessories and functionalities:</h2>
          <ul className={styles.detailsList}>
            {[...car.accessories, ...car.functionalities].map((item) => (
              <li key={item}>
                <FiCheckCircle aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
