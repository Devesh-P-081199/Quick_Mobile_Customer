import { useState } from "react";

/**
 * AppImage Component
 * Enforces explicit width/height or aspect-ratio to prevent Layout Shifts (CLS).
 * Handles loading states and fallbacks.
 */
const AppImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  aspectRatio,
  priority = false, // If true, eager load
  style = {},
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [_, setError] = useState(false);

  // Calculate inline styles for CLS prevention
  const imageStyle = {
    ...style,
    aspectRatio:
      aspectRatio || (width && height ? `${width}/${height}` : "auto"),
    objectFit: "cover",
    opacity: loaded ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
  };

  const wrapperStyle = {
    position: "relative",
    width: width || "100%",
    height: height || "auto",
    aspectRatio:
      aspectRatio || (width && height ? `${width}/${height}` : "auto"),
    backgroundColor: loaded ? "transparent" : "#f0f0f0", // Placeholder color
    overflow: "hidden",
  };

  return (
    <div className={`app-image-wrapper ${className}`} style={wrapperStyle}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={imageStyle}
        {...props}
      />
    </div>
  );
};

export default AppImage;
