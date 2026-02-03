import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { NavLink } from "react-router-dom";
import styles from "../SellBanner.module.css";
import MobileIcon from "../../../../../assets/images/Products/mobile.png";

/**
 * Category slider with horizontal scrolling and navigation arrows
 */
function CategorySlider({
  categories,
  selectedCategoryId,
  isLoading,
  onCategorySelect,
}) {
  // ... (keep existing hook logic, no changes needed to refs/state) ...
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const updateArrowVisibility = useCallback(() => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
    }
  }, []);

  const handleScrollLeft = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  }, []);

  const handleScrollRight = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    updateArrowVisibility();
    slider.addEventListener("scroll", updateArrowVisibility);
    return () => {
      slider.removeEventListener("scroll", updateArrowVisibility);
    };
  }, [categories, updateArrowVisibility]);

  const sortedCategories = useMemo(
    () =>
      [...categories].sort((a, b) => {
        if (a._id === selectedCategoryId) return -1;
        if (b._id === selectedCategoryId) return 1;
        return 0;
      }),
    [categories, selectedCategoryId],
  );

  if (isLoading) {
    return (
      <div className={styles.sliderWrapper}>
        <div className={`${styles.imgSlider} scrollbar-hidden`}>
          {Array(5)
            .fill()
            .map((_, index) => (
              <div className={styles.imgCard} key={`skeleton-${index}`}>
                <div className={styles.imageBg}></div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.sliderWrapper}>
      {showLeftArrow && (
        <button
          type="button"
          className={styles.arrowLeft}
          onClick={handleScrollLeft}
        >
          &#10094;
        </button>
      )}

      <div className={`${styles.imgSlider} scrollbar-hidden`} ref={sliderRef}>
        {sortedCategories.map((cat) => (
          <div
            key={cat._id}
            onClick={() =>
              onCategorySelect(cat._id, cat.categoryName, cat?.slug?.sell)
            }
            className={`${styles.imgCard} ${selectedCategoryId === cat._id ? styles.selectedCategory : ""
              }`}
          >
            <div className={styles.imageBg}>
              <img
                src={cat?.categoryImageUrl || MobileIcon}
                alt={cat?.categoryName}
                title={cat?.categoryName}
              />
              <span className={styles.cardName}>{cat.categoryName}</span>
            </div>
          </div>
        ))}

        <NavLink
          to="/sell-gadgets"
          className={`${styles.imgCard} ${styles.viewAllCard}`}
          aria-label="View more categories"
        >
          <div className={styles.imageBg}>
            <span className={styles.dotButton}>
              <div className={styles.dotsContainer}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
            </span>
            <span className={styles.morelink}>More</span>
          </div>
        </NavLink>
      </div>

      {showRightArrow && (
        <button
          type="button"
          className={styles.arrowRight}
          onClick={handleScrollRight}
        >
          &#10095;
        </button>
      )}
    </div>
  );
}

export default CategorySlider;
