import { useState, useEffect, useRef } from "react";
import style from "./StaticBanner.module.css";
import {
  FaRegCalendarCheck,
  FaPaperPlane,
  FaCheckCircle,
  FaCircle,
} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [loading, setLoading] = useState(false);
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
  }, [loading]); // Re-run when loading finishes and real content appears

  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        {loading ? (
          // Kept Skeleton as requested / existing behavior
          <div className={style.timelineContainer}>
            {/* Skeleton structure reused roughly */}
            <div className={style.timeline}>
              <div className={style.icons}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={style.iconWrapper}
                    style={{ marginBottom: i < 5 ? "60px" : 0 }}
                  >
                    <Skeleton circle width={40} height={40} />
                  </div>
                ))}
              </div>
            </div>
            <div className={style.stepsContent}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={style.stepText}>
                  <h4>
                    <Skeleton width={150} />
                  </h4>
                  <p>
                    <Skeleton count={1} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
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
                // Assume equal spacing: 0%, 25%, 50%, 75%, 100% logic?
                // Step 0 active at >0%?
                // Let's say triggers are at (index / (steps.length - 1)) * 100
                const threshold = (index / (steps.length - 1)) * 100;
                const active = fillPercent >= threshold; // Or slightly before?

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
        )}
      </div>
    </section>
  );
}

export default StaticBanner;
