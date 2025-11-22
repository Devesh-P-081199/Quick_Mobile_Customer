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
  const min = 3000;
  const max = 29000;
  const step = 100;
  const [prices, setPrices] = useState(null); // null means loading
  const [, setSeoData] = useState(null); // null means loading
  const { slug1, slug2 } = useParams();

  const navigate = useNavigate();

  const sliderRef = useRef(null);
  const dragIndex = useRef(null);
  const cityModalShown = useRef(false);
  const lastFetchedVariantId = useRef(null);

  const getNewPrice = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let percentage = (clientX - rect.left) / rect.width;
    let newValue = Math.round(min + percentage * (max - min));
    return Math.round(newValue / step) * step;
  };

  const handlePointerMove = (event) => {
    if (dragIndex.current === null) return;
    let newValue = getNewPrice(event.clientX);

    setPrices((prev) => {
      let updated = [...prev];
      if (dragIndex.current === 0) {
        updated[0] = Math.max(min, Math.min(newValue, prev[1] - step));
      } else {
        updated[1] = Math.min(max, Math.max(newValue, prev[0] + step));
      }
      return updated;
    });
  };

  const handlePointerUp = () => {
    dragIndex.current = null;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  const handlePointerDown = (index, event) => {
    dragIndex.current = index;
    event.preventDefault();
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

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
        setPrices([12000, 17000]);
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
      setPrices(null);
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
      <section className={styles.getuptosection}>
        {/* {seoData && (
        <Helmet>
          {seoData.title && <title>{seoData.title}</title>}
          {seoData.description && (
            <meta name="description" content={seoData.description} />
          )}
          {seoData.footer && <meta name="footer" content={seoData.footer} />}
          {seoData.title && (
            <meta property="og:title" content={seoData.title} />
          )}
          {seoData.description && (
            <meta property="og:description" content={seoData.description} />
          )}
          {seoData.headings?.h1 && (
            <meta name="h1" content={seoData.headings.h1} />
          )}
          {seoData.others?.map(
            (item, index) =>
              item?.type &&
              item?.text && (
                <meta
                  key={index}
                  name={item.type.toLowerCase()}
                  content={item.text}
                />
              )
          )}
        </Helmet>
      )} */}

        <MobileCommonHeaderthree
          title="Get Price"
          onBack={() => window.history.back()}
        />

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
                )}
              </h2>
              <span className={styles.verient}>
                {deviceInfo?.variantDetail && `(${deviceInfo.variantDetail})`}
              </span>

              {/* Price Info */}
              <div className={styles.priceInfo}>
                <div className={styles.priceLabel}>
                  <span>Average price user gets!</span>
                  {/* <span className={styles.infoIcon}>ℹ️</span> */}
                </div>
                <div className={styles.priceBox}>
                  {prices ? (
                    <div className={styles.sliderContainer}>
                      <div className={styles.priceLabelMin}>
                        ₹{min.toLocaleString()}
                      </div>
                      <div className={styles.priceLabelMax}>
                        ₹{max.toLocaleString()}
                      </div>

                      <span
                        className={`${styles.currentPrice} ${styles.currentPriceMin}`}
                        style={{
                          left: `${((prices[0] - min) / (max - min)) * 90}%`,
                        }}
                      >
                        ₹{prices[0].toLocaleString()}
                      </span>

                      <span
                        className={`${styles.currentPrice} ${styles.currentPriceMax}`}
                        style={{
                          left: `${((prices[1] - min) / (max - min)) * 110}%`,
                        }}
                      >
                        ₹{prices[1].toLocaleString()}
                      </span>

                      <div ref={sliderRef} className={styles.track}></div>

                      {prices.map((price, index) => (
                        <div
                          key={index}
                          className={styles.thumb}
                          style={{
                            left: `${((price - min) / (max - min)) * 100}%`,
                          }}
                          onPointerDown={(e) => handlePointerDown(index, e)}
                        ></div>
                      ))}
                    </div>
                  ) : (
                    <Skeleton height={80} width={390} />
                  )}
                </div>

                <div className={styles.priceDivider}></div>
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
                  Storage”. You will see a breakdown of your used and available
                  storage, along with app-wise storage usage.
                </div>
              </div>

              {/* Sell Now Button */}
              <div className={styles.buttonBottomBox}>
                <button onClick={handleNavigate} className={styles.sellButton}>
                  Sell Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TopSellingBrand />

      <TopSellingModel />
    </>
  );
};

export default GetUpto;
