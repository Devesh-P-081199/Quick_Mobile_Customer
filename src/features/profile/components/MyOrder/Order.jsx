import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import phoneImg from "../../../../assets/images/Products/mobile.png";
import api from "../../../../Utils/api";
import { MdCall, MdClose } from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";

const OrderCard = () => {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

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

  const toggleExpand = (order) => {
    if (isMobile) {
      setCurrentOrder(order);
      setModalOpen(true);
    } else {
      setExpandedOrderId(expandedOrderId === order._id ? null : order._id);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentOrder(null);
  };

  const renderExpandedContent = (ord) => (
    <div className={styles.details}>
      {/* Partner info */}
      <div className={styles.partnerBox}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="partner"
          className={styles.partnerImg}
        />
        <div>
          <div className={styles.partnerName}>Partner name</div>
          <div className={styles.rating}>⭐ 4.2</div>
        </div>
        <div className={styles.partnerIcons}>
          <MdCall size={35} />
          <IoMdChatboxes size={35} />
        </div>
      </div>

      {/* Timeline */}
      <div className={styles.timelineWrapper}>
        {[
          { label: "Order Placed", date: "07 Jan 2025", active: true },
          { label: "Partner Assigned", date: "09 Jan 2025", active: true },
          { label: "Out for pickup", date: "10 Jan 2025" },
          { label: "Re-Scheduled", date: "11 Jan 2025" },
          { label: "Completed", date: "12 Jan 2025" },
        ].map((step, idx) => (
          <div
            key={idx}
            className={`${styles.step} ${step.active ? styles.active : ""}`}
          >
            <div className={styles.circle}></div>
            <span>{step.label}</span>
            <small>{step.date}</small>
          </div>
        ))}
      </div>

      {/* Condition buttons */}
      <div className={styles.conditionBtns}>
        <button
          className={
            selected === "user" ? styles.blackButton : styles.greyButton
          }
          onClick={() => setSelected("user")}
        >
          Condition selected
        </button>
        <button
          className={
            selected === "partner" ? styles.blackButton : styles.greyButton
          }
          onClick={() => setSelected("partner")}
        >
          Condition by partner
        </button>
      </div>

      {/* Q&A */}
      <div className={styles.qaSection}>
        <h4>Functionality</h4>
        <p>
          1. Is device on? <span className={styles.answer}>Yes</span>
        </p>
        <p>
          2. Touch working? <span className={styles.answer}>Yes</span>
        </p>
        <p>
          3. Calls working? <span className={styles.answer}>Yes</span>
        </p>
        <p>
          4. Under warranty? <span className={styles.answer}>Yes</span>
        </p>

        <h4>Condition</h4>
        <p>5. Front Camera not working</p>

        <h4>Display</h4>
        <p>
          6. Spots? <span className={styles.answer}>No</span>
        </p>
        <p>
          7. Lines? <span className={styles.answer}>No</span>
        </p>
        <p>
          8. Scratches? <span className={styles.answer}>No</span>
        </p>
        <p>
          9. Dents? <span className={styles.answer}>No</span>
        </p>

        <h4>Warranty</h4>
        <p>
          10. Warranty? <span className={styles.answer}>3-6 Months</span>
        </p>

        <h4>Accessories</h4>
        <p>
          11. Original Charger? <span className={styles.answer}>Yes</span>
        </p>
      </div>

      {/* Footer */}
      <div className={styles.footerBtns}>
        <button className={styles.denyBtn}>Deny</button>
        <button className={styles.approveBtn}>Approve</button>
      </div>
      <div className={styles.requote}>Requote</div>
    </div>
  );

  return (
    <>
      <div className={styles.container}>
        {orders?.map((ord) => (
          <div key={ord._id} className={styles.card}>
            {/* Card top section */}
            <div className={styles.cardBody}>
              <img
                src={ord?.deviceEvaluationId?.devicePic || phoneImg}
                alt={ord?.deviceEvaluationId?.deviceName || "Device"}
                className={styles.deviceImage}
              />

              <div className={styles.infoBlock}>
                <div className={styles.title}>
                  {ord?.deviceEvaluationId?.deviceName || "Unknown Device"}
                  {ord?.deviceEvaluationId?.deviceVariant
                    ? ` (${ord.deviceEvaluationId.deviceVariant})`
                    : ""}
                </div>

                <div className={styles.priceRow}>
                  <span className={styles.price}>
                    ₹
                    {ord?.deviceEvaluationId?.finalPrice?.toLocaleString() ||
                      "0.00"}
                  </span>
                </div>
                <div className={styles.imei}>Order ID: {ord._id}</div>
                <div className={styles.pickup}>
                  Expected pickup by -{" "}
                  {new Date(ord.createdAt).toLocaleDateString("en-GB")} • Free
                </div>
              </div>

              {/* Action buttons */}
              {/* <div className={styles.actionRow}>
                <button className={styles.blackButton}>Cancel</button>
                <button className={styles.greenButton}>
                  Help <IoMdChatboxes size={18} />
                </button>
              </div> */}
            </div>

            {/* View more toggle */}
            <div className={styles.viewMoreContainer}>
              <span
                className={styles.viewMore}
                onClick={() => toggleExpand(ord)}
              >
                {!isMobile && expandedOrderId === ord._id
                  ? "Hide"
                  : "View more"}
              </span>
            </div>

            {/* Expanded section for desktop */}
            {!isMobile &&
              expandedOrderId === ord._id &&
              renderExpandedContent(ord)}
          </div>
        ))}
      </div>

      {/* Modal for mobile */}
      {modalOpen && currentOrder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Order Details</h3>
              <button className={styles.closeButton} onClick={closeModal}>
                <MdClose size={24} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Device info header in modal */}
              <div className={styles.modalDeviceInfo}>
                <img
                  src={currentOrder?.deviceEvaluationId?.devicePic || phoneImg}
                  alt={currentOrder?.deviceEvaluationId?.deviceName || "Device"}
                  className={styles.modalDeviceImage}
                />
                <div>
                  <div className={styles.modalDeviceTitle}>
                    {currentOrder?.deviceEvaluationId?.deviceName ||
                      "Unknown Device"}
                    {currentOrder?.deviceEvaluationId?.deviceVariant
                      ? ` (${currentOrder.deviceEvaluationId.deviceVariant})`
                      : ""}
                  </div>
                  <div className={styles.modalDevicePrice}>
                    ₹
                    {currentOrder?.deviceEvaluationId?.finalPrice?.toLocaleString() ||
                      "0.00"}
                  </div>
                  <div className={styles.modalOrderId}>
                    Order ID: {currentOrder._id}
                  </div>
                </div>
              </div>

              {renderExpandedContent(currentOrder)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCard;
