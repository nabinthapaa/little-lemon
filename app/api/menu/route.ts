import Menu from "@/models/Menu";
import { ConnectToDB } from "@/utils/connectToDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await ConnectToDB();
    const menu = await Menu.find().lean();

    return NextResponse.json({
      message: "Menu Items",
      status: 200,
      data: menu,
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
