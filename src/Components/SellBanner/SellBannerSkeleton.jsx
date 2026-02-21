import React from "react";
import styles from "./SellBannerSkeleton.module.css";

const SellBannerSkeleton = () => {
  return (
    <section className="default-padding-section sell-banner-only zero-padding-section">
      <div className="common-container wrapper">
        <div className={styles.skeletonFlex}>
          <div className={styles.leftSkeleton}></div>
          <div className={styles.rightSkeleton}>
             <div className={styles.brandSkeletonGroup}>
              <div className={styles.brandSkeleton}></div>
              <div className={styles.brandSkeleton}></div>
              <div className={styles.brandSkeleton}></div>
              <div className={styles.brandSkeleton}></div>
            </div>
            <div className={styles.textSkeleton}></div>
            <div className={styles.sliderSkeleton}></div>
            <div className={styles.searchSkeleton}></div>
            <div className={styles.brandSkeletonGroup}>
              <div className={styles.brandSkeleton}></div>
              <div className={styles.brandSkeleton}></div>
              <div className={styles.brandSkeleton}></div>
              <div className={styles.brandSkeleton}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellBannerSkeleton;
