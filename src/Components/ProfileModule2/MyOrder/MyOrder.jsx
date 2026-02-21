import React from "react";
import styles from "./MyOrder.module.css";
import OrderCard from "./Order";
import ProfileCard from "../ProfileCard";

const MyOrder = () => {
  return (
    <section>
      <div className={styles.panelWrapper}>
        {/* <h1>Hello</h1> */}
        {/* Header */}
        <div className={styles.left}>
        <div className={styles.header}>
          <h2 className={styles.title}>My Orders</h2>
          <div className={styles.filterButtons}>
            {["All Orders", "Buy", "Sell", "Repair"].map((label) => (
              <div
                key={label}
                className={`${styles.filterBtn} ${
                  label === "Sell" ? styles.activeBtn : ""
                }`}
              >
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders List (placeholder) */}
        <div className={styles.ordersList}>
          {/* You can map your orders here later */}
          <OrderCard />
        </div>
        </div>
       <div className={styles.right}>
        <ProfileCard/>
       </div>
      </div>
    </section>
  );
};

export default MyOrder;
