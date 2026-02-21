// SelectBrand.js
import React, { forwardRef, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import styles from "./SelectBrand.module.css";
import debounce from "lodash.debounce";
import api from "../../Utils/api";
import { UserContext } from "../../Context/contextAPI";
import BrandCard from "../../Shared/BrandCard/BrandCard";
// import BrandCard from "../../Shared/BrandCard/BrandCard";


const SelectBrand = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedCategory } = useContext(UserContext);

  const {slug1}= useParams();

  const handleBrandClick = (slugSell) => {
    navigate(`${slugSell}`);
  };

  const fetchBrands = async (search = "") => {
    try {
      const response = await api.get(`/common-module/FetchbrandByCatSelection?option=Sell&categoryId=${selectedCategory}`, {
        params: { search },
      });
      setBrands(response?.data?.data);
    } catch (error) {
      console.error("Error in fetching brands: ", error);
    }
  };

  const debouncedSearch = debounce((value) => {
    fetchBrands(value);
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value.trimStart();
    setSearchTerm(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchBrands();
    }
  }, [selectedCategory]);

  return (
    <section ref={ref} className="default-padding-section scrollbar-hidden">
      <div className="wrapper">
        <div className={styles.selectBrandWrapper}>
          <div className={styles.headingFlex}>
            <h2 className={styles.sectionHeading}>Select Brand</h2>
            {/* Optional search */}
            {/* <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Discover your next tech upgrade"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <BiSearch className={styles.searchIcon} size={20} />
            </div> */}
          </div>

          <div className={`${styles.brandImageBox} scrollbar-hidden`}>
            {brands.map((brand, index) => (
              <BrandCard key={index} brand={brand} onClick={()=>handleBrandClick(brand?.slugSell)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default SelectBrand;
