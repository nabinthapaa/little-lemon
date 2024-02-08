import { OCCASSION } from "../constants/options";

export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

export function checkTime(time: string): boolean {
  const hour = Number(time.split(":")[0]);
  console.log(hour >= 10 && hour <= 20);
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

interface FormData {
  date: string;
  time: string;
  occassion: string;
  noOfPersons?: number;
}

interface Validation {
  message: string;
  response: boolean;
}

export function ValidateRegistration(formData: FormData): Validation {
  if (!ValidateDate(formData.date)) {
    return {
      message: "Invalid Date",
      response: false,
    };
  } else if (!checkTime(formData.time)) {
    return {
      message: "Booking available between 10am and 7pm",
      response: false,
    };
  } else if (!Object.keys(OCCASSION).includes(formData.occassion)) {
    return {
      message: "Please select a proper occasion",
      response: false,
    };
  }
  return {
    message: "Valid info provided",
    response: true,
  };
}
