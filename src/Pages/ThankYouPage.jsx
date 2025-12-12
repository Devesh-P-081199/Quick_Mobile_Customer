import React, { useEffect, useState, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ThankYou.module.css";
import orderStyles from "../features/profile/components/MyOrder/Order.module.css"; // Reuse OrderDetails styles
import { RiBattery2ChargeLine } from "react-icons/ri";
import { BsPersonVcard } from "react-icons/bs";
import { PiBankBold } from "react-icons/pi";
import { FaHeadphones, FaPlus, FaTimes } from "react-icons/fa";
import completeImg from "../assets/flaticons/approved.png";
import batteryImg from "../assets/flaticons/battery-with-a-bolt-symbol.png";
import playImg from "../assets/flaticons/play.png";
import documentImg from "../assets/flaticons/document.png";
import bankImg from "../assets/flaticons/bank-account.png";
import tyimg from "../assets/QuickSellNewIcons/ty-mobile.png";
import secureShield from "../assets/flaticons/secure-basecolor.png";
import MobileCommonHeaderthree from "../components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import { toast } from "react-toastify";
import { UserContext } from "../Context/contextAPI";
import api from "../Utils/api";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData;
  const orderId = orderData?.order?.orderId || orderData?.orderId || orderData?.id || orderData?._id;
  const fileInputRef = useRef(null);

  const { selectedPaymentMethod, setSelectedPaymentMethod } = useContext(UserContext);

  const [imei, setImei] = useState("");
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Payment State (Duplicated from OrderDetails)
  const [hasSavedPayments, setHasSavedPayments] = useState(false);
  const [currentOrderPayment, setCurrentOrderPayment] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch Saved Payments (Duplicated from OrderDetails)
  useEffect(() => {
    const checkSavedPayments = async () => {
      try {
        const [upiResp, bankResp] = await Promise.all([
          api.get("/sell-module/user/payment-upi"),
          api.get("/sell-module/user/payment-bank")
        ]);
        const hasUpi = upiResp?.data?.upiMethods?.length > 0;
        const hasBank = bankResp?.data?.bankMethods?.length > 0;
        setHasSavedPayments(hasUpi || hasBank);
      } catch (error) {
        console.error("Error checking saved payments", error);
      }
    };
    checkSavedPayments();
  }, []);

  // Initialize display payment from order data
  useEffect(() => {
    // Logic to find initial payment detail from various possible order structure locations
    if (orderData?.order?.paymentDetail || orderData?.paymentDetail) {
      setCurrentOrderPayment(orderData?.order?.paymentDetail || orderData?.paymentDetail);
    }
  }, [orderData]);

  const displayPayment = selectedPaymentMethod || currentOrderPayment;

  // handleUpdatePayment (Duplicated logic from OrderDetails)
  const handleUpdatePayment = async () => {
    if (!selectedPaymentMethod) {
      // Only warn if called manually, but auto-trigger checks existence
      return;
    }

    // Safety check: Don't update if it's the exact same payment to prevent loops
    if (currentOrderPayment && (selectedPaymentMethod._id === currentOrderPayment._id || selectedPaymentMethod.id === currentOrderPayment.id)) {
      return;
    }

    try {
      const payload = {
        order_id: orderData?.order?._id || orderData?._id, // Need actual mongo ID
        payment_id: selectedPaymentMethod._id || selectedPaymentMethod.id,
        paymentMethod: selectedPaymentMethod.type // 'upi' or 'bank'
      };

      await api.patch("/sell-module/user/orders", payload);
      toast.success("Payment method updated successfully");

      // Update local state to reflect change
      setCurrentOrderPayment(selectedPaymentMethod);
      setSelectedPaymentMethod(null); // Clear context after update like in OrderDetails
    } catch (error) {
      console.error("Error updating payment:", error);
      toast.error("Failed to update payment method");
    }
  };

  // Auto-trigger payment update (Duplicated from OrderDetails)
  useEffect(() => {
    if (selectedPaymentMethod) {
      handleUpdatePayment();
    }
  }, [selectedPaymentMethod]);


  // handleChangePayment (Duplicated from OrderDetails, adapted for navigation)
  const handleChangePayment = () => {
    // Pre-fill context with current order payment if available
    if (currentOrderPayment) {
      setSelectedPaymentMethod(currentOrderPayment);
    }

    const hasPayment = displayPayment || hasSavedPayments;

    if (hasPayment) {
      navigate(`/user/payment`, {
        state: {
          returnPath: location.pathname,
          orderData: orderData // Pass orderData to preserve state
        }
      });
    } else {
      navigate(`/user/payment/add-payment`, {
        state: {
          returnPath: location.pathname,
          orderData: orderData // Pass orderData to preserve state
        }
      });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 2) {
      toast.error("You can upload a maximum of 2 images");
      return;
    }

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setImages(prev => [...prev, ...newImages]);
    e.target.value = null; // Reset input
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!imei && images.length === 0) {
      toast.error("Please provide either IMEI or upload an image");
      return;
    }
    console.log("Submitting:", { imei, images });
    setSubmitted(true);
    toast.success("Details submitted successfully!");
  };

  return (
    <>
      <MobileCommonHeaderthree title="Order Confirmation" onBack={() => navigate('/')} />
      <div className="page-content-wrapper">
        <div className={styles.container}>
          {/* Success Icon */}
          <div className={styles.thankBox}>
            <div className={styles.iconBox}>
              <img src={completeImg} alt="completeImg" />
            </div>

            {/* Heading */}
            <h2 className={styles.title}>
              Thank you for selling your phone on Quick Mobile
            </h2>

            {orderId && (
              <div className={styles.orderIdBox}>
                <p>Order ID: {orderId}</p>
              </div>
            )}

            <p className={styles.subtitle}>
              We are excited to give your phone a second life!
            </p>
            <p className={styles.desc}>
              Your device details have been received successfully. Our pickup partner
              will connect you shortly for the further process.
            </p>

          </div>

          {/* Info Grid */}
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <img src={batteryImg} alt="batteryImg" />
              </div>
              <div>
                <h4>Charge Your Device</h4>
                <p>
                  Keep your phone 60% charged to avoid delay in check-in process
                </p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <img src={playImg} alt="playImg" />
              </div>
              <div>
                <h4>Accessories</h4>
                <p>
                  Keep all the accessories handy which were selected at the time
                  of selling
                </p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <img src={documentImg} alt="documentImg" />
              </div>
              <div>
                <h4>Documents</h4>
                <p>
                  Keep your valid government ID proof (Aadhar Card) ready
                </p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <img src={bankImg} alt="bankImg" />
              </div>
              <div>
                <h4>Payment Details</h4>
                <p>
                  Bank account or UPI details should match the seller’s government
                  ID
                </p>
              </div>
            </div>
          </div>


          {/* Payment Summary Card (Duplicated from OrderDetails) */}
          <div className={orderStyles.summaryCard}>
            <div className={orderStyles.summaryHeader}>
              <div className={orderStyles.summaryHeaderLeft}>
                <span className={orderStyles.summaryLabel}>Payment Method</span>
              </div>
              <button
                className={orderStyles.changeBtn}
                onClick={handleChangePayment}
              >
                {displayPayment ? "Change" : (hasSavedPayments ? "Select" : "Add")}
              </button>
            </div>
            {displayPayment ? (
              <div className={orderStyles.summaryContent}>
                {displayPayment.type === "upi" ? (
                  <>
                    <span className={orderStyles.paymentType}>UPI Payment</span>
                    <p className={orderStyles.paymentText}>
                      UPI ID:{" "}
                      <span className={orderStyles.paymentValue}>
                        {displayPayment?.upiId}
                      </span>
                    </p>
                  </>
                ) : displayPayment.type === "bank" ? (
                  <>
                    <span className={orderStyles.paymentType}>
                      Bank Transfer (IMPS)
                    </span>
                    <p className={orderStyles.paymentText}>
                      Account:{" "}
                      <span className={orderStyles.paymentValue}>
                        {displayPayment?.bankDetails?.accountNumber}
                      </span>
                    </p>
                    <p className={orderStyles.paymentText}>
                      IFSC:{" "}
                      <span className={orderStyles.paymentValue}>
                        {displayPayment?.bankDetails?.ifscCode}
                      </span>
                    </p>
                    <p className={orderStyles.paymentText}>
                      Bank:{" "}
                      <span className={orderStyles.paymentValue}>
                        {displayPayment?.bankDetails?.bankName}
                      </span>
                    </p>
                  </>
                ) : null}
              </div>
            ) : (
              <p className={orderStyles.notSelected}>
                No payment method selected, please select a payment method for smooth transaction.
              </p>
            )}
          </div>

          {/* Additional Details Form */}
          {!submitted && (
            <div className={styles.detailsForm}>
              <h3 className={styles.formTitle}>Additional Details (Optional)</h3>

              <div className={styles.inputGroup}>
                <label>IMEI Number</label>
                <input
                  type="text"
                  placeholder="Enter IMEI Number"
                  value={imei}
                  onChange={(e) => setImei(e.target.value)}
                  className={styles.inputField}
                />
              </div>

              <div className={styles.uploadGroup}>
                <label>Device Images (Max 2)</label>
                <div className={styles.uploadContainer}>
                  {images.map((img, index) => (
                    <div key={index} className={styles.imagePreview}>
                      <img src={img.preview} alt={`preview-${index}`} />
                      <button className={styles.removeBtn} onClick={() => removeImage(index)}>
                        <FaTimes />
                      </button>
                    </div>
                  ))}

                  {images.length < 2 && (
                    <div className={styles.uploadBtn} onClick={() => fileInputRef.current.click()}>
                      <FaPlus />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        hidden
                        accept="image/*"
                      />
                    </div>
                  )}
                </div>
              </div>

              <button
                className={`${styles.submitBtn} ${(imei || images.length > 0) ? '' : styles.disabled}`}
                onClick={handleSubmit}
                disabled={!imei && images.length === 0}
              >
                Submit Details
              </button>
            </div>
          )}

          {/* Buttons */}
          <div className={styles.btnBox}>
            <button
              className={styles.homeBtn}
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              className={styles.orderBtn}
              onClick={() => {
                if (orderId) {
                  navigate(`/profile/order-details/${orderId}`);
                } else {
                  navigate('/my-profile-orders');
                }
              }}
            >
              View My Order
            </button>
          </div>
        </div>
      </div >
    </>
  );
};

export default ThankYouPage;
