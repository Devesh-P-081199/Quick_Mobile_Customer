import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./PaymentForm.module.css";
import { toast } from "react-toastify";
import api from "../../../../Utils/api";
import MobileCommonHeaderthree from "../../../../components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import BreadCrumb from "../../../../components/layout/BreadCrumb/BreadCrumb";

const PaymentForm = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [formData, setFormData] = useState({
    paymentType: "UPI",
    upiId: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    bankName: "",
    beneficiaryName: "",
    mobileNumber: "",
    agreement: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.agreement) {
        toast.error("Please agree to the terms and conditions");
        return;
      }

      if (formData.paymentType === "UPI") {
        if (!formData.upiId) {
          toast.error("Please enter UPI ID");
          return;
        }

        await api.post("/sell-module/user/payment-upi", {
          upiId: formData.upiId,
        });
        toast.success("UPI added successfully");
      } else {
        if (
          !formData.accountNumber ||
          !formData.confirmAccountNumber ||
          !formData.ifscCode ||
          !formData.bankName ||
          !formData.beneficiaryName ||
          !formData.mobileNumber
        ) {
          toast.error("Please fill all required fields");
          return;
        }

        if (formData.accountNumber !== formData.confirmAccountNumber) {
          toast.error("Account numbers do not match");
          return;
        }

        await api.post("/sell-module/user/payment-bank", {
          accountNumber: formData.accountNumber,
          confirmAccountNumber: formData.confirmAccountNumber,
          ifscCode: formData.ifscCode,
          bankName: formData.bankName,
          beneficiaryName: formData.beneficiaryName,
          mobileNumber: formData.mobileNumber,
        });
        toast.success("Bank details added successfully");
      }

      navigate(`/${slug}/check-out/payment`);
    } catch (error) {
      console.error("Error saving payment method:", error);
      toast.error("Error saving payment method");
    }
  };

  return (
    <>
      <BreadCrumb items={["Home", "Sell Your Phone"]} />
      <MobileCommonHeaderthree title="Add Payment Method" />
      <section className={`${styles.paymentFormSection} mobile-pt-section`}>
        <div className={styles.formContainer}>
          <div className={styles.formContent}>
            {/* Payment Type Selection */}
            <div className={styles.paymentTypeContainer}>
              <span className={styles.paymentTypeLabel}>Payment Type:</span>
              <div className={styles.radioButtonGroup}>
                <label
                  className={`${styles.radioButton} ${
                    formData.paymentType === "UPI"
                      ? styles.radioButtonSelected
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentType"
                    value="UPI"
                    checked={formData.paymentType === "UPI"}
                    onChange={handleInputChange}
                    className={styles.hiddenRadio}
                  />
                  UPI
                </label>
                <label
                  className={`${styles.radioButton} ${
                    formData.paymentType === "Bank"
                      ? styles.radioButtonSelected
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentType"
                    value="Bank"
                    checked={formData.paymentType === "Bank"}
                    onChange={handleInputChange}
                    className={styles.hiddenRadio}
                  />
                  Bank Transfer
                </label>
              </div>
            </div>

            {/* UPI Form */}
            {formData.paymentType === "UPI" && (
              <div className={styles.inputContainer}>
                <label className={styles.topLabel}>UPI ID</label>
                <input
                  type="text"
                  name="upiId"
                  placeholder="yourname@upi"
                  className={styles.input}
                  value={formData.upiId}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {/* Bank Form */}
            {formData.paymentType === "Bank" && (
              <>
                <div className={styles.inputContainer}>
                  <label className={styles.topLabel}>Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Account Number"
                    className={styles.input}
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.topLabel}>
                    Confirm Account Number
                  </label>
                  <input
                    type="text"
                    name="confirmAccountNumber"
                    placeholder="Confirm Account Number"
                    className={styles.input}
                    value={formData.confirmAccountNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.topLabel}>IFSC Code</label>
                  <input
                    type="text"
                    name="ifscCode"
                    placeholder="IFSC Code"
                    className={styles.input}
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.topLabel}>Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    placeholder="Bank Name"
                    className={styles.input}
                    value={formData.bankName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.topLabel}>Beneficiary Name</label>
                  <input
                    type="text"
                    name="beneficiaryName"
                    placeholder="Beneficiary Name"
                    className={styles.input}
                    value={formData.beneficiaryName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.topLabel}>Mobile Number</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    className={styles.input}
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}

            {/* Agreement */}
            <div className={styles.inputContainer}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleInputChange}
                  required
                />
                <span className={styles.checkboxText}>
                  I agree to the QuickMobile{" "}
                  <a href="#">Terms and Conditions</a> and certify that the
                  information I have entered is correct.
                </span>
              </label>
            </div>
          </div>

          {/* Sticky Bottom Button */}
          <div className={styles.stickyBottom}>
            <button className={styles.submitButton} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentForm;
