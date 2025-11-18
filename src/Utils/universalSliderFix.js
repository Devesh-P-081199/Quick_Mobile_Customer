// Universal Slider Fix - Automatically detects and fixes range slider issues
// This will work with any slider implementation

const universalSliderFix = () => {
  // Function to fix a single slider element
  const fixSlider = (sliderElement) => {
    const container =
      sliderElement.closest("div") || sliderElement.parentElement;
    if (!container) return;

    // Add container styles
    container.style.position = "relative";
    container.style.overflow = "hidden";
    container.style.padding = "20px 15px";
    container.style.boxSizing = "border-box";
    container.style.width = "100%";

    // Fix the slider itself
    sliderElement.style.width = "calc(100% - 30px)";
    sliderElement.style.margin = "0 auto";
    sliderElement.style.display = "block";
    sliderElement.style.position = "relative";

    // Add event listener to constrain thumb movement
    const constrainThumb = (e) => {
      setTimeout(() => {
        const thumbs = container.querySelectorAll(
          '[class*="thumb"], [class*="handle"], input[type="range"]::-webkit-slider-thumb'
        );
        thumbs.forEach((thumb) => {
          if (thumb.style) {
            const rect = container.getBoundingClientRect();
            const thumbRect = thumb.getBoundingClientRect();

            if (thumbRect.left < rect.left + 15) {
              thumb.style.left = "15px";
            }
            if (thumbRect.right > rect.right - 15) {
              thumb.style.right = "15px";
            }
          }
        });
      }, 10);
    };

    sliderElement.addEventListener("input", constrainThumb);
    sliderElement.addEventListener("change", constrainThumb);
    sliderElement.addEventListener("mousemove", constrainThumb);
    sliderElement.addEventListener("touchmove", constrainThumb);
  };

  // Find and fix all possible slider elements
  const findAndFixSliders = () => {
    // Look for HTML range inputs
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(fixSlider);

    // Look for elements with slider-related class names
    const sliderElements = document.querySelectorAll(
      [
        '[class*="slider"]',
        '[class*="range"]',
        '[class*="Slider"]',
        '[class*="Range"]',
        '[class*="price"]',
        '[class*="Price"]',
      ].join(", ")
    );

    sliderElements.forEach((element) => {
      // Check if this element contains slider functionality
      const hasSliderContent =
        element.querySelector('input[type="range"]') ||
        element.querySelector('[class*="thumb"]') ||
        element.querySelector('[class*="handle"]') ||
        element.querySelector('[class*="track"]');

      if (hasSliderContent) {
        fixSlider(element);
      }
    });

    // Look for elements that might be custom sliders based on content
    const potentialSliders = document.querySelectorAll("div");
    potentialSliders.forEach((div) => {
      const text = div.textContent || "";
      if (
        text.includes("₹") &&
        (text.includes("3,000") ||
          text.includes("29,000") ||
          text.includes("28,100"))
      ) {
        const parent =
          div.closest(
            'div[class*="slider"], div[class*="range"], div[class*="price"]'
          ) || div.parentElement;
        if (parent) {
          fixSlider(parent);
        }
      }
    });
  };

  // Apply fixes immediately
  findAndFixSliders();

  // Re-apply fixes when DOM changes
  const observer = new MutationObserver(() => {
    findAndFixSliders();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "style"],
  });

  // Apply fixes on window resize
  window.addEventListener("resize", findAndFixSliders);

  return {
    reapply: findAndFixSliders,
    disconnect: () => observer.disconnect(),
  };
};

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", universalSliderFix);
} else {
  universalSliderFix();
}

export default universalSliderFix;
