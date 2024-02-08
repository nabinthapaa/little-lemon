import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer>
      <hr className="footer-upper-bar" />
      <div className="footer-wrapper">
        <div className="footer-logo-wrapper">
          <Image
            src="./assets/Logo.svg"
            alt="Little Lemon logo"
            width={500}
            height={500}
          />
        </div>

        <div className="footer-socials">
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Linkedin</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
