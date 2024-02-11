import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Ticket from "./components/Ticket";

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

  const remove = async (_id: string) => {
    "use server";
    await fetch(`${process.env.BASE_URL}/api/bookings/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    redirect("/booking/my-tickets");
  };

  const cancel = async (_id: string) => {
    "use server";
    await fetch(`${process.env.BASE_URL}/api/bookings/cancel`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    revalidatePath("/booking");
  };

  return <Ticket data={data} cancel={cancel} remove={remove} />;
}

export default page;
