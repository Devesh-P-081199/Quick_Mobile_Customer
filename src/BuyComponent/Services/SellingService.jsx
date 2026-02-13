import React from "react";
import styles from "./SellingService.module.css";
import phone from "../../assets/phone_1.png";
import laptop from "../../assets/laptop.png";
import tablet from "../../assets/tablet.png";
import iphone from "../../assets/iphone.png";
import gaming from "../../assets/gaming.png";
import desktop from "../../assets/desktop.png";
import speaker from "../../assets/speaker.png";

const SellingService = () => {
  const sellingServices = [
    { label: "Sell Phone", img: phone },
    { label: "Sell Laptop", img: laptop },
    { label: "Sell Tablet", img: tablet },
    { label: "Sell Smartwatch", img: iphone },
    { label: "Sell Earbuds", img: laptop },
    { label: "Sell Gaming Console", img: gaming },
    { label: "Sell Desktop", img: desktop },
    { label: "Sell Speaker", img: speaker },
  ];

  const Card = ({ label, img }) => (
    <div className={styles.cardContainer}>
      <div className={styles.cardImageWrapper}>
        <img src={img} alt={label} className={styles.cardImage} />
      </div>
      <p className={styles.cardLabel}>{label}</p>
    </div>
  );

  return (
    <div>
    <section>
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Selling Services</h2>
      <div className={styles.mobileGrid}>
        {sellingServices.slice(0, 5).map((item, idx) => (
          <Card key={idx} label={item.label} img={item.img} />
        ))}
        <div className={styles.cardContainer}>
          <div className={styles.cardImageWrapper}>
            <span className={styles.moreIcon}>...</span>
          </div>
          <p className={styles.cardLabel}>More</p>
        </div>
      </div>
      <div className={styles.desktopGrid}>
        {sellingServices.map((item, idx) => (
          <Card key={idx} label={item.label} img={item.img} />
        ))}
      </div>
    </div>
    </section>
    </div>
  );
};

export default SellingService;