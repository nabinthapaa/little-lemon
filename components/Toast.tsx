import { ToastProps } from "@/types/props";
import React from "react";

function Toast({ message, show }: ToastProps) {
  return <div className={`toast ${show ? "show" : ""}`}>{message}</div>;
}

export default Toast;
