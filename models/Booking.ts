import mongoose, { Schema, models } from "mongoose";

const BookingSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    noOfPerson: {
      type: Number,
      required: true,
    },
    occassion: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Booking = models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;
