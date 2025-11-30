import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "./AddressForm.module.css";
import { toast } from "react-toastify";
import api from "../../../../Utils/api";
import MobileCommonHeaderthree from "../../../../Components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import BreadCrumb from "../../../../components/layout/BreadCrumb/BreadCrumb";

const AddressForm = () => {
  const navigate = useNavigate();
  const { slug, addressId } = useParams();
  const location = useLocation();
  const editingAddress = location.state?.address;
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
    name: "",
    email: "",
    houseNumber: "",
    street: "",
    landmark: "",
    cityName: "",
    zipCode: "",
    state: "",
    alternatePhone: "",
    saveAs: "Home",
    customAddressType: "",
    date: "",
    agreement: true,
  });

  useEffect(() => {
    if (editingAddress) {
      setFormData({
        ...editingAddress,
        agreement: true,
      });
      setCityName(editingAddress.cityName || "");
    }
  }, [editingAddress]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchZipDetails = useCallback(async (zipcode) => {
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
  }, []);

  useEffect(() => {
    if (formData.zipCode.length === 6) {
      fetchZipDetails(formData.zipCode);
    }
  }, [formData.zipCode, fetchZipDetails]);

  const handleSubmit = async () => {
    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.houseNumber ||
        !formData.street ||
        !formData.cityName ||
        !formData.zipCode ||
        !formData.state ||
        !formData.agreement ||
        (formData.saveAs === "Other" && !formData.customAddressType)
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      const editAddressId =
        editingAddress?._id || editingAddress?.id || addressId;

      // Prepare data to send - use customAddressType if "Other" is selected
      const dataToSend = {
        ...formData,
        saveAs:
          formData.saveAs === "Other"
            ? formData.customAddressType
            : formData.saveAs,
      };

      if (editAddressId) {
        await api.put(
          `/sell-module/user/update-address/${editAddressId}`,
          dataToSend
        );
        toast.success("Address updated successfully");
      } else {
        await api.post("/sell-module/user/address", dataToSend);
        toast.success("Address added successfully");
      }

      // Check if we're coming from profile/saved-address or checkout
      if (location.pathname.includes("/profile/saved-address")) {
        navigate("/profile/saved-address");
      } else {
        navigate(`/${slug}/check-out`);
      }
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Error saving address");
    }
  };

  return (
    <>
      <BreadCrumb items={["Home", "Sell Your Phone"]} />
      <MobileCommonHeaderthree
        title={editingAddress ? "Edit Address" : "Add Address"}
      />
      <section className={`${styles.addressFormSection} mobile-pt-section`}>
        <div className={styles.formContainer}>
          <div className={styles.formContent}>
            {/* Flat no/House no */}
            <div className={styles.inputContainer}>
              <label className={styles.topLabel}>Name</label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className={styles.input}
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            {/* Email */}
            <div className={styles.inputContainer}>
              <label className={styles.topLabel}>Email</label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className={styles.input}
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            {/* Flat no/House no */}
            <div className={styles.inputContainer}>
              <label className={styles.topLabel}>Flat no/House no</label>
              <input
                type="text"
                name="houseNumber"
                placeholder="Flat no/House no"
                className={styles.input}
                value={formData.houseNumber}
                onChange={handleInputChange}
              />
            </div>

            {/* Area/Street/Locality */}
            <div className={styles.inputContainer}>
              <label className={styles.topLabel}>Area/Street/Locality</label>
              <input
                type="text"
                name="street"
                placeholder="Area/Street/Locality"
                className={styles.input}
                value={formData.street}
                onChange={handleInputChange}
              />
            </div>

            {/* Landmark */}
            <div className={styles.inputContainer}>
              <label className={styles.topLabel}>Landmark</label>
              <input
                type="text"
                name="landmark"
                placeholder="near..."
                className={styles.input}
                value={formData.landmark}
                onChange={handleInputChange}
              />
            </div>

            {/* Zip Code */}
            <div className={styles.inputContainer}>
              <label className={styles.topLabel}>Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={(e) => {
                  const zip = e.target.value;
                  if (/^\d{0,6}$/.test(zip)) {
                    setFormData((prev) => ({
                      ...prev,
                      zipCode: zip,
                    }));
                  }
                }}
                placeholder="Zip Code"
                className={styles.input}
                required
              />
            </div>

            {/* City */}
            <div className={styles.inputContainer}>
              <label className={styles.topLabel}>City</label>
              {cityName ? (
                <input
                  type="text"
                  name="cityName"
                  value={formData.cityName}
                  readOnly
                  className={styles.input}
                />
              ) : (
                <input
                  type="text"
                  name="city"
                  value=""
                  readOnly
                  placeholder="City will appear after entering pincode"
                  className={`${styles.input} ${styles.disabledInput}`}
                  style={{
                    backgroundColor: "#f5f5f5",
                    color: "#999",
                    cursor: "not-allowed",
                    WebkitTextFillColor: "#999",
                    WebkitOpacity: 1,
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>

            {/* State */}
            <div className={styles.inputContainer}>
              <label className={styles.topLabel}>State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={`${styles.input} ${
                  !formData.state ? styles.placeholderSelect : ""
                }`}
              >
                <option value="">Select State</option>
                {statesAddress.map((state) => (
                  <option key={state.id} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Alternate Phone Number */}
            <div className={styles.inputContainer}>
              <label className={styles.topLabel}>Alternate Phone Number</label>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="10"
                name="alternatePhone"
                placeholder="Alternate Phone Number"
                className={styles.input}
                value={formData.alternatePhone}
                onChange={handleInputChange}
              />
            </div>

            {/* Save as (Radio Buttons as Buttons) */}
            <div className={styles.saveAsContainer}>
              <span className={styles.saveAsLabel}>Save as:</span>
              <div className={styles.radioButtonGroup}>
                <label
                  className={`${styles.radioButton} ${
                    formData.saveAs === "Home" ? styles.radioButtonSelected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="saveAs"
                    value="Home"
                    checked={formData.saveAs === "Home"}
                    onChange={handleInputChange}
                    className={styles.hiddenRadio}
                  />
                  Home
                </label>
                <label
                  className={`${styles.radioButton} ${
                    formData.saveAs === "Office"
                      ? styles.radioButtonSelected
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="saveAs"
                    value="Office"
                    checked={formData.saveAs === "Office"}
                    onChange={handleInputChange}
                    className={styles.hiddenRadio}
                  />
                  Office
                </label>
                <label
                  className={`${styles.radioButton} ${
                    formData.saveAs === "Other"
                      ? styles.radioButtonSelected
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="saveAs"
                    value="Other"
                    checked={formData.saveAs === "Other"}
                    onChange={handleInputChange}
                    className={styles.hiddenRadio}
                  />
                  Other
                </label>
              </div>
            </div>

            {/* Custom Address Type Input (shown when "Other" is selected) */}
            {formData.saveAs === "Other" && (
              <div className={styles.inputContainer}>
                <label className={styles.topLabel}>Specify Address Type</label>
                <input
                  type="text"
                  name="customAddressType"
                  placeholder="e.g., Friend's Place, Vacation Home"
                  className={styles.input}
                  value={formData.customAddressType}
                  onChange={handleInputChange}
                  required
                />
              </div>
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
                  className={`custom-radio custom-2-radio ${styles.addressVerifyRadio}`}
                />
                <span className={styles.checkboxText}>
                  I agree to sell my item in conformity with the{" "}
                  <a href="#">Trade-in Terms and Conditions</a> and certify that
                  the information I have entered is correct.
                </span>
              </label>
            </div>
          </div>

          {/* Sticky Bottom Buttons */}
          <div className={styles.stickyBottom}>
            <button className={styles.submitButton} onClick={handleSubmit}>
              {editingAddress ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddressForm;
