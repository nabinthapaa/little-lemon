import Booking from "@/models/Booking";
import { ConnectToDB } from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    await ConnectToDB();
    const result = await Booking.findOne({ _id: id });
    return NextResponse.json({
      message: "Booking Successfully found",
      status: 200,
      data: { ...result["_doc"] },
    });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({
        message: e.message,
        status: 404,
      });
    }
  }
}
