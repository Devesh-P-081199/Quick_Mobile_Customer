// Slider Constraints Utility
// Ensures slider thumbs stay within track boundaries and labels are positioned correctly

export const constrainSliderThumbs = (sliderContainer) => {
  if (!sliderContainer) return;

  const track = sliderContainer.querySelector(".slider-track");
  const thumbs = sliderContainer.querySelectorAll(".slider-thumb");
  const labels = sliderContainer.querySelectorAll(".thumb-label");

  if (!track || !thumbs.length) return;

  const trackRect = track.getBoundingClientRect();
  const trackWidth = trackRect.width;

  thumbs.forEach((thumb, index) => {
    const label = labels[index];

    // Add event listeners for thumb movement
    let isDragging = false;
    let startX = 0;
    let startLeft = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      startLeft = parseInt(thumb.style.left || "0", 10);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      e.preventDefault();
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      let newLeft = startLeft + deltaX;

      // Constrain to track boundaries
      const thumbWidth = thumb.offsetWidth;
      const minLeft = 0;
      const maxLeft = trackWidth - thumbWidth;

      newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));

      // Update thumb position
      thumb.style.left = `${newLeft}px`;

      // Update label position and handle edge cases
      if (label) {
        label.style.left = `${newLeft + thumbWidth / 2}px`;

        // Handle edge positioning for labels
        const labelWidth = label.offsetWidth;
        if (newLeft < labelWidth / 2) {
          label.setAttribute("data-edge", "left");
        } else if (newLeft > trackWidth - labelWidth / 2) {
          label.setAttribute("data-edge", "right");
        } else {
          label.removeAttribute("data-edge");
        }
      }

      // Trigger custom event for value updates
      const event = new CustomEvent("sliderChange", {
        detail: {
          thumbIndex: index,
          position: newLeft,
          percentage: (newLeft / (trackWidth - thumbWidth)) * 100,
        },
      });
      sliderContainer.dispatchEvent(event);
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    thumb.addEventListener("mousedown", handleMouseDown);

    // Touch events for mobile
    thumb.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      handleMouseDown({
        clientX: touch.clientX,
        preventDefault: () => e.preventDefault(),
      });
    });

    document.addEventListener("touchmove", (e) => {
      if (isDragging) {
        const touch = e.touches[0];
        handleMouseMove({ clientX: touch.clientX });
      }
    });

    document.addEventListener("touchend", handleMouseUp);
  });
};

// Utility to set slider values programmatically
export const setSliderValue = (sliderContainer, thumbIndex, percentage) => {
  const track = sliderContainer.querySelector(".slider-track");
  const thumb = sliderContainer.querySelectorAll(".slider-thumb")[thumbIndex];
  const label = sliderContainer.querySelectorAll(".thumb-label")[thumbIndex];

  if (!track || !thumb) return;

  const trackWidth = track.offsetWidth;
  const thumbWidth = thumb.offsetWidth;
  const maxPosition = trackWidth - thumbWidth;
  const position = (percentage / 100) * maxPosition;

  thumb.style.left = `${position}px`;

  if (label) {
    label.style.left = `${position + thumbWidth / 2}px`;
  }
};

// Utility to get slider values
export const getSliderValues = (sliderContainer) => {
  const track = sliderContainer.querySelector(".slider-track");
  const thumbs = sliderContainer.querySelectorAll(".slider-thumb");

  if (!track || !thumbs.length) return [];

  const trackWidth = track.offsetWidth;
  const values = [];

  thumbs.forEach((thumb) => {
    const position = parseInt(thumb.style.left || "0", 10);
    const thumbWidth = thumb.offsetWidth;
    const maxPosition = trackWidth - thumbWidth;
    const percentage = maxPosition > 0 ? (position / maxPosition) * 100 : 0;
    values.push(Math.round(percentage));
  });

  return values;
};

// Initialize slider with constraints
export const initConstrainedSlider = (sliderContainer, options = {}) => {
  const {
    minValue = 0,
    maxValue = 100,
    initialValues = [0, 100],
    onValueChange = () => {},
  } = options;

  // Add constrained class
  sliderContainer.classList.add("range-slider-constrained");

  // Set initial values
  initialValues.forEach((value, index) => {
    const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
    setSliderValue(sliderContainer, index, percentage);
  });

  // Apply constraints
  constrainSliderThumbs(sliderContainer);

  // Listen for value changes
  sliderContainer.addEventListener("sliderChange", (e) => {
    const { thumbIndex, percentage } = e.detail;
    const value = minValue + (percentage / 100) * (maxValue - minValue);
    onValueChange(thumbIndex, Math.round(value), percentage);
  });

  return {
    setValue: (thumbIndex, value) => {
      const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
      setSliderValue(sliderContainer, thumbIndex, percentage);
    },
    getValues: () => {
      const percentages = getSliderValues(sliderContainer);
      return percentages.map(
        (p) => minValue + (p / 100) * (maxValue - minValue)
      );
    },
  };
};
