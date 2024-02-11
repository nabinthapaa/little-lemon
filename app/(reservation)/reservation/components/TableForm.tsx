import { LOCATION } from "@/constants/options";
import { BookingData, BookingFormProps } from "@/types/props";
import { capitalize } from "@/utils/utils";
import React from "react";

function TableForm({
  updateData,
  email,
  phone,
  location,
  name,
  error,
}: BookingFormProps) {
  return (
    <>
      <label className="form-group">
        <span className="reg_span">Email:</span>
        <input
          className="form-input"
          type="email"
          required
          value={email}
          onChange={(e) => updateData({ email: e.target.value })}
        />
        {error.email.is && (
          <span className="text-red-500 font-bold">{error.email.message}</span>
        )}
      </label>
      <label className="form-group">
        <span className="reg_span">Phone:</span>
        <input
          className="form-input"
          type="tel"
          required
          value={phone}
          onChange={(e) => updateData({ phone: e.target.value })}
        />
        {error.phone.is && (
          <span className="text-red-500 font-bold">{error.phone.message}</span>
        )}
      </label>

      <label className="form-group">
        <span className="reg_span">Name:</span>
        <input
          className="form-input"
          type="text"
          required
          value={name}
          onChange={(e) => updateData({ name: e.target.value })}
        />
      </label>

      <label className="form-group">
        <span className="reg_span">Location:</span>
        <select
          className="form-input"
          value={location}
          onChange={(e) => updateData({ location: e.target.value })}
          required
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
