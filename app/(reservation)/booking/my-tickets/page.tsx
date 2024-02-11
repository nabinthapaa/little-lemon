import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { date_fmt } from "@/utils/utils";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";

export default async function Page() {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  if (session?.user?._id) {
    //@ts-ignore
    return (
      <>
        <div className="registration_header">My Bookings</div>
        <Suspense fallback={<div>Getting your bookings</div>}>
          <div className="bookings_container container">
            <Bookings id={session.user._id} email={session.user.email} />
          </div>
        </Suspense>
      </>
    );
  } else {
    return <div>Please Log in</div>;
  }
}

async function Bookings({ id, email }: { [key: string]: string }) {
  //@ts-ignore
  const res = await fetch(`${process.env.BASE_URL}/api/bookings/user?id=${id}`);
  const { data: data1 } = await res.json();

  return data1.map((data: any) => (
    <div key={data._id} className="booking_card">
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
          {email}
        </p>
        <p>
          <span>Booked to:</span>
          {data.email}
        </p>
      </div>
    </div>
  ));
}
