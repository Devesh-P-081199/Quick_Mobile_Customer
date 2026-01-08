import { useState, useEffect } from "react";
import slide1 from "../../../../assets/images/banner_images/homepage_banner_slider_image_01.png";

function HomeSlider() {
  const slides = [
    {
      title: "Sell Your Old Phone in Seconds!",
      description:
        "Instant quotes, hassle-free pickup, and quick payment. Upgrade to the latest tech today!",
      image: slide1,
    },
    {
      title: "Sell Your Old Phone in Seconds!",
      description:
        "Instant quotes, hassle-free pickup, and quick payment. Upgrade to the latest tech today!",
      image: slide1,
    },
    {
      title: "Sell Your Old Phone in Seconds!",
      description:
        "Instant quotes, hassle-free pickup, and quick payment. Upgrade to the latest tech today!",
      image: slide1,
    },
    {
      title: "Sell Your Old Phone in Seconds!",
      description:
        "Instant quotes, hassle-free pickup, and quick payment. Upgrade to the latest tech today!",
      image: slide1,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0); // Reset progress when manually changing slides
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0); // Reset progress when manually changing slides
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setProgress(0); // Reset progress when clicking dots
  };

  // Auto-slide with 5-second delay and progress tracking
  useEffect(() => {
    setProgress(0); // Reset progress when slide changes

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 100 / (5000 / 50); // Increment based on 5000ms total time
      });
    }, 50);

    // Slide change timer
    const slideTimeout = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimeout);
    };
  }, [currentSlide]);

  return (
    <>
      <div className="slider-container">
        <div className="slider-wrapper">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              <div className="slider-content">
                <img src={slide.image} alt="iPhone" className="slider-image" />
                <h2 className="slider-title">{slide.title}</h2>
                <p className="slider-description">{slide.description}</p>
                <button className="slider-button">Sell Now</button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button className="slider-nav left" onClick={prevSlide}>
          {"<"}
        </button>
        <button className="slider-nav right" onClick={nextSlide}>
          {">"}
        </button>
      </div>

      {/* Dots Navigation with Progress Bar */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          >
            {index === currentSlide && (
              <div
                className="dot-progress"
                style={{ width: `${progress}%` }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default HomeSlider;
