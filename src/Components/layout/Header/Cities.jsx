import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import debounce from "lodash.debounce";
import styles from "./Header.module.css";
import { UserContext } from "../../../Context/contextAPI";
import api from "../../../Utils/api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import crossicon from "../../../assets/QuickSellNewIcons/Cross.svg";
import searchicon from "../../../assets/QuickSellNewIcons/Search.svg";
import locationdot from "../../../assets/icons/locationdot.png";
import locationIcon from "../../../assets/QuickSellNewIcons/Location.svg";

// Import city images - Popular Cities
import MumbaiImg from "../../../assets/images/Cities/Mumbai.svg";
import DelhiImg from "../../../assets/images/Cities/Delhi.svg";
import BangaloreImg from "../../../assets/images/Cities/Bangalore.svg";
import KolkataImg from "../../../assets/images/Cities/Kolkata.svg";
import ChennaiImg from "../../../assets/images/Cities/Chennai.svg";
import HyderabadImg from "../../../assets/images/Cities/Hyderabad.svg";
import PuneImg from "../../../assets/images/Cities/Pune.svg";
import AhmedabadImg from "../../../assets/images/Cities/Ahmedabad.svg";

// Import city images - Other Cities
import VaranasiImg from "../../../assets/images/Cities/Varanasi.svg";
import JaipurImg from "../../../assets/images/Cities/Jaipur.svg";
import LucknowImg from "../../../assets/images/Cities/Lucknow.svg";
import KanpurImg from "../../../assets/images/Cities/Kanpur.svg";
import NagpurImg from "../../../assets/images/Cities/Nagpur.svg";
import IndoreImg from "../../../assets/images/Cities/Indore.svg";
import BhopalImg from "../../../assets/images/Cities/Bhopal.svg";

// City image mapping - moved outside component to avoid re-creation
const cityImageMap = {
  Mumbai: MumbaiImg,
  Delhi: DelhiImg,
  Bangalore: BangaloreImg,
  Kolkata: KolkataImg,
  Chennai: ChennaiImg,
  Hyderabad: HyderabadImg,
  Pune: PuneImg,
  Ahmedabad: AhmedabadImg,
  Varanasi: VaranasiImg,
  Jaipur: JaipurImg,
  Lucknow: LucknowImg,
  Kanpur: KanpurImg,
  Nagpur: NagpurImg,
  Indore: IndoreImg,
  Bhopal: BhopalImg,
};

const Cities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedSource, setSelectedSource] = useState(""); // "popular" or "all"
  const [popularCities, setPopularCities] = useState([]);
  const [otherCities, setOtherCities] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);

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
        const city = {
          _id: parsed.cityId,
          cityName: parsed.cityName,
        };
        setSelectedCity(city);

        // Determine if city is in popular cities or other cities
        const isPopularCity = popularCities.some(
          (popCity) => popCity.cityName === parsed.cityName
        );
        setSelectedSource(isPopularCity ? "popular" : "all");

        setUserSelection(parsed); // sync with context
      } catch (err) {
        console.error("Failed to parse saved city:", err);
      }
    }
  }, [setUserSelection, popularCities]);

  const handleSearchChange = (e) => {
    const value = e.target.value.trimStart();
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Filter cities based on search term
  const filteredPopularCities = useMemo(() => {
    if (!searchTerm) return popularCities;
    return popularCities.filter((city) =>
      city.cityName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, popularCities]);

  const filteredOtherCities = useMemo(() => {
    if (!searchTerm) return otherCities;
    return otherCities.filter((city) =>
      city.cityName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, otherCities]);

  const handleCitySelect = (city, source) => {
    // Prevent flickering by checking if it's the same city
    if (city._id === userSelection?.cityId) {
      setIsModalOpen(false);
      return;
    }

    // Close modal immediately to prevent flickering
    setIsModalOpen(false);
    toggleModal();

    // Update state after modal is closed to prevent visual conflicts
    setTimeout(() => {
      console.log("🔥 Selected City Object:", city);
      console.log("🔥 City ID being saved:", city._id);
      console.log("🔥 City Name being saved:", city.cityName);

      const updatedSelection = {
        ...userSelection,
        cityName: city.cityName,
        cityId: city._id,
      };

      console.log("🔥 Updated Selection Object:", updatedSelection);

      setSelectedCity(city);
      setSelectedSource(source);
      setUserSelection(updatedSelection);

      // Save to cookies
      Cookies.set("userSelection", JSON.stringify(updatedSelection), {
        expires: 2,
        sameSite: "strict",
      });

      console.log("🔥 Cookie saved with cityId:", city._id);
    }, 0);
  };

  const debouncedSearch = debounce((value) => {
    getCities(value);
  }, 300);

  // Removed unused debouncedSearchMain

  const getCities = useCallback(async (search = "") => {
    try {
      setIsLoadingCities(true);
      let params = {};

      if (/^\d{6}$/.test(search)) {
        params.pincode = search;
      } else if (search) {
        params.search = search;
      }

      const response = await api.get("/common-module/view-cities", {
        params,
      });

      console.log("🔥 Cities API Response:", response.data);
      const citiesData = response.data?.data || [];
      console.log("🔥 Cities Data Array:", citiesData);

      // Separate popular and other cities based on isPopular flag
      const popular = citiesData
        .filter((city) => city.isPopular)
        .map((city) => ({
          _id: city._id,
          cityName: city.cityName,
          cityImage: cityImageMap[city.cityName] || locationIcon,
        }));

      const others = citiesData
        .filter((city) => !city.isPopular)
        .map((city) => ({
          _id: city._id,
          cityName: city.cityName,
          cityImage: cityImageMap[city.cityName] || locationIcon,
        }));

      console.log("🔥 Popular Cities:", popular);
      console.log("🔥 Other Cities:", others);

      setPopularCities(popular);
      setOtherCities(others);
      setIsLoadingCities(false);
    } catch (error) {
      console.error(error);
      toast.error("Error in fetching Cities");
      setIsLoadingCities(false);
    }
  }, []);

  useEffect(() => {
    getCities();
  }, [getCities]);

  // Cleanup for debounced search
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <>
      {isModalOpen && (
        <>
          <div className={styles.modalBackdrop}></div>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Choose Location</h2>
              <button onClick={toggleModal}>
                <img src={crossicon} alt="close" className="nav-icons" />
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
                    placeholder="Search your city or enter pincode"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <img src={searchicon} alt="search" height={"20px"} />
                </div>
                <div className={styles.locationDetectButton}>
                  <img src={locationdot} alt="detect" height={"20px"} />
                  Detect My Location
                </div>
              </div>
            </div>

            <h3 className={styles.modalCityHeading}>Popular Cities</h3>
            <div className={styles.popularCityGrid}>
              {isLoadingCities ? (
                <div className={styles.loadingText}>Loading cities...</div>
              ) : filteredPopularCities.length > 0 ? (
                filteredPopularCities.map((city) => (
                  <button
                    key={city._id}
                    onClick={() => handleCitySelect(city, "popular")}
                    className={`${styles.popularCityButton} ${
                      selectedCity?._id === city._id &&
                      selectedSource === "popular"
                        ? styles.selectedPopularCity
                        : ""
                    }`}
                  >
                    <img
                      src={city?.cityImage || locationIcon}
                      alt={city?.cityName || "City"}
                      className={styles.popularCityImage}
                      onError={(e) => {
                        e.target.src = locationIcon;
                      }}
                    />
                    <span className={styles.popularCityText}>
                      {city?.cityName}
                    </span>
                    {selectedCity?._id === city._id &&
                      selectedSource === "popular" && (
                        <span className={styles.selectedIndicator}>✓</span>
                      )}
                  </button>
                ))
              ) : (
                <div className={styles.noCitiesText}>
                  No popular cities found
                </div>
              )}
            </div>

            <h3 className={styles.modalCityHeading}>Other Cities</h3>
            <div className={styles.otherCitiesGrid}>
              {isLoadingCities ? (
                <div className={styles.loadingText}>Loading cities...</div>
              ) : filteredOtherCities.length > 0 ? (
                filteredOtherCities.map((city) => (
                  <button
                    key={city._id}
                    onClick={() => handleCitySelect(city, "all")}
                    className={`${styles.otherCityPill} ${
                      selectedCity?._id === city._id && selectedSource === "all"
                        ? styles.selectedCityPill
                        : ""
                    }`}
                  >
                    <span className={styles.otherCityText}>
                      {city?.cityName}
                    </span>
                  </button>
                ))
              ) : (
                <div className={styles.noCitiesText}>No other cities found</div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cities;
