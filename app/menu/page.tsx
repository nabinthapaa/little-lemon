import { capitalize, currency_fmt } from "@/utils/utils";
import React, { Suspense } from "react";

function MenuPage() {
  return (
    <>
      <div className="registration_header">Menu</div>
      <Suspense fallback={<div>Fetching Menu Items</div>}>
        <div className="container">
          <Menu />
        </div>
      </Suspense>
    </>
  );
}

async function Menu() {
  const res = await fetch(`${process.env.BASE_URL}/api/menu`);
  const { data } = await res.json();

  return (
    <>
      {data.map((d: any) => (
        <MenuSection key={d._id} data={d} />
      ))}
    </>
  );
}

function MenuSection({ data }: any) {
  return (
    <>
      <div className="menu-section-header-wrapper">
        <h2 className="menu-section-header">{capitalize(data.section)}</h2>
      </div>
      <div className="items container">
        {data.items.map((item: any) => (
          <MenuItem key={item.slug} item={item} />
        ))}
      </div>
    </>
  );
}

function MenuItem({ item }: any) {
  return (
    <>
      <div className="menu-item-wrapper">
        <div className="menu-items">
          <p className="menu-item">{item.name}</p>
          <p className="menu-ingredients">{item.ingredients}</p>
        </div>
        <div className="right menu-price">
          {currency_fmt.format(item.price)}
        </div>
      </div>
    </>
  );
}

export default MenuPage;
