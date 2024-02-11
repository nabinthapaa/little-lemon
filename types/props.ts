import { FormEvent } from "react";

export interface BookingData {
  date: string;
  time: string;
  noOfPerson: number;
  occassion: string;
  location: string;
  phone: string;
  email: string;
  userId?: string;
  name: string;
}

export interface BookingError {
  date: boolean;
  time: boolean;
  noOfPerson: boolean;
  occassion: boolean;
  location: boolean;
  phone: boolean;
  email: boolean;
  userId?: boolean;
  name: boolean;
}

export interface BookingFormProps extends BookingData {
  error: BookingError;
  updateData: (field: Partial<BookingData>) => void;
}

export interface SpecialsProps {
  image: string;
  price: number;
  name: string;
  description: string;
}

export interface ToastProps {
  message: string;
  show: boolean;
}

export interface AuthData {
  email: string;
  password: string;
  repassword?: string;
}
