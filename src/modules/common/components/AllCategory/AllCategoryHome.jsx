import { forwardRef, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllCategory.module.css";
import api from "../../../../Utils/api";

const Allcategoryhome = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  // const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await api.get(
        "/common-module/category?option=Sell&all=true",
      );
      setCategories(response?.data?.categories);
    } catch {
      // ignore
    }
  };

  const handleNavigate = useCallback(
    (category) => {
      navigate(`/${category?.slug?.sell}`);
    },
    [navigate],
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      handleNavigate(selectedCategory);
    }
  }, [selectedCategory, handleNavigate]);

  const handleCataClick = (category) => {
    setSelectedCategory(category);
  };
  // const handleBrandClick = (brandId) => {
  //   navigate(`/select-series/${brandId}`);
  // };

  return (
    <section ref={ref} className="page-content-wrapper scrollbar-hidden">
      <div className="wrapper">
        <div className={styles.selectBrandWrapper}>
          <div className={styles.headingFlex}>
            <h2 className={styles.sectionHeading}>Selling Services</h2>
          </div>

          <div className={`${styles.brandImageBox} scrollbar-hidden`}>
            {categories?.slice(0, 5).map((cat, index) => (
              <div
                key={index}
                className={`${styles.brandSingleBox} cursor-pointer`}
                onClick={() => handleCataClick(cat)}
              >
                <div className={styles.imgIndividual}>
                  <img src={cat?.categoryImageUrl} alt={cat?.categoryName} />
                </div>
                <span>{cat?.categoryName}</span>
              </div>
            ))}

            {/* 6th Box → View All */}
            {categories?.length > 5 && (
              <div
                className={`${styles.brandSingleBox} cursor-pointer`}
                onClick={() => navigate("/view-all-category")}
              >
                <div className={styles.imgIndividual}>
                  <div className={styles.viewAllCircle}>
                    <span>󠁯•󠁏󠁯•󠁏󠁯•󠁏</span>
                  </div>
                </div>
                <span>View All</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Allcategoryhome;
