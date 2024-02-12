import { BookingData } from "@/types/props";
import { OCCASSION } from "../constants/options";

export const date_fmt = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const currency_fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

export function checkTime(time: string): boolean {
  const hour = Number(time.split(":")[0]);
  if (hour >= 10 && hour <= 20) {
    return true;
  }
  return false;
}

export function ValidateDate(date: string): boolean {
  const input_date = new Date(date);
  const current_date = new Date();

  if (input_date.getFullYear() >= current_date.getFullYear()) {
    if (input_date.getMonth() >= current_date.getMonth()) {
      if (input_date.getDate() >= current_date.getDate()) {
        return true;
      }
    }
  }
  return false;
}

interface Validation {
  message: string;
  response: boolean;
  page?: number;
  error?: string;
}

export function ValidateRegistration(formData: BookingData): Validation {
  if (!ValidateDate(formData.date)) {
    return {
      message: "Invalid Date",
      page: 1,
      response: false,
      error: "date",
    };
  } else if (!checkTime(formData.time)) {
    return {
      message: "Booking available between 10am and 7pm",
      page: 1,
      response: false,
      error: "time",
    };
  } else if (!Object.keys(OCCASSION).includes(formData.occassion)) {
    return {
      message: "Please select a proper occasion",
      page: 1,
      response: false,
      error: "occassion",
    };
  } else if (formData.name == "") {
    return {
      message: "Please enter a name",
      page: 2,
      response: false,
      error: "name",
    };
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    return {
      message: "Please enter a valid email",
      page: 2,
      response: false,
      error: "email",
    };
  } else if (
    !/^(98|97|96|981|980|984|985|986|988)\d{7}$|^0\d{1}-\d{7,8}$/.test(
      formData.phone
    ) ||
    formData.phone.length !== 10
  ) {
    return {
      message: "Please enter a valid phone number",
      page: 2,
      response: false,
      error: "phone",
    };
  }
  return {
    message: "Valid info provided",
    response: true,
  };
}
