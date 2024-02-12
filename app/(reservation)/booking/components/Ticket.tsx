"use server";
import { date_fmt } from "@/utils/utils";
import React, { Suspense } from "react";
import CancelTicket from "./CancelTicket";
import DeleteTicket from "./DeleteTicket";

function Ticket({ data, cancel, remove }: any) {
  if (data.status === 404) {
    return <p>{data.message}</p>;
  }
  return (
    <div
      className={`booking_card ${data.status === "canceled" ? "canceled" : ""}`}
    >
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
          {data.userId.email}
        </p>
        <p>
          <span>Booked to:</span>
          {data.email}
        </p>
      </div>
      <div className="ticket-buttons">
        {data.status !== "canceled" && (
          <CancelTicket cancel={cancel} id={data._id} />
        )}
        <DeleteTicket remove={remove} id={data._id} />
      </div>
    </div>
  );
}

export default Ticket;
