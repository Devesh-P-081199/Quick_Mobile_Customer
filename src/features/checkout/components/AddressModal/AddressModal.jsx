import { useEffect, useState } from "react";
import styles from "./AddressModal.module.css";
import { toast } from "react-toastify";
import api from "../../../../Utils/api";

const AddressModal = ({ isOpen, onClose, editingAddress, onSuccess }) => {
  const [cityName, setCityName] = useState("");
  const statesAddress = [
    { id: 1, name: "Andhra Pradesh" },
    { id: 2, name: "Arunachal Pradesh" },
    { id: 3, name: "Assam" },
    { id: 4, name: "Bihar" },
    { id: 5, name: "Chhattisgarh" },
    { id: 6, name: "Goa" },
    { id: 7, name: "Gujarat" },
    { id: 8, name: "Haryana" },
    { id: 9, name: "Himachal Pradesh" },
    { id: 10, name: "Jammu and Kashmir" },
    { id: 11, name: "Jharkhand" },
    { id: 12, name: "Karnataka" },
    { id: 13, name: "Kerala" },
    { id: 14, name: "Madhya Pradesh" },
    { id: 15, name: "Maharashtra" },
    { id: 16, name: "Manipur" },
    { id: 17, name: "Meghalaya" },
    { id: 18, name: "Mizoram" },
    { id: 19, name: "Nagaland" },
    { id: 20, name: "Odisha" },
    { id: 21, name: "Punjab" },
    { id: 22, name: "Rajasthan" },
    { id: 23, name: "Sikkim" },
    { id: 24, name: "Tamil Nadu" },
    { id: 25, name: "Telangana" },
    { id: 26, name: "Tripura" },
    { id: 27, name: "Uttar Pradesh" },
    { id: 28, name: "Uttarakhand" },
    { id: 29, name: "West Bengal" },
  ];

  const [formData, setFormData] = useState({
    houseNumber: "",
    street: "",
    landmark: "",
    cityName: "",
    zipCode: "",
    state: "",
    alternatePhone: "",
    saveAs: "Home",
    date: "",
    agreement: false,
  });

  useEffect(() => {
    if (editingAddress) {
      setFormData({
        ...editingAddress,
        agreement: false,
      });
      setCityName(editingAddress.cityName || "");
    } else {
      setFormData({
        houseNumber: "",
        street: "",
        landmark: "",
        cityName: "",
        zipCode: "",
        state: "",
        alternatePhone: "",
        saveAs: "Home",
        date: "",
        agreement: false,
      });
      setCityName("");
    }
  }, [editingAddress, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchZipDetails = async (zipcode) => {
    try {
      const response = await api.get(
        `/sell-module/user/getZipDetails/${zipcode}`
      );
      let cityFromZip = response.data[0]?.PostOffice[0].Block || "";
      setCityName(cityFromZip);
      setFormData((prev) => ({ ...prev, cityName: cityFromZip }));
    } catch (error) {
      console.error(error);
      toast.error("Invalid ZIP code or no data found.");
    }
  };

  useEffect(() => {
    if (formData.zipCode.length === 6) {
      fetchZipDetails(formData.zipCode);
    }
  }, [formData.zipCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.houseNumber ||
      !formData.street ||
      !formData.cityName ||
      !formData.zipCode ||
      !formData.state ||
      !formData.agreement
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const addressId = editingAddress?._id || editingAddress?.id;

      if (addressId) {
        await api.put(
          `/sell-module/user/update-address/${addressId}`,
          formData
        );
        toast.success("Address updated successfully");
      } else {
        await api.post("/sell-module/user/address", formData);
        toast.success("Address added successfully");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Error saving address");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{editingAddress ? "Edit Address" : "Add New Address"}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label>Flat no/House no</label>
            <input
              type="text"
              name="houseNumber"
              placeholder="Flat no 9"
              value={formData.houseNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Area/Street/Locality</label>
            <input
              type="text"
              name="street"
              placeholder="Colony name/ Street number"
              value={formData.street}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Landmark</label>
            <input
              type="text"
              name="landmark"
              placeholder="Near..."
              value={formData.landmark}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Pincode</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={(e) => {
                  const zip = e.target.value;
                  if (/^\d{0,6}$/.test(zip)) {
                    setFormData((prev) => ({ ...prev, zipCode: zip }));
                  }
                }}
                placeholder="400001"
                maxLength="6"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>City</label>
              {cityName ? (
                <input
                  type="text"
                  name="cityName"
                  value={formData.cityName}
                  readOnly
                />
              ) : (
                <input
                  type="text"
                  value=""
                  disabled
                  placeholder="City will appear after entering pincode"
                />
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select State
                </option>
                {statesAddress.map((state) => (
                  <option key={state.id} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Alternate Phone Number</label>
              <input
                type="tel"
                name="alternatePhone"
                placeholder="+91 9876543210"
                value={formData.alternatePhone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.radioGroup}>
            <span>Save as:</span>
            <label>
              <input
                type="radio"
                name="saveAs"
                value="Home"
                checked={formData.saveAs === "Home"}
                onChange={handleInputChange}
              />
              Home
            </label>
            <label>
              <input
                type="radio"
                name="saveAs"
                value="Office"
                checked={formData.saveAs === "Office"}
                onChange={handleInputChange}
              />
              Office
            </label>
            <label>
              <input
                type="radio"
                name="saveAs"
                value="Other"
                checked={formData.saveAs === "Other"}
                onChange={handleInputChange}
              />
              Other
            </label>
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

          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleInputChange}
                required
              />
              <span>
                I agree to sell my item in conformity with the{" "}
                <a href="#">Trade-in Terms and Conditions</a> and certify that
                the information I have entered is correct.
              </span>
            </label>
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {editingAddress ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
