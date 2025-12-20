import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MobileSearchModal.module.css";
import BackArrow from "../../../../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";
import CrossIcon from "../../../../../assets/QuickSellNewIcons/Cross.svg";
import Search from "../../../../../assets/QuickSellNewIcons/Search.svg";

const MobileSearchModal = ({
  searchTerm,
  onChange,
  onClose,
  results, // mobileResults
  onBrandClick,
  onProductClick,
}) => {
  const inputRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => inputRef.current?.focus(), []);

  useEffect(() => {
    const handleScroll = () => {
      if (document.activeElement === inputRef.current) {
        inputRef.current.blur();
      }
    };
    const content = contentRef.current;
    content?.addEventListener("scroll", handleScroll);
    return () => content?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = originalStyle);
  }, []);

  const handleClear = () => {
    // Trigger onChange with empty value to clear search in parent
    onChange({ target: { value: "" } });
    inputRef.current?.focus();
  };

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.header}>
        <div className={styles.searchBox}>
          <button className={styles.backBtn} onClick={onClose}>
            <img
              src={BackArrow}
              alt="Back"
              title="search"
              className={styles.backIcon}
            />
          </button>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            value={searchTerm}
            onChange={onChange}
            placeholder="Search brands, products..."
          />
          {searchTerm && (
            <button className={styles.clearBtn} onClick={handleClear}>
              <img src={CrossIcon} alt="Clear" />
            </button>
          )}
        </div>
      </div>

      <div ref={contentRef} className={styles.content}>
        {/* Only show results if search term exists */}
        {searchTerm && (
          <>
            {/* Brands */}
            {results?.ActiveBrands?.length > 0 && (
              <div className={styles.sectionGroup}>
                {results.ActiveBrands.map((brand) => (
                  <div
                    key={brand._id}
                    className={styles.suggestionRow}
                    onClick={() => onBrandClick(brand)} // pass full object
                  >
                    <span className={styles.name}>{brand.brandName}</span>
                    <span className={styles.tag}>in Brand</span>
                  </div>
                ))}
              </div>
            )}

            {/* Products */}
            {results?.ActiveProducts?.length > 0 && (
              <div className={styles.sectionGroup}>
                {results.ActiveProducts.map((product) => (
                  <div
                    key={product._id}
                    className={styles.suggestionRow}
                    onClick={() => onProductClick(product)} // pass full object
                  >
                    <span className={styles.name}>{product.deviceName}</span>
                    <span className={styles.tag}>in Product</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MobileSearchModal;
