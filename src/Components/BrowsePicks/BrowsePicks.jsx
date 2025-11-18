import React from "react";
import laptop from "../../assets/images/Products/laptop.png";
import iPhone from "../../assets/images/Products/iphone.png";
import iPad from "../../assets/images/Products/ipad.png";
import gameCover from "../../assets/images/Products/gaming.png";
import styles from "./BrowsePicks.module.css";

const serviceData = [
  {
    title: "service1",
    img: iPhone,
    text: "iPhone",
  },
  {
    title: "service2",
    img: iPhone,
    text: "MacBook",
  },
  {
    title: "service3",
    img: iPhone,
    text: "iPad",
  },
  {
    title: "service4",
    img: iPhone,
    text: "Gaming Consoles",
  },
];

const BrowsePicks = () => {
  return (
    <section className="homepage-section">
      {/* Top Selling Products - Aligned to Start */}
      <h2 className={styles.heading}>Top Selling Category</h2>

      {/* Card Container - Centered */}
      <div className={styles.cardContainer}>
        {serviceData.map((data, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={data.img} alt={data.title} />
            </div>
            <p className={styles.cardText}>{data.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowsePicks;
