{
  // import React, { useEffect, useState } from 'react';
  // import styles from './PaymentOptions.module.css';
  // import axios from 'axios';
  // import { toast } from 'react-toastify';
  // const PaymentOptions = () => {
  //   const [selectedOption, setSelectedOption] = useState(null);
  //   const [paymentBank, setPaymentBank] = useState([]);
  //   const [paymentUpi, setPaymentUpi] = useState([]);
  //   const [selectedUpiIndex, setSelectedUpiIndex] = useState(null);
  //   const [selectedBankIndex, setSelectedBankIndex] = useState(null);
  //   const [isBankOpen, setIsBankOpen] = useState(false);
  //   const [isUpiOpen, setIsUpiOpen] = useState(false);
  //   const [editingBankId, setEditingBankId] = useState('')
  //   const [editingUpiId, setEditingUpiId] = useState('')
  //   const [bankDetails, setBankDetails] = useState({
  //     accountNumber: '',
  //     confirmAccountNumber: '',
  //     beneficiaryName: '',
  //     mobileNumber: '',
  //     ifscCode: '',
  //     bankName: '',
  //   });
  //   const [upiId, setUpiId] = useState('');
  //   const handleBankChange = (e) => {
  //     setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  //   };
  //   const handleUpiChange = (e) => {
  //     setUpiId(e.target.value);
  //   };
  //   const handleSubmit = async () => {
  //     if (selectedOption === 'bank') {
  //       setIsBankOpen(true)
  //       const {
  //         accountNumber,
  //         confirmAccountNumber,
  //         beneficiaryName,
  //         mobileNumber,
  //         ifscCode,
  //         bankName,
  //       } = bankDetails;
  //       if (
  //         !accountNumber ||
  //         !confirmAccountNumber ||
  //         !beneficiaryName ||
  //         !mobileNumber ||
  //         !ifscCode ||
  //         !bankName
  //       ) {
  //         alert('Please fill all the fields');
  //         return;
  //       }
  //       if (accountNumber !== confirmAccountNumber) {
  //         alert('Account numbers do not match');
  //         return;
  //       }
  //       try {
  //         if (editingBankId) {
  //           const resp = await axios.put(
  //             `http://localhost:8080/api/sell-module/user/payment-bank/680248846f15af3e95132c80/${editingBankId}`,
  //             bankDetails
  //           );
  //           toast.success('Bank details updated successfully!');
  //         } else {
  //           const resp = await axios.post(
  //             'http://localhost:8080/api/sell-module/user/payment-bank/680248846f15af3e95132c80',
  //             bankDetails
  //           );
  //           toast.success('Bank details submitted successfully!');
  //         }
  //         getSavedPaymentBank();
  //         resetForm(); // After submit
  //       } catch (error) {
  //         toast.error('Failed to submit/update bank details.');
  //       }
  //     }
  //     if (selectedOption === 'upi') {
  //       if (!upiId) {
  //         alert('Please enter your UPI ID');
  //         return;
  //       }
  //       try {
  //         if (editingUpiId) {
  //           await axios.put(
  //             `http://localhost:8080/api/sell-module/user/payment-upi/680248846f15af3e95132c80/${editingUpiId}`,
  //             { upiId }
  //           );
  //           toast.success('UPI ID updated successfully!');
  //         } else {
  //           await axios.post(
  //             'http://localhost:8080/api/sell-module/user/payment-upi/680248846f15af3e95132c80',
  //             { upiId }
  //           );
  //           toast.success('UPI ID submitted successfully!');
  //         }
  //         getSavedPaymentUpi();
  //         resetForm();
  //       } catch (error) {
  //         toast.error('Failed to submit/update UPI ID.');
  //       }
  //     }
  //   };
  //   const getSavedPaymentBank = async () => {
  //     try {
  //       const resp = await axios.get(
  //         'http://localhost:8080/api/sell-module/user/payment-bank/680248846f15af3e95132c80'
  //       );
  //       console.log(resp.data);
  //       setPaymentBank(resp.data?.bankMethods);
  //     } catch (error) {
  //       console.error('Error fetching saved addresses:', error);
  //     }
  //   };
  //   useEffect(() => {
  //     getSavedPaymentBank();
  //   }, []);
  //   const getSavedPaymentUpi = async () => {
  //     try {
  //       const resp = await axios.get(
  //         'http://localhost:8080/api/sell-module/user/payment-upi/680248846f15af3e95132c80'
  //       );
  //       console.log(resp.data);
  //       setPaymentUpi(resp.data?.upiMethods);
  //     } catch (error) {
  //       console.error('Error fetching saved addresses:', error);
  //     }
  //   };
  //   useEffect(() => {
  //     getSavedPaymentUpi();
  //   }, []);
  //   const toggleOption = (option) => {
  //     setSelectedOption((prev) => (prev === option ? null : option));
  //   };
  //   const toggleBank = () => {
  //     // if (isEditing) {
  //     //   setIsEditing(false);
  //     //   setEditingBankId(null);
  //     //   resetForm();
  //     // }
  //     setIsBankOpen(!isBankOpen);
  //   };
  //   const toggleUpi = () => {
  //     // if (isEditing) {
  //     //   setIsEditing(false);
  //     //   setEditingBankId(null);
  //     //   resetForm();
  //     // }
  //     setIsUpiOpen(!isUpiOpen);
  //   };
  //   const handleDeleteUpi = async (id) => {
  //     console.log("ID for UPI : ", id)
  //     try {
  //       const response = await axios.delete(
  //         `http://localhost:8080/api/sell-module/user/payment-upi/680248846f15af3e95132c80/${id}`
  //       );
  //       console.log(response.data);
  //       toast.success('UPI details deleted successfully')
  //       getSavedPaymentUpi();
  //       setSelectedUpiIndex(null);
  //     } catch (error) {
  //       console.error('Error deleting UPI details :', error);
  //       toast.error('Failed to delete UPI details')
  //     }
  //   };
  //   const handleDeleteBank = async (id) => {
  //     console.log("ID for Bank : ", id)
  //     try {
  //       const response = await axios.delete(
  //         `http://localhost:8080/api/sell-module/user/payment-bank/680248846f15af3e95132c80/${id}`
  //       );
  //       console.log(response.data);
  //       toast.success('Bank details deleted successfully')
  //       getSavedPaymentBank();
  //       setSelectedBankIndex(null);
  //     } catch (error) {
  //       console.error('Error deleting Bank Details:', error);
  //       toast.error('Failed to delete Bank Details')
  //     }
  //   };
  //   const handleEditBank = (index) => {
  //     const bankToEdit = paymentBank[index];
  //     setBankDetails(bankToEdit.bankDetails);
  //     setEditingBankId(bankToEdit._id);
  //     setIsBankOpen(true);
  //   };
  //   const handleEditUpi = (index) => {
  //     const upiToEdit = paymentUpi[index];
  //     setUpiId(upiToEdit.upiId);
  //     setEditingUpiId(upiToEdit._id);
  //     setIsUpiOpen(true);
  //   };
  //   const resetForm = () => {
  //     setBankDetails({
  //       accountNumber: '',
  //       confirmAccountNumber: '',
  //       beneficiaryName: '',
  //       mobileNumber: '',
  //       ifscCode: '',
  //       bankName: '',
  //     });
  //     setUpiId('');
  //     setEditingBankId('');
  //     setEditingUpiId('');
  //     setIsBankOpen(false);
  //     setIsUpiOpen(false);
  //   };
  //   const renderForm = () => {
  //     if (selectedOption === 'bank') {
  //       return (
  //         <div className={styles.formBox}>
  //           <h2 className={styles.heading}>Account Details</h2>
  //           {paymentBank?.map((bank, index) => (
  //             <div
  //               key={index}
  //               className="relative flex flex-row justify-center items-center p-5 gap-20 bg-gray-100 rounded-lg w-[165px] h-[149px]"
  //             >
  //               <input
  //                 type="radio"
  //                 name="bank"
  //                 className="absolute left-4 top-4 w-4 h-4"
  //                 value={index}
  //                 checked={selectedBankIndex === index}
  //                 onChange={() => setSelectedBankIndex(index)}
  //               />
  //               <div className="absolute left-4 top-[45px] flex flex-col items-start p-0 gap-1 text-left">
  //                 {/* <p>UPI Id : {upi.upiId}</p> */}
  //                 <p>Acc No :  {bank.bankDetails.accountNumber}</p>
  //                 <p>Bank Name :  {bank.bankDetails.bankName}</p>
  //                 <p>IFSC code :  {bank.bankDetails.ifscCode}</p>
  //               </div>
  //               {/* Conditionally show buttons */}
  //               {selectedBankIndex === index && (
  //                 <div className="mt-4 absolute bottom-2 left-4 flex gap-2">
  //                   <button
  //                     type="button"
  //                     className={styles.editbutton}
  //                     onClick={() => handleEditBank(index)}
  //                   >
  //                     Edit
  //                   </button>
  //                   <button
  //                     type="button"
  //                     className={styles.deletebutton}
  //                     onClick={() => handleDeleteBank(bank._id)}
  //                   >
  //                     Delete
  //                   </button>
  //                 </div>
  //               )}
  //             </div>
  //           ))}
  //           {/* Add New Address Card */}
  //           <div>
  //             <div
  //               onClick={toggleBank}
  //               className="relative flex flex-col justify-center items-center p-5 gap-2 bg-gray-100 rounded-lg w-[165px] h-[149px] cursor-pointer"
  //             >
  //               <span className="text-[50px] text-gray-500">+</span>
  //               <span className="text-[16px] text-gray-500">
  //                 {isBankOpen ? 'Discard' : 'Add New Bank'}
  //               </span>
  //             </div>
  //           </div>
  //           {isBankOpen ? (
  //             <>
  //               <div className={styles.inputGrid}>
  //                 <p className={styles.labelGroup}>Beneficiary Details*</p>
  //                 {[
  //                   ['Account Number*', 'accountNumber'],
  //                   ['Confirm Account No*', 'confirmAccountNumber'],
  //                   ['Beneficiary Name*', 'beneficiaryName'],
  //                   ['Mobile Number*', 'mobileNumber'],
  //                   ['IFSC Code*', 'ifscCode'],
  //                   ['Bank Name*', 'bankName'],
  //                 ].map(([label, name]) => (
  //                   <div className={styles.inputGroup} key={name}>
  //                     <label>{label}</label>
  //                     <input
  //                       name={name}
  //                       value={bankDetails[name]}
  //                       onChange={handleBankChange}
  //                     />
  //                   </div>
  //                 ))}
  //               </div>
  //               <div className={styles.infoBox}>
  //                 <span className={styles.lockIcon}>🔒</span>
  //                 Your account is securely protected and completely safe with us.
  //               </div>
  //               <button className={styles.addbutton} onClick={handleSubmit}>
  //                 {editingBankId ? 'Update Account' : 'Add Account'}
  //               </button>
  //             </>
  //           ) : null}
  //         </div>
  //       );
  //     }
  //     if (selectedOption === 'upi') {
  //       return (
  //         <div className={styles.formBox}>
  //           <h2 className={styles.heading}>Account Details</h2>
  //           {paymentUpi?.map((upi, index) => (
  //             <div
  //               key={index}
  //               className="relative flex flex-row justify-center items-center p-5 gap-20 bg-gray-100 rounded-lg w-[165px] h-[149px]"
  //             >
  //               <input
  //                 type="radio"
  //                 name="upi"
  //                 className="absolute left-4 top-4 w-4 h-4"
  //                 value={index}
  //                 checked={selectedUpiIndex === index}
  //                 onChange={() => setSelectedUpiIndex(index)}
  //               />
  //               <div className="absolute left-4 top-[45px] flex flex-col items-start p-0 gap-1 text-left">
  //                 <p>UPI Id : {upi.upiId}</p>
  //               </div>
  //               {/* Conditionally show buttons */}
  //               {selectedUpiIndex === index && (
  //                 <div className="mt-4 absolute bottom-2 left-4 flex gap-2">
  //                   <button
  //                     type="button"
  //                     className={styles.editbutton}
  //                     onClick={() => handleEditUpi(index)}
  //                   >
  //                     Edit
  //                   </button>
  //                   <button
  //                     type="button"
  //                     className={styles.deletebutton}
  //                     onClick={() => handleDeleteUpi(upi._id)}
  //                   >
  //                     Delete
  //                   </button>
  //                 </div>
  //               )}
  //             </div>
  //           ))}
  //           <div>
  //             <div
  //               onClick={toggleUpi}
  //               className="relative flex flex-col justify-center items-center p-5 gap-2 bg-gray-100 rounded-lg w-[165px] h-[149px] cursor-pointer"
  //             >
  //               <span className="text-[50px] text-gray-500">+</span>
  //               <span className="text-[16px] text-gray-500">
  //                 {isUpiOpen ? 'Discard' : 'Add New Upi'}
  //               </span>
  //             </div>
  //           </div>
  //           {isUpiOpen ? (
  //             <div className="">
  //               <p className={styles.labelGroup}>Beneficiary Details*</p>
  //               <div className={styles.inputGroup}>
  //                 <label>UPI ID*</label>
  //                 <input value={upiId} onChange={handleUpiChange} />
  //               </div>
  //               <div className={styles.infoBox}>
  //                 Your UPI ID typically follows the format: mobile@bank or username@bank.
  //               </div>
  //               <button className={styles.addbutton} onClick={handleSubmit}>
  //                 {editingBankId ? 'Update Account' : 'Add Account'}
  //               </button>
  //             </div>
  //           ) : null}
  //         </div>
  //       );
  //     }
  //     return null;
  //   };
  //   return (
  //     <div className={styles.wrapper}>
  //       <h1 className={styles.title}>Saved Payments</h1>
  //       <div className={styles.optionList}>
  //         <div
  //           className={`${styles.option} ${selectedOption === 'bank' ? styles.active : ''}`}
  //           onClick={() => toggleOption('bank')}
  //         >
  //           <span>Bank Transfer</span>
  //           <span>{selectedOption === 'bank' ? '˄' : '›'}</span>
  //         </div>
  //         {selectedOption === 'bank' && renderForm()}
  //         <div
  //           className={`${styles.option} ${selectedOption === 'upi' ? styles.active : ''}`}
  //           onClick={() => toggleOption('upi')}
  //         >
  //           <span>UPI</span>
  //           <span>{selectedOption === 'upi' ? '˄' : '›'}</span>
  //         </div>
  //         {selectedOption === 'upi' && renderForm()}
  //       </div>
  //     </div>
  //   );
  // };
  // export default PaymentOptions;
}
import React, { useEffect, useState } from "react";
import styles from "./PaymentOptions.module.css";
import { toast } from "react-toastify";

import ProfileCard from "../ProfileCard";
import api from "../../../../Utils/api";
import MobileCommonHeaderthree from "../../../components/layout/MobileCommonHeader/MobileCommonHeaderthree";
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
            bankDetails
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
