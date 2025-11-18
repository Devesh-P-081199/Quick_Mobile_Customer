import React from "react";
import styles from "./TopSellingProduct.module.css";
import starIcon from "../../assets/icons/star.png"; // Replace with actual star icon path
import productImage from "../../assets/images/Products/mobile.png";

const TopSellingProducts = () => {
  return (
    <section>
      <div className="wrapper">
        <div className={styles.card}>
          <div className={styles.badge}>
            <span>On Sale</span>
          </div>

          <div className={styles.imageSection}>
            <img
              src={productImage}
              alt="iPhone 16 Pro Max"
              title="iphone 16 Pro Max"
              className={styles.productImage}
            />
          </div>

          <div className={styles.details}>
            <div className={styles.title}>iPhone 16 - Unlocked</div>
            <div className={styles.subtitle}>64 GB - Black</div>

            <div className={styles.ratingRow}>
              <div className={styles.stars}>
                {[...Array(4)].map((_, i) => (
                  <img
                    key={i}
                    src={starIcon}
                    alt="star"
                    title="star"
                    className={styles.starIcon}
                  />
                ))}
              </div>
              <span className={styles.reviewText}>4.2 (2,456)</span>
            </div>

            <div className={styles.priceRow}>
              <div className={styles.priceInfo}>
                <span className={styles.priceLabel}>Starting at</span>
                <span className={styles.priceValue}>₹ 39,999</span>
              </div>
              <span className={styles.oldPrice}>₹ 39,999</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellingProducts;
