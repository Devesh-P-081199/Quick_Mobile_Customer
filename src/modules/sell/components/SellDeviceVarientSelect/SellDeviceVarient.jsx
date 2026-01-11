import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../../../../Context/contextAPI";
import { toast } from "react-toastify";
import styles from "./SellDeviceVarient.module.css";
import backarrow from "../../../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";
import info from "../../../../assets/QuickSellNewIcons/info.png";

function SellDeviceVarient() {
  const { slug1, slug2 } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [selectedMemory, setSelectedMemory] = useState({});
  const [, setSeoData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const {
    variants,
    fetchVariantsByProductId,
    phoneName,
    setPhoneName,
    setUserSelection,
    userSelection,
    toggleModal,
    seoDataFromContext,
    setVariants,
  } = useContext(UserContext);

  useEffect(() => {
    // Clear stale data when navigating to a new slug
    setVariants([]);
    setUserSelection((prev) => ({
      ...prev,
      wholeVariantId: null,
      variantId: null,
      variantSlug: null,
    }));
  }, [setUserSelection, setVariants, slug2]);

  useEffect(() => {
    if (seoDataFromContext) setSeoData(seoDataFromContext);
  }, [seoDataFromContext]);

  useEffect(() => {
    if (!userSelection?.cityId) toggleModal();

    setIsLoading(true);

    fetchVariantsByProductId(slug2).then((data) => {
      if (!data) return;

      setSeoData(data.seo);
      setPhoneName(data.productId?.deviceName);
      setIsLoading(false);

      const variantsArr = data.variants || [];

      // ✅ Reset selection every time new variants are fetched
      setUserSelection((prev) => ({
        ...prev,
        wholeVariantId: "",
        variantId: "",
        variantSlug: "",
      }));

      // ✅ If URL already had a selectedVariantId → preselect but don't navigate
      if (data.selectedVariantId) {
        setSelectedMemory({
          wholeVariantId: variantsArr[0]?.wholeVariantId, // all variants share same wholeVariantId
          variantId: data.selectedVariantId,
        });

        setUserSelection((prev) => ({
          ...prev,
          wholeVariantId: variantsArr[0]?.wholeVariantId,
          variantId: data.selectedVariantId,
          variantSlug:
            variantsArr.find((v) => v._id === data.selectedVariantId)?.slug ||
            "",
        }));

        return; // stop here → no auto navigation
      }

      // ✅ If only one variant → auto-navigate

      //     ...prev,

      if (variantsArr.length === 1) {
        const variant = variantsArr[0];

        const newSelection = {
          cityName: userSelection.cityName,
          cityId: userSelection.cityId,
          wholeVariantId: variant.wholeVariantId,
          variantId: variant._id,
          variantSlug: variant.slug,
          catSubcatSlug: userSelection.catSubcatSlug,
          productSlug: slug2, // Store current product slug for back navigation from GetUpto
          brandSlug: userSelection.brandSlug, // Preserve brand slug
        };

        // Update cookie immediately so GetUpto sees complete data
        Cookies.set("userSelection", JSON.stringify(newSelection), {
          expires: 7,
          sameSite: "strict",
        });

        // Update context
        setUserSelection(newSelection);

        // Safe to navigate
        navigate(`/${slug1}/${variant.slug}`, { replace: true });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug2, slug1]);

  // Dynamic width calculation
  useEffect(() => {
    const calculateWidths = () => {
      if (!formRef.current) return;
      const labels = formRef.current.querySelectorAll(`.${styles.radioLabel}`);
      if (!labels || labels.length === 0) return;

      // Reset styles to measure correctly
      labels.forEach((label) => {
        label.style.width = "";
        label.style.flex = "";
        label.style.maxWidth = "";
      });

      const containerWidth = formRef.current.offsetWidth;
      const isMobile = window.innerWidth <= 768;

      // Define buckets in pixels based on container width and gaps
      let width33, width50;

      if (isMobile) {
        // Mobile: 2 items: (W - 10) / 2
        width50 = (containerWidth - 10) / 2;
      } else {
        // Desktop: 
        // 3 items: (W - 20) / 3
        // 2 items: (W - 10) / 2
        width33 = (containerWidth - 20) / 3;
        width50 = (containerWidth - 10) / 2;
      }

      let maxBucket = isMobile ? 50 : 33; // Start assuming smallest bucket (50% for mobile, 33% for desktop)

      // Measure each label using a clone to get true content width without layout interference
      labels.forEach((label) => {
        const clone = label.cloneNode(true);

        // Reset styles on clone to measure natural width
        clone.style.width = "auto";
        clone.style.minWidth = "0";
        clone.style.maxWidth = "none";
        clone.style.position = "absolute";
        clone.style.visibility = "hidden";
        clone.style.flex = "none";
        clone.style.display = "inline-flex";

        // Append to the same container to ensure it inherits fonts and other relevant styles
        formRef.current.appendChild(clone);

        const contentWidth = clone.offsetWidth;

        // Cleanup
        formRef.current.removeChild(clone);

        if (isMobile) {
          if (contentWidth > width50) {
            maxBucket = 100;
          }
        } else {
          if (contentWidth > width50) {
            maxBucket = 100;
          } else if (contentWidth > width33 && maxBucket < 50) {
            maxBucket = 50;
          }
        }
      });

      // Apply widths
      labels.forEach((label) => {
        if (maxBucket === 100) {
          label.style.width = "100%";
          if (isMobile) label.style.flex = "0 0 100%";
        } else if (maxBucket === 50) {
          label.style.width = "calc(50% - 5px)";
          if (isMobile) label.style.flex = "0 0 calc(50% - 5px)";
        } else {
          label.style.width = "calc(33.33% - 6.66px)";
        }
      });
    };

    // Run on load and variants change
    if (!isLoading && variants?.variants?.length > 0) {
      // Small timeout to allow render
      setTimeout(calculateWidths, 100);
    }

    // Run on resize
    const handleResize = () => {
      calculateWidths();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, [variants, isLoading]);

  const handleChange = (wholeVariantId, variantId, variantSlug) => {
    setSelectedMemory({ wholeVariantId, variantId });

    setUserSelection((prev) => ({
      ...prev,
      wholeVariantId,
      variantId,
      variantSlug,
      productSlug: slug2, // Store current product slug for back navigation from GetUpto
    }));
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (!userSelection.cityId) {
      toast.warning("Please select a city before continuing.");
      toggleModal();
      return;
    }
    if (selectedMemory?.wholeVariantId) {
      navigate(`/${slug1}/${userSelection.variantSlug}`, { replace: true });
    } else {
      toast.warning("Please select a variant to continue.");
    }
  };

  const isVariantsLoading = isLoading || !variants?.variants;
  const isImageLoading = !variants?.productId?.devicePic;
  const isPhoneNameLoading = !phoneName;

  return (
    <div className="page-content-wrapper mobile-pt-section">
      <div className="wrapper">
        <div className={`${styles.wrapper}`}>
          <div className={styles.leftContent}>
            <div className={styles.leftImgBox}>
              {!isImageLoading && (
                <img
                  src={variants.productId.devicePic}
                  alt={variants.productId?.deviceName}
                  title={variants.productId?.deviceName}
                />
              )}
              <button
                onClick={() => navigate("/select-series")}
                className={styles.backButton}
              >
                <img src={backarrow} alt="back-arrow" title="back-arrow" />
              </button>
            </div>
          </div>

          <div className={styles.rightContent}>
            <h2 className={styles.heading}>
              {phoneName ? `Sell Old ${phoneName}` : "\u00A0"}
            </h2>

            <div className={styles.selectBox}>
              <span>Select Variant</span>
              <p><img src={info} alt="info" title="info" />
                Check your device storage from Settings → Storage
              </p>
            </div>

            <form onSubmit={handleContinue}>
              <div ref={formRef} className={styles.form}>
                {!isVariantsLoading &&
                  variants.variants.map((option) => (
                    <label
                      key={option._id}
                      className={`${styles.radioLabel} ${selectedMemory?.variantId === option._id
                        ? styles.active
                        : ""
                        }`}
                    >
                      <input
                        type="radio"
                        name="memory"
                        checked={selectedMemory?.variantId === option._id}
                        className="custom-radio"
                        onChange={() =>
                          handleChange(
                            option.wholeVariantId,
                            option._id,
                            option.slug,
                          )
                        }
                      />
                      <span>{option.variantDetail}</span>
                    </label>
                  ))}
              </div>
              <div className={styles.buttonBottomBox}>
                <button
                  type="submit"
                  className={styles.button}
                  disabled={!selectedMemory?.variantId}
                  style={{
                    backgroundColor: selectedMemory?.variantId
                      ? "rgb(0 92 171)"
                      : "#rgb(152 152 152)",
                    cursor: selectedMemory?.variantId
                      ? "pointer"
                      : "not-allowed",
                  }}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellDeviceVarient;
