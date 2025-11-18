import React, { useState } from "react";
import styles from "./MyOrder.module.css";
import OrderCard from "./Order";
import ProfileCard from "../ProfileCard";
import MobileCommonHeaderthree from "../../../../Components/layout/MobileCommonHeader/MobileCommonHeaderthree";

const MyOrder = () => {
  const [activeTab, setActiveTab] = useState("Sell");

  const orders = {
    Buy: [],
    Sell: [{ id: 1, name: "iPhone 13", status: "Completed" }],
    Repair: [],
  };

  return (
    <>
      <MobileCommonHeaderthree title="My Orders" />
      <section className="zero-padding-section">
        <div className={styles.panelWrapper}>
          {/* Left side */}
          <div className={styles.left}>
            <div className={styles.header}>
              <div className={styles.filterButtons}>
                {["All Orders", "Buy", "Sell", "Repair"].map((label) => (
                  <button
                    key={label}
                    onClick={() => setActiveTab(label)}
                    className={`${styles.filterBtn} ${
                      activeTab === label ? styles.activeBtn : ""
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders or Empty State */}
            <div className={styles.ordersList}>
              {orders[activeTab]?.length > 0 ? (
                orders[activeTab].map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <h3>You Haven’t Placed Any Orders Yet!</h3>
                  <p>Start exploring and place your first order.</p>
                  <button className={styles.shopBtn}>Go to Shop</button>
                </div>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className={styles.right}>
            <ProfileCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default MyOrder;
