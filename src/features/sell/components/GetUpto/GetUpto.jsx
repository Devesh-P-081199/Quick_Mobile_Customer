import { useContext, useEffect, useRef, useState, useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./GetUpto.module.css";
import backarrow from "../../../../assets/images/icons/back.png";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../../Context/contextAPI";
import { toast } from "react-toastify";
import api from "../../../../Utils/api";
// import { Helmet } from "react-helmet-async";
import MobileCommonHeaderthree from "../../../../components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import SelectBrand from "../SelectBrand/SelectBrand";
import SelectModel from "../SelectModel/SelectModel";
import TopSellingBrand from "../../../../Components/TrustedBrands/TopSellingBrand";
import TopSellingModel from "../../../../Components/TopSellingModel/TopSellingModel";

const GetUpto = () => {
  const {
    userSelection,
    setPackages,
    deviceInfo,
    setDeviceInfo,
    setUserSelection,
    toggleModal,
  } = useContext(UserContext);
  const [finalPrice, setFinalPrice] = useState(null); // null means loading
  const [priceRange, setPriceRange] = useState(null); // null means loading
  const [, setSeoData] = useState(null); // null means loading
  const { slug1, slug2 } = useParams();

  const navigate = useNavigate();

  const cityModalShown = useRef(false);
  const lastFetchedVariantId = useRef(null);

  // Calculate slider positions dynamically from priceRange
  // Note: Track width is calc(100% - 40px) starting at left: 20px
  const calculateSliderPositions = () => {
    if (!priceRange) return null;

    const { minPrice, maxPrice, rangeMin, rangeMax } = priceRange;
    const fullRange = maxPrice - minPrice;

    // Calculate percentage within the price range
    const thumb1Percentage = ((rangeMin - minPrice) / fullRange) * 100;
    const thumb2Percentage = ((rangeMax - minPrice) / fullRange) * 100;

    // Adjust for track: starts at 20px, width is calc(100% - 40px)
    // Convert percentage to decimal for calc multiplication
    const thumb1Decimal = thumb1Percentage / 100;
    const thumb2Decimal = thumb2Percentage / 100;

    const thumb1Pos = `calc(20px + (100% - 40px) * ${thumb1Decimal})`;
    const thumb2Pos = `calc(20px + (100% - 40px) * ${thumb2Decimal})`;

    // FilledTrack with -5px offset for alignment
    const filledLeft = `calc(20px + (100% - 40px) * ${thumb1Decimal} - 5%)`;

    // Width is the difference between thumb positions
    const widthDecimal = (thumb2Percentage - thumb1Percentage) / 100;
    const filledWidth = `calc((100% - 40px) * ${widthDecimal})`;

    // Check if price difference is less than 10% of full range for transform adjustment
    const priceDifference = rangeMax - rangeMin;
    const percentageDifference = (priceDifference / fullRange) * 100;
    const isNarrowRange = percentageDifference < 10.5;

    return {
      filledLeft,
      filledWidth,
      isNarrowRange,
      thumb1Position: thumb1Pos,
      thumb2Position: thumb2Pos,
    };
  };

  const sliderPositions = calculateSliderPositions();

  console.log("userSelection:", userSelection);

  useEffect(() => {
    if (!userSelection.variantSlug || !userSelection.catSubcatSlug) {
      setUserSelection((prev) => ({
        ...prev,
        variantSlug: slug2,
        catSubcatSlug: slug1,
      }));
    }
  }, [
    setUserSelection,
    slug1,
    slug2,
    userSelection.catSubcatSlug,
    userSelection.variantSlug,
  ]);

  const FetchPriceAndPackages = useCallback(async () => {
    if (!userSelection?.cityId) {
      console.log("City ID missing in userSelection");
      toast.error("Please select city first");
      navigate("/");
      return;
    }

    console.log("Final slugs being used in fetch:", slug1, slug2);

    if (userSelection?.cityId) {
      try {
        console.log("Using slugs:", slug1, slug2);
        console.log("Using variantId:", userSelection.variantId);
        console.log("Using cityId:", userSelection.cityId);

        const apiUrl = `/sell-module/user/packages-price/${slug2}/${userSelection.cityId}`;
        console.log("🔥 Full API URL:", apiUrl);

        const response = await api.get(apiUrl);

        console.log("API response PACKAGE AND PRICE:", response);
        setPackages(response?.data?.packages || []);
        setFinalPrice(response?.data?.finalPrice || 0);
        setDeviceInfo(response?.data?.deviceInfo || {});
        setSeoData(response.data.seo);

        // Set price range from API or use defaults
        const apiPriceRange = response?.data?.priceRange;
        setPriceRange({
          minPrice: apiPriceRange?.minPrice || 1000,
          maxPrice: apiPriceRange?.maxPrice || 50000,
          rangeMin: apiPriceRange?.rangeMin || 30000,
          rangeMax: apiPriceRange?.rangeMax || 35000,
        });
      } catch (error) {
        console.error("Error fetching price and packages:", error);
        toast.error("Failed to fetch price and packages");
      }
    }
  }, [
    userSelection,
    slug1,
    slug2,
    navigate,
    setPackages,
    setDeviceInfo,
    setSeoData,
  ]);

  useEffect(() => {
    // Only fetch if we have both cityId and variantId, and haven't fetched this variant yet
    if (
      userSelection?.cityId &&
      userSelection?.variantId &&
      lastFetchedVariantId.current !== userSelection.variantId
    ) {
      console.log("Fetching packages for variantId:", userSelection.variantId);
      lastFetchedVariantId.current = userSelection.variantId;

      // Clear old product data
      setFinalPrice(null);
      setPriceRange(null);
      setDeviceInfo({});
      setSeoData(null);

      FetchPriceAndPackages();
    } else if (!userSelection?.cityId && !cityModalShown.current) {
      console.log("City ID missing - showing modal");
      cityModalShown.current = true;
      toggleModal();
    }
  }, [
    userSelection?.variantId,
    userSelection?.cityId,
    FetchPriceAndPackages,
    toggleModal,
    setDeviceInfo,
    setSeoData,
  ]);

  const handleNavigate = () => {
    const {
      productId,
      categoryName,
      deviceName,
      brandName,
      devicePic,
      variantDetail,
    } = deviceInfo;
    const price = finalPrice || 0;

    // Set flag to indicate fresh entry from Get Price (form should reset)
    const freshEntryKey = `freshEntry_${productId}`;
    sessionStorage.setItem(freshEntryKey, "true");

    navigate(
      `/${slug1}/final-price-calculator?pid=${encodeURIComponent(
        productId
      )}&ct=${encodeURIComponent(categoryName)}&pn=${encodeURIComponent(
        deviceName
      )}&bn=${encodeURIComponent(brandName)}&bbmp=${encodeURIComponent(
        price
      )}&vid=${encodeURIComponent(variantDetail)}&pin=${encodeURIComponent(
        devicePic
      )}`
    );
  };

  return (
    <>
      <MobileCommonHeaderthree
        title="Get Price"
        onBack={() => window.history.back()}
      />
      <div className="page-content-wrapper">
        <section className={styles.getuptosection}>
          <div className="wrapper mobile-pt-section">
            <div className={styles.wrapper}>
              {/* Left Section: Product Image */}
              <div className={styles.leftContent}>
                <div className={styles.leftImgBox}>
                  {deviceInfo?.devicePic ? (
                    <img
                      src={deviceInfo.devicePic}
                      alt={deviceInfo.deviceName}
                      title={deviceInfo.deviceName}
                    />
                  ) : (
                    <Skeleton height={300} width={200} />
                  )}

                  <NavLink to="/select-varient">
                    <img
                      src={backarrow}
                      alt="back-arrow"
                      title="back-arrow"
                      className={styles.backArrowImg}
                    />
                  </NavLink>
                </div>
              </div>

              {/* Right Section: Product Details */}
              <div className={styles.productDetails}>
                <h2 className={styles.productTitle}>
                  Sell Old{" "}
                  {deviceInfo?.deviceName ? (
                    deviceInfo.deviceName
                  ) : (
                    <Skeleton width={150} />
                  )}{" "}
                  {deviceInfo?.variantDetail && `(${deviceInfo.variantDetail})`}
                </h2>
                {/* <span className={styles.verient}>
                  {deviceInfo?.variantDetail && `(${deviceInfo.variantDetail})`}
                </span> */}

                {/* Price Info */}
                <div className={styles.priceInfo}>
                  <div className={styles.priceLabel}>
                    <span>Average price user gets!</span>
                    {/* <span className={styles.infoIcon}>ℹ️</span> */}
                  </div>
                  <div className={styles.priceBox}>
                    {priceRange && sliderPositions ? (
                      <div className={styles.sliderContainer}>
                        <div className={styles.priceLabelMin}>
                          ₹{priceRange.minPrice.toLocaleString()}
                        </div>
                        <div className={styles.priceLabelMax}>
                          ₹{priceRange.maxPrice.toLocaleString()}
                        </div>

                        <span
                          className={`${styles.currentPrice} ${
                            sliderPositions.isNarrowRange
                              ? styles.currentPriceMinNarrow
                              : styles.currentPriceMin
                          }`}
                          style={{
                            left: sliderPositions.thumb1Position,
                          }}
                        >
                          ₹{priceRange.rangeMin.toLocaleString()}
                        </span>

                        <span
                          className={`${styles.currentPrice} ${
                            sliderPositions.isNarrowRange
                              ? styles.currentPriceMaxNarrow
                              : styles.currentPriceMax
                          }`}
                          style={{
                            left: sliderPositions.thumb2Position,
                          }}
                        >
                          ₹{priceRange.rangeMax.toLocaleString()}
                        </span>

                        <div className={styles.track}></div>

                        {/* Filled track between thumbs - offset by -5px for alignment */}
                        <div
                          className={styles.filledTrack}
                          style={{
                            left: sliderPositions.filledLeft,
                            width: sliderPositions.filledWidth,
                          }}
                        ></div>

                        {/* Thumb 1 */}
                        <div
                          className={styles.thumb}
                          style={{
                            left: sliderPositions.thumb1Position,
                          }}
                        ></div>

                        {/* Thumb 2 */}
                        <div
                          className={styles.thumb}
                          style={{
                            left: sliderPositions.thumb2Position,
                          }}
                        ></div>
                      </div>
                    ) : (
                      <Skeleton height={80} width={390} />
                    )}
                  </div>

                  <p className={styles.userData}>
                    According to <span>985</span> Recent Users
                  </p>
                </div>

                {/* Extra Info */}
                <div className={styles.extraInfo}>
                  <p>
                    Get up to <br />
                    {finalPrice !== null ? (
                      <span className={styles.redText}>₹{finalPrice}</span>
                    ) : (
                      <Skeleton width={100} />
                    )}
                  </p>

                  <div className={styles.highlightBox}>
                    Apple: Go to “Settings” {">"} “General” {">"} “iPhone
                    Storage”. You will see a breakdown of your used and
                    available storage, along with app-wise storage usage.
                  </div>
                </div>

                {/* Sell Now Button */}
                <div className={styles.buttonBottomBox}>
                  <button
                    onClick={handleNavigate}
                    className={styles.sellButton}
                  >
                    Sell Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <TopSellingBrand />

        <TopSellingModel />
      </div>
    </>
  );
};

export default GetUpto;
