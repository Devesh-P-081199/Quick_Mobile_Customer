import React from "react";
import styles from "./OurServices.module.css";

import headphone from "../../assets/icons/Headphone-2-673x1024 1.svg";
import repair from "../../assets/images/icons/repair.svg";
import exchange from "../../assets/images/Products/iphone.png";
import recycle from "../../assets/QuickSellNewIcons/recycle.png";
import iphone from "../../assets/images/Products/iphone.png";
import laptop from "../../assets1/images/Products/laptop.png";

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
