import React, { useEffect, useState } from 'react';
import styles from './Order.module.css';
import phoneImg from '../../../assets/images/Products/mobile.png'; // Update with actual image path
import api from '../../../Utils/api';

const OrderCard = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const resp = await api.get('sell-module/user/order-by-Id');
      setOrders(resp.data);
      //console.log("ALL orders of user",resp.data)
    } catch (error) {
      // console.log("Error in fetching orders");

    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className={styles.container}>
      {orders?.map((ord, ind) => (
        <div key={ord._id}>
          <div className={styles.card}>
            <div className={styles.cardBody}>
              <img src={ord?.deviceEvaluationId?.devicePic || phoneImg} alt="Device" className={styles.deviceImage} />

              <div className={styles.infoBlock}>
                <div className={styles.title}>
                  {ord?.deviceEvaluationId?.deviceName || 'Unknown Device'}
                </div>
                <div className={styles.variant}>
                  {ord?.deviceEvaluationId?.deviceVariant || 'Variant N/A'}
                </div>
                <div className={styles.priceRow}>
                  <span className={styles.price}>
                    ₹{ord?.deviceEvaluationId?.finalPrice?.toLocaleString() || '0.00'}
                  </span>
                </div>
                <div className={styles.imei}>
                  Order ID: {ord._id}
                </div>
                <div className={styles.pickup}>
                  Expected pickup by - {new Date(ord.createdAt).toDateString()} • Free
                </div>
              </div>
            </div>

            <div className={styles.actionRow}>
              <button className={styles.blackButton}>Cancel</button>
              <button className={styles.greenButton}>
                Help? <span className={styles.chatIcon}>💬</span>
              </button>
            </div>
          </div>

          <span className={styles.viewMore}>View more</span>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
