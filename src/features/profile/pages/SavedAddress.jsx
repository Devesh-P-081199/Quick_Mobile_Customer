import { useState } from "react";
import styles from "./SavedAddress.module.css";
import ProfileCard from "../components/ProfileCard";
import MobileCommonHeaderthree from "../../../Components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import {
  FaMapMarkerAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaHome,
  FaBriefcase,
} from "react-icons/fa";

const SavedAddress = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      phone: "+91 9876543210",
      addressLine1: "123 Main Street",
      addressLine2: "Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: true,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: "Home",
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  const handleAddNew = () => {
    setShowAddForm(true);
    setEditingId(null);
    setFormData({
      type: "Home",
      name: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    });
  };

  const handleEdit = (address) => {
    setShowAddForm(true);
    setEditingId(address.id);
    setFormData(address);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter((a) => a.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setAddresses(
        addresses.map((a) =>
          a.id === editingId ? { ...formData, id: a.id } : a
        )
      );
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now() }]);
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

  const getAddressIcon = (type) => {
    switch (type) {
      case "Home":
        return <FaHome />;
      case "Work":
        return <FaBriefcase />;
      default:
        return <FaMapMarkerAlt />;
    }
  };

  return (
    <>
      <MobileCommonHeaderthree title="Saved Addresses" />
      <section className="zero-padding-section">
        <div className={styles.panelWrapper}>
          <div className={styles.left}>
            <div className={styles.header}>
              <h2>Saved Addresses</h2>
              <button className={styles.addBtn} onClick={handleAddNew}>
                <FaPlus /> Add New Address
              </button>
            </div>

            {showAddForm && (
              <div className={styles.formCard}>
                <h3>{editingId ? "Edit Address" : "Add New Address"}</h3>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label>Address Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Address Line 1</label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      placeholder="House No., Building Name"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Address Line 2</label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      placeholder="Road Name, Area, Colony"
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Mumbai"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Maharashtra"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="400001"
                        maxLength="6"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleInputChange}
                      id="isDefault"
                    />
                    <label htmlFor="isDefault">Set as default address</label>
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

            <div className={styles.addressList}>
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <div key={address.id} className={styles.addressCard}>
                    <div className={styles.addressIcon}>
                      {getAddressIcon(address.type)}
                    </div>
                    <div className={styles.addressDetails}>
                      <div className={styles.addressHeader}>
                        <span className={styles.addressType}>
                          {address.type}
                        </span>
                        {address.isDefault && (
                          <span className={styles.defaultBadge}>Default</span>
                        )}
                      </div>
                      <div className={styles.addressName}>{address.name}</div>
                      <div className={styles.addressPhone}>{address.phone}</div>
                      <div className={styles.addressText}>
                        {address.addressLine1}
                        {address.addressLine2 && `, ${address.addressLine2}`}
                      </div>
                      <div className={styles.addressText}>
                        {address.city}, {address.state} - {address.pincode}
                      </div>
                    </div>
                    <div className={styles.addressActions}>
                      <button
                        className={styles.editIconBtn}
                        onClick={() => handleEdit(address)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className={styles.deleteIconBtn}
                        onClick={() => handleDelete(address.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <FaMapMarkerAlt className={styles.emptyIcon} />
                  <h3>No Saved Addresses</h3>
                  <p>Add an address to make checkout faster.</p>
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

export default SavedAddress;
