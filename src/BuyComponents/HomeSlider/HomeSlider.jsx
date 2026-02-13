import  { useState } from "react";
import bannerleft from "../../assets/images/Products/iphone.png";


function HomeSlider() {
  const slides = [
    {
      title: "Sell Your Old Phone in Seconds!",
      description:
        "Instant quotes, hassle-free pickup, and quick payment. Upgrade to the latest tech today!",
      image: bannerleft,
    },
    {
      title: "Sell Your Old Phone in Seconds!",
      description:
        "Instant quotes, hassle-free pickup, and quick payment. Upgrade to the latest tech today!",
      image: bannerleft,
    },
    {
      title: "Sell Your Old Phone in Seconds!",
      description:
        "Instant quotes, hassle-free pickup, and quick payment. Upgrade to the latest tech today!",
      image: bannerleft,
    },
    {
      title: "Sell Your Old Phone in Seconds!",
      description:
        "Instant quotes, hassle-free pickup, and quick payment. Upgrade to the latest tech today!",
      image: bannerleft,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

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
                <h2 className="slider-title">{slide.title}</h2>
                <p className="slider-description">{slide.description}</p>
                <button className="slider-button">Sell Now</button>
                <img src={slide.image} alt="iPhone" className="slider-image" />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button className="slider-nav left" onClick={prevSlide}>{"<"}</button>
        <button className="slider-nav right" onClick={nextSlide}>{">"}</button>
      </div>

      {/* Dots Navigation */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </>
  );
}

export default HomeSlider;
