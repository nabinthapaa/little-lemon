import Image from "next/image";
import React from "react";

function About() {
  return (
    <div>
      <h1 className="about-heading">About Us</h1>
      <div className="container section-grid">
        <section className="about-section">
          <p>
            Your neighborhood gem nestled in the heart of our beloved community
            for over five flavorful years. At Little Lemon, we take pride in
            serving up delectable dishes crafted with care and passion, earning
            the adoration of locals far and wide.
          </p>
          <p>
            Our menu boasts a diverse selection of culinary delights, ranging
            from classic comfort foods to innovative culinary creations,
            ensuring there&apos;s something to tantalize every palate. Whether
            you&apos;re craving a hearty plate of pasta, a mouthwatering burger,
            or a fresh salad bursting with seasonal ingredients, we&apos;ve got
            you covered.
          </p>
          <p>
            But what truly sets Little Lemon apart is our commitment to surprise
            and delight our guests with a special dish each week, showcasing the
            creativity and talent of our culinary team. From seasonal
            specialties to inspired fusion cuisine, these weekly features add an
            extra dash of excitement to every visit.
          </p>
          <p>
            Beyond just a dining experience, Little Lemon is also the perfect
            venue for your special occasions. Whether you&apos;re celebrating an
            anniversary, birthday, or any milestone worth cherishing, our cozy
            ambiance and attentive staff ensure that your event is nothing short
            of memorable. Tables can be reserved in advance, allowing you to
            relax and enjoy every moment surrounded by friends, family, and
            exceptional food.
          </p>
          <p>
            As a cornerstone of the community, we&apos;re honored to have earned
            the praise and loyalty of our neighbors over the years. From our
            kitchen to your table, we invite you to join us at Little Lemon and
            discover why we&apos;re more than just a restaurant—we&apos;re a
            cherished gathering place where great food and great memories are
            always on the menu.
          </p>
        </section>
        <aside className="image-container">
          <Image
            src="/assets/restaurant chef B.jpg"
            alt="chef making a dish"
            fill
            className="section-image"
          />
        </aside>
      </div>
    </div>
  );
}

export default About;
