import { useState, useEffect } from "react";
import search from "../../assets/kicons/v-search.png";
import award from "../../assets/kicons/v-award.png";
import security from "../../assets/kicons/v-security.png";
import wallet from "../../assets/kicons/v-wallet.png";
import bag from "../../assets/kicons/v-bag.png";

const slides = [
  {
    title: "What is Verified Refurbished?",
    subtitle: "How we ensure quality for you.",
    points: [
      { text: "20-point professional inspection", icon: search },
      { text: "Strict quality charter that protects you", icon: award },
      { text: "Free warranty with every purchase", icon: security },
      { text: "30 days to change your mind", icon: wallet },
    ],
  },
  {
    title: "What is Verified Refurbished?",
    subtitle: "How we ensure quality for you.",
    points: [
      { text: "20-point professional inspection", icon: search },
      { text: "Strict quality charter that protects you", icon: award },
      { text: "Free warranty with every purchase", icon: security },
      { text: "30 days to change your mind", icon: wallet },
    ],
  },
  {
    title: "What is Verified Refurbished?",
    subtitle: "How we ensure quality for you.",
    points: [
      { text: "20-point professional inspection", icon: search },
      { text: "Strict quality charter that protects you", icon: award },
      { text: "Free warranty with every purchase", icon: security },
      { text: "30 days to change your mind", icon: wallet },
    ],
  },
];

const HomeTwoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="home-two-slider homepage-section">
      <div className="slider-container">
        <div
          className="slider-content"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div className="slide" key={index}>
              <div className="text-container">
                <h1 className="slider-title">{slide.title}</h1>
                <p className="slider-subtitle">{slide.subtitle}</p>
                <button className="sell-now-btn">Learn More</button>
              </div>
              <div className="info-box">
                {slide.points.map((point, i) => (
                  <div className="info-item" key={i}>
                    <img src={point.icon} alt="icon" className="info-icon" />
                    <p>{point.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="slider-navigation">
          <button className="nav-btn prev-btn" onClick={prevSlide}>
            &lt;
          </button>
          <button className="nav-btn next-btn" onClick={nextSlide}>
            &gt;
          </button>
        </div>
      </div>

      <div className="slider-dots">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HomeTwoSlider;
