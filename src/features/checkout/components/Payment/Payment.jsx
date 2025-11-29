import React, { useContext, useEffect, useState } from "react";
import styles from "./Payment.module.css";
import bank from "../../../../assets/images/icons/bank.png";
import upi from "../../../../assets/images/icons/upi.png";
import "../../../../assets/images/icons/upload.png";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import RightCard from "../CheckOut/RightCard";
import { UserContext } from "../../../../Context/contextAPI";
import { toast } from "react-toastify";
import api from "../../../../Utils/api";
import MobileCommonHeaderthree from "../../../../components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import { FaPlus } from "react-icons/fa";

function PaymentComponent() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const paymentMethods = [
    { name: "UPI/ G Pay/ Phonepe", icon: upi },
    { name: "Bank Transfer (IMPS)", icon: bank },
  ];

  const { setSelectedPaymentMethod } = useContext(UserContext);

  const [isChecked, setIsChecked] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentBank, setPaymentBank] = useState([]);
  const [paymentUpi, setPaymentUpi] = useState([]);
  const [bankFormOpen, setBankFormOpen] = useState(false);
  const [upiFormOpen, setUpiFormOpen] = useState(false);
  const [selectedBankIndex, setSelectedBankIndex] = useState(null);
  const [selectedUpiIndex, setSelectedUpiIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    bankName: "",
    beneficiaryName: "",
    mobileNumber: "",
  });

  const [upiId, setUpiId] = useState("");

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
    setBankFormOpen(false);
    setUpiFormOpen(false);
    setIsChecked(false);
    setSelectedOption(null);
  };

  const handleAddBank = async () => {
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
        await api.post(`/sell-module/user/payment-bank`, bankDetails);
        toast.success("Bank added successfully");
        getSavedPaymentBank();
        resetForm();
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
        await api.post(`/sell-module/user/payment-upi`, { upiId });
        toast.success("UPI added successfully");
        getSavedPaymentUpi();
        resetForm();
      } catch (err) {
        toast.error("Failed to submit UPI");
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
                        {paymentUpi.length > 0 &&
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
                                className="custom-radio"
                                style={{ display: "none" }}
                              />
                              <div>
                                UPI ID: <span>{upi?.upiId}</span>
                              </div>
                            </label>
                          ))}
                      </div>

                      {/* + Add UPI card */}
                      <div
                        className={styles.addCard}
                        onClick={() => {
                          setUpiFormOpen(true);
                          setSelectedOption("upi");
                        }}
                      >
                        +
                      </div>

                      {(upiFormOpen || paymentUpi.length === 0) && (
                        <>
                          <div className={styles.InputGroup}>
                            <label>UPI ID*</label>
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                            />
                            <p className={styles.InputHint}>
                              For ex: yourupi@bank
                            </p>
                          </div>

                          <div className={styles.AgreeBox}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => setIsChecked(!isChecked)}
                            />
                            <label>
                              I agree to the QuickMobile Terms and Conditions
                              and certify this info is correct.
                            </label>
                          </div>

                          <button
                            onClick={handleAddBank}
                            disabled={!isChecked}
                            className={styles.SaveButton}
                          >
                            Add UPI
                          </button>
                        </>
                      )}
                    </div>
                  )}
                  {selectedMethod === index && index === 1 && (
                    <div className={styles.DropDown}>
                      <div className={styles.accountBoxes}>
                        {paymentBank.length > 0 &&
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
                                className="custom-radio"
                                style={{ display: "none" }}
                              />
                              <ul>
                                <li>
                                  Acc no : {bank?.bankDetails?.accountNumber}
                                </li>
                                <li>
                                  IFSC Code : {bank?.bankDetails?.ifscCode}
                                </li>
                                <li>
                                  Bank name : {bank?.bankDetails?.bankName}
                                </li>
                                <li>
                                  Beneficiary name :{" "}
                                  {bank?.bankDetails?.beneficiaryName}
                                </li>
                              </ul>
                            </label>
                          ))}
                      </div>

                      {/* + Add Bank card */}
                      <div
                        className={styles.addCard}
                        onClick={() => {
                          setBankFormOpen(true);
                          setSelectedOption("bank");
                        }}
                      >
                        +
                      </div>

                      {(bankFormOpen || paymentBank.length === 0) && (
                        <>
                          {[
                            { key: "accountNumber", label: "Account Number" },
                            {
                              key: "confirmAccountNumber",
                              label: "Confirm Account Number",
                            },
                            { key: "ifscCode", label: "IFSC Code" },
                            { key: "bankName", label: "Bank Name" },
                            {
                              key: "beneficiaryName",
                              label: "Beneficiary Name",
                            },
                            { key: "mobileNumber", label: "Mobile Number" },
                          ].map((field, i) => (
                            <div className={styles.InputGroup} key={i}>
                              <label>{field.label}*</label>
                              <input
                                type="text"
                                value={bankDetails[field.key]}
                                onChange={(e) =>
                                  setBankDetails({
                                    ...bankDetails,
                                    [field.key]: e.target.value,
                                  })
                                }
                              />
                              <p className={styles.InputHint}>For ex:</p>
                            </div>
                          ))}

                          <div className={styles.AgreeBox}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => setIsChecked(!isChecked)}
                            />
                            <label>
                              I agree to the QuickMobile Terms and Conditions
                              and certify this info is correct.
                            </label>
                          </div>

                          <button
                            onClick={handleAddBank}
                            disabled={!isChecked}
                            className={styles.SaveButton}
                          >
                            Save
                          </button>
                        </>
                      )}

                      <div className={styles.Notice}>
                        All Banking Details are saved according to RBI
                        guidelines.
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
