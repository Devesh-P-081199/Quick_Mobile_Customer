import { useState, useEffect } from "react";
import styles from "./MyOrder.module.css";
import OrderCard from "./Order";
import no_order_found from "../../../../assets/QuickSellNewIcons/notfound/no_order_found.png";
import api from "../../../../Utils/api";

const ORDER_TABS = ["All Orders", "Buy", "Sell", "Repair"];

const MyOrder = () => {
  const [activeTab, setActiveTab] = useState("Sell");
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Currently using single endpoint for all orders
        const resp = await api.get("sell-module/user/order-by-Id");
        setAllOrders(resp.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setAllOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // TODO: When separate API endpoints are available, use this approach:
  /*
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        let resp;
        switch (activeTab) {
          case "Buy":
            resp = await api.get("buy-module/user/orders");
            break;
          case "Sell":
            resp = await api.get("sell-module/user/order-by-Id");
            break;
          case "Repair":
            resp = await api.get("repair-module/user/orders");
            break;
          case "All Orders":
            // Fetch from all three endpoints and combine
            const [buyResp, sellResp, repairResp] = await Promise.all([
              api.get("buy-module/user/orders"),
              api.get("sell-module/user/order-by-Id"),
              api.get("repair-module/user/orders"),
            ]);
            setAllOrders([
              ...(buyResp.data || []),
              ...(sellResp.data || []),
              ...(repairResp.data || []),
            ]);
            setLoading(false);
            return;
          default:
            resp = { data: [] };
        }
        setAllOrders(resp.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setAllOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [activeTab]);
  */

  // Get orders to display based on active tab
  const getDisplayedOrders = () => {
    if (loading) return [];

    // TODO: Currently all data is from Sell API only
    // Show in both "Sell" and "All Orders" tabs
    // Buy and Repair show empty until their APIs are available

    if (activeTab === "All Orders" || activeTab === "Sell") {
      return allOrders;
    }

    // For Buy and Repair, show empty for now (no data available)
    if (activeTab === "Buy" || activeTab === "Repair") {
      return [];
    }

    /* TODO: Uncomment when orderType field is available in API response
    // Filter by orderType field (expected values: "Buy", "Sell", "Repair")
    if (activeTab === "All Orders") {
      return allOrders;
    }
    
    return allOrders.filter(
      (order) => order.orderType?.toLowerCase() === activeTab.toLowerCase()
    );
    */

    return allOrders;
  };

  const displayedOrders = getDisplayedOrders();

  return (
    <>
      {/* Orders content */}
      <div className={styles.ordersSection}>
        <div className={styles.header}>
          <div className={styles.filterButtons}>
            {ORDER_TABS.map((label) => (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`${styles.filterBtn} ${activeTab === label ? styles.activeBtn : ""
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className={`${styles.ordersList}`}>
          {loading ? (
            <div className={styles.emptyState}>
              <p>Loading orders...</p>
            </div>
          ) : displayedOrders.length > 0 ? (
            <OrderCard orders={displayedOrders} />
          ) : (
            <div className={styles.emptyState}>
              <img src={no_order_found} alt="No Orders" title="No Orders" />
              <h3>You Haven't Placed Any Orders Yet!</h3>
              <p>Start exploring and place your first order.</p>
              <button className={styles.shopBtn}>Go to Shop</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrder;
