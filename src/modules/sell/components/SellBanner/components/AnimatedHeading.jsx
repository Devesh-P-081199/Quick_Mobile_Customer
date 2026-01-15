import { useState, useEffect } from "react";
import styles from "../SellBanner.module.css";

/**
 * Animated heading with typewriter effect
 * Cycles through an array of texts with a typing animation
 */
function AnimatedHeading({
  texts = ["Highest Price", "Hassle Free Pickup", "Instant Payment"],
  catName = "",
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!texts.length) return;

    let isMounted = true; // Track mount state to prevent memory leaks
    let textRef = "";
    let charIndex = 0;
    let currentTextIndex = 0;
    let timeoutId = null;

    const animate = () => {
      if (!isMounted) return; // Guard against unmounted updates

      const fullText = texts[currentTextIndex % texts.length];

      if (charIndex < fullText.length) {
        textRef += fullText[charIndex];
        setDisplayedText(textRef);
        charIndex += 1;
        timeoutId = setTimeout(animate, 100);
      } else {
        timeoutId = setTimeout(() => {
          if (!isMounted) return; // Guard here too
          textRef = "";
          charIndex = 0;
          currentTextIndex += 1;
          animate();
        }, 2000);
      }
    };

    animate();

    return () => {
      isMounted = false; // Mark as unmounted
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [texts]);

  return (
    <div className={styles.bannerHeading}>
      <h2>Sell Your Used {catName} And Get! </h2>
      <div className={styles.animatedText}>
        <h2>{displayedText}</h2>
      </div>
    </div>
  );
}

export default AnimatedHeading;
