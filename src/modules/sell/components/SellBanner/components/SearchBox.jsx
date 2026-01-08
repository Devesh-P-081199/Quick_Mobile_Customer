import { useState, useCallback, useRef, useEffect } from "react";
import styles from "../SellBanner.module.css";
import NewSearchIcon from "../../../../../assets/QuickSellNewIcons/Search.svg";
import MobileSearchModal from "../MobileSearchModal/MobileSearchModal";

// Mobile breakpoint constant to avoid magic numbers
const MOBILE_BREAKPOINT = 768;

/**
 * Search box with dropdown results for desktop and modal for mobile
 */
function SearchBox({
  searchTerm,
  onSearchChange,
  results,
  mobileResults,
  showDropdown,
  onBrandClick,
  onProductClick,
  onCloseMobile,
  onCloseDropdown,
}) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const containerRef = useRef(null);

  // Click-outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showDropdown &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        onCloseDropdown?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown, onCloseDropdown]);

  const handleFocus = useCallback(() => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      setIsMobileSearchOpen(true);
    }
  }, []);

  const handleMobileClose = useCallback(() => {
    setIsMobileSearchOpen(false);
    if (onCloseMobile) {
      onCloseMobile();
    }
  }, [onCloseMobile]);

  const handleMobileSearchChange = useCallback(
    (e) => {
      onSearchChange(e, true);
    },
    [onSearchChange]
  );

  const handleDesktopSearchChange = useCallback(
    (e) => {
      onSearchChange(e, false);
    },
    [onSearchChange]
  );

  const handleBrandClickMobile = useCallback(
    (brand) => {
      onBrandClick(brand);
      setIsMobileSearchOpen(false);
    },
    [onBrandClick]
  );

  const handleProductClickMobile = useCallback(
    (product) => {
      onProductClick(product);
      setIsMobileSearchOpen(false);
    },
    [onProductClick]
  );

  return (
    <>
      {/* Mobile Search Modal */}
      {isMobileSearchOpen && (
        <MobileSearchModal
          searchTerm={searchTerm}
          onChange={handleMobileSearchChange}
          onClose={handleMobileClose}
          results={mobileResults}
          onBrandClick={handleBrandClickMobile}
          onProductClick={handleProductClickMobile}
        />
      )}

      <div className={styles.searchBox}>
        <div className={styles.searchContainer} ref={containerRef}>
          <input
            type="text"
            placeholder="What are you looking for..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleDesktopSearchChange}
            aria-label="Search"
            onFocus={handleFocus}
          />
          <div className={styles.searchIcon}>
            <img src={NewSearchIcon} alt="icon" title="icon" />
          </div>

          {/* Desktop Dropdown */}
          {showDropdown && !isMobileSearchOpen && (
            <div className={styles.dropdownStyled}>
              {results.ActiveBrands?.length > 0 && (
                <div className={styles.sectionGroup}>
                  {results.ActiveBrands.map((brand) => (
                    <div
                      key={brand._id}
                      className={styles.suggestionRow}
                      onClick={() => onBrandClick(brand)}
                    >
                      <span className={styles.name}>{brand.brandName}</span>
                      <span className={styles.tag}>in Brand</span>
                    </div>
                  ))}
                </div>
              )}
              {results.ActiveProducts?.length > 0 && (
                <div className={styles.sectionGroup}>
                  {results.ActiveProducts.map((product) => (
                    <div
                      key={product._id}
                      className={styles.suggestionRow}
                      onClick={() => onProductClick(product)}
                    >
                      <span className={styles.name}>{product.deviceName}</span>
                      <span className={styles.tag}>in Product</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchBox;
