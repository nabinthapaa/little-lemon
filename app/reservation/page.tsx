"use client";
import { LOCATION, OCCASSION } from "@/constants/options";
import { useMultiPartForm } from "@/hooks/useMultiPartForm";
import { BookingData } from "@/types/props";
import { ValidateRegistration } from "@/utils/utils";
import { FormEvent, useState } from "react";
import BookingForm from "./components/BookingForm";
import TableForm from "./components/TableForm";

export const INITIAL_DATA: BookingData = {
  date: new Date().toISOString().split("T")[0],
  time: "10:00",
  noOfPerson: 2,
  occassion: OCCASSION.other,
  location: LOCATION.window,
  phone: "",
  email: "",
};

function ReserveTable() {
  const [data, setData] = useState(INITIAL_DATA);
  const { currentFormIndex, isLast, next, back, form, isFirst } =
    useMultiPartForm([
      <BookingForm
        key="booking-form"
        {...INITIAL_DATA}
        updateData={updateData}
      />,
      <TableForm key="table-form" {...INITIAL_DATA} updateData={updateData} />,
    ]);

  function updateData(field: Partial<BookingData>) {
    setData((prev) => ({ ...prev, ...field }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLast) return next();
    const validation = ValidateRegistration(data);
    if (validation.response) {
      return;
    }
    alert(validation.message);
  }

  return (
    <div className="reserve-table-wrapper">
      <div className="form-wrapper">
        <h1 className="registration_header">Reservation Form</h1>
        <div className="form container">
          <form className="form-container" onSubmit={handleSubmit}>
            {form}
            <div
              className="login-signup-button"
              style={{
                display: isFirst ? "flex" : "grid",
                width: "100% ",
              }}
            >
              {!isFirst && (
                <button
                  type="button"
                  onClick={back}
                  className="form-submit form-input"
                >
                  Previous
                </button>
              )}
              <button
                className="form-submit form-input sign-up-button"
                type="submit"
                style={{ flex: 1 }}
              >
                {isLast ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReserveTable;
