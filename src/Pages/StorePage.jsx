import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./StorePage.module.css";
import MobileCommonHeaderthree from "../Components/layout/MobileCommonHeader/MobileCommonHeaderthree";

// Sample stores database - replace with API call
const STORES_DATABASE = {
  "store-1": {
    name: "Quick Mobile - Downtown",
    address: "123 Main Street, City Center, State - 123456",
    phone: "+91 1234567890",
    location: { lat: 28.6139, lng: 77.209 },
    images: [
      "https://via.placeholder.com/1200x400/1968b3/ffffff?text=Store+1",
      "https://via.placeholder.com/1200x400/1968b3/ffffff?text=Store+1+Image+2",
      "https://via.placeholder.com/1200x400/1968b3/ffffff?text=Store+1+Image+3",
    ],
    services: ["Sell Phone", "Repair Phone", "Buy Phone", "Accessories"],
  },
  "store-2": {
    name: "Quick Mobile - Mall Branch",
    address: "456 Shopping Mall, 2nd Floor, State - 234567",
    phone: "+91 2345678901",
    location: { lat: 28.7041, lng: 77.1025 },
    images: [
      "https://via.placeholder.com/1200x400/1968b3/ffffff?text=Store+2",
      "https://via.placeholder.com/1200x400/1968b3/ffffff?text=Store+2+Image+2",
      "https://via.placeholder.com/1200x400/1968b3/ffffff?text=Store+2+Image+3",
    ],
    services: ["Sell Phone", "Repair Phone", "Buy Phone", "Accessories"],
  },
  "store-3": {
    name: "Quick Mobile - North Branch",
    address: "789 North Avenue, Business District, State - 345678",
    phone: "+91 3456789012",
    location: { lat: 28.5355, lng: 77.391 },
    images: [
      "https://via.placeholder.com/1200x400/1968b3/ffffff?text=Store+3",
      "https://via.placeholder.com/1200x400/1968b3/ffffff?text=Store+3+Image+2",
      "https://via.placeholder.com/1200x400/1968b3/ffffff?text=Store+3+Image+3",
    ],
    services: ["Sell Phone", "Repair Phone", "Buy Phone", "Accessories"],
  },
};

function StorePage() {
  const { storeId } = useParams();

  // Get store data based on ID
  const STORE_DATA = STORES_DATABASE[storeId] || STORES_DATABASE["store-1"];
  const STORE_IMAGES = STORE_DATA.images;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 5,
    review: "",
  });

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleGetDirections = () => {
    const { lat, lng } = STORE_DATA.location;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
  };

  const handleCall = () => {
    window.location.href = `tel:${STORE_DATA.phone}`;
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log("Review submitted:", reviewForm);
    // Add API call here
    alert("Thank you for your review!");
    setReviewForm({ name: "", rating: 5, review: "" });
  };

  return (
    <>
      <MobileCommonHeaderthree
        title="Our Store"
        onBack={() => window.history.back()}
      />
      <div className={styles.storePage}>
        <div className="wrapper page-content-wrapper">
          {/* Banner Slider */}
          <div className={styles.bannerSection}>
            <div className={styles.mainImage}>
              <img
                src={STORE_IMAGES[currentImageIndex]}
                alt={`Store ${currentImageIndex + 1}`}
              />
            </div>
            <div className={styles.thumbnails}>
              {STORE_IMAGES.map((img, index) => (
                <div
                  key={index}
                  className={`${styles.thumbnail} ${
                    index === currentImageIndex ? styles.active : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Store Info */}
          <div className={styles.storeInfo}>
            <h1 className={styles.storeName}>{STORE_DATA.name}</h1>
            <div className={styles.address}>
              <svg
                className={styles.locationIcon}
                width="20"
                height="20"
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
              <p>{STORE_DATA.address}</p>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button
                className={styles.directionsBtn}
                onClick={handleGetDirections}
              >
                Get Directions
              </button>
              <button className={styles.callBtn} onClick={handleCall}>
                Call Now
              </button>
            </div>
          </div>

          {/* Services */}
          <div className={styles.servicesSection}>
            <h2>Our Services</h2>
            <ul className={styles.servicesList}>
              {STORE_DATA.services.map((service, index) => (
                <li key={index}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Review Form */}
          <div className={styles.reviewSection}>
            <h2>Leave a Review</h2>
            <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={reviewForm.name}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="rating">Rating</label>
                <div className={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`${styles.star} ${
                        star <= reviewForm.rating ? styles.filled : ""
                      }`}
                      onClick={() =>
                        setReviewForm({ ...reviewForm, rating: star })
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="review">Review</label>
                <textarea
                  id="review"
                  rows="4"
                  value={reviewForm.review}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, review: e.target.value })
                  }
                  required
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default StorePage;
