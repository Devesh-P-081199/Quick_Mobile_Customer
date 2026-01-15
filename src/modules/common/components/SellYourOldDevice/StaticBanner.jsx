import { useState, useEffect, useRef, useMemo } from "react";
import throttle from "lodash.throttle";
import style from "./StaticBanner.module.css";
import {
  FaRegCalendarCheck,
  FaPaperPlane,
  FaCheckCircle,
  FaCircle,
} from "react-icons/fa";

// Steps data moved outside component to prevent recreation on every render
const steps = [
  {
    icon: <FaCircle />,
    iconStyle: { color: "#f26921" },
    title: "If you sell your device today",
    subtitle: "By 4 PM",
    subtitleStyle: { color: "#f26921" },
  },
  {
    icon: <FaRegCalendarCheck />,
    iconStyle: { color: "#a8a8a8" },
    title: "Get Quote",
    description:
      "Select your device and answer a few questions about its condition, our smart tech will instantly calculate the best price.",
  },
  {
    icon: <FaPaperPlane />,
    iconStyle: { color: "#a8a8a8" },
    title: "Assign pick-up partner",
    description:
      "A nearby partner will be assigned to collect your device right from your doorstep.",
  },
  {
    icon: <FaCheckCircle />,
    iconStyle: { color: "#a8a8a8" },
    title: "Get paid",
    description:
      "Once your device is inspected by our partner and approved, your payment is processed instantly straight to your UPI or bank account.",
  },
  {
    icon: <FaCircle />,
    iconStyle: { color: "#29d929" },
    title: "Your phone is sold",
    subtitle: "By 23 June",
    subtitleStyle: { color: "#29d929" },
  },
];

function StaticBanner() {
  const [fillPercent, setFillPercent] = useState(0);
  const [mobileLineHeight, setMobileLineHeight] = useState("100%");
  const timelineRef = useRef(null);

  useEffect(() => {
    const calculateHeight = () => {
      if (!timelineRef.current) return;
      const markers = timelineRef.current.querySelectorAll(
        '[data-marker="true"]',
      );
      if (markers.length >= 2) {
        const first = markers[0].getBoundingClientRect();
        const last = markers[markers.length - 1].getBoundingClientRect();
        // Since markers are same size, it's just last.top - first.top
        const height = last.top - first.top;
        setMobileLineHeight(`${height}px`);
      }
    };

    // Run initially and on resize
    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, []); // Re-run on mount only

  // Throttled scroll handler for better performance
  const handleScroll = useMemo(
    () =>
      throttle(() => {
        if (!timelineRef.current) return;

        const rect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Trigger point: Bottom of the viewport (1.0) so it starts filling as soon as it enters.
        const triggerPoint = windowHeight;

        const componentTop = rect.top;
        const componentHeight = rect.height;

        let percent = 0;

        // Calculate filled amount based on how much of the component has passed the trigger point.
        const distance = triggerPoint - componentTop;
        const totalDistance = componentHeight;

        if (totalDistance > 0) {
          percent = (distance / totalDistance) * 100;
        }

        // Clamp
        if (percent < 0) percent = 0;
        if (percent > 100) percent = 100;

        setFillPercent((prev) => Math.max(prev, percent));
      }, 100),
    [],
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <section className={`${style.StaticSection} page-content-wrapper`}>
      <div className={style.heading}>
        <h2>Sell your old devices for instant cash</h2>
        <p>
          Whether pristine or broken, secure the best deal from over 300+
          refurbishers
        </p>
      </div>

      <div className={style.wrapper}>
        <div className={style.customTimelineContainer} ref={timelineRef}>
          <div
            className={style.progressBarContainer}
            style={{ "--mobile-line-height": mobileLineHeight }}
          >
            <div className={style.progressBarTrack}></div>
            <div
              className={style.progressBarFill}
              style={{ "--fill-percent": `${fillPercent}%` }}
            ></div>
          </div>

          <div className={style.timelineItems}>
            {steps.map((step, index) => {
              // Calculate if this step is "active" based on fill percent
              const threshold = (index / (steps.length - 1)) * 100;
              const active = fillPercent >= threshold;

              return (
                <div
                  key={index}
                  className={`${style.timelineItem} ${active ? style.active : ""}`}
                >
                  <div className={style.markerContainer} data-marker="true">
                    <div
                      className={style.marker}
                      style={active ? step.iconStyle : {}}
                    >
                      {step.icon}
                    </div>
                  </div>
                  <div className={style.contentBox}>
                    <h3>{step.title}</h3>
                    {step.subtitle && (
                      <h4 style={step.subtitleStyle}>{step.subtitle}</h4>
                    )}
                    {step.description && <p>{step.description}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StaticBanner;
