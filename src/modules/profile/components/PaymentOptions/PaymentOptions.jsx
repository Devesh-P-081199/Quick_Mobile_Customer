{
  //         accountNumber,
  //         confirmAccountNumber,
  //         beneficiaryName,
  //         mobileNumber,
  //         ifscCode,
  //         bankName,
  //         !accountNumber ||
  //         !confirmAccountNumber ||
  //         !beneficiaryName ||
  //         !mobileNumber ||
  //         !ifscCode ||
  //         !bankName
  //       ) {
  //             bankDetails
  //             bankDetails
  //     // if (isEditing) {
  //     // }
  //     // if (isEditing) {
  //     // }
  //             >
  //                   >
  //                     Edit
  //                   >
  //                     Delete
  //               )}
  //           ))}
  //             >
  //                   ['Account Number*', 'accountNumber'],
  //                   ['Confirm Account No*', 'confirmAccountNumber'],
  //                   ['Beneficiary Name*', 'beneficiaryName'],
  //                   ['Mobile Number*', 'mobileNumber'],
  //                   ['IFSC Code*', 'ifscCode'],
  //                   ['Bank Name*', 'bankName'],
  //                 ))}
  //                 Your account is securely protected and completely safe with us.
  //           ) : null}
  //             >
  //                   >
  //                     Edit
  //                   >
  //                     Delete
  //               )}
  //           ))}
  //             >
  //                 Your UPI ID typically follows the format: mobile@bank or username@bank.
  //           ) : null}
  //         >
  //         >
}
import { useEffect, useState } from "react";
import styles from "./PaymentOptions.module.css";
import { toast } from "react-toastify";

import ProfileCard from "../ProfileCard";
import api from "../../../../Utils/api";
import MobileCommonHeaderthree from "../../common/components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import right from "../../../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";

const PaymentOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [paymentBank, setPaymentBank] = useState([]);
  const [paymentUpi, setPaymentUpi] = useState([]);
  const [selectedUpiIndex, setSelectedUpiIndex] = useState(null);
  const [selectedBankIndex, setSelectedBankIndex] = useState(null);
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [isUpiOpen, setIsUpiOpen] = useState(false);
  const [editingBankId, setEditingBankId] = useState("");
  const [editingUpiId, setEditingUpiId] = useState("");

  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    confirmAccountNumber: "",
    beneficiaryName: "",
    mobileNumber: "",
    ifscCode: "",
    bankName: "",
  });

  const [upiId, setUpiId] = useState("");

  // Mobile states
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const [mobileOverlay, setMobileOverlay] = useState(null); // "bank" or "upi"
  const [mobileAddPayment, setMobileAddPayment] = useState(false); // show add form

  // Handle resize for mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch saved payment methods
  const getSavedPaymentBank = async () => {
    try {
      const res = await api.get(`/sell-module/user/payment-bank`);
      setPaymentBank(res.data?.bankMethods || []);
    } catch (err) {
      toast.error("Failed to fetch bank methods");
    }
  };

  const getSavedPaymentUpi = async () => {
    try {
      const res = await api.get(`/sell-module/user/payment-upi`);
      setPaymentUpi(res.data?.upiMethods || []);
    } catch (err) {
      toast.error("Failed to fetch UPI methods");
    }
  };

  useEffect(() => {
    getSavedPaymentBank();
    getSavedPaymentUpi();
  }, []);

  // Form handlers
  const handleBankChange = (e) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };

  const handleUpiChange = (e) => {
    setUpiId(e.target.value);
  };

  const resetForm = () => {
    setBankDetails({
      accountNumber: "",
      confirmAccountNumber: "",
      beneficiaryName: "",
      mobileNumber: "",
      ifscCode: "",
      bankName: "",
    });
    setUpiId("");
    setEditingBankId("");
    setEditingUpiId("");
    setIsBankOpen(false);
    setIsUpiOpen(false);
  };

  const handleSubmit = async () => {
    if (selectedOption === "bank") {
      const {
        accountNumber,
        confirmAccountNumber,
        beneficiaryName,
        mobileNumber,
        ifscCode,
        bankName,
      } = bankDetails;

      if (
        !accountNumber ||
        !confirmAccountNumber ||
        !beneficiaryName ||
        !mobileNumber ||
        !ifscCode ||
        !bankName
      ) {
        toast.warning("Please fill all fields");
        return;
      }

      if (accountNumber !== confirmAccountNumber) {
        toast.warning("Account numbers do not match");
        return;
      }

      try {
        if (editingBankId) {
          await api.put(
            `/sell-module/user/payment-bank/${editingBankId}`,
            bankDetails,
          );
          toast.success("Bank details updated");
        } else {
          await api.post(`/sell-module/user/payment-bank`, bankDetails);
          toast.success("Bank added successfully");
        }
        getSavedPaymentBank();
        resetForm();
        if (isMobile) setMobileAddPayment(false); // close add form on mobile
      } catch (err) {
        toast.error("Failed to submit bank details");
      }
    }

    if (selectedOption === "upi") {
      if (!upiId) {
        toast.warning("Please enter a UPI ID");
        return;
      }

      try {
        if (editingUpiId) {
          await api.put(`/sell-module/user/payment-upi/${editingUpiId}`, {
            upiId,
          });
          toast.success("UPI updated successfully");
        } else {
          await api.post(`/sell-module/user/payment-upi`, { upiId });
          toast.success("UPI added successfully");
        }
        getSavedPaymentUpi();
        resetForm();
        if (isMobile) setMobileAddPayment(false); // close add form on mobile
      } catch (err) {
        toast.error("Failed to submit UPI");
      }
    }
  };

  // Edit/Delete
  const handleDeleteBank = async (id) => {
    try {
      await api.delete(`/sell-module/user/payment-bank/${id}`);
      toast.success("Bank deleted");
      getSavedPaymentBank();
      setSelectedBankIndex(null);
    } catch (err) {
      toast.error("Failed to delete bank");
    }
  };

  const handleDeleteUpi = async (id) => {
    try {
      await api.delete(`/sell-module/user/payment-upi/${id}`);
      toast.success("UPI deleted");
      getSavedPaymentUpi();
      setSelectedUpiIndex(null);
    } catch (err) {
      toast.error("Failed to delete UPI");
    }
  };

  const handleEditBank = (index) => {
    const bankToEdit = paymentBank[index];
    setBankDetails(bankToEdit.bankDetails);
    setEditingBankId(bankToEdit._id);
    if (isMobile) setMobileAddPayment(true);
    else setIsBankOpen(true);
  };

  const handleEditUpi = (index) => {
    const upiToEdit = paymentUpi[index];
    setUpiId(upiToEdit.upiId);
    setEditingUpiId(upiToEdit._id);
    if (isMobile) setMobileAddPayment(true);
    else setIsUpiOpen(true);
  };

  const toggleOption = (option) => {
    setSelectedOption((prev) => (prev === option ? null : option));
    resetForm();
  };

  // Mobile handlers
  const handleMobileOption = (option) => {
    setMobileOverlay(option); // show saved list
    setMobileAddPayment(false);
    setSelectedOption(option);
    resetForm();
  };

  const handleMobileAddPayment = () => {
    setMobileAddPayment(true);
  };

  // Mobile overlay component
  const MobilePaymentOverlay = ({ title, children, onClose }) => {
    return (
      <div className={styles.mobileOverlay}>
        <div className={styles.mobileHeader}>
          <button onClick={onClose}>Back</button>
          <h2>{title}</h2>
        </div>
        <div className={styles.mobileContent}>{children}</div>
      </div>
    );
  };

  return (
    <>
      <MobileCommonHeaderthree title="Payment Options" />
      <section className="zero-padding-section">
        <div className={`${styles.addressContainer} scrollbar-hidden`}>
          <div className={styles.left}>
            <div className={`${styles.addressWrapper} scrollbar-hidden`}>
              {/* Bank Transfer Header */}
              <div
                className={styles.dropdownHeader}
                onClick={() =>
                  isMobile ? handleMobileOption("bank") : toggleOption("bank")
                }
              >
                <span>Bank Transfer</span>
                <span>
                  <img src={right} alt="" className={styles.rightangle} />
                </span>
              </div>

              {/* UPI Header */}
              <div
                className={styles.dropdownHeader}
                onClick={() =>
                  isMobile ? handleMobileOption("upi") : toggleOption("upi")
                }
              >
                <span>UPI</span>
                <span>
                  <img src={right} alt="" className={styles.rightangle} />
                </span>
              </div>

              {/* Desktop Dropdowns */}
              {!isMobile && selectedOption === "bank" && (
                <div className={styles.formBox}>
                  <div className={styles.headingflex}>
                    <h2 className={styles.heading}>Bank Accounts</h2>
                    <div
                      className={styles.cardAdd}
                      onClick={() => setIsBankOpen(!isBankOpen)}
                    >
                      <span>+</span>
                      <p>{isBankOpen ? "Discard" : "Add Bank"}</p>
                    </div>
                  </div>
                  <div className={styles.cardList}>
                    {paymentBank.map((bank, index) => (
                      <div key={index} className={styles.card}>
                        <input
                          type="radio"
                          name="bank"
                          checked={selectedBankIndex === index}
                          onChange={() => setSelectedBankIndex(index)}
                        />
                        <div className={styles.cardDetails}>
                          <p>Acc No: {bank.bankDetails.accountNumber}</p>
                          <p>Bank: {bank.bankDetails.bankName}</p>
                          <p>IFSC: {bank.bankDetails.ifscCode}</p>
                        </div>
                        {selectedBankIndex === index && (
                          <div className={styles.cardActions}>
                            <button onClick={() => handleEditBank(index)}>
                              Edit
                            </button>
                            <button onClick={() => handleDeleteBank(bank._id)}>
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {isBankOpen && (
                    <div className={styles.inputGrid}>
                      {[
                        ["Account Number", "accountNumber"],
                        ["Confirm Account Number", "confirmAccountNumber"],
                        ["Beneficiary Name", "beneficiaryName"],
                        ["Mobile Number", "mobileNumber"],
                        ["IFSC Code", "ifscCode"],
                        ["Bank Name", "bankName"],
                      ].map(([label, name]) => (
                        <div key={name} className={styles.inputGroup}>
                          <label>{label}</label>
                          <input
                            name={name}
                            value={bankDetails[name]}
                            onChange={handleBankChange}
                          />
                        </div>
                      ))}
                      <button
                        className={styles.addbutton}
                        onClick={handleSubmit}
                      >
                        {editingBankId ? "Update Bank" : "Add Bank"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {!isMobile && selectedOption === "upi" && (
                <div className={styles.formBox}>
                  <div className={styles.headingflex}>
                    <h2 className={styles.heading}>UPI Methods</h2>
                    <div
                      className={styles.cardAdd}
                      onClick={() => setIsUpiOpen(!isUpiOpen)}
                    >
                      <span>+</span>
                      <p>{isUpiOpen ? "Discard" : "Add UPI"}</p>
                    </div>
                  </div>
                  <div className={styles.cardList}>
                    {paymentUpi.map((upi, index) => (
                      <div key={index} className={styles.card}>
                        <input
                          type="radio"
                          name="upi"
                          checked={selectedUpiIndex === index}
                          onChange={() => setSelectedUpiIndex(index)}
                        />
                        <div className={styles.cardDetails}>
                          <p>UPI ID: {upi.upiId}</p>
                        </div>
                        {selectedUpiIndex === index && (
                          <div className={styles.cardActions}>
                            <button onClick={() => handleEditUpi(index)}>
                              Edit
                            </button>
                            <button onClick={() => handleDeleteUpi(upi._id)}>
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {isUpiOpen && (
                    <div className={styles.inputGroup}>
                      <label>UPI ID</label>
                      <input value={upiId} onChange={handleUpiChange} />
                      <button
                        className={styles.addbutton}
                        onClick={handleSubmit}
                      >
                        {editingUpiId ? "Update UPI" : "Add UPI"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Overlay */}
              {isMobile && mobileOverlay && (
                <MobilePaymentOverlay
                  title={mobileAddPayment ? "Add Payment" : "Payment Methods"}
                  onClose={() => {
                    if (mobileAddPayment) setMobileAddPayment(false);
                    else setMobileOverlay(null);
                  }}
                >
                  {mobileOverlay === "bank" && (
                    <>
                      {!mobileAddPayment ? (
                        <>
                          <div className={styles.cardList}>
                            {paymentBank.map((bank, index) => (
                              <div key={index} className={styles.card}>
                                <p>Acc No: {bank.bankDetails.accountNumber}</p>
                                <p>Bank: {bank.bankDetails.bankName}</p>
                                <p>IFSC: {bank.bankDetails.ifscCode}</p>
                                <div className={styles.cardActions}>
                                  <button onClick={() => handleEditBank(index)}>
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteBank(bank._id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button
                            className={styles.addbutton}
                            onClick={handleMobileAddPayment}
                          >
                            Add Bank
                          </button>
                        </>
                      ) : (
                        <div className={styles.inputGrid}>
                          {[
                            ["Account Number", "accountNumber"],
                            ["Confirm Account Number", "confirmAccountNumber"],
                            ["Beneficiary Name", "beneficiaryName"],
                            ["Mobile Number", "mobileNumber"],
                            ["IFSC Code", "ifscCode"],
                            ["Bank Name", "bankName"],
                          ].map(([label, name]) => (
                            <div key={name} className={styles.inputGroup}>
                              <label>{label}</label>
                              <input
                                name={name}
                                value={bankDetails[name]}
                                onChange={handleBankChange}
                              />
                            </div>
                          ))}
                          <button
                            className={styles.addbutton}
                            onClick={handleSubmit}
                          >
                            {editingBankId ? "Update Bank" : "Add Bank"}
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {mobileOverlay === "upi" && (
                    <>
                      {!mobileAddPayment ? (
                        <>
                          <div className={styles.cardList}>
                            {paymentUpi.map((upi, index) => (
                              <div key={index} className={styles.card}>
                                <p>UPI ID: {upi.upiId}</p>
                                <div className={styles.cardActions}>
                                  <button onClick={() => handleEditUpi(index)}>
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUpi(upi._id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button
                            className={styles.addbutton}
                            onClick={handleMobileAddPayment}
                          >
                            Add UPI
                          </button>
                        </>
                      ) : (
                        <div className={styles.inputGroup}>
                          <label>UPI ID</label>
                          <input value={upiId} onChange={handleUpiChange} />
                          <button
                            className={styles.addbutton}
                            onClick={handleSubmit}
                          >
                            {editingUpiId ? "Update UPI" : "Add UPI"}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </MobilePaymentOverlay>
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
