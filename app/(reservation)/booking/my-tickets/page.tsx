import action from "@/app/action";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import React, { Suspense } from "react";
import Ticket from "../components/Ticket";

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
            {/*@ts-ignore */}
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

  const remove = async (_id: string) => {
    "use server";
    await fetch(`${process.env.BASE_URL}/api/bookings/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    revalidatePath("/booking/my-tickets");
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
    revalidatePath("/booking/my-tickets");
  };

  return data1.map((data: any) => (
    <Ticket key={data._id} data={data} cancel={cancel} remove={remove} />
  ));
}
