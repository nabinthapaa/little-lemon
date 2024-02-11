import mongoose from "mongoose";

export async function ConnectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI || "");
    console.log("Connected to DB");
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
}
