import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import debounce from "lodash.debounce";
import styles from "./Header.module.css";
import { UserContext } from "../../../../../Context/contextAPI";
import api from "../../../../../Utils/api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import crossicon from "../../../../../assets/QuickSellNewIcons/Cross.svg";
import searchicon from "../../../../../assets/QuickSellNewIcons/Search.svg";
import locationdot from "../../../../../assets/icons/locationdot.png";
import locationIcon from "../../../../../assets/QuickSellNewIcons/Location.svg";

// Import city images - Popular Cities
import MumbaiImg from "../../../../../assets/images/Cities/Mumbai.svg";
import DelhiImg from "../../../../../assets/images/Cities/Delhi.svg";
import BangaloreImg from "../../../../../assets/images/Cities/Bangalore.svg";
import KolkataImg from "../../../../../assets/images/Cities/Kolkata.svg";
import ChennaiImg from "../../../../../assets/images/Cities/Chennai.svg";
import HyderabadImg from "../../../../../assets/images/Cities/Hyderabad.svg";
import PuneImg from "../../../../../assets/images/Cities/Pune.svg";
import AhmedabadImg from "../../../../../assets/images/Cities/Ahmedabad.svg";

// Import city images - Other Cities
import VaranasiImg from "../../../../../assets/images/Cities/Varanasi.svg";
import JaipurImg from "../../../../../assets/images/Cities/Jaipur.svg";
import LucknowImg from "../../../../../assets/images/Cities/Lucknow.svg";
import KanpurImg from "../../../../../assets/images/Cities/Kanpur.svg";
import NagpurImg from "../../../../../assets/images/Cities/Nagpur.svg";
import IndoreImg from "../../../../../assets/images/Cities/Indore.svg";
import BhopalImg from "../../../../../assets/images/Cities/Bhopal.svg";

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
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

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
          (popCity) => popCity.cityName === parsed.cityName,
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
      city.cityName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, popularCities]);

  const filteredOtherCities = useMemo(() => {
    if (!searchTerm) return otherCities;
    return otherCities.filter((city) =>
      city.cityName.toLowerCase().includes(searchTerm.toLowerCase()),
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

    // Update state after modal is closed to prevent visual conflicts
    setTimeout(() => {
      const updatedSelection = {
        ...userSelection,
        cityName: city.cityName,
        cityId: city._id,
      };

      setSelectedCity(city);
      setSelectedSource(source);
      setUserSelection(updatedSelection);

      // Save to cookies
      Cookies.set("userSelection", JSON.stringify(updatedSelection), {
        expires: 2,
        sameSite: "strict",
      });
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

      const citiesData = response.data?.data || [];

      // Separate popular and other cities based on cityIcon presence
      const popular = citiesData
        .filter((city) => city.cityIcon)
        .map((city) => ({
          _id: city._id,
          cityName: city.cityName,
          cityImage: city.cityIcon, // Use cityIcon from API
        }));

      const others = citiesData
        .filter((city) => !city.cityIcon)
        .map((city) => ({
          _id: city._id,
          cityName: city.cityName,
        }));

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

  // Handle location detection
  const handleDetectLocation = async () => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Use Nominatim (OpenStreetMap) reverse geocoding API
          const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;

          const response = await fetch(geocodeUrl, {
            headers: {
              "User-Agent": "QuickMobileCustomer/1.0",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch location data");
          }

          const data = await response.json();

          // Extract city name from the response
          const detectedCity =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.state_district ||
            data.address?.state;

          if (!detectedCity) {
            toast.error("Could not determine your city. Please select manually.");
            setIsDetectingLocation(false);
            return;
          }

          // Find matching city in available cities (both popular and other)
          const allAvailableCities = [...popularCities, ...otherCities];
          const matchedCity = allAvailableCities.find(
            (city) =>
              city.cityName.toLowerCase() === detectedCity.toLowerCase() ||
              city.cityName.toLowerCase().includes(detectedCity.toLowerCase()) ||
              detectedCity.toLowerCase().includes(city.cityName.toLowerCase())
          );

          if (matchedCity) {
            // Determine if it's a popular city or other city
            const isPopular = popularCities.some((c) => c._id === matchedCity._id);
            handleCitySelect(matchedCity, isPopular ? "popular" : "all");
            toast.success(`Location detected: ${matchedCity.cityName}`);
          } else {
            toast.warning(
              `Detected city "${detectedCity}" is not in our service area. Please select from available cities.`
            );
          }

          setIsDetectingLocation(false);
        } catch (error) {
          console.error("Reverse geocoding error:", error);
          toast.error("Failed to detect location. Please try again or select manually.");
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        // Handle geolocation errors
        setIsDetectingLocation(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error(
              "Location permission denied. Please enable location access and try again."
            );
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error("Location information is unavailable. Please try again later.");
            break;
          case error.TIMEOUT:
            toast.error("Location request timed out. Please try again.");
            break;
          default:
            toast.error("An unknown error occurred while detecting your location.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

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
              <button onClick={toggleModal} className="closebutton">
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
                    placeholder="Search your city"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <img src={searchicon} alt="search" className="nav-icons" />
                </div>
                {/* <button
                  className={styles.locationDetectButton}
                  onClick={handleDetectLocation}
                  disabled={isDetectingLocation}
                  style={{
                    opacity: isDetectingLocation ? 0.6 : 1,
                    cursor: isDetectingLocation ? "not-allowed" : "pointer",
                  }}
                >
                  <img src={locationdot} alt="detect" className="nav-icons" />
                  {isDetectingLocation ? "Detecting..." : "Detect My Location"}
                </button> */}
                <button
                  className={styles.locationDetectButton}
                  style={{
                    opacity: 1,
                    cursor: "pointer",
                  }}
                  onClick={handleSearchChange}
                >
                  Search City
                </button>
              </div>
            </div>

            {isLoadingCities ? (
              <div className={styles.loadingText}>Loading cities...</div>
            ) : filteredPopularCities.length === 0 && filteredOtherCities.length === 0 ? (
              <div className={styles.noCitiesText}>
                <p>City not found</p>
              </div>
            ) : (
              <>
                {/* Only show Popular Cities section if there are results */}
                {filteredPopularCities.length > 0 && (
                  <>
                    <h3 className={styles.modalCityHeading}>Popular Cities</h3>
                    <div className={styles.popularCityGrid}>
                      {filteredPopularCities.map((city) => (
                        <button
                          key={city._id}
                          onClick={() => handleCitySelect(city, "popular")}
                          className={`${styles.popularCityButton} ${selectedCity?._id === city._id &&
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
                      ))}
                    </div>
                  </>
                )}

                {/* Only show Other Cities section if there are results */}
                {filteredOtherCities.length > 0 && (
                  <>
                    <h3 className={styles.modalCityHeading}>Other Cities</h3>
                    <div className={styles.otherCitiesGrid}>
                      {filteredOtherCities.map((city) => (
                        <button
                          key={city._id}
                          onClick={() => handleCitySelect(city, "all")}
                          className={`${styles.otherCityPill} ${selectedCity?._id === city._id && selectedSource === "all"
                              ? styles.selectedCityPill
                              : ""
                            }`}
                        >
                          <span className={styles.otherCityText}>
                            {city?.cityName}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Cities;
