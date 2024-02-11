"use client";
import React from "react";

interface DeleteTicketProps {
  remove: (id: string) => void;
  id: string;
}

function DeleteTicket({ remove, id }: DeleteTicketProps) {
  return (
    <button onClick={() => remove(id)} className="cancel-ticket delete-ticket">
      Delete
    </button>
  );
}

export default DeleteTicket;
