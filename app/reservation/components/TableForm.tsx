import { LOCATION } from "@/constants/options";
import { BookingData, BookingFormProps } from "@/types/props";
import { capitalize } from "@/utils/utils";
import React from "react";

function TableForm({ updateData, email, phone, location }: BookingFormProps) {
  return (
    <>
      <label className="form-group">
        <span className="reg_span">Email:</span>
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => updateData({ email: e.target.value })}
        />
      </label>
      <label className="form-group">
        <span className="reg_span">Phone:</span>
        <input
          className="form-input"
          type="tel"
          value={phone}
          onChange={(e) => updateData({ phone: e.target.value })}
        />
      </label>
      <label className="form-group">
        <span className="reg_span">Location:</span>
        <select
          className="form-input"
          value={location}
          onChange={(e) => updateData({ location: e.target.value })}
        >
          <Options />
        </select>
      </label>
    </>
  );
}

function Options() {
  return Object.entries(LOCATION).map((keyValue) => (
    <option key={keyValue[0]} value={keyValue[0]}>
      {capitalize(keyValue[1])}
    </option>
  ));
}

export default TableForm;
