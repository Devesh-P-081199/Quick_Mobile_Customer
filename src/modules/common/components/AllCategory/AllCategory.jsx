// // SelectBrand.js

//             ))}

//             )}

//             ))}

import { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllCategory.module.css";
import api from "../../../../Utils/api";

const AllCategory = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [brands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await api.get(
        "/common-module/category?option=Sell&all=true",
      );
      setCategories(response?.data?.categories);
    } catch (error) {}
  };

  const handleNavigate = async (selectedCategory) => {
    navigate(`/${selectedCategory?.slug?.sell}`);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      handleNavigate(selectedCategory);
    }
  }, [handleNavigate, selectedCategory]);

  const handleCataClick = (category) => {
    setSelectedCategory(category);
  };
  const handleBrandClick = (brandId) => {
    navigate(`/select-series/${brandId}`);
  };

  return (
    <section ref={ref} className="page-content-wrapper scrollbar-hidden">
      <div className="wrapper">
        <div className={styles.selectBrandWrapper}>
          <div className={styles.headingFlex}>
            <h2 className={styles.sectionHeading}>Selling Services</h2>
          </div>

          <div className={`${styles.brandImageBox} scrollbar-hidden`}>
            {categories?.map((cat, index) => (
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
          </div>

          {brands?.length > 0 && (
            <h2 className={styles.sectionHeading}>All Brands</h2>
          )}
          <div className={`${styles.brandImageBox} scrollbar-hidden`}>
            {brands?.map((brand, index) => (
              <div
                key={index}
                className={`${styles.brandSingleBox} cursor-pointer`}
                onClick={() => handleBrandClick(brand._id)}
              >
                <div className={styles.imgIndividual}>
                  <img src={brand?.brandLogo} alt={brand?.brandName} />
                </div>
                <span>{brand?.brandName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default AllCategory;
