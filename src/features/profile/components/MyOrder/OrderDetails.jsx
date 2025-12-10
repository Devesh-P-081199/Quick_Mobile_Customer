import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../../../../Utils/api";
import MobileCommonHeaderthree from "../../../../components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import styles from "./Order.module.css";
import { UserContext } from "../../../../Context/contextAPI";
import { toast } from "react-toastify";
import secureShield from "../../../../assets/flaticons/secure-basecolor.png";
import phoneImg from "../../../../assets/images/Products/mobile.png";
import { MdCall, MdClose } from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";
import account from "../../../../assets/flaticons/account.png";
import downloadIcon from "../../../../assets/flaticons/download.png";
import submitIcon from "../../../../assets/flaticons/upload.png";

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [selected, setSelected] = useState("user");
    const [rating, setRating] = useState(0);
    const [reviewMessage, setReviewMessage] = useState("");

    const defaultTransaction = {
        transactionId: "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase(), // Approx 16 chars
        status: "Completed",
        date: new Date().toLocaleString()
    };

    const handleReviewSubmit = () => {
        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }
        toast.success(`Review submitted with ${rating} stars and message: ${reviewMessage}`);
    };

    const handleDownloadInvoice = () => {
        toast.info("Downloading invoice...");
        // Placeholder for actual download logic
    };

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const resp = await api.get("sell-module/user/order-by-Id");
                if (resp.data) {
                    const foundOrder = resp.data.find((o) => o._id === orderId);
                    // Mock priceDifference for testing
                    if (foundOrder) {
                        foundOrder.priceDifference = {
                            old: 10000,
                            new: 9000
                        };
                    }
                    setOrder(foundOrder);
                }
            } catch (error) {
                console.error("Error fetching order details", error);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    const getRatingColor = (rating) => {
        if (rating > 3.5) return "#34a853"; // Green
        if (rating >= 2) return "#fbbc05"; // Yellow
        return "#ea4335"; // Red
    };

    const { selectedPaymentMethod, setSelectedPaymentMethod } = useContext(UserContext);
    const location = useLocation();

    // Sync order payment to context on load if needed, or use local derived state
    const displayPayment = selectedPaymentMethod || order?.paymentDetail;

    const handleChangePayment = () => {
        // Pre-fill context with current order payment if available so it shows as selected in the list
        if (order?.paymentDetail) {
            setSelectedPaymentMethod(order.paymentDetail);
        }
        // Navigate to payment page with return path
        // Using "user" as generic slug since this is a profile page
        navigate(`/user/payment`, {
            state: { returnPath: location.pathname }
        });
    };

    const handleUpdatePayment = async () => {
        if (!selectedPaymentMethod) {
            toast.error("Please select a new payment method first");
            return;
        }

        try {
            setLoading(true);
            const payload = {
                order_id: order._id,
                payment_id: selectedPaymentMethod._id || selectedPaymentMethod.id,
                paymentMethod: selectedPaymentMethod.type // 'upi' or 'bank'
            };

            // Assuming PATCH endpoint for updating order payment
            await api.patch("/sell-module/user/orders", payload);
            toast.success("Payment method updated successfully");

            // Refresh order details to show new state (and clear context?)
            // setOrder(prev => ({ ...prev, paymentDetail: selectedPaymentMethod }));
            // Or re-fetch:
            // window.location.reload(); // Simple but effective, or trigger refetch
            // Better: update local state
            setOrder(prev => ({ ...prev, paymentDetail: selectedPaymentMethod }));
            setSelectedPaymentMethod(null); // Clear context after update
        } catch (error) {
            console.error("Error updating payment:", error);
            toast.error("Failed to update payment method");
        } finally {
            setLoading(false);
        }
    };

    // Auto-trigger payment update when selectedPaymentMethod changes and differs from current order payment
    useEffect(() => {
        if (selectedPaymentMethod && order && selectedPaymentMethod._id !== order.paymentDetail?._id) {
            handleUpdatePayment();
        }
    }, [selectedPaymentMethod]);

    if (loading) return <div className="p-4">Loading...</div>;
    if (!order) return <div className="p-4">Order not found</div>;

    return (
        <>
            <MobileCommonHeaderthree title="Order Details" />
            <div className={styles.container}>

                {/* Device Info Header */}
                <div className={styles.modalDeviceInfo}>
                    <img
                        src={order?.deviceEvaluationId?.devicePic || phoneImg}
                        alt={order?.deviceEvaluationId?.deviceName || "Device"}
                        className={styles.modalDeviceImage}
                    />
                    <div>
                        <div className={styles.modalDeviceTitle}>
                            {order?.deviceEvaluationId?.deviceName || "Unknown Device"}
                            {order?.deviceEvaluationId?.deviceVariant
                                ? ` (${order.deviceEvaluationId.deviceVariant})`
                                : ""}
                        </div>
                        <div className={styles.modalOrderId}>
                            Order ID: {order._id}
                        </div>
                        <div className={styles.modalDevicePrice}>
                            ₹
                            {order?.deviceEvaluationId?.finalPrice?.toLocaleString() || "0.00"}
                        </div>
                    </div>
                </div>

                {/* Details Content */}
                <div className={styles.details} style={{ border: 'none', padding: 0 }}>
                    {/* Partner info */}
                    <div className={styles.partnerBox}>
                        <div style={{ position: 'relative' }}>
                            <img src={account} alt="" className={styles.account} />
                            <div className={styles.rating} style={{ backgroundColor: getRatingColor(3.7), color: "#fff" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                                    <path d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z" />
                                </svg> 3.7
                            </div>
                        </div>
                        <div>
                            <div className={styles.partnerName}>Partner name</div>
                            <div className={styles.partnerAchivement}>200+ orders completed</div>
                        </div>
                        <div className={styles.partnerIcons}>
                            <MdCall size={40} />
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className={styles.timelineWrapper}>
                        {[
                            { label: "Order Placed", date: "07 Jan 2025", active: true },
                            { label: "Partner Assigned", date: "09 Jan 2025", active: true },
                            { label: "Out for pickup" },
                            { label: "Completed" },
                        ].map((step, idx) => (
                            <div
                                key={idx}
                                className={`${styles.step} ${step.active ? styles.active : ""}`}
                            >
                                <div className={styles.circle}></div>
                                <div className={styles.line}>
                                    <span>{step.label}</span>
                                    {step.date && <small>{step.date}</small>}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Payment Summary Card */}
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryHeader}>
                            <div className={styles.summaryHeaderLeft}>
                                <span className={styles.summaryLabel}>Payment Method</span>
                            </div>
                            <button
                                className={styles.changeBtn}
                                onClick={handleChangePayment}
                            >
                                {displayPayment ? "Change" : "Add"}
                            </button>
                        </div>
                        {displayPayment ? (
                            <div className={styles.summaryContent}>
                                {displayPayment.type === "upi" ? (
                                    <>
                                        <span className={styles.paymentType}>UPI Payment</span>
                                        <p className={styles.paymentText}>
                                            UPI ID:{" "}
                                            <span className={styles.paymentValue}>
                                                {displayPayment?.upiId}
                                            </span>
                                        </p>
                                    </>
                                ) : displayPayment.type === "bank" ? (
                                    <>
                                        <span className={styles.paymentType}>
                                            Bank Transfer (IMPS)
                                        </span>
                                        <p className={styles.paymentText}>
                                            Account:{" "}
                                            <span className={styles.paymentValue}>
                                                {displayPayment?.bankDetails?.accountNumber}
                                            </span>
                                        </p>
                                        <p className={styles.paymentText}>
                                            IFSC:{" "}
                                            <span className={styles.paymentValue}>
                                                {displayPayment?.bankDetails?.ifscCode}
                                            </span>
                                        </p>
                                        <p className={styles.paymentText}>
                                            Bank:{" "}
                                            <span className={styles.paymentValue}>
                                                {displayPayment?.bankDetails?.bankName}
                                            </span>
                                        </p>
                                    </>
                                ) : null}
                            </div>
                        ) : (
                            <p className={styles.notSelected}>
                                No payment method selected, please select a payment method for smooth transaction.
                            </p>
                        )}
                    </div>

                    {/* Update Payment Button (Only visible if a new method is selected via context) */}


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
                    {/* Price Difference */}
                    {order?.priceDifference && (
                        <div className={styles.priceDiff}>
                            <div className={styles.priceDiffText}>
                                <span>Price Difference</span>
                                <span className={styles.priceDiffSubText}>According to partner's selected condition</span>
                            </div>
                            <span className={styles.priceDiffValue}>
                                <span className={styles.oldValue}>₹ {order?.priceDifference?.old || 10000}</span>
                                <span className={styles.newValue}>₹ {order?.priceDifference?.new || 9000}</span>
                            </span>
                        </div>
                    )}
                    {/* Transaction Detail */}
                    <div className={styles.transactionDetail}>
                        <div className={styles.priceDiffText} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Transaction Detail</span>
                            <span className={`${styles.statusPill} ${(order?.status || defaultTransaction.status).toLowerCase() === 'completed' ? styles.statusCompleted : styles.statusPending}`}>
                                {order?.status || defaultTransaction.status}
                            </span>
                        </div>
                        <div className={styles.transactionRow}>
                            <span className={styles.transactionLabel}>Transaction ID</span>
                            <span className={styles.transactionValue}>{order?.transactionId || defaultTransaction.transactionId}</span>
                        </div>
                        <div className={styles.transactionRow}>
                            <span className={styles.transactionLabel}>Date</span>
                            <span className={styles.transactionValue}>{order?.date ? new Date(order.date).toLocaleString() : defaultTransaction.date}</span>
                        </div>
                    </div>


                    <button className={styles.invoiceBtn} onClick={handleDownloadInvoice}>
                        <img src={downloadIcon} alt="Download Invoice" />Download Invoice
                    </button>

                    {/* Review Form */}
                    <div className={styles.reviewForm}>
                        <h5>Rate your order</h5>
                        <div className={styles.starRating}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`${styles.star} ${rating >= star ? styles.starFilled : ""}`}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <textarea
                            className={styles.reviewTextArea}
                            placeholder="Write your review here..."
                            value={reviewMessage}
                            onChange={(e) => setReviewMessage(e.target.value)}
                            rows={3}
                        />
                        <button className={styles.submitButton} onClick={handleReviewSubmit}>
                            Submit Review
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default OrderDetails;
