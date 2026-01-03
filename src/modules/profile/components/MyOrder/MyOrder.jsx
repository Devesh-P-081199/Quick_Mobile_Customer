import { useState } from "react";
import styles from "./MyOrder.module.css";
import OrderCard from "./Order";
import ProfileCard from "../ProfileCard";
import MobileCommonHeaderthree from "../../../common/components/layout/MobileCommonHeader/MobileCommonHeaderthree";

const ORDER_TABS = ["All Orders", "Buy", "Sell", "Repair"];

const MyOrder = () => {
  const [activeTab, setActiveTab] = useState("Sell");

  const orders = {
    Buy: [],
    Sell: [{ id: 1, name: "iPhone 13", status: "Completed" }],
    Repair: [],
  };

  const getDisplayedOrders = () => {
    if (activeTab === "All Orders") {
      return [...orders.Buy, ...orders.Sell, ...orders.Repair];
    }
    return orders[activeTab] || [];
  };

  const displayedOrders = getDisplayedOrders();

  return (
    <>
      <MobileCommonHeaderthree title="My Orders" />
      <section className="zero-padding-section">
        <div className={styles.panelWrapper}>
          {/* Profile sidebar */}
          <div className={styles.profileSection}>
            <ProfileCard />
          </div>

          {/* Orders content */}
          <div className={styles.ordersSection}>
            <div className={styles.header}>
              <div className={styles.filterButtons}>
                {ORDER_TABS.map((label) => (
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

            <div className={`${styles.ordersList} profile-content-scroll`}>
              {displayedOrders.length > 0 ? (
                displayedOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <h3>You Haven't Placed Any Orders Yet!</h3>
                  <p>Start exploring and place your first order.</p>
                  <button className={styles.shopBtn}>Go to Shop</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyOrder;
