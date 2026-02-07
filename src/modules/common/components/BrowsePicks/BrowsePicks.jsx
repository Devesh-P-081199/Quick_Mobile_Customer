import { useState, useEffect } from "react";
import iPhone from "../../../../assets/images/Products/mobile.png";
import styles from "./BrowsePicks.module.css";
import api from "../../../../Utils/api";

// Define allowed categories to display
const ALLOWED_CATEGORIES = [
  "Mobile",
  "Tablet",
  "Laptop",
  "Smartwatch",
  "Earpods",
  "Gaming console",
];

const BrowsePicks = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(
          "/common-module/category?option=Sell&all=true"
        );
        const allCategories = response?.data?.categories || [];

        // Filter to only include allowed categories
        const filteredCategories = allCategories.filter((category) =>
          ALLOWED_CATEGORIES.includes(category.categoryName)
        );

        setCategories(filteredCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="page-content-wrapper">
      <div className={styles.browserPick}>
        <h2 className={styles.heading}>Top Selling Category</h2>

        <div className={styles.cardContainer}>
          {isLoading ? (
            // Loading skeleton
            Array(6)
              .fill()
              .map((_, index) => (
                <div key={`skeleton-${index}`} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <img src={iPhone} alt="Loading" />
                  </div>
                  <p className={styles.cardText}>Loading...</p>
                </div>
              ))
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <div key={category._id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img
                    src={category.categoryImageUrl || iPhone}
                    alt={category.categoryName}
                    onError={(e) => {
                      e.target.src = iPhone;
                    }}
                  />
                </div>
                <p className={styles.cardText}>{category.categoryName}</p>
              </div>
            ))
          ) : (
            <div className={styles.noCategoriesText}>
              No categories available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowsePicks;
