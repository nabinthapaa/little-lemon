import { SpecialsProps } from "@/types/props";
import { currency_fmt } from "@/utils/utils";
import Image from "next/image";
import React from "react";

function Specials({ image, price, name, description }: SpecialsProps) {
  return (
    <div className="specials">
      <div className="specials-image-wrapper">
        <Image src={image} alt={name} fill />
      </div>
      <div className="special-bottom-wrapper">
        <div className="special-name-price">
          <p className="special-name">{name}</p>
          <p className="special-price">{currency_fmt.format(price)}</p>
        </div>
        <div className="special-desc">{description}</div>
      </div>

      <button className="special-order">Order Delivery</button>
    </div>
  );
}

export default Specials;
