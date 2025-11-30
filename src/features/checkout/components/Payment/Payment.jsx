import { useContext, useEffect, useState } from "react";
import styles from "./Payment.module.css";
import bank from "../../../../assets/images/icons/bank.png";
import upi from "../../../../assets/images/icons/upi.png";
import { useNavigate, useParams } from "react-router-dom";
import RightCard from "../CheckOut/RightCard";
import { UserContext } from "../../../../Context/contextAPI";
import { toast } from "react-toastify";
import api from "../../../../Utils/api";
import MobileCommonHeaderthree from "../../../../components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import { FaPlus } from "react-icons/fa";
import trash from "../../../../assets/flaticons/trash-basecolor.png";
import edit from "../../../../assets/flaticons/pen-basecolor.png";

function PaymentComponent() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const paymentMethods = [
    { name: "UPI/ G Pay/ Phonepe", icon: upi },
    { name: "Bank Transfer (IMPS)", icon: bank },
  ];

  const { setSelectedPaymentMethod } = useContext(UserContext);

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentBank, setPaymentBank] = useState([]);
  const [paymentUpi, setPaymentUpi] = useState([]);
  const [selectedBankIndex, setSelectedBankIndex] = useState(null);
  const [selectedUpiIndex, setSelectedUpiIndex] = useState(null);

  const getSavedPaymentBank = async () => {
    try {
      const res = await api.get(`/sell-module/user/payment-bank`);
      setPaymentBank(res.data?.bankMethods || []);
    } catch (error) {
      console.error("Failed to fetch bank methods:", error);
      toast.error("Failed to fetch bank methods");
    }
  };

  const getSavedPaymentUpi = async () => {
    try {
      const res = await api.get(`/sell-module/user/payment-upi`);
      setPaymentUpi(res.data?.upiMethods || []);
    } catch (error) {
      console.error("Failed to fetch UPI methods:", error);
      toast.error("Failed to fetch UPI methods");
    }
  };

  useEffect(() => {
    getSavedPaymentBank();
    getSavedPaymentUpi();
  }, []);

  useEffect(() => {
    // Set default tab to UPI (0)
    if (selectedMethod === null) {
      setSelectedMethod(0);
    }

    if (paymentBank.length > 0 && selectedMethod === 1) {
      setSelectedBankIndex(0);
      setSelectedPaymentMethod({ type: "bank", ...paymentBank[0] });
    } else if (paymentUpi.length > 0 && selectedMethod === 0) {
      setSelectedUpiIndex(0);
      setSelectedPaymentMethod({ type: "upi", ...paymentUpi[0] });
    }
  }, [paymentBank, paymentUpi, selectedMethod, setSelectedPaymentMethod]);

  // Handle edit UPI
  const handleEditUpi = (upiData) => {
    const upiId = upiData._id || upiData.id;
    navigate(`/${slug}/check-out/edit-payment/${upiId}`, {
      state: { paymentData: upiData, paymentType: "UPI" },
    });
  };

  // Handle edit Bank
  const handleEditBank = (bankData) => {
    const bankId = bankData._id || bankData.id;
    navigate(`/${slug}/check-out/edit-payment/${bankId}`, {
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
      <MobileCommonHeaderthree title="Payment" />

      <section className={styles.CheckOutSection}>
        <div className={styles.Wrapper}>
          <div className={styles.PaymentBox}>
            <h2 className={styles.Title}>Payment</h2>

            {/* Add New Payment Method Button */}
            <button
              className={styles.addBtn}
              onClick={() => navigate(`/${slug}/check-out/add-payment`)}
            >
              <FaPlus /> Add New Payment Method
            </button>

            {/* Tabs for UPI and Bank */}
            <div className={styles.tabContainer}>
              <button
                className={`${styles.tabButton} ${
                  selectedMethod === 0 ? styles.activeTab : ""
                }`}
                onClick={() => {
                  setSelectedMethod(0);
                  setSelectedBankIndex(null);
                  setSelectedUpiIndex(null);
                  setSelectedPaymentMethod(null);
                }}
              >
                <img src={upi} alt="UPI" className={styles.tabIcon} />
                UPI
              </button>
              <button
                className={`${styles.tabButton} ${
                  selectedMethod === 1 ? styles.activeTab : ""
                }`}
                onClick={() => {
                  setSelectedMethod(1);
                  setSelectedBankIndex(null);
                  setSelectedUpiIndex(null);
                  setSelectedPaymentMethod(null);
                }}
              >
                <img src={bank} alt="Bank" className={styles.tabIcon} />
                Bank Transfer
              </button>
            </div>

            <div className={styles.PaymentSection}>
              {paymentMethods.map((method, index) => (
                <div key={index} className={styles.PaymentOptionContainer}>
                  {/* Hide the old payment option UI */}
                  <div style={{ display: "none" }}>
                    <div className={styles.Radio} />
                    <div className={styles.IconLabel}>
                      <img src={method.icon} alt={method.name} />
                      <span>{method.name}</span>
                    </div>
                  </div>

                  {/* UPI SECTION */}
                  {selectedMethod === index && index === 0 && (
                    <div className={styles.DropDown}>
                      <div className={styles.upiBoxes}>
                        {paymentUpi.length > 0 ? (
                          paymentUpi.map((upi, i) => (
                            <label
                              key={i}
                              className={`${styles.paymentCard} ${
                                selectedUpiIndex === i ? styles.selected : ""
                              }`}
                            >
                              <input
                                type="radio"
                                checked={selectedUpiIndex === i}
                                onChange={() => {
                                  setSelectedUpiIndex(i);
                                  setSelectedPaymentMethod({
                                    type: "upi",
                                    ...upi,
                                  });
                                }}
                                className={styles.radioInput}
                              />
                              <span className={styles.customRadio}></span>
                              <div className={styles.cardDetails}>
                                UPI
                                <div className={styles.cardContent}>
                                  UPI ID : <span>{upi?.upiId}</span>
                                  <br></br>
                                  Verfied Name :{" "}
                                  <span>namesurname39428@hdbsdkbank</span>
                                </div>
                                <div className={styles.cardActions}>
                                  <button
                                    className={styles.editIconBtn}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditUpi(upi);
                                    }}
                                  >
                                    <img src={edit} alt="edit" />
                                  </button>
                                  <button
                                    className={styles.deleteIconBtn}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteUpi(upi);
                                    }}
                                  >
                                    <img src={trash} alt="trash" />
                                  </button>
                                </div>
                              </div>
                            </label>
                          ))
                        ) : (
                          <p className={styles.emptyMessage}>
                            No UPI methods added yet. Click "Add New Payment
                            Method" to add one.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {selectedMethod === index && index === 1 && (
                    <div className={styles.DropDown}>
                      <div className={styles.accountBoxes}>
                        {paymentBank.length > 0 ? (
                          paymentBank.map((bank, i) => (
                            <label
                              key={i}
                              className={`${styles.paymentCard} ${
                                selectedBankIndex === i ? styles.selected : ""
                              }`}
                            >
                              <input
                                type="radio"
                                checked={selectedBankIndex === i}
                                onChange={() => {
                                  setSelectedBankIndex(i);
                                  setSelectedPaymentMethod({
                                    type: "bank",
                                    ...bank,
                                  });
                                }}
                                className={styles.radioInput}
                              />
                              <span className={styles.customRadio}></span>
                              <div className={styles.cardDetails}>
                                Bank Transfer
                                <div className={styles.cardContent}>
                                  Acc no : {bank?.bankDetails?.accountNumber}
                                  <br></br>
                                  IFSC Code : {bank?.bankDetails?.ifscCode}
                                  <br></br>
                                  Bank name : {bank?.bankDetails?.bankName}
                                  <br></br>
                                  Beneficiary name :{" "}
                                  {bank?.bankDetails?.beneficiaryName}
                                </div>
                                <div className={styles.cardActions}>
                                  <button
                                    className={styles.editIconBtn}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditBank(bank);
                                    }}
                                  >
                                    <img src={edit} alt="edit" />
                                  </button>
                                  <button
                                    className={styles.deleteIconBtn}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteBank(bank);
                                    }}
                                  >
                                    <img src={trash} alt="trash" />
                                  </button>
                                </div>
                              </div>
                            </label>
                          ))
                        ) : (
                          <p className={styles.emptyMessage}>
                            No bank accounts added yet. Click "Add New Payment
                            Method" to add one.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* <div className={styles.DetailsSection}>
              <h3 className={styles.SubTitle}>Details (Non-mandatory)</h3>
              <div className={styles.IMEITitle}>Enter IMEI Number</div>
              <div className={styles.IMEIInfo}>
                <p>
                  To find your IMEI number, dial *#06# or check under About
                  Phone. You can also check on the box or behind the battery.
                </p>
              </div>

              <div className={styles.InputGroup}>
                <label>IMEI Number</label>
                <input type="text" placeholder="Enter IMEI" />
              </div>

              <div className={styles.UploadBill}>
                <img src={uploadimg} alt="Upload" />
                <span>Upload Bill Image</span>
              </div>
            </div>

            <div className={styles.ActionButtons}>
              <button className={styles.SkipButton}>Skip</button>
              <NavLink to="/sellhome" className={styles.SaveNav}>
                Save
              </NavLink>
            </div> */}
          </div>
          <RightCard />
        </div>
      </section>
    </>
  );
}

export default PaymentComponent;
