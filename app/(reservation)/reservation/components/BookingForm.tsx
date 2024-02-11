import { OCCASSION } from "@/constants/options";
import { BookingFormProps } from "@/types/props";
import { capitalize } from "@/utils/utils";
import React from "react";

function BookingForm({
  date,
  time,
  noOfPerson,
  occassion,
  updateData,
}: BookingFormProps) {
  return (
    <>
      <label className="form-group">
        <span className="reg_span">Date:</span>
        <input
          className="form-input"
          type="date"
          value={date}
          min={date}
          onChange={(e) => updateData({ date: e.target.value })}
        />
      </label>
      <label className="form-group">
        <span className="reg_span">Time:</span>
        <input
          className="form-input"
          type="time"
          min="10:00"
          max="21:00"
          value={time}
          onChange={(e) => updateData({ time: e.target.value })}
        />
      </label>
      <label className="form-group">
        <span className="reg_span">No. of Persons:</span>
        <input
          className="form-input"
          type="number"
          min={1}
          value={noOfPerson}
          onChange={(e) => updateData({ noOfPerson: Number(e.target.value) })}
        />
      </label>
      <label className="form-group">
        <span className="reg_span">Occassion:</span>
        <select
          className="form-input"
          value={occassion}
          onChange={(e) => updateData({ occassion: e.target.value })}
        >
          <Options />
        </select>
      </label>
    </>
  );
}

function Options() {
  return Object.entries(OCCASSION).map((keyValue) => (
    <option key={keyValue[0]} value={keyValue[0]}>
      {capitalize(keyValue[1])}
    </option>
  ));
}

export default BookingForm;
