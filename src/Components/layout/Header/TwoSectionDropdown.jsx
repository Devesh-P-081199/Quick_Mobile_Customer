import React, { useState } from "react";
import styles from "./Header.module.css";
import RightArrow from "../../assets/icons/RightArrow.svg";

const TwoSectionDropdown = ({
  brandsWithProducts,
  onProductClick,
  onBrandClick,
  dropdownRef,
}) => {
  const [selectedBrand, setSelectedBrand] = useState(
    brandsWithProducts?.[0] || null
  );

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  return (
    <div className={styles.collapsibleDropdownMenu} ref={dropdownRef}>
      {/* Left Section - Brands */}
      <div className={styles.brandsSection}>
        <div className={styles.brandsSectionHeader}>
          <h4>Browse by Brand</h4>
        </div>

        <div className={styles.brandsList}>
          {brandsWithProducts?.slice(0, 8)?.map((brand) => (
            <div
              key={brand._id}
              className={`${styles.brandItem} ${
                selectedBrand?._id === brand._id ? styles.active : ""
              }`}
              onClick={() => handleBrandClick(brand)}
            >
              <div className={styles.brandHeader}>
                <img
                  src={brand?.brandLogo}
                  alt={brand?.brandName}
                  className={styles.brandLogo}
                />
                <span className={styles.brandName}>{brand?.brandName}</span>
                <div className={styles.rightArrow}>
                  <img src={RightArrow} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Products */}
      <div className={styles.productsSection}>
        <div className={styles.productsSectionHeader}>
          <h4>Top Selling Phones</h4>
        </div>

        {selectedBrand && (
          <div className={styles.productsContainer}>
            <div className={styles.productsList}>
              {selectedBrand?.products?.slice(0, 8)?.map((product) => (
                <div
                  key={product._id}
                  className={styles.productItem}
                  onClick={() => onProductClick(product._id, product)}
                >
                  <img
                    src={product?.devicePic}
                    alt={product?.deviceName}
                    className={styles.productImage}
                  />
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>
                      {product?.deviceName}
                    </span>
                    <span className={styles.productPrice}>
                      Starting ₹{product?.startingPrice || "N/A"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {selectedBrand?.products?.length > 8 && (
              <div
                className={styles.viewAllProducts}
                onClick={() => onBrandClick(selectedBrand._id, selectedBrand)}
              >
                View all {selectedBrand?.products?.length} models →
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoSectionDropdown;
