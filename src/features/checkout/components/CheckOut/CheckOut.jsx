// import React, { useContext, useEffect, useState } from "react";
// import styles from "./Checkout.module.css";
// import RightCard from "./RightCard";
// import { toast } from "react-toastify";
// import { UserContext } from "../../Context/contextAPI";
// import api from "../../Utils/api";
// import axios from 'axios'
// import BreadCrumb from "../../Common/BreadCrumb/BreadCrumb";
// // import BreadCrumb from "../BreadCrumb/BreadCrumb";

// function CheckOut() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [address, setAddress] = useState([]);
//   const [fromOpen, setFromOpen] = useState(false);
//   const { setSelectedAddress } = useContext(UserContext);
//   const [cities, setCities] = useState([]);
//   const [cityName, setCityName] = useState('');
//   const statesAddress = [
//     { id: 1, name: 'Andhra Pradesh' },
//     { id: 2, name: 'Arunachal Pradesh' },
//     { id: 3, name: 'Assam' },
//     { id: 4, name: 'Bihar' },
//     { id: 5, name: 'Chhattisgarh' },
//     { id: 6, name: 'Goa' },
//     { id: 7, name: 'Gujarat' },
//     { id: 8, name: 'Haryana' },
//     { id: 9, name: 'Himachal Pradesh' },
//     { id: 10, name: 'Jammu and Kashmir' },
//     { id: 11, name: 'Jharkhand' },
//     { id: 12, name: 'Karnataka' },
//     { id: 13, name: 'Kerala' },
//     { id: 14, name: 'Madhya Pradesh' },
//     { id: 15, name: 'Maharashtra' },
//     { id: 16, name: 'Manipur' },
//     { id: 17, name: 'Meghalaya' },
//     { id: 18, name: 'Mizoram' },
//     { id: 19, name: 'Nagaland' },
//     { id: 20, name: 'Odisha' },
//     { id: 21, name: 'Punjab' },
//     { id: 22, name: 'Rajasthan' },
//     { id: 23, name: 'Sikkim' },
//     { id: 24, name: 'Tamil Nadu' },
//     { id: 25, name: 'Telangana' },
//     { id: 26, name: 'Tripura' },
//     { id: 27, name: 'Uttar Pradesh' },
//     { id: 28, name: 'Uttarakhand' },
//     { id: 29, name: 'West Bengal' },

//   ];

//   // State for the new address form
//   const [newAddress, setNewAddress] = useState({
//     houseNumber: "",
//     street: "",
//     landmark: "",
//     cityName: "",
//     zipCode: "",
//     state: "",
//     alternatePhone: "",
//     saveAs: "Home",
//     date: "",
//     agreement: false,
//   });

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewAddress((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Fetch existing addresses
//   const fetchAddress = async () => {
//     try {
//       const resp = await api.get("/sell-module/user/address");
//       setAddress(resp?.data.data?.addresses || []);
//     } catch (error) {
//       console.error("Error fetching address:", error);
//       toast.error("Error fetching address");
//     }
//   };

//   const getCities = async () => {
//     try {
//       const response = await api.get(`/common-module/view-cities`);
//       // console.log("Cities data", response.data);

//       setCities(response.data.data);
//     } catch (error) {
//       console.error(error);
//       toast.error("Error in fetching Cities");
//     }
//   };

//   // Submit new address
//   const submitAddress = async () => {
//     try {
//       // Validate required fields
//       if (
//         !newAddress.houseNumber ||
//         !newAddress.street ||
//         !newAddress.cityName ||
//         !newAddress.zipCode ||
//         !newAddress.state ||
//         !newAddress.agreement
//       ) {
//         toast.error("Please fill all required fields");
//         return;
//       }

//       const formData = newAddress;

//       // console.log("New dat",formData);

//       console.log("BEFORE SENDING : ", formData)
//       const response = await api.post("/sell-module/user/address", formData);
//       console.log("Address ---->>>", response.data);

//       toast.success("Address added successfully");
//       setFromOpen(false);
//       fetchAddress(); // Refresh the address list

//       // Reset form
//       setNewAddress({
//         houseNumber: "",
//         street: "",
//         landmark: "",
//         cityName: "",
//         zipCode: "",
//         state: "",
//         alternatePhone: "",
//         saveAs: "Home",
//         date: "",
//         agreement: false,
//       });
//     } catch (error) {
//       console.error("Error adding address:", error);
//       toast.error("Error adding address");
//     }
//   };

//   useEffect(() => {
//     fetchAddress();
//     getCities();
//   }, []);

//   useEffect(() => {
//     if (newAddress.zipCode.length === 6) {
//       fetchZipDetails(newAddress.zipCode);
//     }
//   }, [newAddress.zipCode]);

//   const fetchZipDetails = async (zipcode) => {
//     // console.log("API IS CALLED FOR BACKEND ")
//     try {
//       const response = await axios.get(`http://localhost:8080/api/sell-module/user/getZipDetails/${zipcode}`)
//       // console.log(response.data[0]?.PostOffice)
//       let cityFromZip = response.data[0]?.PostOffice[0].Block || '';
//       setCityName(cityFromZip);
//       setNewAddress({ ...newAddress, cityName: cityFromZip })
//     } catch (error) {
//       console.error(error)
//       toast.error("Invalid ZIP code or no data found.");
//     }
//   }

//   return (
//     <>
//       <BreadCrumb items={["Home", "Sell Your Phone"]} />

//       <section className={styles.CheckOutSection}>
//         <div className={styles.Wrapper}>
//           <div className={styles.LeftContainer}>
//             <h2>Checkout</h2>
//             <div className="address-heading">
//               <h4 className="w-[279px] h-[26px] font-medium text-[20px] leading-[26px] text-center text-black">
//                 Confirm your shipping address
//               </h4>
//               <p className="edit-shipping-address-btn">Edit shipping address</p>
//             </div>

//             <div className={styles.AddressBoxes}>
//               <div className="flex flex-col justify-center items-start p-0 gap-5">
//                 <div className="flex flex-row items-start p-0 gap-4 w-full flex-wrap">
//                   {address?.length > 0 ? (
//                     address.map((item, index) => (
//                       <div
//                         key={index}
//                         className="relative flex flex-row justify-center items-center p-5 gap-2 bg-gray-200 rounded-lg w-[165px] h-[149px]"
//                       >
//                         <input
//                           type="radio"
//                           name="address"
//                           className="absolute left-4 top-4 w-4 h-4"
//                           onChange={() => setSelectedAddress(item)}
//                         />
//                         <div className="absolute left-4 top-[45px] flex flex-col items-start p-0 gap-1">
//                           <p className="text-[14px] leading-[18px] text-black">
//                             {item?.houseNumber} {item?.city}
//                           </p>
//                           <p className="text-[14px] leading-[18px] text-black">
//                             {item?.street} - {item?.zipCode}
//                           </p>
//                           <p className="text-[14px] leading-[18px] text-black">
//                             {item?.state}
//                           </p>
//                         </div>
//                         <button className="absolute left-16 transform -translate-x-1/2 top-3 bg-black text-white text-xs font-medium px-2 py-1 rounded-md p-3">
//                           {item?.saveAs}
//                         </button>
//                       </div>
//                     ))
//                   ) : (
//                     <p></p>
//                   )}
//                   {/* <div>
//                   <div
//                     onClick={() => setFromOpen(!fromOpen)}
//                     className="relative flex flex-col justify-center items-center p-5 gap-2 bg-gray-100 rounded-lg w-[165px] h-[149px] cursor-pointer"
//                   >
//                     <span className="text-[50px] text-gray-500">+</span>
//                     <span className="text-[16px] text-gray-500">
//                       Add Address
//                     </span>
//                   </div>
//                 </div> */}
//                 </div>
//               </div>
//             </div>

//             <div className={styles.AddressBox}>
//               <h3>Add New Address</h3>
//               <div className={styles.FormBox}>
//                 {/* Flat no/House no */}
//                 <div className={styles.inputContainer}>
//                   <input
//                     type="text"
//                     name="houseNumber"
//                     placeholder="Flat no/House no"
//                     className={styles.input}
//                     value={newAddress.houseNumber}
//                     onChange={handleInputChange}
//                   />
//                   <div className={styles.labelContainer}>
//                     <span className={styles.label}>For ex: Flat no 9</span>
//                   </div>
//                 </div>

//                 {/* Area/Street/Locality */}
//                 <div className={styles.inputContainer}>
//                   <input
//                     type="text"
//                     name="street"
//                     placeholder="Area/Street/Locality"
//                     className={styles.input}
//                     value={newAddress.street}
//                     onChange={handleInputChange}
//                   />
//                   <div className={styles.labelContainer}>
//                     <span className={styles.label}>
//                       For ex: Colony name/ Street number
//                     </span>
//                   </div>
//                 </div>

//                 {/* Landmark */}
//                 <div className={styles.inputContainer}>
//                   <input
//                     type="text"
//                     name="landmark"
//                     placeholder="Landmark"
//                     className={styles.input}
//                     value={newAddress.landmark}
//                     onChange={handleInputChange}
//                   />
//                   <div className={styles.labelContainer}>
//                     <span className={styles.label}>
//                       For ex: Landmark near your house
//                     </span>
//                   </div>
//                 </div>

//                 {/* City (Dropdown) */}
//                 <div className={styles.inputContainerGroup}>
//                   <div className="grid grid-cols-2 gap-4 w-full">

//                     {/* City & Zip Code */}

//                     {/* City (auto-filled and read-only after valid pincode) */}
//                     <div className={styles.inputContainer}>
//                       {cityName ? (
//                         <input
//                           type="text"
//                           name="cityName"
//                           value={newAddress.cityName}
//                           readOnly
//                           className={styles.input}
//                         />

//                       ) : (
//                         <input
//                           type="text"
//                           name="city"
//                           value=""
//                           disabled
//                           placeholder="City will appear after entering pincode"
//                           className={styles.input}
//                         />
//                       )}
//                     </div>

//                     {/* Zip Code */}
//                     <div className={styles.inputContainer}>
//                       <input
//                         type="text"
//                         name="zipCode"
//                         value={newAddress.zipCode}
//                         onChange={(e) => {
//                           const zip = e.target.value;
//                           if (/^\d{0,6}$/.test(zip)) {
//                             setNewAddress((prev) => ({ ...prev, zipCode: zip }));
//                           }
//                         }}
//                         placeholder="Zip Code"
//                         className={styles.input}
//                         required
//                       />
//                     </div>

//                     {/* State */}
//                     <div className={styles.inputContainer}>
//                       <select
//                         name="state"
//                         value={newAddress.state}
//                         onChange={handleInputChange}
//                         className={styles.input}
//                       >
//                         <option value="" disabled>Select State</option>
//                         {statesAddress.map((state) => (
//                           <option key={state.id} value={state.name}>
//                             {state.name}
//                           </option>
//                         ))}
//                       </select>

//                     </div>

//                     {/* Alternate Phone Number */}
//                     <div className={styles.inputContainer}>
//                       <input
//                         type="text"
//                         name="alternatePhone"
//                         placeholder="Alternate Phone Number"
//                         className={styles.input}
//                         value={newAddress.alternatePhone}
//                         onChange={handleInputChange}
//                       />
//                       <div className={styles.labelContainer}>
//                         <span className={styles.label}>For ex: 0987654321</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Save as (Radio Buttons) */}
//                 <div className={styles.inputContainer2}>
//                   <span className={styles.label}>Save as:</span>
//                   <label>
//                     <input
//                       type="radio"
//                       name="saveAs"
//                       value="Home"
//                       checked={newAddress.saveAs === "Home"}
//                       onChange={handleInputChange}
//                     />{" "}
//                     Home
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="saveAs"
//                       value="Office"
//                       checked={newAddress.saveAs === "Office"}
//                       onChange={handleInputChange}
//                     />{" "}
//                     Office
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="saveAs"
//                       value="Other"
//                       checked={newAddress.saveAs === "Other"}
//                       onChange={handleInputChange}
//                     />{" "}
//                     Other
//                   </label>
//                 </div>

//                 {/* Date */}
//                 <div className={styles.inputContainer}>
//                   <input
//                     type="date"
//                     className={styles.input}
//                     name="date"
//                     value={newAddress.date}
//                     onChange={handleInputChange}
//                   />
//                   <div className={styles.labelContainer}>
//                     <span className={styles.label}>For ex: 01-01-2001</span>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-gray-500">
//                     We need to have the following information to complete the
//                     transaction. You must be at least 18 years old in order to
//                     trade in your device.
//                   </p>
//                 </div>

//                 {/* Agreement (Radio Button) */}
//                 <div className={styles.inputContainer}>
//                   <label className="flex i-agree">
//                     <input
//                       type="checkbox"
//                       name="agreement"
//                       checked={newAddress.agreement}
//                       onChange={handleInputChange}
//                       required
//                     />
//                     <span className="ps-2 text-gray-500 text-[14px]">
//                       I agree to sell my item in conformity with the{" "}
//                       <a href="#">Trade-in Terms and Conditions</a> and certify
//                       that the information I have entered is correct.
//                     </span>
//                   </label>
//                 </div>

//                 {/* Submit Button */}
//                 <div className={styles.buttonContainer}>
//                   <button
//                     className={styles.submitButton}
//                     onClick={submitAddress}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <RightCard />
//         </div>
//       </section>
//     </>

//   );
// }

// export default CheckOut;

import React, { useContext, useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import RightCard from "./RightCard";
import { toast } from "react-toastify";
import { UserContext } from "../../../../Context/contextAPI";
import api from "../../../../Utils/api";
import axios from "axios";
import BreadCrumb from "../../../../components/layout/BreadCrumb/BreadCrumb";
import MobileCommonHeadertwo from "../../../../components/layout/MobileCommonHeader/MobileCommonHeadertwo";
import MobileCommonHeaderthree from "../../../../components/layout/MobileCommonHeader/MobileCommonHeaderthree";
// import BreadCrumb from "../BreadCrumb/BreadCrumb";

function CheckOut() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState([]);
  const [fromOpen, setFromOpen] = useState(false);
  // Add this new state
  const [showForm, setShowForm] = useState(false);

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

  const getCities = async () => {
    try {
      const response = await api.get(`/common-module/view-cities`);
      // console.log("Cities data", response.data);

      setCities(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Error in fetching Cities");
    }
  };

  // Submit new address
  const submitAddress = async () => {
    try {
      // Validate required fields
      if (
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
    getCities();
  }, []);

  useEffect(() => {
    if (newAddress.zipCode.length === 6) {
      fetchZipDetails(newAddress.zipCode);
    }
  }, [newAddress.zipCode]);

  const fetchZipDetails = async (zipcode) => {
    // console.log("API IS CALLED FOR BACKEND ")
    try {
      const response = await api.get(
        `/sell-module/user/getZipDetails/${zipcode}`
      );
      // console.log(response.data[0]?.PostOffice)
      let cityFromZip = response.data[0]?.PostOffice[0].Block || "";
      setCityName(cityFromZip);
      setNewAddress({ ...newAddress, cityName: cityFromZip });
    } catch (error) {
      console.error(error);
      toast.error("Invalid ZIP code or no data found.");
    }
  };

  return (
    <>
      <BreadCrumb items={["Home", "Sell Your Phone"]} />
      <MobileCommonHeaderthree title="Checkout" />
      {/* <section className= {`${styles.StepSix} mobile-pt-section `}></section> */}
      <section className={`${styles.CheckOutSection} mobile-pt-section `}>
        <div className={styles.Wrapper}>
          <div className={styles.LeftContainer}>
            <h2>Checkout</h2>
            <div className="address-heading">
              <h4 className="w-[279px] h-[26px] font-medium text-[20px] leading-[26px] text-left text-black">
                Confirm Pickup Address
              </h4>
              <p className="edit-shipping-address-btn">Edit shipping address</p>
            </div>

            <div className={styles.addressBoxes}>
              <div className={styles.addressList}>
                {address?.length > 0 ? (
                  <>
                    {address.map((item, index) => (
                      <label
                        key={index}
                        className={`${styles.addressCard} ${
                          selectedAddress?.id === item.id
                            ? styles.selectedCard
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          className={styles.radioInput}
                          onChange={() => setSelectedAddress(item)}
                        />
                        <span className={styles.customRadio}></span>
                        <div className={styles.addressContent}>
                          <p>
                            {item?.houseNumber} {item?.city}
                          </p>
                          <p>
                            {item?.street} - {item?.zipCode}
                          </p>
                          <p>{item?.state}</p>
                        </div>
                        <span className={styles.saveTag}>{item?.saveAs}</span>
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
                  <p>No address found</p>
                )}
              </div>
            </div>
            {(address?.length === 0 || showForm) && (
              <div className={styles.AddressBox}>
                <h3>Add Address</h3>
                <div className={styles.FormBox}>
                  {/* Flat no/House no */}
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
                  <div className={styles.inputContainer}>
                    <label className={styles.topLabel}>Date</label>
                    <input
                      type="date"
                      className={styles.input}
                      name="date"
                      value={newAddress.date}
                      onChange={handleInputChange}
                    />
                  </div>

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
