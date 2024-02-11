import Booking from "@/models/Booking";
import { ConnectToDB } from "@/utils/connectToDB";
import { AnyObject } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    await ConnectToDB();
    const bookings = await Booking.find({ userId: id }).lean();
    return NextResponse.json({
      message: "Data Retrieved",
      status: 200,
      data: bookings,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        status: 404,
      });
    }
  }
}
