import { useEffect, useState } from 'react';
import styles from './PaymentOptions.module.css';
import { toast } from 'react-toastify';
import api from '../../../Utils/api';

const PaymentOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [paymentBank, setPaymentBank] = useState([]);
  const [paymentUpi, setPaymentUpi] = useState([]);
  const [selectedUpiIndex, setSelectedUpiIndex] = useState(null);
  const [selectedBankIndex, setSelectedBankIndex] = useState(null);
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [isUpiOpen, setIsUpiOpen] = useState(false);
  const [editingBankId, setEditingBankId] = useState('');
  const [editingUpiId, setEditingUpiId] = useState('');

  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    confirmAccountNumber: '',
    beneficiaryName: '',
    mobileNumber: '',
    ifscCode: '',
    bankName: '',
  });

  const [upiId, setUpiId] = useState('');

  const handleBankChange = (e) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };

  const handleUpiChange = (e) => {
    setUpiId(e.target.value);
  };

  const resetForm = () => {
    setBankDetails({
      accountNumber: '',
      confirmAccountNumber: '',
      beneficiaryName: '',
      mobileNumber: '',
      ifscCode: '',
      bankName: '',
    });
    setUpiId('');
    setEditingBankId('');
    setEditingUpiId('');
    setIsBankOpen(false);
    setIsUpiOpen(false);
  };

  const handleSubmit = async () => {

    if (selectedOption === 'bank') {
      setIsBankOpen(true);
      const {
        accountNumber,
        confirmAccountNumber,
        beneficiaryName,
        mobileNumber,
        ifscCode,
        bankName,
      } = bankDetails;

      if (!accountNumber || !confirmAccountNumber || !beneficiaryName || !mobileNumber || !ifscCode || !bankName) {
        toast.warning('Please fill all fields');
        return;
      }

      if (accountNumber !== confirmAccountNumber) {
        toast.warning('Account numbers do not match');
        return;
      }

      try {
        if (editingBankId) {
          await api.put(
            `/sell-module/user/payment-bank/${editingBankId}`,
            bankDetails
          );
          toast.success('Bank details updated');
        } else {
          await api.post(
            `/sell-module/user/payment-bank`,
            bankDetails
          );
          toast.success('Bank added successfully');
        }
        getSavedPaymentBank();
        resetForm();
      } catch (err) {
        toast.error('Failed to submit bank details');
      }
    }

    if (selectedOption === 'upi') {
      if (!upiId) {
        toast.warning('Please enter a UPI ID');
        return;
      }

      try {
        if (editingUpiId) {
          await api.put(
            `/sell-module/user/payment-upi/${editingUpiId}`,
            { upiId }
          );
          toast.success('UPI updated successfully');
        } else {
          await api.post(
            `/sell-module/user/payment-upi`,
            { upiId }
          );
          toast.success('UPI added successfully');
        }
        getSavedPaymentUpi();
        resetForm();
      } catch (err) {
        toast.error('Failed to submit UPI');
      }
    }
  };

  const getSavedPaymentBank = async () => {
    try {

      const res = await api.get(`/sell-module/user/payment-bank`);
      setPaymentBank(res.data?.bankMethods || []);
    } catch (err) {
      toast.error('Failed to fetch bank methods');
    }
  };

  const getSavedPaymentUpi = async () => {
    try {
      const res = await api.get(`/sell-module/user/payment-upi`);
      setPaymentUpi(res.data?.upiMethods || []);
    } catch (err) {
      toast.error('Failed to fetch UPI methods');
    }
  };

  useEffect(() => {
    getSavedPaymentBank();
    getSavedPaymentUpi();
  }, []);

  const handleDeleteBank = async (id) => {
    try {
      await api.delete(`/sell-module/user/payment-bank/${id}`);
      toast.success('Bank deleted');
      getSavedPaymentBank();
      setSelectedBankIndex(null);
    } catch (err) {
      toast.error('Failed to delete bank');
    }
  };

  const handleDeleteUpi = async (id) => {
    try {

      await api.delete(`/sell-module/user/payment-upi/${id}`);
      toast.success('UPI deleted');
      getSavedPaymentUpi();
      setSelectedUpiIndex(null);
    } catch (err) {
      toast.error('Failed to delete UPI');
    }
  };

  const handleEditBank = (index) => {
    const bankToEdit = paymentBank[index];
    setBankDetails(bankToEdit.bankDetails);
    setEditingBankId(bankToEdit._id);
    setIsBankOpen(true);
  };

  const handleEditUpi = (index) => {
    const upiToEdit = paymentUpi[index];
    setUpiId(upiToEdit.upiId);
    setEditingUpiId(upiToEdit._id);
    setIsUpiOpen(true);
  };

  const toggleOption = (option) => {
    setSelectedOption(prev => (prev === option ? null : option));
    resetForm();
  };

  return (
    <div className={`${styles.addressContainer} scrollbar-hidden`}>
      <div className={styles.left}>
        <div>
          <div className={styles.toggleBox}>
            <button className={styles.optionButton} onClick={() => toggleOption('bank')}>
              Bank
            </button>
            <button className={styles.optionButton} onClick={() => toggleOption('upi')}>
              UPI
            </button>
          </div>

          {selectedOption === 'bank' && (
            <div className={styles.formBox}>
              <h2 className={styles.heading}>Bank Accounts</h2>
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
                        <button onClick={() => handleEditBank(index)}>Edit</button>
                        <button onClick={() => handleDeleteBank(bank._id)}>Delete</button>
                      </div>
                    )}
                  </div>
                ))}
                <div className={styles.cardAdd} onClick={() => setIsBankOpen(!isBankOpen)}>
                  <span>+</span>
                  <p>{isBankOpen ? 'Discard' : 'Add Bank'}</p>
                </div>
              </div>

              {isBankOpen && (
                <div>
                  <div className={styles.inputGrid}>
                    {[
                      ['Account Number', 'accountNumber'],
                      ['Confirm Account Number', 'confirmAccountNumber'],
                      ['Beneficiary Name', 'beneficiaryName'],
                      ['Mobile Number', 'mobileNumber'],
                      ['IFSC Code', 'ifscCode'],
                      ['Bank Name', 'bankName'],
                    ].map(([label, name]) => (
                      <div key={name} className={styles.inputGroup}>
                        <label>{label}</label>
                        <input name={name} value={bankDetails[name]} onChange={handleBankChange} />
                      </div>
                    ))}
                  </div>
                  <button className={styles.addbutton} onClick={handleSubmit}>
                    {editingBankId ? 'Update Bank' : 'Add Bank'}
                  </button>
                </div>
              )}
            </div>
          )}

          {selectedOption === 'upi' && (
            <div className={styles.formBox}>
              <h2 className={styles.heading}>UPI Methods</h2>
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
                        <button onClick={() => handleEditUpi(index)}>Edit</button>
                        <button onClick={() => handleDeleteUpi(upi._id)}>Delete</button>
                      </div>
                    )}
                  </div>
                ))}
                <div className={styles.cardAdd} onClick={() => setIsUpiOpen(!isUpiOpen)}>
                  <span>+</span>
                  <p>{isUpiOpen ? 'Discard' : 'Add UPI'}</p>
                </div>
              </div>

              {isUpiOpen && (
                <div className={styles.inputGroup}>
                  <label>UPI ID</label>
                  <input value={upiId} onChange={handleUpiChange} />
                  <button className={styles.addbutton} onClick={handleSubmit}>
                    {editingUpiId ? 'Update UPI' : 'Add UPI'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
