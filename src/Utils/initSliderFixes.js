// Initialize all slider fixes automatically
// Add this to your main App.js or index.js

import { autoApplySliderFix } from "./universalSliderFix";

// Auto-initialize slider fixes
export const initAllSliderFixes = () => {
  // Apply universal slider fix
  autoApplySliderFix();

  // Add global CSS class to body for emergency overrides
  document.body.classList.add("slider-fixes-enabled");

  console.log("Universal slider fixes initialized");
};

// Call this in your main app component
export default initAllSliderFixes;
