// 4th approch of dynamic
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./SelectSubCata.module.css";
import api from "../../../../Utils/api";
// import { Helmet } from "react-helmet-async";
import BrowsePicks from "../../../../Components/BrowsePicks/BrowsePicks";
// import TopSellingProducts from "../../BuyComponents/TopSellingProducts/TopSellingProducts";
import closeicon from "../../../../assets/flaticons/close.png";
import FAQ from "../../../Components/layout/FAQ/FAQ";

import BreadCrumb from "../../../../components/layout/BreadCrumb/BreadCrumb";
import TopSellingModel from "../../../../Components/TopSellingModel/TopSellingModel";

function SelectSubCata() {
  const { slug1 } = useParams();
  const navigate = useNavigate();

  const [categorySlug, setCategorySlug] = useState(null);
  const [subCata, setSubCata] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [seoData, setSeoData] = useState({});

  useEffect(() => {
    const fetchMetaInfo = async () => {
      try {
        const res = await api.get(
          `/sell-module/user/resolve-category-or-subcategory/${slug1}`
        );
        if (res.data?.type === "category") {
          setCategorySlug(res.data.categorySlug);
          setSelectedSubCategoryId(null);
        } else if (res.data?.type === "subcategory") {
          setCategorySlug(res.data.categorySlug);
          setSelectedSubCategoryId(res.data.subCategoryId);
        }
      } catch (err) {
        console.error("Meta resolution failed:", err);
      }
    };

    fetchMetaInfo();
  }, [slug1]);

  useEffect(() => {
    const fetchBrandsAndSubs = async () => {
      if (!categorySlug) return;

      try {
        const res = await api.get(
          `/sell-module/user/filteredAllCat?catSlug=${categorySlug}`
        );
        setSubCata(res.data.allSubCategories || []);
        console.log("API Called for Brands and the SubCat🎗️🎗️🎗️🎗️🎗️", res.data);
        setAllBrands(res.data.allBrands || []);
        setSeoData(res.data?.seo);
        //setCurrentCat(res.data?.category);
        console.log("SEO DATA", res.data.seo);
      } catch (error) {
        console.error("Failed to fetch category data:", error);
      }
    };

    fetchBrandsAndSubs();
  }, [categorySlug]);

  const handleSubCategoryClick = (subcata) => {
    const isSelected = selectedSubCategoryId === subcata._id;

    if (isSelected) {
      // ✅ Allow unselect only if user is already on the subcategory
      navigate(`/${categorySlug}`, { replace: true });
      setSelectedSubCategoryId(null);
    } else {
      if (slug1 !== subcata.slugSell) {
        navigate(`/${subcata.slugSell}`, { replace: true });
        setSelectedSubCategoryId(subcata._id);
      }
    }
  };

  const filteredBrands = selectedSubCategoryId
    ? allBrands.filter(
        (b) =>
          b.subCategoryId?._id?.toString() === selectedSubCategoryId.toString()
      )
    : allBrands;

  return (
    <>
      {/* <BreadCrumb items={["Home", "Sell Your Phone"]} /> */}

      {subCata.length > 0 && (
        <section className="default-padding-section">
          <div className={styles.wrapper}>
            <div className={styles.headingFlex}>
              <h2 className={styles.sectionHeading}>Select SubCategories</h2>
            </div>
            <ul className={styles.seriesList}>
              {subCata.map((subcata, index) => (
                <li
                  key={index}
                  onClick={() => handleSubCategoryClick(subcata)}
                  className={`${styles.seriesItem} ${
                    selectedSubCategoryId === subcata._id ? styles.active : ""
                  }`}
                >
                  {subcata.subCategoryName}
                  {selectedSubCategoryId === subcata._id && (
                    <span className={styles.crossIcon}>
                      <img
                        src={closeicon}
                        alt="close"
                        title="close"
                        height={16}
                        width={16}
                      />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {filteredBrands.length > 0 && (
        <section className="default-padding-section">
          <div className="wrapper">
            <div className={styles.wrapper}>
              <div className={styles.headingFlex}>
                <h2 className={styles.sectionHeading}>Select Brands</h2>
              </div>
              <ul className={styles.brandlist}>
                {filteredBrands.map((brand, index) => (
                  <div key={index} className={styles.brandFullBox}>
                    <li
                      onClick={() => {
                        if (
                          brand?.subCategoryId &&
                          brand?.subCategoryId?.slugSell
                        ) {
                          navigate(
                            `/${brand?.subCategoryId?.slugSell}/${brand.slugSell}`
                          );
                        } else {
                          navigate(`/${slug1}/${brand.slugSell}`);
                        }
                      }}
                      className={`${styles.brandItem} cursor-pointer`}
                    >
                      <img
                        src={brand.brandLogo}
                        alt={brand?.brandName}
                        title={brand?.brandName}
                      />
                    </li>
                    <span>{brand.brandName}</span>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <BrowsePicks />
      <TopSellingModel />
      <FAQ />
    </>
  );
}

export default SelectSubCata;
