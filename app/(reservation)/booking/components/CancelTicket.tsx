"use client";
import React from "react";

interface CancelTicketProps {
  cancel: (id: string) => void;
  id: string;
}

function CancelTicket({ cancel, id }: CancelTicketProps) {
  return (
    <button onClick={() => cancel(id)} className="cancel-ticket">
      Cancel
    </button>
  );
}

export default CancelTicket;
