import Booking from "@/models/Booking";
import { ConnectToDB } from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { _id } = await req.json();
    await ConnectToDB();
    const booking = await Booking.findOne({ _id });
    booking.status = "canceled";
    booking.save();

    return NextResponse.json({
      message: "Updated Succesfully",
      status: 200,
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
