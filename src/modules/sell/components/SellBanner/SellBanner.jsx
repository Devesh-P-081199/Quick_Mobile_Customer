import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BannerImage from "../../../../assets/images/static/banner-img.png";
import styles from "./SellBanner.module.css";

// Custom hook for data management
import { useSellBannerData } from "./hooks/useSellBannerData";

// Sub-components
import {
  AnimatedHeading,
  CategorySlider,
  SearchBox,
  BrandSuggestions,
} from "./components";

// Static constant moved outside component to prevent recreation
const ANIMATION_TEXTS = ["Highest Price", "Hassle Free Pickup", "Instant Payment"];

/**
 * SellHomeBanner - Main banner component for the Sell page
 * Refactored to use composition pattern with smaller, focused components
 */
function SellHomeBanner({ onViewAllClick }) {
  const navigate = useNavigate();
  const { slug1 } = useParams();
  const brandSectionRef = useRef(null);

  // Search state (kept local as it's UI-specific)
  const [searchTerm, setSearchTerm] = useState("");

  // Custom hook handles all API-related state and actions
  const {
    categories,
    brands,
    catName,
    selectedCategoryId,
    results,
    mobileResults,
    showDropdown,
    isLoadingCategories,
    isLoadingBrands,
    fetchCategories,
    selectCategory,
    debouncedSearch,
    clearResults,
    closeDropdown,
  } = useSellBannerData(slug1);


  // Initialize data on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  /**
   * Handle search input changes
   */
  const handleSearchChange = useCallback(
    (e, isMobile = false) => {
      const value = e.target.value.trimStart();
      setSearchTerm(value);

      if (value === "") {
        clearResults(isMobile);
      } else {
        debouncedSearch(value, isMobile);
      }
    },
    [clearResults, debouncedSearch]
  );

  /**
   * Handle category selection with navigation
   */
  const handleCategorySelect = useCallback(
    async (id, categoryName, slug) => {
      await selectCategory(id, categoryName);

      if (slug1 !== slug) {
        navigate(`/${slug}`, { replace: true });
      }
    },
    [selectCategory, slug1, navigate]
  );

  /**
   * Handle item click (brand or product) for navigation
   * Consolidated from separate brand/product handlers to reduce duplication
   */
  const handleItemClick = useCallback(
    (item) => {
      const path = item?.subCategorySlug
        ? `/${item.subCategorySlug}/${item.slugSell}`
        : `/${item.categorySlug}/${item.slugSell}`;
      
      navigate(path, { replace: true });
      closeDropdown();
      setSearchTerm("");
    },
    [navigate, closeDropdown]
  );

  /**
   * Handle brand suggestion click (navigates to brand)
   */
  const handleBrandSuggestionClick = useCallback(
    (brand) => {
      navigate(`${brand.slugSell}`, { replace: true });
    },
    [navigate]
  );

  /**
   * Handle mobile search close
   */
  const handleMobileSearchClose = useCallback(() => {
    setSearchTerm("");
    clearResults(true);
  }, [clearResults]);

  return (
    <div className={styles.sellbanneronly}>
      <div className={styles.bannerContainer}>
        <div className={styles.sellerbanner}>
          {/* Left banner image */}
          <div className={styles.leftImg}>
            <img src={BannerImage} alt="Sell Banner" title="Sell Banner" />
          </div>

          {/* Right content area */}
          <div className={styles.rightContent}>
            {/* Category slider with scroll arrows */}
            <CategorySlider
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              isLoading={isLoadingCategories}
              onCategorySelect={handleCategorySelect}
            />

            {/* Animated heading with typewriter effect */}
            <AnimatedHeading texts={ANIMATION_TEXTS} catName={catName} />

            {/* Search box with dropdown/modal */}
            <SearchBox
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              results={results}
              mobileResults={mobileResults}
              showDropdown={showDropdown}
              onBrandClick={handleItemClick}
              onProductClick={handleItemClick}
              onCloseMobile={handleMobileSearchClose}
              onCloseDropdown={closeDropdown}
            />

            {/* Brand suggestions grid */}
            <BrandSuggestions
              ref={brandSectionRef}
              brands={brands}
              isLoading={isLoadingBrands}
              onBrandClick={handleBrandSuggestionClick}
              onViewAllClick={onViewAllClick}
            />

            {/* View all button (mobile) */}
            <button className={styles.laptopviewall} onClick={onViewAllClick}>
              View all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellHomeBanner;
