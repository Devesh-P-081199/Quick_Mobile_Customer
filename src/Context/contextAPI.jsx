// src/context/UserContext.js
import { createContext, useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import api from "../Utils/api";

export const UserContext = createContext();

const ContextAPI = (props) => {
  const [packages, setPackages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [phoneName, setPhoneName] = useState("");
  const [allPackageData, setAllPackageData] = useState([]);
  const [products] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState({});
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadCities, setLoadCities] = useState(false); // trigger lazy load
  const [haveSubCategory, setHaveSubCategory] = useState(false);
  const [answersforMobile, setanswersforMobile] = useState([]);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
    setLoadCities(true);
  }, []);

  // Lazy initialize userSelection from cookies to prevent race condition
  const [userSelection, setUserSelection] = useState(() => {
    const saved = Cookies.get("userSelection");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Failed to parse userSelection cookie", error);
      }
    }
    return {
      cityName: "",
      cityId: null,
      wholeVariantId: null,
      variantId: null,
      variantSlug: null,
      catSubcatSlug: null,
      productSlug: null,
      brandSlug: null,
    };
  });
  const [currentEvaluationId, setCurrentEvaluationId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [seoDataFromContext] = useState({});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [, setLastFetchedProductSlug] = useState(null);

  // Load user and deviceInfo from cookies on mount
  useEffect(() => {
    const user = Cookies.get("user");
    const deviceInfo = Cookies.get("deviceInfo");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setUser(parsed);
      } catch (error) {
        console.error("Failed to parse user cookie", error);
      }
    }
    if (deviceInfo) {
      try {
        const parsed = JSON.parse(deviceInfo);
        setDeviceInfo(parsed);
      } catch (error) {
        console.error("Failed to parse deviceInfo cookie", error);
      }
    }

    // Listen for session expiration event from api interceptor
    const handleSessionExpired = () => {
      setUser({});
      setIsLoginModalOpen(true);
      Cookies.remove("user"); // Only clear UI state
    };

    window.addEventListener("auth:session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("auth:session-expired", handleSessionExpired);
    };
  }, []);

  // Save to cookies on change
  useEffect(() => {
    Cookies.set("userSelection", JSON.stringify(userSelection), {
      expires: 7,
      sameSite: "strict",
    });
  }, [userSelection]);

  useEffect(() => {
    Cookies.set("user", JSON.stringify(user), {
      expires: 2,
      sameSite: "strict",
    });
  }, [user]);

  useEffect(() => {
    Cookies.set("deviceInfo", JSON.stringify(deviceInfo), {
      expires: 7,
      sameSite: "strict",
    });
  }, [deviceInfo]);

  const fetchVariantsByProductId = useCallback(async (finalSlug) => {
    try {
      // Always refresh, but still track last slug
      setLastFetchedProductSlug(finalSlug);

      const response = await api.get(
        `/sell-module/user/active-product-variants/${finalSlug}`,
      );
      setVariants(response.data);

      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        packages,
        setPackages,
        variants,
        seoDataFromContext,
        setVariants,
        fetchVariantsByProductId,
        phoneName,
        allPackageData,
        setAllPackageData,
        products,
        setUserSelection,
        userSelection,
        deviceInfo,
        setDeviceInfo,
        toggleModal,
        isModalOpen,
        user,
        setUser,
        currentEvaluationId,
        setCurrentEvaluationId,
        selectedAddress,
        setSelectedAddress,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        setIsLoginModalOpen,
        isLoginModalOpen,
        setIsModalOpen,
        loadCities,
        haveSubCategory,
        setHaveSubCategory,
        setPhoneName,
        setanswersforMobile,
        answersforMobile,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default ContextAPI;
