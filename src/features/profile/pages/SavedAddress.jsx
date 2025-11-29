import { useState, useEffect } from "react";
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
import api from "../../../Utils/api";
import { toast } from "react-toastify";

const SavedAddress = () => {
  const [addresses, setAddresses] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    saveAs: "Home",
    houseNumber: "",
    street: "",
    landmark: "",
    cityName: "",
    zipCode: "",
    state: "",
    alternatePhone: "",
    date: "",
  });

  // Fetch addresses from API
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await api.get("/sell-module/user/address");
      setAddresses(response?.data?.data?.addresses || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Error fetching addresses");
    }
  };

  const handleAddNew = () => {
    setShowAddForm(true);
    setEditingId(null);
    setFormData({
      saveAs: "Home",
      houseNumber: "",
      street: "",
      landmark: "",
      cityName: "",
      zipCode: "",
      state: "",
      alternatePhone: "",
      date: "",
    });
  };

  const handleEdit = (address) => {
    console.log("Editing address:", address);
    const addressId = address._id || address.id;
    console.log("Address ID:", addressId);
    setShowAddForm(true);
    setEditingId(addressId);
    setFormData(address);
  };

  const handleDelete = async (address) => {
    if (confirm("Are you sure you want to delete this address?")) {
      try {
        const addressId = address._id || address.id;
        await api.delete(`/sell-module/user/address/${addressId}`);
        toast.success("Address deleted successfully");
        fetchAddresses();
      } catch (error) {
        console.error("Error deleting address:", error);
        toast.error("Error deleting address");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.houseNumber ||
      !formData.street ||
      !formData.cityName ||
      !formData.zipCode ||
      !formData.state
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      if (editingId) {
        // Update existing address
        await api.put(
          `/sell-module/user/update-address/${editingId}`,
          formData
        );
        toast.success("Address updated successfully");
      } else {
        // Add new address
        await api.post("/sell-module/user/address", formData);
        toast.success("Address added successfully");
      }

      setShowAddForm(false);
      fetchAddresses();

      // Reset form
      setFormData({
        saveAs: "Home",
        houseNumber: "",
        street: "",
        landmark: "",
        cityName: "",
        zipCode: "",
        state: "",
        alternatePhone: "",
        date: "",
      });
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Error saving address");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const getAddressIcon = (saveAs) => {
    switch (saveAs) {
      case "Home":
        return <FaHome />;
      case "Office":
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
              <button className={styles.addBtn} onClick={handleAddNew}>
                <FaPlus /> Add New Address
              </button>
            </div>

            {showAddForm && (
              <div className={styles.formCard}>
                <h3>{editingId ? "Edit Address" : "Add New Address"}</h3>
                {console.log("Form heading - editingId:", editingId)}
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label>Address Type</label>
                    <div className={styles.radioGroup}>
                      <label>
                        <input
                          type="radio"
                          name="saveAs"
                          value="Home"
                          checked={formData.saveAs === "Home"}
                          onChange={handleInputChange}
                        />{" "}
                        Home
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="saveAs"
                          value="Office"
                          checked={formData.saveAs === "Office"}
                          onChange={handleInputChange}
                        />{" "}
                        Office
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="saveAs"
                          value="Other"
                          checked={formData.saveAs === "Other"}
                          onChange={handleInputChange}
                        />{" "}
                        Other
                      </label>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Flat no/House no</label>
                    <input
                      type="text"
                      name="houseNumber"
                      value={formData.houseNumber}
                      onChange={handleInputChange}
                      placeholder="Flat no 9"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Area/Street/Locality</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="Colony name/ Street number"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Landmark</label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      placeholder="Near..."
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Pincode</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="400001"
                        maxLength="6"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>City</label>
                      <input
                        type="text"
                        name="cityName"
                        value={formData.cityName}
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
                  </div>

                  <div className={styles.formGroup}>
                    <label>Alternate Phone Number</label>
                    <input
                      type="tel"
                      name="alternatePhone"
                      value={formData.alternatePhone}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                    />
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
                addresses.map((address, index) => (
                  <div
                    key={address._id || address.id || index}
                    className={styles.addressCard}
                  >
                    <div className={styles.addressIcon}>
                      {getAddressIcon(address.saveAs)}
                    </div>
                    <div className={styles.addressDetails}>
                      <div className={styles.addressHeader}>
                        <span className={styles.addressType}>
                          {address.saveAs}
                        </span>
                      </div>
                      {address.alternatePhone && (
                        <div className={styles.addressPhone}>
                          {address.alternatePhone}
                        </div>
                      )}
                      <div className={styles.addressText}>
                        {address.houseNumber}, {address.street}
                        {address.landmark && `, ${address.landmark}`}
                      </div>
                      <div className={styles.addressText}>
                        {address.cityName}, {address.state} - {address.zipCode}
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
                        onClick={() => handleDelete(address)}
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
