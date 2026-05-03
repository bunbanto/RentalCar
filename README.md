# RentalCar

Frontend application for a car rental company. The app lets users browse rental cars, filter the catalog, open car details in a new browser tab, and send a rental request.

## Features

- Home page with a hero section and `View Catalog` call to action.
- Catalog page with backend filtering by brand, price and mileage.
- Infinite `Load More` pagination powered by TanStack Query `useInfiniteQuery`.
- Car detail page with full car information, image, rental conditions and specifications.
- Rental form with success notification.
- Next.js App Router, TypeScript and semantic markup.

## Tech Stack

- Next.js
- TypeScript
- TanStack Query
- React Icons
- CSS

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

Build for production:

```bash
npm run build
```

## API

The application uses `https://car-rental-api.goit.global` for cars and brands.

## Author

Yurii Fishbakh
