"use client";
import { AuthData } from "@/types/props";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

function validateData(data: AuthData) {
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
    return {
      is_valid: false,
      message: "Please enter a valid email",
    };
  } else if (data.email.length < 8) {
    return {
      is_valid: false,
      message: "Please enter a long password",
    };
  }
  return {
    is_valid: true,
    message: "",
  };
}

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { is_valid, message } = validateData(loginInfo);
    if (is_valid) {
      const res = await signIn("credentials", {
        ...loginInfo,
      });
      if (res?.error) {
        alert("Invalid Credentials");
        return;
      }
    } else {
      alert(message);
    }
  };

  return (
    <div>
      <div className="form-wrapper">
        <h1 className="registration_header">Login</h1>
        <div className="form container">
          <form className="form-container" onSubmit={handleSubmit}>
            <label className="form-group">
              <span className="reg_span">Email:</span>
              <input
                value={loginInfo.email}
                className="form-input"
                type="email"
                required
                placeholder="Email here"
                onChange={(e) =>
                  setLoginInfo((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </label>
            <label className="form-group">
              <span className="reg_span">Password:</span>
              <input
                value={loginInfo.password}
                onChange={(e) =>
                  setLoginInfo((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="Password here"
                className="form-input"
                type="password"
                required
              />
            </label>

            <div className="login-signup-button">
              <button className="form-submit form-input" type="submit">
                Login
              </button>
              <Link
                href={"/signup"}
                className="form-submit form-input sign-up-button"
                type="submit"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
