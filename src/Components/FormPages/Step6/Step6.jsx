import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // import skeleton CSS
import styles from "./Step6.module.css";
import MobileImg from "../../../assets/images/Products/mobile.png";
import coupenicon from "../../../assets/images/icons/coupen.png";
import rightarrow from "../../../assets/images/icons/rightarrow.png";
import Recalculate from "../../../assets1/kimages/t1.png";
import FreePickup from "../../../assets1/kimages/t2.png";
import FreePickup2 from "../../../assets1/kimages/t5.png";
import clock from "../../.../../../assets/flaticons/back-in-time.png";
import van from "../../.../../../assets/flaticons/van.png";
import secureShield from "../../.../../../assets/flaticons/secure-shield.png";

import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../Context/contextAPI";
import { toast } from "react-toastify";
import api from "../../../Utils/api";
import Answers from "../AnswerList/answers";
import { FaArrowLeft } from "react-icons/fa";
import MobileCommonHeadertwo from "../../layout/MobileCommonHeader/MobileCommonHeadertwo";
import MobileCommonHeaderthree from "../../layout/MobileCommonHeader/MobileCommonHeaderthree";
import arrow from "../../../assets/QuickSellNewIcons/backarrowwithouttail.svg";
import closeIcon from "../../../assets/QuickSellNewIcons/cross.svg";

function Step6() {
  const {
    // allPackageData,
    currentEvaluationId,
    setCurrentEvaluationId,
    // userSelection,
  } = useContext(UserContext);

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // new loading state
  const navigate = useNavigate();
  const [showAnswersModal, setShowAnswersModal] = useState(false);
  const openCouponModal = () => setIsCouponModalOpen(true);
  const closeCouponModal = () => setIsCouponModalOpen(false);
  const location = useLocation();

  // Extract query params
  const queryParams = new URLSearchParams(location.search);
  const { slug } = useParams();
  //console.log("Mobile Slug in Step6: ", mobileSlug);

  const FetchPriceDetails = async () => {
    setLoading(true);
    try {
      const finalPriceResp = await api.get("/sell-module/user/view-finalprice");
      console.log("Final Price Response:", finalPriceResp);
      setCurrentEvaluationId(finalPriceResp?.data[0]);
    } catch (error) {
      console.error("Error fetching final price:", error);
      toast.error("Error fetching final price");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchPriceDetails();
  }, []);

  const handleSellNow = () => {
    navigate(`/${slug}/check-out`);
  };

  return (
    <>
      <MobileCommonHeaderthree title="Order Summery" />

      <section className={`${styles.StepSix} mobile-pt-section `}>
        <div className="page-content-wrapper">
          {/* <div className={styles.wrapper}> */}
          {/* Left Section */}
          <div className={styles.LeftBox}>
            <div className={styles.DeviceImg}>
              <div className={styles.mobileImg}>
                {loading ? (
                  <Skeleton height={200} width={150} />
                ) : (
                  <img
                    src={currentEvaluationId?.devicePic || MobileImg}
                    alt=""
                  />
                )}
              </div>
              <div className={styles.DeviceDetails}>
                <h2 className={styles.name}>
                  {loading ? (
                    <Skeleton width={200} />
                  ) : (
                    <>
                      {currentEvaluationId?.deviceName} (
                      {currentEvaluationId?.deviceVariant})
                    </>
                  )}
                </h2>
                <div className={styles.pricing}>
                  <h2 className={styles.price}>Selling Price</h2>
                  <span className="color-red">
                    {loading ? (
                      <Skeleton width={80} />
                    ) : (
                      `₹ ${(currentEvaluationId?.finalPrice).toFixed(2)}`
                    )}
                  </span>
                </div>
                <span className={styles.infoLine}>
                  {loading ? (
                    <Skeleton width={150} />
                  ) : (
                    "5,933+ Sold on QuickMobile"
                  )}
                </span>
                {!loading && (
                  <>
                    <NavLink
                      to={`/${slug}/final-price-calculator?${queryParams.toString()}`}
                      className={styles.recalculate}
                    >
                      <img
                        src={Recalculate}
                        alt="Recalculate"
                        className={styles.recalculateImg}
                      />
                    </NavLink>
                    <img
                      src={FreePickup}
                      alt=""
                      className={styles.FreePickupImg}
                    />
                  </>
                )}
              </div>
            </div>
            <div className={styles.deliveryfeature}>
              <div className={styles.feature}>
                <img src={clock} alt="" className={styles.featureOption}></img>
                <p>Instant Payment</p>
              </div>
              <div className={styles.feature}>
                <img src={van} alt="" className={styles.featureOption}></img>
                <p>Free Pickup</p>
              </div>
              <div className={styles.feature}>
                <img
                  src={secureShield}
                  alt=""
                  className={styles.featureOption}
                ></img>
                <p>100% Safe & Secure</p>
              </div>
            </div>
            <p className={styles.BottomPara}>
              {loading ? (
                <Skeleton count={3} />
              ) : (
                `Congratulations! Based on the details you provided, your device is
              valued at ₹ ${currentEvaluationId?.finalPrice}. This is the best
              price we offer, reflecting the current market demand and the
              condition of your device. Ready to move forward?`
              )}
            </p>
          </div>
          <div className={styles.deviceDetailsBtn}>
            <button onClick={() => setShowAnswersModal(true)}>
              Device Details{" "}
              <span>
                <img src={arrow} alt="" />
              </span>
            </button>
          </div>
          <div className={styles.applyCoupon} onClick={openCouponModal}>
            <div className={styles.couponContent}>
              <div className={styles.couponIcon}>
                {loading ? (
                  <Skeleton circle height={30} width={30} />
                ) : (
                  <img src={coupenicon} alt="Coupon Icon" />
                )}
              </div>
              <span className={styles.couponText}>
                {loading ? <Skeleton width={100} /> : "Apply Coupon"}
              </span>
            </div>
            <div className={styles.arrow}>
              {loading ? (
                <Skeleton circle height={20} width={20} />
              ) : (
                <img src={arrow} alt="Right Arrow" />
              )}
            </div>
          </div>
          {/* {showAnswersModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <FaArrowLeft
                  className={styles.backArrow}
                  onClick={() => setShowAnswersModal(false)}
                />
                <h3>Device Details</h3>
              </div>
              <Answers />
            </div>
          </div>
        )} */}

          {showAnswersModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <Answers
                  onBack={() => setShowAnswersModal(false)}
                  onRecalculate={() =>
                    navigate(`/${slug}/final-price-calculator`)
                  }
                />
              </div>
            </div>
          )}

          {/* Right Section */}
          <div className={styles.RightBox}>
            <div className={styles.summary}>
              {loading ? <Skeleton width={100} /> : "Summary"}
            </div>
            <div className={styles.details}>
              <div className={styles.row}>
                <span className={styles.label}>
                  {loading ? <Skeleton width={80} /> : "Phone Price"}
                </span>
                <span className={styles.value}>
                  {loading ? (
                    <Skeleton width={80} />
                  ) : (
                    `₹ ${currentEvaluationId?.finalPrice}`
                  )}
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>
                  {loading ? <Skeleton width={100} /> : "Pickup Charges"}
                </span>
                <div className={styles.pickupCharges}>
                  {loading ? (
                    <>
                      <Skeleton width={40} />
                      <Skeleton
                        width={40}
                        style={{
                          marginLeft: 10,
                          textDecoration: "line-through",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <span className={styles.free}>Free</span>
                      <span className={styles.striked}>₹ 150</span>
                    </>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>
                  {loading ? <Skeleton width={80} /> : "Processing"}
                </span>
                <span className={styles.value}>
                  {loading ? <Skeleton width={40} /> : "Free"}
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>
                  {loading ? <Skeleton width={100} /> : "Offer/Coupon"}
                </span>
                <span className={styles.value}>
                  {loading ? <Skeleton width={40} /> : "₹10.00"}
                </span>
              </div>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>
                  {loading ? <Skeleton width={80} /> : "Total"}
                </span>
                <span className={styles.totalValue}>
                  {loading ? (
                    <Skeleton width={80} />
                  ) : (
                    `₹ ${currentEvaluationId?.finalPrice}`
                  )}
                </span>
              </div>
            </div>

            {/* Sell Now Button */}
            <div className={styles.sellNowContainer}>
              <button
                className={styles.sellNow}
                onClick={handleSellNow}
                disabled={loading}
              >
                Sell Now
              </button>
            </div>

            {/* Apply Coupon Button */}
          </div>
        </div>

        {/* Coupon Modal */}
        {isCouponModalOpen && (
          <div className={styles.modalOverlay} onClick={closeCouponModal}>
            <div
              className={styles.simpleModal}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button className={styles.closeButton} onClick={closeCouponModal}>
                <img src={closeIcon} alt="" />
              </button>

              <div className={styles.modalContentWrapper}>
                <div className={styles.modalIcon}>
                  <i className="fas fa-ticket-alt"></i>{" "}
                  {/* You can use react-icons instead */}
                </div>
                <h2 className={styles.modalTitle}>Oops!</h2>
                <p className={styles.modalText}>
                  Coupon code is not available at the moment.
                </p>
                <p className={styles.modalSubText}>
                  Please check back later for exciting offers.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Step6;
