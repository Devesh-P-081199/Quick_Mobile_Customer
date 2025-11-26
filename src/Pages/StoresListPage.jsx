import { useNavigate } from "react-router-dom";
import styles from "./StoresListPage.module.css";
import MobileCommonHeaderthree from "../Components/layout/MobileCommonHeader/MobileCommonHeaderthree";

// Sample stores data - replace with API call
const STORES_DATA = [
  {
    id: "store-1",
    name: "Quick Mobile - Downtown",
    address: "123 Main Street, City Center, State - 123456",
    images: [
      "https://via.placeholder.com/400x250/1968b3/ffffff?text=Store+1+Image+1",
      "https://via.placeholder.com/400x250/1968b3/ffffff?text=Store+1+Image+2",
      "https://via.placeholder.com/400x250/1968b3/ffffff?text=Store+1+Image+3",
    ],
  },
  {
    id: "store-2",
    name: "Quick Mobile - Mall Branch",
    address: "456 Shopping Mall, 2nd Floor, State - 234567",
    images: [
      "https://via.placeholder.com/400x250/1968b3/ffffff?text=Store+2+Image+1",
      "https://via.placeholder.com/400x250/1968b3/ffffff?text=Store+2+Image+2",
      "https://via.placeholder.com/400x250/1968b3/ffffff?text=Store+2+Image+3",
    ],
  },
  {
    id: "store-3",
    name: "Quick Mobile - North Branch",
    address: "789 North Avenue, Business District, State - 345678",
    images: [
      "https://via.placeholder.com/400x250/1968b3/ffffff?text=Store+3+Image+1",
      "https://via.placeholder.com/400x250/1968b3/ffffff?text=Store+3+Image+2",
      "https://via.placeholder.com/400x250/1968b3/ffffff?text=Store+3+Image+3",
    ],
  },
];

function StoresListPage() {
  const navigate = useNavigate();

  const handleStoreClick = (storeId) => {
    navigate(`/our-store/${storeId}`);
  };

  return (
    <>
      <MobileCommonHeaderthree
        title="Our Stores"
        onBack={() => window.history.back()}
      />
      <div className={styles.storesListPage}>
        <div className="wrapper page-content-wrapper">
          <h1 className={styles.pageTitle}>Find a Store Near You</h1>
          <p className={styles.pageDescription}>
            Visit any of our stores for the best deals on phones, repairs, and
            accessories
          </p>

          <div className={styles.storesGrid}>
            {STORES_DATA.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onClick={() => handleStoreClick(store.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function StoreCard({ store, onClick }) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleThumbnailClick = (e, index) => {
    e.stopPropagation(); // Prevent card click
    setCurrentImageIndex(index);
  };

  return (
    <div className={styles.storeCard} onClick={onClick}>
      <div className={styles.imageSection}>
        <div className={styles.mainImage}>
          <img src={store.images[currentImageIndex]} alt={store.name} />
        </div>
        <div className={styles.thumbnails}>
          {store.images.map((img, index) => (
            <div
              key={index}
              className={`${styles.thumbnail} ${
                index === currentImageIndex ? styles.active : ""
              }`}
              onClick={(e) => handleThumbnailClick(e, index)}
            >
              <img src={img} alt={`${store.name} ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.storeInfo}>
        <h3 className={styles.storeName}>{store.name}</h3>
        <div className={styles.address}>
          <svg
            className={styles.locationIcon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p>{store.address}</p>
        </div>
        <button className={styles.viewDetailsBtn}>View Details</button>
      </div>
    </div>
  );
}

// Add React import for useState
import React from "react";

export default StoresListPage;
