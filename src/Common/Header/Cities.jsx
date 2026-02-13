// import React, { useState, useEffect, useContext, useMemo } from 'react'
// import debounce from "lodash.debounce"
// import styles from "./Header.module.css";
// import { UserContext } from '../../Context/contextAPI';
// import api from "../../Utils/api";
// import { toast } from "react-toastify";
// import { BiSearch } from "react-icons/bi";
// import locationIcon from "../../assets/QuickSellNewIcons/location.svg";
// import { useNavigate } from 'react-router-dom';
// import Cookies from "js-cookie";

// import locationdot from "../../assets/icons/locationicon.svg"

// const Cities = () => {
//     const navigate = useNavigate();
//     const [cities, setCities] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedCity, setSelectedCity] = useState(null);

//     const { isModalOpen, toggleModal, setUserSelection, userSelection,setIsModalOpen } = useContext(UserContext)

//     const handleSearchChange = (e) => {
//         const value = e.target.value.trimStart();
//         setSearchTerm(value);
//         debouncedSearch(value);
//     };

//     const handleCitySelect = (city) => {
//         const updatedSelection = {
//             ...userSelection,
//             cityName: city.cityName,
//             cityId: city._id,
//         };

//         // Compare with previous selection
//         if (city._id !== userSelection?.cityId) {
//             setUserSelection(updatedSelection);
//             navigate("/"); // navigate to homepage only if changed
//             toggleModal();
//         } else {
//             setUserSelection(updatedSelection); // still update in case
//         }

//         // Optionally save to cookies
//         Cookies.set("userSelection", JSON.stringify(updatedSelection), {
//             expires: 2,
//             sameSite: "strict",
//         });
//         setIsModalOpen(false); // Close modal after selection
//     };

//     const debouncedSearch = debounce((value) => {
//         getCities(value);
//     }, 300);

//     const debouncedSearchMain = useMemo(
//         () =>
//             debounce((value) => {
//                 handleMainSearch(value);
//             }, 300),
//         []
//     );

//     const getCities = async (search = "") => {
//         try {
//             const response = await api.get("/common-module/view-cities", {
//                 params: { search },
//             });
//             setCities(response.data?.data);
//             // console.log("Cities fetched:", response.data);
//         } catch (error) {
//             console.error(error);
//             toast.error("Error in fetching Cities");
//         }
//     };

//     useEffect(() => {
//         getCities();
//     }, []);

//     useEffect(() => {
//         return () => {
//             debouncedSearchMain.cancel();
//         };
//     }, [debouncedSearchMain]);
//     return (
//         // <div>
//         <>

//             {isModalOpen && (
//                 <>
//                     <div className={styles.modalBackdrop}></div>
//                     <div className={styles.modal}>
//                         <div className={styles.modalHeader}>
//                             <h2 onClick={toggleModal}>Select Your City</h2>
//                             <button onClick={toggleModal}>✖</button>
//                         </div>
//                         <p className={styles.modalDescription}>
//                             Changing your location might affect delivery options, prices,
//                             and availability.
//                         </p>

//                         <div className={styles.modalSearch}>
//                             <label>Search your city or enter pincode</label>
//                             <div className={styles.inputContainer}>
//                                 <div className={styles.modalInputWrapper}>
//                                     <input
//                                         type="text"
//                                         placeholder="Search your city"
//                                         value={searchTerm}
//                                         onChange={handleSearchChange}
//                                     />
//                                     <BiSearch size={20} />
//                                 </div>
//                                 <div className={styles.locationDetectButton}>
//                                     <img src={locationdot} alt="" />
//                                     Detect My Location
//                                 </div>
//                             </div>
//                         </div>

//                         <h3 className={styles.modalCityHeading}>Popular Cities</h3>
//                         <div className={styles.cityGrid}>
//                             {cities.slice(0, 8).map((city, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => handleCitySelect(city)}
//                                     className={`${styles.cityButton} ${selectedCity === city ? styles.selectedCity : ""
//                                         }`}
//                                 >
//                                     <img
//                                         src={city?.cityIcon || locationIcon}
//                                         alt={city?.cityName || "City Icon"}
//                                         className={styles.cityIcon}
//                                     />
//                                     {city?.cityName}
//                                 </button>
//                             ))}
//                         </div>
//                         <h3 className={styles.modalCityHeading}>All Cities</h3>

//                         <div className={styles.cityGrid2}>
//                             {cities.map((city, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => handleCitySelect(city)}
//                                     className={`${styles.cityButton} ${selectedCity === city ? styles.selectedCity : ""
//                                         }`}
//                                 >
//                                     {city?.cityName}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 </>
//             )}
//             {/* </div> */}
//         </>
//     )
// }

// export default Cities
import React, { useState, useEffect, useContext, useMemo } from "react";
import debounce from "lodash.debounce";
import styles from "./Header.module.css";
import { UserContext } from "../../Context/contextAPI";
import api from "../../Utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import crossicon from "../../assets/QuickSellNewIcons/Cross.svg";
import searchicon from "../../assets/QuickSellNewIcons/Search.svg";
import locationdot from "../../assets/icons/locationdot.png";
import locationIcon from "../../assets/QuickSellNewIcons/location.svg";

const Cities = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedSource, setSelectedSource] = useState(""); // "popular" or "all"

  const {
    isModalOpen,
    toggleModal,
    setUserSelection,
    userSelection,
    setIsModalOpen,
  } = useContext(UserContext);

  // Restore from cookies on mount
  useEffect(() => {
    const savedSelection = Cookies.get("userSelection");
    if (savedSelection) {
      try {
        const parsed = JSON.parse(savedSelection);
        setSelectedCity({
          _id: parsed.cityId,
          cityName: parsed.cityName,
        });
        setSelectedSource("all");
        setUserSelection(parsed); // sync with context
      } catch (err) {
        console.error("Failed to parse saved city:", err);
      }
    }
  }, [setUserSelection]);

  const handleSearchChange = (e) => {
    const value = e.target.value.trimStart();
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleCitySelect = (city, source) => {
    setSelectedCity(city);
    setSelectedSource(source);

    const updatedSelection = {
      ...userSelection,
      cityName: city.cityName,
      cityId: city._id,
    };

    // Compare with previous selection
    if (city._id !== userSelection?.cityId) {
      setUserSelection(updatedSelection);
      toggleModal();
    } else {
      setUserSelection(updatedSelection);
    }

    // Save to cookies
    Cookies.set("userSelection", JSON.stringify(updatedSelection), {
      expires: 2,
      sameSite: "strict",
    });

    setIsModalOpen(false); // close modal
  };

  const debouncedSearch = debounce((value) => {
    getCities(value);
  }, 300);

  const debouncedSearchMain = useMemo(
    () =>
      debounce((value) => {
        handleMainSearch(value);
      }, 300),
    []
  );

  const getCities = async (search = "") => {
    try {

      let params = {};

      if (/^\d{6}$/.test(search)) {
        params.pincode = search;
      } else if (search) {
        params.search = search;
      }

      const response = await api.get("/common-module/view-cities", {
        params,
      });
      setCities(response.data?.data);
    } catch (error) {
      console.error(error);
      toast.error("Error in fetching Cities");
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearchMain.cancel();
    };
  }, [debouncedSearchMain]);

  return (
    <>
      {isModalOpen && (
        <>
          <div className={styles.modalBackdrop}></div>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 onClick={toggleModal}>Choose Location</h2>
              <button onClick={toggleModal}>
                <img src={crossicon} alt="close" />
              </button>
            </div>

            <p className={styles.modalDescription}>
              Changing your location might affect delivery options, prices, and
              availability.
            </p>

            <div className={styles.modalSearch}>
              <div className={styles.inputContainer}>
                <div className={styles.modalInputWrapper}>
                  <input
                    type="text"
                    placeholder="Search your city"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <img src={searchicon} alt="search" height={"28px"} />
                </div>
                <div className={styles.locationDetectButton}>
                  <img src={locationdot} alt="detect" height={"28px"} />
                  Detect My Location
                </div>
              </div>
            </div>

            {/* <h3 className={styles.modalCityHeading}>Popular Cities</h3>
            <div className={styles.cityGrid}>
              {cities.slice(0, 8).map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleCitySelect(city, "popular")}
                  className={`${styles.cityButton} ${selectedCity?._id === city._id &&
                      selectedSource === "popular"
                      ? styles.popularSelectedCity
                      : ""
                    }`}
                >
                  <img
                    src={city?.cityIcon || locationIcon}
                    alt={city?.cityName || "City Icon"}
                    className={styles.cityIcon}
                  />
                  <span
                    className={
                      selectedCity?._id === city._id &&
                        selectedSource === "popular"
                        ? styles.popularSelectedCityName
                        : styles.selectedCityName
                    }
                  >
                    {city?.cityName}
                  </span>
                </button>
              ))}
            </div> */}

            <h3 className={styles.modalCityHeading}>Other Cities</h3>
            <div className={styles.cityGrid2}>
              {cities.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleCitySelect(city, "all")}
                  className={`${styles.cityButton} ${selectedCity?._id === city._id &&
                      selectedSource === "all"
                      ? styles.allSelectedCity
                      : ""
                    }`}
                >
                  {city?.cityName}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cities;
