import React, { useContext, useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import RightCard from "./RightCard";
import { toast } from "react-toastify";
import { UserContext } from "../../../../Context/contextAPI";
import api from "../../../../Utils/api";
import BreadCrumb from "../../../../components/layout/BreadCrumb/BreadCrumb";
// import MobileCommonHeadertwo from "../../../../components/layout/MobileCommonHeader/MobileCommonHeadertwo";
import MobileCommonHeaderthree from "../../../../components/layout/MobileCommonHeader/MobileCommonHeaderthree";
// import BreadCrumb from "../BreadCrumb/BreadCrumb";

function CheckOut() {
  const [address, setAddress] = useState([]);
  const navigate = useNavigate();
  const { slug } = useParams();

  const { selectedAddress, setSelectedAddress } = useContext(UserContext);
  const [cities, setCities] = useState([]);
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

  // State for the new address form
  const [newAddress, setNewAddress] = useState({
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
    date: "",
    agreement: false,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Fetch existing addresses
  const fetchAddress = async () => {
    try {
      const resp = await api.get("/sell-module/user/address");
      setAddress(resp?.data.data?.addresses || []);
    } catch (error) {
      console.error("Error fetching address:", error);
      toast.error("Error fetching address");
    }
  };

  // Handle edit address
  const handleEdit = (address) => {
    const addressId = address._id || address.id;
    navigate(`/${slug}/check-out/edit-address/${addressId}`, {
      state: { address },
    });
  };

  // Submit new address
  const submitAddress = async () => {
    try {
      // Validate required fields
      if (
        !newAddress.name ||
        !newAddress.email ||
        !newAddress.houseNumber ||
        !newAddress.street ||
        !newAddress.cityName ||
        !newAddress.zipCode ||
        !newAddress.state ||
        !newAddress.agreement
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      const formData = newAddress;

      // console.log("New dat",formData);

      const response = await api.post("/sell-module/user/address", formData);

      toast.success("Address added successfully");
      setFromOpen(false);
      fetchAddress(); // Refresh the address list

      // Reset form
      setNewAddress({
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
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Error adding address");
    }
  };

  useEffect(() => {
    fetchAddress();
    // Clear any previously selected address when component mounts
    console.log("Clearing selectedAddress on mount");
    setSelectedAddress(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debug: Log selectedAddress changes
  useEffect(() => {
    console.log("selectedAddress changed:", selectedAddress);
  }, [selectedAddress]);

  return (
    <>
      <BreadCrumb items={["Home", "Sell Your Phone"]} />
      <MobileCommonHeaderthree title="Address" />
      <section className={`${styles.CheckOutSection} mobile-pt-section `}>
        <div className={styles.Wrapper}>
          <div className={styles.LeftContainer}>
            <div className={styles.addressBoxes}>
              <button className={styles.addBtn} onClick={handleAddNew}>
                <FaPlus /> Add New Address
              </button>
              <div className={styles.addressList}>
                {address?.length > 0 ? (
                  <>
                    {address.map((item, index) => (
                      <label
                        key={index}
                        className={`${styles.addressCard} ${selectedAddress?.id === item.id
                          ? styles.selectedCard
                          : ""
                          }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          className={styles.radioInput}
                          onChange={() => setSelectedAddress(item)}
                          checked={
                            selectedAddress !== null &&
                            (selectedAddress?.id === item.id ||
                              selectedAddress?._id === item._id)
                          }
                        />
                        <span className={styles.customRadio}></span>
                        <div className={styles.addressContent}>
                          <span className={styles.saveTag}>{item?.saveAs}</span>
                          <p>
                            {item?.houseNumber}, {item?.street},{item?.landmark}
                          </p>
                          <p>
                            {item?.cityName}, {item?.state} - {item?.zipCode}
                          </p>
                          <p>{item?.alternatePhone}</p>
                        </div>
                      </label>
                    ))}

                    {/* + Box as last card */}
                    <div
                      className={`${styles.addressCard} ${styles.addNewCard}`}
                      onClick={() => setShowForm(!showForm)}
                    >
                      <div className={styles.plusIcon}>+</div>
                    </div>
                  </>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
            {(address?.length === 0 || showForm) && (
              <div className={styles.AddressBox}>
                <h3>Add Address</h3>
                <div className={styles.FormBox}>
                  {/* Flat no/House no */}
                  <div className={styles.inputContainer}>
                    <label className={styles.topLabel}>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className={styles.input}
                      value={newAddress.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <label className={styles.topLabel}>E-mail</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="E-mail"
                      className={styles.input}
                      value={newAddress.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <label className={styles.topLabel}>Flat no/House no</label>
                    <input
                      type="text"
                      name="houseNumber"
                      placeholder="Flat no/House no"
                      className={styles.input}
                      value={newAddress.houseNumber}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Area/Street/Locality */}
                  <div className={styles.inputContainer}>
                    <label className={styles.topLabel}>
                      Area/Street/Locality
                    </label>
                    <input
                      type="text"
                      name="street"
                      placeholder="Area/Street/Locality"
                      className={styles.input}
                      value={newAddress.street}
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
                      value={newAddress.landmark}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* City & Zip Code & State & Alternate Phone */}
                  <div className={styles.inputContainerGroup}>
                    <div
                      className={` ${styles.gridBoxes}"grid grid-cols-2 gap-4 w-full "`}
                    >
                      {/* City */}
                      <div className={styles.inputContainer}>
                        <label className={styles.topLabel}>Zip Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={newAddress.zipCode}
                          onChange={(e) => {
                            const zip = e.target.value;
                            if (/^\d{0,6}$/.test(zip)) {
                              setNewAddress((prev) => ({
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
                      <div className={styles.inputContainer}>
                        <label className={styles.topLabel}>City</label>
                        {cityName ? (
                          <input
                            type="text"
                            name="cityName"
                            value={newAddress.cityName}
                            readOnly
                            className={styles.input}
                          />
                        ) : (
                          <input
                            type="text"
                            name="city"
                            value=""
                            disabled
                            placeholder="City will appear after entering pincode"
                            className={styles.input}
                          />
                        )}
                      </div>

                      {/* Zip Code */}

                      {/* State */}
                      <div className={styles.inputContainer}>
                        <label className={styles.topLabel}>State</label>
                        <select
                          name="state"
                          value={newAddress.state}
                          onChange={handleInputChange}
                          className={styles.input}
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

                      {/* Alternate Phone Number */}
                      <div className={styles.inputContainer}>
                        <label className={styles.topLabel}>
                          Alternate Phone Number
                        </label>
                        <input
                          type="number"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength="10"
                          name="alternatePhone"
                          placeholder="Alternate Phone Number"
                          className={styles.input}
                          value={newAddress.alternatePhone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save as (Radio Buttons) */}
                  <div className={styles.inputContainer2}>
                    <span className={styles.label}>Save as:</span>
                    <label>
                      <input
                        type="radio"
                        name="saveAs"
                        value="Home"
                        checked={newAddress.saveAs === "Home"}
                        onChange={handleInputChange}
                      />{" "}
                      Home
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="saveAs"
                        value="Office"
                        checked={newAddress.saveAs === "Office"}
                        onChange={handleInputChange}
                      />{" "}
                      Office
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="saveAs"
                        value="Other"
                        checked={newAddress.saveAs === "Other"}
                        onChange={handleInputChange}
                      />{" "}
                      Other
                    </label>
                  </div>

                  {/* Date */}
                 
                  {/* Agreement */}
                  <div className={styles.inputContainer}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="agreement"
                        checked={newAddress.agreement}
                        onChange={handleInputChange}
                        required
                        className={`custom-radio custom-2-radio ${styles.addressVerifyRadio}`}
                      />
                      <span className={styles.checkboxText}>
                        I agree to sell my item in conformity with the{" "}
                        <a href="#">Trade-in Terms and Conditions</a> and
                        certify that the information I have entered is correct.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.submitButton}
                      onClick={async () => {
                        await submitAddress();
                        setShowForm(false); // close form after submit
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <RightCard />
        </div>
      </section>
    </>
  );
}

export default CheckOut;
