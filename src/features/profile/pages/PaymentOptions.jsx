import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PaymentOptions.module.css";
import ProfileCard from "../components/ProfileCard";
import MobileCommonHeaderthree from "../../../components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import { FaCreditCard, FaPlus } from "react-icons/fa";
import api from "../../../Utils/api";
import { toast } from "react-toastify";
import trash from "../../../assets/flaticons/trash-basecolor.png";
import edit from "../../../assets/flaticons/pen-basecolor.png";

const PaymentOptions = () => {
  const navigate = useNavigate();

  const [paymentBank, setPaymentBank] = useState([]);
  const [paymentUpi, setPaymentUpi] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(0); // 0 for UPI, 1 for Bank

  // Fetch Bank payment methods from API
  const getSavedPaymentBank = async () => {
    try {
      const res = await api.get(`/sell-module/user/payment-bank`);
      console.log("Bank Payment Response:", res.data);
      setPaymentBank(res.data?.bankMethods || []);
      console.log("Bank Methods Set:", res.data?.bankMethods || []);
    } catch (error) {
      console.error("Failed to fetch bank methods:", error);
      toast.error("Failed to fetch bank methods");
    }
  };

  // Fetch UPI payment methods from API
  const getSavedPaymentUpi = async () => {
    try {
      const res = await api.get(`/sell-module/user/payment-upi`);
      console.log("UPI Payment Response:", res.data);
      setPaymentUpi(res.data?.upiMethods || []);
      console.log("UPI Methods Set:", res.data?.upiMethods || []);
    } catch (error) {
      console.error("Failed to fetch UPI methods:", error);
      toast.error("Failed to fetch UPI methods");
    }
  };

  useEffect(() => {
    console.log(
      "PaymentOptions Component Mounted - Fetching payment methods..."
    );
    getSavedPaymentBank();
    getSavedPaymentUpi();
  }, []);

  // Debug: Log state changes
  useEffect(() => {
    console.log("Payment Bank State Updated:", paymentBank);
  }, [paymentBank]);

  useEffect(() => {
    console.log("Payment UPI State Updated:", paymentUpi);
  }, [paymentUpi]);

  // Handle Add New - Navigate to PaymentForm
  const handleAddNew = () => {
    navigate("/profile/add-payment");
  };

  // Handle Edit UPI
  const handleEditUpi = (upiData) => {
    const upiId = upiData._id || upiData.id;
    navigate(`/profile/edit-payment/${upiId}`, {
      state: { paymentData: upiData, paymentType: "UPI" },
    });
  };

  // Handle Edit Bank
  const handleEditBank = (bankData) => {
    const bankId = bankData._id || bankData.id;
    navigate(`/profile/edit-payment/${bankId}`, {
      state: { paymentData: bankData, paymentType: "Bank" },
    });
  };

  // Handle delete UPI
  const handleDeleteUpi = async (upiData) => {
    if (confirm("Are you sure you want to delete this UPI method?")) {
      try {
        const upiId = upiData._id || upiData.id;
        await api.delete(`/sell-module/user/payment-upi/${upiId}`);
        toast.success("UPI method deleted successfully");
        getSavedPaymentUpi();
      } catch (error) {
        console.error("Error deleting UPI method:", error);
        toast.error("Error deleting UPI method");
      }
    }
  };

  // Handle delete Bank
  const handleDeleteBank = async (bankData) => {
    if (confirm("Are you sure you want to delete this bank account?")) {
      try {
        const bankId = bankData._id || bankData.id;
        await api.delete(`/sell-module/user/payment-bank/${bankId}`);
        toast.success("Bank account deleted successfully");
        getSavedPaymentBank();
      } catch (error) {
        console.error("Error deleting bank account:", error);
        toast.error("Error deleting bank account");
      }
    }
  };

  return (
    <>
      <MobileCommonHeaderthree title="Payment Options" />
      <section className="zero-padding-section">
        <div className={styles.panelWrapper}>
          <div className={styles.left}>
            <div className={styles.header}>
              <button className={styles.addBtn} onClick={handleAddNew}>
                <FaPlus /> Add Payment Method
              </button>
            </div>

            {/* Tabs for UPI and Bank */}
            <div className={styles.tabContainer}>
              <button
                className={`${styles.tabButton} ${
                  selectedMethod === 0 ? styles.activeTab : ""
                }`}
                onClick={() => setSelectedMethod(0)}
              >
                UPI
              </button>
              <button
                className={`${styles.tabButton} ${
                  selectedMethod === 1 ? styles.activeTab : ""
                }`}
                onClick={() => setSelectedMethod(1)}
              >
                Bank Transfer
              </button>
            </div>

            <div className={styles.paymentsList}>
              {/* UPI Tab Content */}
              {selectedMethod === 0 && (
                <>
                  {paymentUpi.length > 0 ? (
                    paymentUpi.map((upi, i) => (
                      <div
                        key={upi.id || upi._id || i}
                        className={styles.paymentCard}
                      >
                        <div className={styles.cardDetails}>
                          <div className={styles.cardType}>UPI</div>
                          <div className={styles.cardNumber}>
                            UPI ID: {upi?.upiId}
                            <br></br>
                            Verfied Name : namesurname39428@hdbsdkbank
                          </div>
                        </div>
                        <div className={styles.cardActions}>
                          <button
                            className={styles.editIconBtn}
                            onClick={() => handleEditUpi(upi)}
                          >
                            <img src={edit} alt="edit" />
                          </button>
                          <button
                            className={styles.deleteIconBtn}
                            onClick={() => handleDeleteUpi(upi)}
                          >
                            <img src={trash} alt="trash" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.emptyState}>
                      <FaCreditCard className={styles.emptyIcon} />
                      <h3>No UPI Methods Added</h3>
                      <p>Add a UPI method to make checkout faster.</p>
                    </div>
                  )}
                </>
              )}

              {/* Bank Tab Content */}
              {selectedMethod === 1 && (
                <>
                  {paymentBank.length > 0 ? (
                    paymentBank.map((bank, i) => (
                      <div
                        key={bank.id || bank._id || i}
                        className={styles.paymentCard}
                      >
                        <div className={styles.cardDetails}>
                          <div className={styles.cardType}>Bank Transfer</div>
                          <div className={styles.cardNumber}>
                            Acc no: {bank?.bankDetails?.accountNumber}
                          </div>
                          <div className={styles.cardHolder}>
                            IFSC Code: {bank?.bankDetails?.ifscCode}
                          </div>
                          <div className={styles.cardHolder}>
                            Bank: {bank?.bankDetails?.bankName}
                          </div>
                          <div className={styles.cardHolder}>
                            Beneficiary: {bank?.bankDetails?.beneficiaryName}
                          </div>
                        </div>
                        <div className={styles.cardActions}>
                          <button
                            className={styles.editIconBtn}
                            onClick={() => handleEditBank(bank)}
                          >
                            <img src={edit} alt="edit" />
                          </button>
                          <button
                            className={styles.deleteIconBtn}
                            onClick={() => handleDeleteBank(bank)}
                          >
                            <img src={trash} alt="trash" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.emptyState}>
                      <FaCreditCard className={styles.emptyIcon} />
                      <h3>No Bank Accounts Added</h3>
                      <p>Add a bank account to make checkout faster.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className={styles.right}>
            <ProfileCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentOptions;
