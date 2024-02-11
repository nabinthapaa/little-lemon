import Booking from "@/models/Booking";
import { ConnectToDB } from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { _id } = await req.json();
    await ConnectToDB();
    await Booking.findOneAndDelete({ _id });

    return NextResponse.json({
      message: "Deleted sucessfully",
      status: 200,
    });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
}
