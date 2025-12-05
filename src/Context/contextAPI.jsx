// src/context/UserContext.js
import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../Utils/api";

export const UserContext = createContext();

const ContextAPI = (props) => {
  // const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [phoneName, setPhoneName] = useState("");
  const [allPackageData, setAllPackageData] = useState([]);
  const [products, setProducts] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState({});
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadCities, setLoadCities] = useState(false); // trigger lazy load
  const [haveSubCategory, setHaveSubCategory] = useState(false);
  const [answersforMobile, setanswersforMobile] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!loadCities) setLoadCities(true); // only triggers once
  };

  const [userSelection, setUserSelection] = useState({
    cityName: "",
    cityId: null,
    wholeVariantId: null,
    variantId: null,
    variantSlug: null,
    catSubcatSlug: null,
    productSlug: null, // For back navigation from GetUpto to SelectVarient
    brandSlug: null,   // For back navigation from SelectVarient to SelectSeries
  });
  const [currentEvaluationId, setCurrentEvaluationId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [seoDataFromContext, setSeoData] = useState({});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [, setLastFetchedProductSlug] = useState(null);

  // Load from cookies on mount
  useEffect(() => {
    const saved = Cookies.get("userSelection");
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
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserSelection(parsed);
      } catch (error) {
        console.error("Failed to parse userSelection cookie", error);
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

  const fetchVariantsByProductId = async (finalSlug) => {
    try {
      //console.log("Fetching variants for slug:", finalSlug);

      // Always refresh, but still track last slug
      setLastFetchedProductSlug(finalSlug);

      const response = await api.get(
        `/sell-module/user/active-product-variants/${finalSlug}`
      );
      //console.log("Data in context of variants : ", response.data);
      setVariants(response.data);

      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

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
