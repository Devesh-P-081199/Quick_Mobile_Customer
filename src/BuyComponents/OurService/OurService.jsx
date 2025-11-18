import React from "react";
import styles from "./OurServices.module.css";

import sellPhone from "../../assets/icons/frame 35.svg";
import sellLaptop from "../../assets/icons/frame 35 (1).svg";
import buyPhones from "../../assets/icons/frame 35 (2).svg";
import buyLaptops from "../../assets/icons/frame 35 (3).svg";
import repairPhones from "../../assets/icons/frame 35 (4).svg";
import repairLaptops from "../../assets/icons/frame 35 (5).svg";

const serviceData = [
  { title: "service1", img: sellPhone, text: "Sell Phone" },
  { title: "service2", img: sellLaptop, text: "Sell Laptop" },
  { title: "service3", img: buyPhones, text: "Buy Phones" },
  { title: "service4", img: buyLaptops, text: "Buy Laptops" },
  { title: "service5", img: repairPhones, text: "Repair Phones" },
  { title: "service6", img: repairLaptops, text: "Repair Laptops" },
];

const OurService = () => {
  return (
    <section className="homepage-section">
      <div className={styles.heading}>Our Services</div>

      <div className={styles.cardContainer}>
        {serviceData.map((data, index) => (
          <div key={index} className={styles.card}>
            <img src={data.img} alt={data.title} />
            <div>
              <p className={styles.cardText}>{data.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurService;
