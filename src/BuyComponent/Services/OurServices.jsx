import React from "react";
import styles from "./OurServices.module.css";

import headphone from "../../assets/headphone.png";
import repair from "../../assets/repair.png";
import exchange from "../../assets/exchange.png";
import recycle from "../../assets/recycle.png";
import iphone from "../../assets/iphone.png";
import laptop from "../../assets/laptop.png";

const OurServices = () => {
  const ourServices = [
    { label: "Buy Phone", img: iphone },
    { label: "Buy Laptop", img: laptop },
    { label: "Buy Accessories", img: headphone },
    { label: "Repair Phone", img: repair },
    { label: "Repair Laptop", img: repair },
    { label: "Exchange Device", img: exchange },
    { label: "Recycle Phone/Other Device", img: recycle },
  ];

  const Card = ({ label, img }) => (
    <div className={styles.cardContainer}>
      <div className={styles.cardBox}>
        <img src={img} alt={label} className={styles.cardImage} />
      </div>
      <p className={styles.cardLabel}>{label}</p>
    </div>
  );

  return (
    <section>
    <div className={styles.container}>
      <h2 className={styles.heading}>Our Services</h2>
      <div className={styles.grid}>
        {ourServices.map((item, idx) => (
          <Card key={idx} label={item.label} img={item.img} />
        ))}
      </div>
    </div>
    </section>
  );
};

export default OurServices;
