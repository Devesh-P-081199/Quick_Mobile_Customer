import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Order.module.css";
import phoneImg from "../../../../assets/images/Products/mobile.png";
import api from "../../../../Utils/api";
import uparrow from "../../../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";

const OrderCard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const resp = await api.get("sell-module/user/order-by-Id");
      setOrders(resp.data || []);
    } catch (error) {
      console.error("Error in fetching orders", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleCardClick = (order) => {
    navigate(`/profile/order-details/${order._id}`);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "#34a853"; // Green
      case "rejected":
      case "cancelled":
        return "#ea4335"; // Red
      default:
        return "#fbbc05"; // Yellow
    }
  };

  return (
    <>
      <div className={styles.orderContainer}>
        {orders?.map((ord) => (
          <div
            key={ord._id}
            className={styles.card}
            onClick={() => handleCardClick(ord)}
            style={{ cursor: "pointer" }}
          >
            {/* Card top section */}
            <div className={styles.cardBody}>
              <img
                src={ord?.deviceEvaluationId?.devicePic || phoneImg}
                alt={ord?.deviceEvaluationId?.deviceName || "Device"}
                className={styles.deviceImage}
              />

              <div
                className={styles.infoBlock}
                style={{ "--status-color": getStatusColor(ord.orderStatus) }}
              >
                <div className={styles.title}>
                  {ord?.deviceEvaluationId?.deviceName || "Unknown Device"}
                  {ord?.deviceEvaluationId?.deviceVariant
                    ? ` (${ord.deviceEvaluationId.deviceVariant})`
                    : ""}
                </div>

                <div className={styles.details}>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>
                      ₹
                      {ord?.deviceEvaluationId?.finalPrice?.toLocaleString() ||
                        "0.00"}
                    </span>
                  </div>
                  <div className={styles.imei}>
                    Order ID : {ord.orderId}
                  </div>
                  <div className={styles.pickup}>
                    Expected pickup by :{" "}
                    {new Date(ord.createdAt).toLocaleDateString("en-GB")}
                  </div>
                </div>
              </div>

              <div className={styles.chevron}>
                <img
                  src={uparrow}
                  alt="Arrow"
                  style={{ width: "15px", height: "15px" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderCard;
