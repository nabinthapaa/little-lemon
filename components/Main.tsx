import Link from "next/link";
import React from "react";
import { specials } from "../constants/specials";
import CTA from "./CTA";
import Specials from "./Specials";

function Main() {
  return (
    <main>
      <CTA />
      <section className="special-container">
        <div className="special-title-wrapper">
          <p className="title-special">This Weeks Specials !</p>
          <Link href="/menu" className="online-menu-button">
            Online Menu
          </Link>
        </div>
        <div className="special-wrapper">
          {specials.map((special) => (
            <Specials
              key={special.name}
              image={special.url}
              name={special.name}
              price={special.price}
              description={special.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
