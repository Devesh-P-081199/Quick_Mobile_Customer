import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MobileSearchModal.module.css";
import BackArrow from "../../../../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";
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

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onClose}>
          <img
            src={BackArrow}
            alt="Back"
            title="search"
            className={styles.backIcon}
          />
        </button>
        <div className={styles.searchBox}>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            value={searchTerm}
            onChange={onChange}
            placeholder="Search brands, products..."
          />
          <img src={Search} alt="Search" title="search" />
        </div>
      </div>

      <div ref={contentRef} className={styles.content}>
        {/* Brands */}
        {["buy", "repair", "sell"].map(
          (key) =>
            results?.ActiveBrands?.[key]?.length > 0 && (
              <div key={key} className={styles.sectionGroup}>
                {results.ActiveBrands[key].map((brand) => (
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
            )
        )}

        {/* Products */}
        {["buy", "repair", "sell"].map(
          (key) =>
            results?.ActiveProducts?.[key]?.length > 0 && (
              <div key={key} className={styles.sectionGroup}>
                {results.ActiveProducts[key].map((product) => (
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
            )
        )}
      </div>
    </div>
  );
};

export default MobileSearchModal;
