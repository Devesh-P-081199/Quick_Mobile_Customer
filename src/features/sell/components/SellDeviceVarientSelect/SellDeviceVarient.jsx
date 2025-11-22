import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Cookies from "js-cookie";
import { UserContext } from "../../../../Context/contextAPI";
import { toast } from "react-toastify";
import styles from "./SellDeviceVarient.module.css";
import backarrow from "../../../../assets/images/icons/back.png";
// import { Helmet } from "react-helmet";

function SellDeviceVarient() {
  const { slug1, slug2 } = useParams();
  const navigate = useNavigate();

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
  }, [slug2]);

  useEffect(() => {
    if (seoDataFromContext) setSeoData(seoDataFromContext);
  }, [seoDataFromContext]);

  useEffect(() => {
    if (!userSelection?.cityId) toggleModal();

    setIsLoading(true);

    fetchVariantsByProductId(slug2).then((data) => {
      if (!data) return;

      console.log("Fetched Variants Data special in select variant:", data);

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
      // if (variantsArr.length === 1) {
      //   const variant = variantsArr[0];

      //   setUserSelection((prev) => ({
      //     ...prev,
      //     wholeVariantId: variant.wholeVariantId,
      //     variantId: variant._id,
      //     variantSlug: variant.slug,
      //   }));

      //   navigate(`/${slug1}/${variant.slug}`);
      // }

      if (variantsArr.length === 1) {
        console.log(
          "Only one variant found, auto-navigating...",
          variantsArr[0]
        );
        const variant = variantsArr[0];

        const newSelection = {
          cityName: userSelection.cityName,
          cityId: userSelection.cityId,
          wholeVariantId: variant.wholeVariantId,
          variantId: variant._id,
          variantSlug: variant.slug,
          catSubcatSlug: userSelection.catSubcatSlug,
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

      // else → wait for user to select
    });
  }, [slug2, slug1]);

  const handleChange = (wholeVariantId, variantId, variantSlug) => {
    setSelectedMemory({ wholeVariantId, variantId });

    setUserSelection((prev) => ({
      ...prev,
      wholeVariantId,
      variantId,
      variantSlug,
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
      //  navigate(`/get-price-upto`);
      navigate(`/${slug1}/${userSelection.variantSlug}`);
    } else {
      toast.warning("Please select a variant to continue.");
    }
  };

  const isVariantsLoading = isLoading || !variants?.variants;
  const isImageLoading = !variants?.productId?.devicePic;
  const isPhoneNameLoading = !phoneName;

  return (
    <div className="default-padding-section mobile-pt-section { ">
      <div className="wrapper page-content-wrapper">
        <div className={`${styles.wrapper}`}>
          <div className={styles.leftContent}>
            <div className={styles.leftImgBox}>
              {isImageLoading ? (
                <Skeleton height={300} width={200} />
              ) : (
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
              {isPhoneNameLoading ? (
                <Skeleton width={180} />
              ) : (
                `Sell Old ${phoneName}`
              )}
            </h2>

            <div className={styles.selectBox}>
              <span>Select Variant</span>
              <p>
                Check storage in iPhone: Settings {">"} General {">"} iPhone
                Storage
              </p>
            </div>

            <form onSubmit={handleContinue}>
              <div className={styles.form}>
                {isVariantsLoading
                  ? Array(3)
                      .fill()
                      .map((_, i) => (
                        <Skeleton
                          key={i}
                          height={20}
                          width={150}
                          style={{ marginBottom: 12 }}
                        />
                      ))
                  : variants.variants.map((option) => (
                      <label
                        key={option._id}
                        className={`${styles.radioLabel} ${
                          selectedMemory?.variantId === option._id
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
                              option.slug
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
