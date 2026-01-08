import { useState, useRef } from "react";
import styles from "./SuggestionProductSlider.module.css";
import mobileimg from "../../../../assets/images/Products/mobile.png";

// Minimum swipe distance (in pixels) to trigger a slide change
const SWIPE_THRESHOLD_PX = 50;

const SuggestionProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startXRef = useRef(null);
  const isDraggingRef = useRef(false);
  const sliderRef = useRef(null);

  const sliderData = [
    {
      image: mobileimg,
      title: "Apple iPhone 16 Pro Max",
      price: "Get Upto ₹29,999",
    },
    {
      image: mobileimg,
      title: "Samsung Galaxy Note 20 Ultra 5G",
      price: "Get Upto ₹24,500",
    },
    {
      image: mobileimg,
      title: "OnePlus 12 Pro",
      price: "Get Upto ₹22,000",
    },
    {
      image: mobileimg,
      title: "Vivo X90",
      price: "Get Upto ₹18,900",
    },
  ];

  // Consolidated pointer handler for both touch and mouse events
  const handlePointerDown = (e) => {
    startXRef.current = e.clientX;
    isDraggingRef.current = true;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX;
    const diff = startXRef.current - currentX;

    if (Math.abs(diff) > SWIPE_THRESHOLD_PX) {
      if (diff > 0 && currentIndex < sliderData.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
      isDraggingRef.current = false;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className={styles.sliderContainer}>
      <div className={styles.sliderWrapper}>
        <div
          className={styles.slider}
          ref={sliderRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{ touchAction: "pan-y" }}
        >
          {sliderData.map((card, index) => (
            <div
              className={`${styles.card} ${
                index === currentIndex ? styles.activeCard : ""
              }`}
              key={index}
              style={{
                transform: `translateX(calc(-${currentIndex * 100}% - ${
                  currentIndex * 10
                }px))`,
              }}
            >
              <div className={styles.innerBox}>
                <img
                  src={card.image}
                  alt={card.title}
                  title={card?.title}
                  className={styles.image}
                />
                <div className={styles.contentBox}>
                  <span className={styles.ctaText}>Sell this device</span>
                  <span className={styles.title}>{card.title}</span>
                  <span className={styles.price}>{card.price}</span>
                </div>
                <button className={styles.sellBtn}>Sell now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {sliderData.map((_, idx) => (
          <div
            key={idx}
            className={`${styles.dot} ${
              idx === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentIndex(idx)}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default SuggestionProductSlider;
