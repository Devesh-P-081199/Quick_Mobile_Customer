import { useState } from "react";
import styles from "./PaymentOptions.module.css";
import ProfileCard from "../components/ProfileCard";
import MobileCommonHeaderthree from "../../../Components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import { FaCreditCard, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const PaymentOptions = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      type: "Credit Card",
      cardNumber: "**** **** **** 1234",
      cardHolder: "John Doe",
      expiryDate: "12/25",
      isDefault: true,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: "Credit Card",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
  });

  const handleAddNew = () => {
    setShowAddForm(true);
    setEditingId(null);
    setFormData({
      type: "Credit Card",
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      isDefault: false,
    });
  };

  const handleEdit = (payment) => {
    setShowAddForm(true);
    setEditingId(payment.id);
    setFormData(payment);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this payment method?")) {
      setPayments(payments.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setPayments(
        payments.map((p) =>
          p.id === editingId ? { ...formData, id: p.id } : p
        )
      );
    } else {
      setPayments([...payments, { ...formData, id: Date.now() }]);
    }
    setShowAddForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <>
      <MobileCommonHeaderthree title="Payment Options" />
      <section className="zero-padding-section">
        <div className={styles.panelWrapper}>
          <div className={styles.left}>
            <div className={styles.header}>
              <h2>Payment Options</h2>
              <button className={styles.addBtn} onClick={handleAddNew}>
                <FaPlus /> Add Payment Method
              </button>
            </div>

            {showAddForm && (
              <div className={styles.formCard}>
                <h3>
                  {editingId ? "Edit Payment Method" : "Add Payment Method"}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label>Payment Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="UPI">UPI</option>
                    </select>
                  </div>

                  {(formData.type === "Credit Card" ||
                    formData.type === "Debit Card") && (
                    <>
                      <div className={styles.formGroup}>
                        <label>Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          required
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Card Holder Name</label>
                        <input
                          type="text"
                          name="cardHolder"
                          value={formData.cardHolder}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label>Expiry Date</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            maxLength="5"
                            required
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label>CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength="3"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleInputChange}
                      id="isDefault"
                    />
                    <label htmlFor="isDefault">
                      Set as default payment method
                    </label>
                  </div>

                  <div className={styles.formActions}>
                    <button type="submit" className={styles.saveBtn}>
                      {editingId ? "Update" : "Save"}
                    </button>
                    <button
                      type="button"
                      className={styles.cancelBtn}
                      onClick={() => setShowAddForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className={styles.paymentsList}>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <div key={payment.id} className={styles.paymentCard}>
                    <div className={styles.cardIcon}>
                      <FaCreditCard />
                    </div>
                    <div className={styles.cardDetails}>
                      <div className={styles.cardType}>{payment.type}</div>
                      <div className={styles.cardNumber}>
                        {payment.cardNumber}
                      </div>
                      <div className={styles.cardHolder}>
                        {payment.cardHolder}
                      </div>
                      {payment.expiryDate && (
                        <div className={styles.cardExpiry}>
                          Expires: {payment.expiryDate}
                        </div>
                      )}
                      {payment.isDefault && (
                        <span className={styles.defaultBadge}>Default</span>
                      )}
                    </div>
                    <div className={styles.cardActions}>
                      <button
                        className={styles.editIconBtn}
                        onClick={() => handleEdit(payment)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className={styles.deleteIconBtn}
                        onClick={() => handleDelete(payment.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <FaCreditCard className={styles.emptyIcon} />
                  <h3>No Payment Methods Added</h3>
                  <p>Add a payment method to make checkout faster.</p>
                </div>
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
