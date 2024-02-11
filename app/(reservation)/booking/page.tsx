import { date_fmt } from "@/utils/utils";
import React, { Suspense } from "react";

export async function page({
  searchParams: { id },
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <div className="registration_header">Booking</div>
      <Suspense>
        <Booking id={id as string} />
      </Suspense>
    </>
  );
}

async function Booking({ id }: { id: string }) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/bookings/single?id=${id}`
  );
  const { data } = await res.json();

  const getUser = async () => {
    try {
      const res = await fetch(
        `${process.env.BASE_URL}/api/user?id=${data.userId}`
      );
      return (await res.json()).data.email;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };
  return (
    <div className="booking_card">
      <p className="ticket-number">
        <span>Ticket No:</span>
        {data._id}
      </p>
      <div className="ticket-body">
        <p>
          <span>Name:</span>
          {data.name}
        </p>
        <p>
          <span>Time:</span>
          {data.time}
        </p>
        <p>
          <span>Date:</span>
          {date_fmt.format(new Date(data.date))}
        </p>
        <p>
          <span>People:</span>
          {data.noOfPerson}
        </p>
        <p>
          <span>Location:</span>
          {data.location}
        </p>
        <p>
          <span>Booked by:</span>
          <Suspense fallback={<span>Getting info</span>}>
            <span className="booker">{getUser()}</span>
          </Suspense>
        </p>
        <p>
          <span>Booked to:</span>
          {data.email}
        </p>
      </div>
    </div>
  );
}

export default page;
