import { forwardRef } from "react";
import styles from "../SellBanner.module.css";

/**
 * Brand suggestions grid showing top brands and a "More" button
 * ForwardRef enables parent to scroll to this section
 */
const BrandSuggestions = forwardRef(function BrandSuggestions(
  { brands, isLoading, onBrandClick, onViewAllClick },
  ref,
) {
  // Skeleton loading state
  if (isLoading) {
    return (
      <div className={styles.suggestionBrandBox} ref={ref}>
        {Array(4)
          .fill()
          .map((_, i) => (
            <div key={`skeleton-${i}`} className={styles.brands}>
              <div className={styles.brandImageBg}></div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className={styles.suggestionBrandBox} ref={ref}>
      {brands.slice(0, 4).map((brand) => (
        <div key={brand._id || brand.slugSell}>
          <div
            className={styles.brandImageBg}
            onClick={() => onBrandClick(brand)}
          >
            <img
              src={brand?.brandLogo}
              alt={brand?.brandName}
              title={brand?.brandName}
            />
          </div>
        </div>
      ))}

      {/* More button */}
      <div className={styles.brandImageBg} onClick={onViewAllClick}>
        <span className={styles.dotButton}>
          <div className={styles.dotsContainer}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        </span>
        <span className={styles.morelink}>More</span>
      </div>
    </div>
  );
});

export default BrandSuggestions;
