import Booking from "@/models/Booking";
import { BookingData } from "@/types/props";
import { ConnectToDB } from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

async function addBooking(data: BookingData) {
  try {
    await ConnectToDB();
    const booking = await Booking.create({ ...data });
    return booking;
  } catch (e) {
    console.log(e);
    return new Error("Failed to add booking");
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const res = await addBooking(data);

    return NextResponse.json({
      message: "Succesfully Booked",
      staus: 201,
      booking: { ...res["_doc"] },
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        error: error.message,
        status: 500,
      });
    }
  }
}
