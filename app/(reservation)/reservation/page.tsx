"use client";
import { LOCATION, OCCASSION } from "@/constants/options";
import { useMultiPartForm } from "@/hooks/useMultiPartForm";
import { BookingData, BookingError } from "@/types/props";
import { ValidateRegistration } from "@/utils/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  name: "",
};

export const INITIAL_ERROR: BookingError = {
  email: false,
  date: false,
  time: false,
  noOfPerson: false,
  occassion: false,
  location: false,
  phone: false,
  name: false,
};

function ReserveTable() {
  const { data: session } = useSession();
  const [error, setError] = useState(INITIAL_ERROR);
  const router = useRouter();
  const [data, setData] = useState({
    ...INITIAL_DATA,
    email: session?.user?.email || "",
  });
  const [disabled, setDisabled] = useState(false);
  const { isLast, next, back, form, isFirst, goTo } = useMultiPartForm([
    <BookingForm
      key="booking-form"
      error={error}
      {...data}
      updateData={updateData}
    />,
    <TableForm
      key="table-form"
      error={error}
      {...data}
      updateData={updateData}
    />,
  ]);

  function updateData(field: Partial<BookingData>) {
    setData((prev) => ({ ...prev, ...field }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLast) return next();
    const validation = ValidateRegistration(data);
    setDisabled(true);
    if (validation.response) {
      try {
        const res = await fetch("/api/book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          //@ts-ignore
          body: JSON.stringify({ ...data, userId: session?.user?._id }),
        });
        const res_data: any = await res.json();
        router.push(`/booking?id=${res_data.booking._id}`);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
    setError((_) => ({
      ...INITIAL_ERROR,
      [validation.error as string]: { is: true, message: validation.message },
    }));
    if (validation.page) goTo(validation.page - 1);
    setDisabled(false);
  }

  return (
    <div className="reserve-table-wrapper">
      <div className="form-wrapper">
        <h1 className="registration_header">Reservation Form</h1>
        <div className="form container">
          {!session?.user ? (
            <div>
              Please{" "}
              <Link href="/login" className="underline">
                Login
              </Link>{" "}
              to continue
            </div>
          ) : (
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
                    className="form-submit form-input disabled:opacity-5"
                    disabled={disabled}
                  >
                    Previous
                  </button>
                )}
                <button
                  className="form-submit form-input sign-up-button disabled:opacity-5"
                  type="submit"
                  style={{ flex: 1 }}
                  disabled={disabled}
                >
                  {isLast ? "Submit" : "Next"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReserveTable;
