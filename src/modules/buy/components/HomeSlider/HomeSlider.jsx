import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import slide1 from "../../../../assets/images/banner_images/homepage_banner_slider_image_01.png";
import "./HomeSlider.css";

function HomeSlider() {
  const navigate = useNavigate();
  // Define unique slides (remove duplicates)
  const uniqueSlides = [
    {
      title: "Sell Your Old Phone in Minutes!",
      description: "Highest Price | Doorstep Pickups | Instant Payment",
      image: slide1,
    },
  ];

  // Create the final slides array based on number of unique slides
  // If we have 2+ unique slides, repeat each slide twice (e.g., 2 slides → 4)
  // If we have only 1 slide, keep it as is (no repetition)
  const slides = useMemo(() => {
    if (uniqueSlides.length === 1) {
      return uniqueSlides;
    }
    // Repeat each slide twice: [slide1, slide2] → [slide1, slide2, slide1, slide2]
    return [...uniqueSlides, ...uniqueSlides];
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  // Determine if navigation should be shown
  const showNavigation = uniqueSlides.length > 1;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0); // Reset progress when manually changing slides
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0); // Reset progress when manually changing slides
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setProgress(0); // Reset progress when clicking dots
  };

  // Auto-slide with 5-second delay and progress tracking
  // Only enable auto-slide when there are multiple unique slides
  useEffect(() => {
    if (!showNavigation) {
      // No auto-slide for single slide
      return;
    }

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
  }, [currentSlide, nextSlide, showNavigation]);

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
                <button
                  className="slider-button"
                  onClick={() => navigate("/sell-old-mobile-phone")}
                >
                  Sell Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons - Only show when there are multiple unique slides */}
        {showNavigation && (
          <>
            <button className="slider-nav left" onClick={prevSlide}>
              {"<"}
            </button>
            <button className="slider-nav right" onClick={nextSlide}>
              {">"}
            </button>
          </>
        )}
      </div>

      {/* Dots Navigation with Progress Bar - Only show when there are multiple unique slides */}
      {showNavigation && (
        <div className="slider-dots">
          {uniqueSlides.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentSlide % uniqueSlides.length ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            >
              {index === currentSlide % uniqueSlides.length && (
                <div
                  className="dot-progress"
                  style={{ width: `${progress}%` }}
                ></div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default HomeSlider;
