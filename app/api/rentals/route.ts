import { NextResponse } from "next/server";

import type { RentalPayload } from "@/lib/types";

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<RentalPayload>;

  if (!payload.carId || !payload.name || !payload.email || !payload.bookingDate) {
    return NextResponse.json(
      { message: "Missing required rental fields" },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
