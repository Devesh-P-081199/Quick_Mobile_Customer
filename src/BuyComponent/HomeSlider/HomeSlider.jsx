import { useRef, useState } from "react";
import { useEffect } from "react";
import styles from "./HomeSlider.module.css";
import phoneImg from "../../assets/images/Products/iphone.png";

const slides = [
  {
    id: 1,
    title: "Sell Your Old Phone in Seconds!",
    description:
      "Instant quotes, hassle-free pickup, and quick payment. Upgrade to the latest tech today!",
    image: phoneImg,
    button: "Sell Now",
  },
  {
    id: 2,
    title: "Get the Best Price Online!",
    description:
      "Trusted by thousands. Sell your phone with full transparency and no hidden charges.",
    image: phoneImg,
    button: "Start Selling",
  },
  {
    id: 3,
    title: "Sell Your Old Phone in Seconds!",
    description:
      "Instant quotes, hassle-free pickup, and quick payment. Upgrade to the latest tech today!",
    image: phoneImg,
    button: "Sell Now",
  },
  {
    id: 4,
    title: "Get the Best Price Online!",
    description:
      "Trusted by thousands. Sell your phone with full transparency and no hidden charges.",
    image: phoneImg,
    button: "Start Selling",
  },
  {
    id: 5,
    title: "Get the Best Price Online!",
    description:
      "Trusted by thousands. Sell your phone with full transparency and no hidden charges.",
    image: phoneImg,
    button: "Start Selling",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(2);
  const [activeArrow, setActiveArrow] = useState("right");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setActiveArrow("right");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((current - 1 + slides.length) % slides.length);
    setActiveArrow("left");
  };
  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
    setActiveArrow("right");
  };
  // const touchStartX = useRef(null);

  // Touch events

  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    console.log("Touch start", e.touches[0].clientX);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    console.log("Touch end", e.changedTouches[0].clientX);
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX.current;

    if (delta > 60) {
      console.log("Swipe right detected");
      prevSlide();
    } else if (delta < -60) {
      console.log("Swipe left detected");
      nextSlide();
    }

    touchStartX.current = null;
  };

  const slide = slides[current];
  return (
    <div
      className={styles.wrapper}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.banner}>
        India’s most transparent mobile selling platform
      </div>
      <div className={styles.sliderContainer}>
        <button
          onClick={prevSlide}
          className={`${styles.arrowButton} ${
            activeArrow === "left" ? styles.activeArrow : styles.inactiveArrow
          }`}
        >
          <span className={styles.arrowSymbol}>‹</span>
        </button>

        <div className={styles.slideContentWrapper}>
          <div className={styles.textSection}>
            <h2 className={styles.title}>{slide.title}</h2>
            <p className={styles.description}>{slide.description}</p>
            <button className={styles.ctaButton}>{slide.button}</button>
          </div>
          <img src={slide.image} alt="Phone" className={styles.image} />
        </div>

        <button
          onClick={nextSlide}
          className={`${styles.arrowButton} ${
            activeArrow === "right" ? styles.activeArrow : styles.inactiveArrow
          }`}
        >
          <span className={styles.arrowSymbol}>›</span>
        </button>
      </div>

      <div className={styles.dotsWrapper}>
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`${styles.dot} ${
              index === current ? styles.activeDot : styles.inactiveDot
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
