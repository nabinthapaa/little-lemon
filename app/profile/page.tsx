import { date_fmt } from "@/utils/utils";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutButton from "./components/logoutbutton";

async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <div className="registration_header">My Profile</div>
      <div className="container mt-4">
        <div className="profile-container">
          <div className="info flex items-center gap-3">
            <div className="left">
              <p>
                <span className="font-bold mr-3">Email:</span>
                {session.user?.email}
              </p>
              <p>
                <span className="font-bold mr-3">Created On:</span>
                {date_fmt.format(new Date(session.user?.createdAt))}
              </p>
            </div>
            <div className="right h-20 relative  w-20 rounded-full overflow-hidden">
              <Image src="/assets/restaurant.jpg" alt="Profile Image" fill />
            </div>
          </div>
          <div className="profile-buttons mt-4 flex gap-3 items-center">
            <Link
              href="/booking/my-tickets"
              className="my-ticket-button cta-button "
            >
              My Reservations
            </Link>
            <Link href="/my-orders" className="my-order-button cta-button">
              My orders
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
