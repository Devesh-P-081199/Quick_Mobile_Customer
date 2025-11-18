import React, { useState, useEffect } from "react";
import style from "./StaticBanner.module.css";
import {
  FaClipboardList,
  FaRegCalendarCheck,
  FaPaperPlane,
  FaCheckCircle,
  FaCircle,
} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function StaticBanner() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // simulate loading
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`${style.StaticSection} homepage-section`}>
      <div className={style.heading}>
        <h1>Sell your old devices for instant cash</h1>
        <p>
          Whether pristine or broken, secure the best deal from over 300+
          refurbishers
        </p>
      </div>

      <div className={style.wrapper}>
        <div className={style.timelineContainer}>
          <div className={style.timeline}>
            <div className={style.fillLine}></div>
            <div className={style.icons}>
              {loading ? (
                <>
                  <div
                    className={style.iconWrapper}
                    style={{ marginBottom: "45px" }}
                  >
                    <Skeleton circle width={40} height={40} />
                  </div>
                  <div
                    className={style.iconWrapper}
                    style={{ marginBottom: "81px" }}
                  >
                    <Skeleton circle width={40} height={40} />
                  </div>
                  <div
                    className={style.iconWrapper}
                    style={{ marginBottom: "62px" }}
                  >
                    <Skeleton circle width={40} height={40} />
                  </div>
                  <div
                    className={style.iconWrapper}
                    style={{ marginTop: "86px" }}
                  >
                    <Skeleton circle width={40} height={40} />
                  </div>
                  <div className={style.iconWrapper}>
                    <Skeleton circle width={40} height={40} />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={style.iconWrapper}
                    style={{
                      marginBottom: "50px",
                      color: "#f26921",
                      fontSize: "36px",
                    }}
                  >
                    <FaCircle />
                  </div>
                  <div
                    className={style.iconWrapper}
                    style={{ marginBottom: "97px" }}
                  >
                    <FaRegCalendarCheck />
                  </div>
                  <div
                    className={style.iconWrapper}
                    style={{ marginBottom: "75px" }}
                  >
                    <FaPaperPlane />
                  </div>
                  <div
                    className={style.iconWrapper}
                    style={{ marginBottom: "97px" }}
                  >
                    <FaCheckCircle />
                  </div>
                  <div
                    className={style.iconWrapper}
                    style={{ color: "#29d929", fontSize: "36px" }}
                  >
                    <FaCircle />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className={style.stepsContent}>
            {loading ? (
              <>
                <div className={style.stepText}>
                  <h4>
                    <Skeleton width={200} />
                  </h4>
                  <p>
                    <Skeleton count={2} />
                  </p>
                </div>
                <div className={style.stepText}>
                  <h4>
                    <Skeleton width={200} />
                  </h4>
                  <p>
                    <Skeleton count={2} />
                  </p>
                </div>
                <div className={style.stepText}>
                  <h4>
                    <Skeleton width={200} />
                  </h4>
                  <p>
                    <Skeleton count={2} />
                  </p>
                </div>
                <div className={style.stepText}>
                  <h4>
                    <Skeleton width={200} />
                  </h4>
                  <p>
                    <Skeleton count={2} />
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className={style.stepText}>
                  <h4>
                    If you sell your device today <br />
                    <span className={style.highlight}>By 4 pm</span>
                  </h4>
                </div>
                <div className={style.stepText}>
                  <h4>Get Quote</h4>
                  <p>
                    Select your device and answer a few questions about its
                    condition, our smart tech will instantly calculate the best
                    price.
                  </p>
                </div>
                <div className={style.stepText}>
                  <h4>Assign pick-up partner</h4>
                  <p>
                    A nearby partner will be assigned to collect your device
                    right from your doorstep.
                  </p>
                </div>
                <div className={style.stepText}>
                  <h4>Get paid</h4>
                  <p>
                    Once your device is inspected by our partner and approved,
                    your payment is processed instantly straight to your UPI or
                    bank account.
                  </p>
                </div>
                <div className={style.stepText}>
                  <h4>
                    Get sold your phone <br />
                    <span className={style.highlight}>By 23 June</span>
                  </h4>
                </div>
              </>
            )}

            <div className={style.finalNote}>
              {loading && (
                <>
                  <p>
                    <Skeleton width={100} />
                  </p>
                  <h4>
                    <Skeleton width={80} />
                  </h4>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StaticBanner;
