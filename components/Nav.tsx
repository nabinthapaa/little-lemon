"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { NavLinks } from "../constants/NavLinks";

function Nav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <nav>
      <ul className="navlist">
        {NavLinks.map((link) => (
          <li
            key={link.name}
            className={`${pathname === link.link ? "active" : ""}`}
          >
            <Link href={link.link}>{link.name}</Link>
          </li>
        ))}
        {session?.user ? (
          <li className={`${pathname === "/profile" ? "active" : ""}`}>
            <Link href={"/profile"}>Profile</Link>
          </li>
        ) : (
          <li className={`${pathname === "/login" ? "active" : ""}`}>
            <Link href={"/login"}>Log in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
