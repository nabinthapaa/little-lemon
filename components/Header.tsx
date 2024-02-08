import Image from "next/image";
import React from "react";
import Nav from "./Nav";

function Header() {
  return (
    <header className="header">
      <div>
        <Image
          src="/assets/Logo.svg"
          alt="little lemon logo"
          width={200}
          height={200}
        />
      </div>
      <Nav />
    </header>
  );
}

export default Header;
