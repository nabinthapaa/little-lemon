import User from "@/models/User";
import { AuthData } from "@/types/props";
import { ConnectToDB } from "@/utils/connectToDB";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

async function hashPassword(password: string): Promise<string> {
  return await hash(password, 10);
}

async function createUser(data: AuthData) {
  await ConnectToDB();
  const user = await User.findOne({ email: data.email });
  if (!user) {
    await User.create({
      email: data.email,
      password: await hashPassword(data.password),
    });
    return {
      message: "User Created Successfully",
      status: 201,
    };
  } else {
    return {
      message: "user already exists. Please Sign in.",
      status: 500,
    };
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const { message, status } = await createUser(data);

    return NextResponse.json({ message: message, status: status });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        error: error.message || "Internal Server Error",
        status: 500,
      });
    }
  }
}
