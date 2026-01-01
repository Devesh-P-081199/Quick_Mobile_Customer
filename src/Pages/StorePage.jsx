import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./StorePage.module.css";
import MobileCommonHeaderthree from "../Components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import storeImg from "../assets/images/store_img.jpg";
import location from "../assets/flaticons/location.png";
import time from "../assets/flaticons/clock.png";
import headphone from "../assets/flaticons/headphone.png";
import onlineShopping from "../assets/flaticons/online-shopping.png";
import smartphone from "../assets/flaticons/smartphone.png";
import support from "../assets/flaticons/support.png";

// Sample stores database - replace with API call
const STORES_DATABASE = {
  "store-1": {
    name: "Quick Mobile - Thane",
    address: "Shop no. 09, St. John Baptist School Building, Opp. Jyoti Stores, Charai, Thane West - 400601",
    time: "9:00 AM - 6:00 PM",
    phone: "+91 7208548807",
    location: { lat: 19.19591355760504, lng: 72.9749617390098 },
    images: [
      storeImg,
      storeImg,
      storeImg,
      storeImg,
    ],
    services: [
      { name: "Sell Phone", icon: smartphone },
      { name: "Repair Phone", icon: support },
      { name: "Buy Phone", icon: onlineShopping },
      { name: "Accessories", icon: headphone }
    ],
  }
};

function StorePage() {
  const { storeId } = useParams();

  // Get store data based on ID
  const STORE_DATA = STORES_DATABASE[storeId] || STORES_DATABASE["store-1"];
  const STORE_IMAGES = STORE_DATA.images;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev === STORE_IMAGES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? STORE_IMAGES.length - 1 : prev - 1));
  };

  // Touch handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
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

  const handleReviewSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    toast.success(`Review submitted with ${rating} stars and message: ${reviewMessage}`);
    setRating(0);
    setReviewMessage("");
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
              <button className={`${styles.sliderBtn} ${styles.prevBtn}`} onClick={prevSlide}>
                ❮
              </button>
              <div
                className={styles.imageSlider}
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {STORE_IMAGES.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Store key ${index}`}
                    className={styles.slide}
                  />
                ))}
              </div>
              <button className={`${styles.sliderBtn} ${styles.nextBtn}`} onClick={nextSlide}>
                ❯
              </button>
              <div className={styles.dotsContainer}>
                {STORE_IMAGES.map((_, index) => (
                  <span
                    key={index}
                    className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ""
                      }`}
                    onClick={() => handleImageClick(index)}
                  ></span>
                ))}
              </div>
            </div>
          </div>

          {/* Store Info */}
          <div className={styles.storeInfo}>
            <h3 className={styles.storeName}>{STORE_DATA.name}</h3>
            <div className={styles.address}>
              <img src={location} alt="" className="navIcon" />
              <p>{STORE_DATA.address}</p>
            </div>
            <div className={styles.time}>
              <img src={time} alt="" className="navIcon" />
              <p>{STORE_DATA.time}</p>
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
                  <img src={service.icon} alt="" />
                  {service.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Review Form */}
          <div className={styles.reviewSection}>
            <h2>Leave a Review</h2>
            <div className={styles.starRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`${styles.star} ${rating >= star ? styles.starFilled : ""}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              className={styles.reviewTextArea}
              placeholder="Write your review here..."
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              rows={3}
            />
            <button className={styles.submitButton} onClick={handleReviewSubmit}>
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StorePage;
