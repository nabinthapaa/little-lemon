import User from "@/models/User";
import { ConnectToDB } from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    await ConnectToDB();
    const user = await User.findOne({ _id: id });
    return NextResponse.json({
      message: "User found successfully",
      status: 200,
      data: { ...user["_doc"] },
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
