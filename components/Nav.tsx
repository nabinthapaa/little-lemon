"use client";
import { signOut, useSession } from "next-auth/react";
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
          <li>
            <Link href={""} onClick={() => signOut()}>
              Log out
            </Link>
          </li>
        ) : (
          <li>
            <Link
              className={`${pathname === "login" ? "active" : ""}`}
              href={"/login"}
            >
              Log in
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
