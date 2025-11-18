import React, { useState } from "react";
import styles from "./Header.module.css";
import RightArrow from "../../assets/icons/RightArrow.svg";

const CollapsibleDropdown = ({
  brandsWithProducts,
  onProductClick,
  onBrandClick,
  dropdownRef,
}) => {
  const [expandedBrands, setExpandedBrands] = useState(new Set());

  const toggleBrand = (brandId) => {
    const newExpanded = new Set(expandedBrands);
    if (newExpanded.has(brandId)) {
      newExpanded.delete(brandId);
    } else {
      newExpanded.add(brandId);
    }
    setExpandedBrands(newExpanded);
  };

  return (
    <div className={styles.collapsibleDropdownMenu} ref={dropdownRef}>
      <div className={styles.dropdownHeader}>
        <h4>Browse by Brand</h4>
      </div>

      <div className={styles.brandsList}>
        {brandsWithProducts?.slice(0, 6)?.map((brand) => (
          <div key={brand._id} className={styles.collapsibleBrandItem}>
            {/* Brand Header - Clickable to expand/collapse */}
            <div
              className={styles.brandHeader}
              onClick={() => toggleBrand(brand._id)}
            >
              <div className={styles.brandInfo}>
                <img
                  src={brand?.brandLogo}
                  alt={brand?.brandName}
                  className={styles.brandLogo}
                />
                <span className={styles.brandName}>{brand?.brandName}</span>
                <span className={styles.productCount}>
                  ({brand?.products?.length || 0} models)
                </span>
              </div>

              <span
                className={`${styles.expandArrow} ${
                  expandedBrands.has(brand._id) ? styles.expanded : ""
                }`}
              >
                <img src={RightArrow} alt="" />
              </span>
            </div>

            {/* Collapsible Products List */}
            {expandedBrands.has(brand._id) && (
              <div className={styles.productsContainer}>
                <div className={styles.productsList}>
                  {brand?.products?.slice(0, 8)?.map((product) => (
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

                  {brand?.products?.length > 8 && (
                    <div
                      className={styles.viewAllProducts}
                      onClick={() => onBrandClick(brand._id, brand)}
                    >
                      View all {brand?.products?.length} models →
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.dropdownFooter}>
        <div className={styles.viewAllBrands}>View All Brands →</div>
      </div>
    </div>
  );
};

export default CollapsibleDropdown;
