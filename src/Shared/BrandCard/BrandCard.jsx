// BrandCard.js
import React from "react";
import styles from "./BrandCard.module.css"; // or use a separate module if preferred

const BrandCard = ({ brand, onClick }) => {
  return (
    <div
      className={`${styles.brandSingleBox} cursor-pointer`}
      onClick={() => onClick(brand._id)}
    >
      <div className={styles.imgIndividual}>
        <img src={brand?.brandLogo} alt={brand?.brandName} title={brand?.brandName} />
      </div>
      <span>{brand?.brandName}</span>
    </div>
  );
};

export default BrandCard;
