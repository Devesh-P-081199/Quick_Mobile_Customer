// Auto Slider Fix - Add this to your main component or index.js
// This will automatically detect and fix slider issues on page load

const autoSliderFix = () => {
  const applyFix = () => {
    // Find all potential slider containers
    const containers = document.querySelectorAll("div");

    containers.forEach((container) => {
      const text = container.textContent || "";

      // Check if this container has price-related content
      if (
        text.includes("₹") &&
        (text.includes("3,000") ||
          text.includes("29,000") ||
          text.includes("28,100"))
      ) {
        // Apply container fixes
        container.style.overflow = "hidden";
        container.style.padding = "20px 15px";
        container.style.boxSizing = "border-box";
        container.style.maxWidth = "100%";
        container.style.position = "relative";

        // Find and fix any range inputs within
        const rangeInputs = container.querySelectorAll('input[type="range"]');
        rangeInputs.forEach((input) => {
          input.style.width = "calc(100% - 30px)";
          input.style.margin = "0 auto";
          input.style.display = "block";
          input.style.maxWidth = "calc(100% - 30px)";
        });

        // Find and fix any slider tracks
        const tracks = container.querySelectorAll(
          '[class*="track"], [class*="Track"]'
        );
        tracks.forEach((track) => {
          track.style.width = "calc(100% - 30px)";
          track.style.margin = "0 auto";
          track.style.maxWidth = "calc(100% - 30px)";
          track.style.overflow = "hidden";
        });

        // Find and fix any thumbs
        const thumbs = container.querySelectorAll(
          '[class*="thumb"], [class*="Thumb"], [class*="handle"]'
        );
        thumbs.forEach((thumb, index) => {
          thumb.style.position = "absolute";
          thumb.style.width = "20px";
          thumb.style.height = "20px";
          thumb.style.borderRadius = "50%";
          thumb.style.maxWidth = "20px";
          thumb.style.maxHeight = "20px";

          // Constrain first thumb to left
          if (index === 0) {
            thumb.style.left = "0";
            thumb.style.transform = "translateX(0)";
          }
          // Constrain last thumb to right
          if (index === thumbs.length - 1) {
            thumb.style.right = "0";
            thumb.style.left = "auto";
            thumb.style.transform = "translateX(0)";
          }
        });

        console.log("Applied slider fix to container:", container);
      }
    });
  };

  // Apply fix immediately
  applyFix();

  // Apply fix after a short delay (in case content loads dynamically)
  setTimeout(applyFix, 1000);

  // Apply fix when window resizes
  window.addEventListener("resize", applyFix);

  // Apply fix when DOM changes
  const observer = new MutationObserver(applyFix);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

// Auto-run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", autoSliderFix);
} else {
  autoSliderFix();
}

export default autoSliderFix;
