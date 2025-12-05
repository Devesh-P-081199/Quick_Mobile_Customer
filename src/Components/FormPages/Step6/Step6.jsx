import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // import skeleton CSS
import styles from "./Step6.module.css";
import MobileImg from "../../../assets/images/Products/mobile.png";
import "../../../assets/images/icons/rightarrow.png";
import Recalculate from "../../../assets1/kimages/t1.png";
import FreePickup from "../../../assets1/kimages/t2.png";
import clock from "../../.../../../assets/flaticons/clock-basecolor.png";
import van from "../../.../../../assets/flaticons/delivery-van-basecolor.png";
import secureShield from "../../.../../../assets/flaticons/secure-basecolor.png";

import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../Context/contextAPI";
import { toast } from "react-toastify";
import api from "../../../Utils/api";
import Answers from "../AnswerList/answers";
import MobileCommonHeaderthree from "../../layout/MobileCommonHeader/MobileCommonHeaderthree";
import arrow from "../../../assets/QuickSellNewIcons/backarrowwithouttail.svg";
import closeIcon from "../../../assets/QuickSellNewIcons/cross.svg";

function Step6() {
  const {
    // allPackageData,
    currentEvaluationId,
    setCurrentEvaluationId,
    selectedAddress,
    setSelectedAddress,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    // userSelection,
  } = useContext(UserContext);

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // new loading state
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState({ upi: [], bank: [] });
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

  // Fetch addresses and auto-select default
  const fetchAddresses = async () => {
    try {
      const resp = await api.get("/sell-module/user/address");
      const fetchedAddresses = resp?.data.data?.addresses || [];
      console.log("Fetched addresses from API:", fetchedAddresses);
      setAddresses(fetchedAddresses);

      // Auto-select address with isActive: true, or first address if none have isActive
      if (fetchedAddresses.length > 0 && !selectedAddress) {
        const activeAddress = fetchedAddresses.find(
          (addr) => addr.isActive === true
        );
        console.log("Active address found:", activeAddress);
        const defaultAddress = activeAddress || fetchedAddresses[0];
        console.log("Default address to select:", defaultAddress);
        setSelectedAddress(defaultAddress);
        console.log(
          "Auto-selected address with ID:",
          defaultAddress._id || defaultAddress.id
        );
      } else {
        console.log(
          "Skipping auto-select. Addresses length:",
          fetchedAddresses.length,
          "Current selectedAddress:",
          selectedAddress
        );
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Error fetching addresses");
    }
  };

  // Fetch payment methods and auto-select default
  const fetchPaymentMethods = async () => {
    try {
      const [upiResp, bankResp] = await Promise.all([
        api.get("/sell-module/user/payment-upi"),
        api.get("/sell-module/user/payment-bank"),
      ]);

      const upiMethods = upiResp.data?.upiMethods || [];
      const bankMethods = bankResp.data?.bankMethods || [];

      setPaymentMethods({ upi: upiMethods, bank: bankMethods });

      // Auto-select payment method with isActive: true, or first available method
      if (!selectedPaymentMethod) {
        // Check UPI methods first
        const activeUpi = upiMethods.find((method) => method.isActive === true);
        if (activeUpi) {
          setSelectedPaymentMethod({ type: "upi", ...activeUpi });
          console.log("Auto-selected UPI payment:", activeUpi);
          return;
        }

        // Check Bank methods
        const activeBank = bankMethods.find(
          (method) => method.isActive === true
        );
        if (activeBank) {
          setSelectedPaymentMethod({ type: "bank", ...activeBank });
          console.log("Auto-selected Bank payment:", activeBank);
          return;
        }

        // If no active method, select first available
        if (upiMethods.length > 0) {
          setSelectedPaymentMethod({ type: "upi", ...upiMethods[0] });
          console.log("Auto-selected first UPI payment:", upiMethods[0]);
        } else if (bankMethods.length > 0) {
          setSelectedPaymentMethod({ type: "bank", ...bankMethods[0] });
          console.log("Auto-selected first Bank payment:", bankMethods[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      toast.error("Error fetching payment methods");
    }
  };

  useEffect(() => {
    FetchPriceDetails();
    fetchAddresses();
    fetchPaymentMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debug: Log when selectedAddress or selectedPaymentMethod changes
  useEffect(() => {
    console.log("Step6 - selectedAddress updated:", selectedAddress);
  }, [selectedAddress]);

  useEffect(() => {
    console.log(
      "Step6 - selectedPaymentMethod updated:",
      selectedPaymentMethod
    );
  }, [selectedPaymentMethod]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !selectedPaymentMethod) {
      toast.error("Please select address and payment method");
      return;
    }

    try {
      const orderPayload = {
        deviceEvaluationId: currentEvaluationId?._id,
        address: selectedAddress,
        paymentDetail: selectedPaymentMethod,
      };

      const placeOrder = await api.post(
        "/sell-module/user/orders",
        orderPayload
      );

      console.log("Order response", placeOrder.data);
      toast.success("Order placed successfully!");
      navigate("/thank-you", { replace: true });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(`${error?.response?.data?.error || "Failed to place order"}`);
    }
  };

  const handleChangeAddress = () => {
    // Preserve query params for back navigation
    const queryString = queryParams.toString();
    const urlSuffix = queryString ? `?${queryString}` : '';

    // If no addresses exist, go directly to add-address page
    if (addresses.length === 0) {
      navigate(`/${slug}/check-out/add-address${urlSuffix}`);
    } else {
      // Pass addresses to CheckOut component via navigation state
      navigate(`/${slug}/check-out${urlSuffix}`, { state: { addresses } });
    }
  };

  const handleChangePayment = () => {
    // Preserve query params for back navigation
    const queryString = queryParams.toString();
    const urlSuffix = queryString ? `?${queryString}` : '';

    // If no payment methods exist, go directly to add-payment page
    if (paymentMethods.upi.length === 0 && paymentMethods.bank.length === 0) {
      navigate(`/${slug}/payment/add-payment${urlSuffix}`);
    } else {
      // Pass payment methods to Payment component via navigation state
      navigate(`/${slug}/payment${urlSuffix}`, { state: { paymentMethods } });
    }
  };

  const handleBack = () => {
    // Navigate back to Step3 (final price calculator)
    navigate(`/${slug}/final-price-calculator?${queryParams.toString()}`);
  };

  const isOrderReady = selectedAddress && selectedPaymentMethod;

  return (
    <>
      <MobileCommonHeaderthree title="Order Summery" onBack={handleBack} />

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
                      `₹ ${(currentEvaluationId?.finalPrice || 0).toFixed(2)}`
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
                      onClick={() => {
                        // Clear all Step3 form data when recalculating
                        const productId = queryParams.get("pid");
                        const variantId = queryParams.get("vid");

                        if (productId) {
                          // Clear packageDetails so old selections don't show in Device Details
                          const packageDetailsKey = `packageDetails_${productId}`;
                          sessionStorage.removeItem(packageDetailsKey);

                          // Clear step3 form data
                          const storageKey = `step3PackageData_${productId}_${variantId || "unknown"
                            }`;
                          sessionStorage.removeItem(storageKey);

                          // Clear current package index
                          const currentIndexKey = `currentPackageIndex_${storageKey}`;
                          sessionStorage.removeItem(currentIndexKey);

                          // Clear packages data
                          const packagesKey = `packages_${productId}`;
                          sessionStorage.removeItem(packagesKey);

                          // Clear form submitted flag
                          const formSubmittedKey = `formSubmitted_${productId}`;
                          sessionStorage.removeItem(formSubmittedKey);

                          // Set recalculate flag to force Step3 to load fresh
                          const recalculateKey = `recalculate_${productId}`;
                          sessionStorage.setItem(recalculateKey, "true");

                          console.log("🗑️ Cleared ALL data for recalculation");
                        }
                      }}
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

          {/* Checkout Summary Section */}
          <div className={styles.checkoutSummary}>
            <h3 className={styles.sectionTitle}>Checkout Summary</h3>

            {/* Address Section */}
            <div className={styles.summaryCard}>
              <div className={styles.summaryHeader}>
                <div className={styles.summaryHeaderLeft}>
                  <img src={van} alt="Address" className={styles.summaryIcon} />
                  <span className={styles.summaryLabel}>Delivery Address</span>
                </div>
                <button
                  className={styles.changeBtn}
                  onClick={handleChangeAddress}
                >
                  {selectedAddress ? "Change" : "Add"}
                </button>
              </div>
              {selectedAddress ? (
                <div className={styles.summaryContent}>
                  <span className={styles.addressTag}>
                    {selectedAddress?.saveAs}
                  </span>
                  <p className={styles.addressText}>
                    {selectedAddress?.houseNumber}, {selectedAddress?.street}
                    {selectedAddress?.landmark &&
                      `, ${selectedAddress?.landmark}`}
                  </p>
                  <p className={styles.addressText}>
                    {selectedAddress?.cityName}, {selectedAddress?.state} -{" "}
                    {selectedAddress?.zipCode}
                  </p>
                  <p className={styles.addressText}>
                    {selectedAddress?.alternatePhone}
                  </p>
                </div>
              ) : addresses.length === 0 ? (
                <p className={styles.notSelected}>
                  No addresses found. Click "Add" button above to add a delivery
                  address.
                </p>
              ) : (
                <p className={styles.notSelected}>
                  No address selected. Click "Add" button above to select an
                  address.
                </p>
              )}
            </div>

            {/* Payment Section */}
            <div className={styles.summaryCard}>
              <div className={styles.summaryHeader}>
                <div className={styles.summaryHeaderLeft}>
                  <img
                    src={secureShield}
                    alt="Payment"
                    className={styles.summaryIcon}
                  />
                  <span className={styles.summaryLabel}>Payment Method</span>
                </div>
                <button
                  className={styles.changeBtn}
                  onClick={handleChangePayment}
                >
                  {selectedPaymentMethod ? "Change" : "Add"}
                </button>
              </div>
              {selectedPaymentMethod ? (
                <div className={styles.summaryContent}>
                  {selectedPaymentMethod.type === "upi" ? (
                    <>
                      <span className={styles.paymentType}>UPI Payment</span>
                      <p className={styles.paymentText}>
                        UPI ID:{" "}
                        <span className={styles.paymentValue}>
                          {selectedPaymentMethod?.upiId}
                        </span>
                      </p>
                    </>
                  ) : selectedPaymentMethod.type === "bank" ? (
                    <>
                      <span className={styles.paymentType}>
                        Bank Transfer (IMPS)
                      </span>
                      <p className={styles.paymentText}>
                        Account:{" "}
                        <span className={styles.paymentValue}>
                          {selectedPaymentMethod?.bankDetails?.accountNumber}
                        </span>
                      </p>
                      <p className={styles.paymentText}>
                        IFSC:{" "}
                        <span className={styles.paymentValue}>
                          {selectedPaymentMethod?.bankDetails?.ifscCode}
                        </span>
                      </p>
                      <p className={styles.paymentText}>
                        Bank:{" "}
                        <span className={styles.paymentValue}>
                          {selectedPaymentMethod?.bankDetails?.bankName}
                        </span>
                      </p>
                    </>
                  ) : null}
                </div>
              ) : paymentMethods.upi.length === 0 &&
                paymentMethods.bank.length === 0 ? (
                <p className={styles.notSelected}>
                  No payment methods found. Click "Add" button above to add a
                  payment method.
                </p>
              ) : (
                <p className={styles.notSelected}>
                  No payment method selected. Click "Add" button above to select
                  a payment method.
                </p>
              )}
            </div>
          </div>

          <div className={styles.detailsDown}>
            <div className={styles.deviceDetailsBtn}>
              <button onClick={() => setShowAnswersModal(true)}>
                <div className={styles.bottonTitle}>
                  <img
                    src={clock}
                    alt=""
                    className={styles.featureOption}
                  ></img>
                  <p>Device Details</p>
                </div>
                <span>
                  <img src={arrow} alt="" />
                </span>
              </button>
            </div>
            <div className={styles.applyCoupon} onClick={openCouponModal}>
              <button>
                <div className={styles.bottonTitle}>
                  <img
                    src={clock}
                    alt=""
                    className={styles.featureOption}
                  ></img>
                  <p>Apply Coupon</p>
                </div>
                <span>
                  <img src={arrow} alt="" />
                </span>
              </button>
            </div>
          </div>

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
            <div className={styles.details}>
              <div className={styles.summary}>
                {loading ? <Skeleton width={100} /> : "Summary"}
              </div>
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

            {/* Place Order Button */}
            <div className={styles.sellNowContainer}>
              <button
                className={`${styles.sellNow} ${!isOrderReady ? styles.disabled : ""
                  }`}
                onClick={handlePlaceOrder}
                disabled={loading || !isOrderReady}
              >
                Place Order
              </button>
              {!isOrderReady && (
                <p className={styles.orderWarning}>
                  Please select address and payment method to continue
                </p>
              )}
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
