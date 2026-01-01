import { useContext, useEffect, useState } from "react";
import styles from "./Payment.module.css";
import bank from "../../../../assets/images/icons/bank.png";
import upi from "../../../../assets/images/icons/upi.png";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { UserContext } from "../../../../Context/contextAPI";
import { toast } from "react-toastify";
import api from "../../../../Utils/api";
import MobileCommonHeaderthree from "../../../common/components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import { FaPlus } from "react-icons/fa";
import trash from "../../../../assets/flaticons/trash-basecolor.png";
import edit from "../../../../assets/flaticons/pen-basecolor.png";

function PaymentComponent() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const location = useLocation();

  const paymentMethods = [
    { name: "UPI/ G Pay/ Phonepe", icon: upi },
    { name: "Bank Transfer (IMPS)", icon: bank },
  ];

  const { selectedPaymentMethod, setSelectedPaymentMethod } =
    useContext(UserContext);

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentBank, setPaymentBank] = useState([]);
  const [paymentUpi, setPaymentUpi] = useState([]);
  const [selectedBankIndex, setSelectedBankIndex] = useState(null);
  const [selectedUpiIndex, setSelectedUpiIndex] = useState(null);
  const [initialSortDone, setInitialSortDone] = useState(false);

  const getSavedPaymentBank = async () => {
    try {
      const res = await api.get(`/sell-module/user/payment-bank`);
      return res.data?.bankMethods || [];
    } catch (error) {
      console.error("Failed to fetch bank methods:", error);
      toast.error("Failed to fetch bank methods");
      return [];
    }
  };

  const getSavedPaymentUpi = async () => {
    try {
      const res = await api.get(`/sell-module/user/payment-upi`);
      return res.data?.upiMethods || [];
    } catch (error) {
      console.error("Failed to fetch UPI methods:", error);
      toast.error("Failed to fetch UPI methods");
      return [];
    }
  };

  // Sort payment methods to show selected one on top
  const sortPaymentMethodsBySelected = (methods, type) => {
    if (!selectedPaymentMethod || selectedPaymentMethod.type !== type)
      return methods;

    const selectedId = selectedPaymentMethod._id || selectedPaymentMethod.id;
    return [...methods].sort((a, b) => {
      const aId = a._id || a.id;
      const bId = b._id || b.id;
      if (aId === selectedId) return -1;
      if (bId === selectedId) return 1;
      return 0;
    });
  };

  useEffect(() => {
    const loadPaymentMethods = async () => {

      let upiMethods = [];
      let bankMethods = [];

      // Check if payment methods were passed from Step6 via navigation state
      if (location.state?.paymentMethods) {
        const { upi, bank } = location.state.paymentMethods;

        upiMethods = upi || [];
        bankMethods = bank || [];
        
      } else {
        
        [upiMethods, bankMethods] = await Promise.all([
          getSavedPaymentUpi(),
          getSavedPaymentBank(),
        ]);
      }

      // Sort once on initial load
      const sortedUpi = sortPaymentMethodsBySelected(upiMethods, "upi");
      const sortedBank = sortPaymentMethodsBySelected(bankMethods, "bank");

      setPaymentUpi(sortedUpi);
      setPaymentBank(sortedBank);
      setInitialSortDone(true);

      // Handle Selection Logic Immediately
      if (location.state?.paymentUpdated && selectedPaymentMethod) {
        // If coming back from update, keep the selected method
        // Just ensure indices and tabs are correct
        if (selectedPaymentMethod.type === "upi") {
          setSelectedMethod(0);
          const idx = sortedUpi.findIndex(u => (u._id || u.id) === (selectedPaymentMethod._id || selectedPaymentMethod.id));
          if (idx !== -1) setSelectedUpiIndex(idx);
        } else if (selectedPaymentMethod.type === "bank") {
          setSelectedMethod(1);
          const idx = sortedBank.findIndex(b => (b._id || b.id) === (selectedPaymentMethod._id || selectedPaymentMethod.id));
          if (idx !== -1) setSelectedBankIndex(idx);
        }
      } else if (!selectedPaymentMethod) {
        // Auto-select defaults if nothing selected
        if (sortedUpi.length > 0) {
          setSelectedMethod(0);
          setSelectedUpiIndex(0);
          setSelectedPaymentMethod({ type: "upi", ...sortedUpi[0] });
        } else if (sortedBank.length > 0) {
          setSelectedMethod(1);
          setSelectedBankIndex(0);
          setSelectedPaymentMethod({ type: "bank", ...sortedBank[0] });
        } else {
          // No methods, default to UPI tab
          setSelectedMethod(0);
        }
      } else {
        // Ensure UI matches context
        if (selectedPaymentMethod.type === "upi") {
          const idx = sortedUpi.findIndex(u => (u._id || u.id) === (selectedPaymentMethod._id || selectedPaymentMethod.id));
          if (idx !== -1) {
            setSelectedMethod(0);
            setSelectedUpiIndex(idx);
          } else if (sortedUpi.length > 0) {
            setSelectedMethod(0);
            setSelectedUpiIndex(0);
            setSelectedPaymentMethod({ type: "upi", ...sortedUpi[0] });
          }
        } else if (selectedPaymentMethod.type === "bank") {
          const idx = sortedBank.findIndex(b => (b._id || b.id) === (selectedPaymentMethod._id || selectedPaymentMethod.id));
          if (idx !== -1) {
            setSelectedMethod(1);
            setSelectedBankIndex(idx);
          } else if (sortedBank.length > 0) {
            // Fallback
            setSelectedMethod(1);
            setSelectedBankIndex(0);
            setSelectedPaymentMethod({ type: "bank", ...sortedBank[0] });
          }
        }
      }
    };

    loadPaymentMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync effect to handle external updates to context (if any) or tab switching
  useEffect(() => {
    if (!initialSortDone) return;
    // Only run if we have a selected method but indices aren't matching or need tab switch
    // This is a safety/sync check, but main logic is now in load
  }, [selectedPaymentMethod, initialSortDone]);

  // Handle edit UPI
  const handleEditUpi = (upiData) => {
    const upiId = upiData._id || upiData.id;
    navigate(`/${slug}/payment/edit-payment/${upiId}`, {
      state: { paymentData: upiData, paymentType: "UPI", returnPath: location.pathname, prevReturnPath: location.state?.returnPath },
    });
  };

  // Handle edit Bank
  const handleEditBank = (bankData) => {
    const bankId = bankData._id || bankData.id;
    navigate(`/${slug}/payment/edit-payment/${bankId}`, {
      state: { paymentData: bankData, paymentType: "Bank", returnPath: location.pathname, prevReturnPath: location.state?.returnPath },
    });
  };

  // Handle delete UPI
  const handleDeleteUpi = async (upiData) => {
    if (confirm("Are you sure you want to delete this UPI method?")) {
      try {
        const upiId = upiData._id || upiData.id;
        await api.delete(`/sell-module/user/payment-upi/${upiId}`);
        toast.success("UPI method deleted successfully");

        // Refetch and update
        const updatedUpi = await getSavedPaymentUpi();
        setPaymentUpi(updatedUpi);

        // Clear selection if deleted item was selected
        if (
          selectedPaymentMethod?.type === "upi" &&
          (selectedPaymentMethod._id === upiId ||
            selectedPaymentMethod.id === upiId)
        ) {
          setSelectedPaymentMethod(null);
          setSelectedUpiIndex(null);
        }
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

        // Refetch and update
        const updatedBank = await getSavedPaymentBank();
        setPaymentBank(updatedBank);

        // Clear selection if deleted item was selected
        if (
          selectedPaymentMethod?.type === "bank" &&
          (selectedPaymentMethod._id === bankId ||
            selectedPaymentMethod.id === bankId)
        ) {
          setSelectedPaymentMethod(null);
          setSelectedBankIndex(null);
        }
      } catch (error) {
        console.error("Error deleting bank account:", error);
        toast.error("Error deleting bank account");
      }
    }
  };

  const handleBack = () => {
    // Check for custom return path in state
    if (location.state?.returnPath) {
      navigate(location.state.returnPath, {
        replace: true,
        state: {
          paymentUpdated: true,
          orderData: location.state?.orderData
        }
      });
      return;
    }

    // Navigate back to order summary - preserve query params
    const queryString = new URLSearchParams(location.search).toString();
    const targetUrl = queryString
      ? `/${slug}/price-summary?${queryString}`
      : `/${slug}/price-summary`;
    navigate(targetUrl, { replace: true });
  };

  const handleContinue = () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    // Check for custom return path in state
    if (location.state?.returnPath) {
      navigate(location.state.returnPath, {
        replace: true,
        state: {
          paymentUpdated: true,
          orderData: location.state?.orderData
        }
      });
      return;
    }

    // Navigate back to order summary - preserve query params
    const queryString = new URLSearchParams(location.search).toString();
    const targetUrl = queryString
      ? `/${slug}/price-summary?${queryString}`
      : `/${slug}/price-summary`;
    navigate(targetUrl, { replace: true });
  };

  return (
    <>
      <MobileCommonHeaderthree title="Payment" onBack={handleBack} />

      <section className={styles.CheckOutSection}>
        <div className={styles.Wrapper}>
          <div className={styles.PaymentBox}>
            <h2 className={styles.Title}>Payment</h2>

            {/* Add New Payment Method Button */}
            {/* Add New Payment Method Button */}
            <button
              className={styles.addBtn}
              onClick={() => navigate(`/${slug}/payment/add-payment`, {
                state: {
                  returnPath: location.pathname,
                  prevReturnPath: location.state?.returnPath,
                  orderData: location.state?.orderData
                }
              })}
            >
              <FaPlus /> Add Payment Method
            </button>

            {/* Tabs for UPI and Bank */}
            <div className={styles.tabContainer}>
              <button
                className={`${styles.tabButton} ${selectedMethod === 0 ? styles.activeTab : ""
                  }`}
                onClick={() => {
                  setSelectedMethod(0);
                  setSelectedBankIndex(null);
                  setSelectedUpiIndex(null);
                  setSelectedPaymentMethod(null);
                }}
              >
                UPI
              </button>
              <button
                className={`${styles.tabButton} ${selectedMethod === 1 ? styles.activeTab : ""
                  }`}
                onClick={() => {
                  setSelectedMethod(1);
                  setSelectedBankIndex(null);
                  setSelectedUpiIndex(null);
                  setSelectedPaymentMethod(null);
                }}
              >
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
                              className={`${styles.paymentCard} ${selectedUpiIndex === i ? styles.selected : ""
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
                              className={`${styles.paymentCard} ${selectedBankIndex === i ? styles.selected : ""
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

          </div>

          {/* Continue and Back Buttons */}
          <div className={styles.continueButtonContainer}>
            <button className={styles.continueButton} onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default PaymentComponent;
