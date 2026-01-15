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
  const userSelectionRef = useRef(null);

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

  // Keep ref in sync with userSelection
  useEffect(() => {
    userSelectionRef.current = userSelection;
  }, [userSelection]);

  useEffect(() => {
    if (!userSelectionRef.current?.cityId) toggleModal();

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
        const currentSelection = userSelectionRef.current || {};

        const newSelection = {
          cityName: currentSelection.cityName,
          cityId: currentSelection.cityId,
          wholeVariantId: variant.wholeVariantId,
          variantId: variant._id,
          variantSlug: variant.slug,
          catSubcatSlug: currentSelection.catSubcatSlug,
          productSlug: slug2, // Store current product slug for back navigation from GetUpto
          brandSlug: currentSelection.brandSlug, // Preserve brand slug
        };

        // Update cookie immediately so GetUpto sees complete data
        Cookies.set("userSelection", JSON.stringify(newSelection), {
          expires: 7,
          sameSite: "strict",
        });

        // Update context
        setUserSelection(newSelection);

        // Safe to navigate
        navigate(`/${slug1}/${variant.slug}`);
      }
    });
  }, [
    slug2,
    slug1,
    toggleModal,
    fetchVariantsByProductId,
    setPhoneName,
    setUserSelection,
    navigate,
  ]);

  // Dynamic width calculation
  useEffect(() => {
    const calculateWidths = () => {
      if (!formRef.current) return;
      const labels = formRef.current.querySelectorAll(`.${styles.radioLabel}`);
      if (!labels || labels.length === 0) return;

      // Reset individual label styles as we will control layout via the grid container
      labels.forEach((label) => {
        label.style.width = "";
        label.style.flex = "";
        label.style.maxWidth = "";
      });

      const containerWidth = formRef.current.offsetWidth;
      const isMobile = window.innerWidth <= 768;

      // Define max width thresholds for columns
      // We subtract a bit of buffer for gaps/padding (approx 20px total gap)
      const gap = 10;
      // 3 columns: (W - 2*gap) / 3
      const widthThreshold3Col = (containerWidth - 2 * gap) / 3;
      // 2 columns: (W - gap) / 2
      const widthThreshold2Col = (containerWidth - gap) / 2;

      let maxLabelWidth = 0;

      // Measure each label using a clone
      labels.forEach((label) => {
        const clone = label.cloneNode(true);

        // CRITICAL FIX: Remove name attribute from cloned inputs to prevent
        // stealing the "checked" state from the real visible inputs.
        const cloneInputs = clone.querySelectorAll("input");
        cloneInputs.forEach((input) => {
          input.removeAttribute("name");
        });

        // Reset styles on clone to measure natural width
        clone.style.width = "auto";
        clone.style.minWidth = "0";
        clone.style.maxWidth = "none";
        clone.style.position = "absolute";
        clone.style.visibility = "hidden";
        clone.style.flex = "none";
        clone.style.display = "inline-flex";

        formRef.current.appendChild(clone);
        const contentWidth = clone.offsetWidth;
        formRef.current.removeChild(clone);

        if (contentWidth > maxLabelWidth) {
          maxLabelWidth = contentWidth;
        }
      });

      // Determine columns based on the widest label
      let columns = 3; // Default to 3 columns

      if (isMobile) {
        // Mobile: 1 or 2 columns
        if (maxLabelWidth > widthThreshold2Col) {
          columns = 1;
        } else {
          columns = 2;
        }
      } else {
        // Desktop: 1, 2, or 3 columns
        if (maxLabelWidth > widthThreshold2Col) {
          columns = 1; // Needs full width
        } else if (maxLabelWidth > widthThreshold3Col) {
          columns = 2; // Needs half width
        } else {
          columns = 3; // Fits in third width
        }
      }

      // Apply Grid Layout to the container
      formRef.current.style.display = "grid";
      formRef.current.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
      formRef.current.style.gap = `${gap}px`;

      // Ensure flex direction is removed/overridden if it was set elsewhere
      if (isMobile) {
        // Mobile CSS might set generic styles, ensure grid takes precedence if needed
        // specific gap logic is already handled above
      }
    };

    // Run on load and variants change
    if (!isLoading && variants?.variants?.length > 0) {
      setTimeout(calculateWidths, 100);
    }

    const handleResize = () => calculateWidths();
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
      navigate(`/${slug1}/${userSelection.variantSlug}`);
    } else {
      toast.warning("Please select a variant to continue.");
    }
  };

  const isVariantsLoading = isLoading || !variants?.variants;
  const isImageLoading = !variants?.productId?.devicePic;
  // const isPhoneNameLoading = !phoneName;

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
              <p>
                <img src={info} alt="info" title="info" />
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
