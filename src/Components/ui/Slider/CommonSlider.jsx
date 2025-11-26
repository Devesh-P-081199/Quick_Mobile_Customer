// components/CommonSlider/CommonSlider.js
import React, { useEffect, useRef, useState } from "react";
import styles from "./CommonSlider.module.css";

const CommonSlider = ({
  items = [],
  renderItem,
  scrollAmount = 300,
  showNav = true,
  leftIcon,
  rightIcon,
  itemGap = 24,
}) => {
  const scrollRef = useRef(null);
  const itemRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(scrollAmount);

  useEffect(() => {
    if (itemRef.current) {
      setItemWidth(itemRef.current.offsetWidth + itemGap);
    }
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -itemWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: itemWidth, behavior: "smooth" });
  };

  return (
    <div className={styles.sliderWrapper}>
      <div className={`${styles.sliderTrack} scrollbar-hidden`} ref={scrollRef}>
        {items.map((item, index) => (
          <div
            className="brandContainer"
            key={index}
            ref={index === 0 ? itemRef : null}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {showNav && (
        <div className={styles.navButtons}>
          <img
            src={leftIcon}
            className={styles.navBtn}
            onClick={scrollLeft}
            alt="←"
            title="left-icon"
          />
          <img
            src={rightIcon}
            className={styles.navBtn}
            onClick={scrollRight}
            alt="→"
            title="right-icon"
          />
        </div>
      )}
    </div>
  );
};

export default CommonSlider;
