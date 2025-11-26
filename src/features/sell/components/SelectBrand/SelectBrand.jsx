// SelectBrand.js
import React, { forwardRef, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import styles from "./SelectBrand.module.css";
import debounce from "lodash.debounce";
import api from "../../../../Utils/api";
import { UserContext } from "../../../../Context/contextAPI";
import BrandCard from "../../../../Components/ui/BrandCard/BrandCard";

const SelectBrand = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedCategory } = useContext(UserContext);

  const { slug1 } = useParams();

  const handleBrandClick = (slugSell) => {
    navigate(`${slugSell}`);
  };

  const fetchBrands = async (search = "") => {
    try {
      const response = await api.get(
        `/common-module/FetchbrandByCatSelection?option=Sell&categoryId=${selectedCategory}`,
        {
          params: { search },
        }
      );
      console.log(response, "response");
      setBrands(response?.data?.data);
    } catch (error) {
      console.error("Error in fetching brands: ", error);
    }
  };

  const debouncedSearch = debounce((value) => {
    fetchBrands(value);
  }, 300);

  useEffect(() => {
    if (selectedCategory) {
      fetchBrands();
    }
  }, [selectedCategory]);

  return (
    <section ref={ref} className="page-content-wrapper scrollbar-hidden">
      <div className={styles.selectBrandWrapper}>
        <div className={styles.headingFlex}>
          <h2 className={styles.sectionHeading}>Select Brand</h2>
        </div>

        <div className={`${styles.brandImageBox} scrollbar-hidden`}>
          {brands.map((brand, index) => (
            <BrandCard
              key={index}
              brand={brand}
              onClick={() => handleBrandClick(brand?.slugSell)}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default SelectBrand;
