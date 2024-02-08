"use client";
import { AuthData } from "@/types/props";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function validateData(data: AuthData) {
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
    return {
      is_valid: false,
      message: "Please enter a valid email",
    };
  } else if (data.password !== data.repassword) {
    return {
      is_valid: false,
      message: "Please enter matching password",
    };
  }
  return {
    is_valid: true,
    message: "",
  };
}

function Login() {
  const [loginInfo, setLoginInfo] = useState<AuthData>({
    email: "",
    password: "",
    repassword: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { is_valid, message } = validateData(loginInfo);
    if (is_valid) {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        });
        console.log(res);
        if (res.ok) {
          router.replace("/");
        } else {
          alert(res.statusText);
        }
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    } else {
      alert(message);
    }
  };

  return (
    <div>
      <div className="form-wrapper">
        <h1 className="registration_header">Sign Up</h1>
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
            <label className="form-group">
              <span className="reg_span">Confirm Password:</span>
              <input
                value={loginInfo.repassword}
                onChange={(e) =>
                  setLoginInfo((prev) => ({
                    ...prev,
                    repassword: e.target.value,
                  }))
                }
                placeholder="Retype Password here"
                className="form-input"
                type="password"
                required
              />
            </label>

            <div className="login-signup-button">
              <button className="form-submit form-input " type="submit">
                Sign up
              </button>
              <Link
                href={"/login"}
                className="form-submit form-input sign-up-button"
                type="submit"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
