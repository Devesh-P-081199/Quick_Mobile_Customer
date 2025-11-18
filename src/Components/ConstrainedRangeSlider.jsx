import React, { useEffect, useRef, useState } from "react";
import { initConstrainedSlider } from "../utils/sliderConstraints";

const ConstrainedRangeSlider = ({
  minValue = 3000,
  maxValue = 29000,
  initialMin = 3000,
  initialMax = 28100,
  onValueChange = () => {},
  formatValue = (value) => `₹${value.toLocaleString()}`,
  className = "",
}) => {
  const sliderRef = useRef(null);
  const [values, setValues] = useState([initialMin, initialMax]);
  const sliderInstance = useRef(null);

  useEffect(() => {
    if (sliderRef.current && !sliderInstance.current) {
      sliderInstance.current = initConstrainedSlider(sliderRef.current, {
        minValue,
        maxValue,
        initialValues: [initialMin, initialMax],
        onValueChange: (thumbIndex, value) => {
          setValues((prev) => {
            const newValues = [...prev];
            newValues[thumbIndex] = value;
            onValueChange(newValues[0], newValues[1]);
            return newValues;
          });
        },
      });
    }
  }, [minValue, maxValue, initialMin, initialMax, onValueChange]);

  return (
    <div className={`range-slider-constrained ${className}`} ref={sliderRef}>
      <div className="slider-container">
        <div className="slider-track">
          <div
            className="slider-fill"
            style={{
              left: `${
                ((values[0] - minValue) / (maxValue - minValue)) * 100
              }%`,
              width: `${
                ((values[1] - values[0]) / (maxValue - minValue)) * 100
              }%`,
            }}
          />
          <div className="slider-thumb min-thumb">
            <div className="thumb-label">{formatValue(values[0])}</div>
          </div>
          <div className="slider-thumb max-thumb">
            <div className="thumb-label">{formatValue(values[1])}</div>
          </div>
        </div>
      </div>
      <div className="slider-labels">
        <span>{formatValue(minValue)}</span>
        <span>{formatValue(maxValue)}</span>
      </div>
    </div>
  );
};

export default ConstrainedRangeSlider;
