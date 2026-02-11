import { useContext, useEffect, useState, useCallback } from "react";
import styles from "./OrderSummary.module.css";
import MobileImg from "../../../../assets/images/Products/mobile.png";
import "../../../../assets/images/icons/rightarrow.png";
import Recalculate from "../../../../assets/QuickSellNewIcons/set-to-zero.png";
import clock from "../../../../assets/flaticons/clock-basecolor.png";
import evalution from "../../../../assets/images/evalution.png";
import creditCard from "../../../../assets/images/credit-card.png";
import locations from "../../../../assets/images/location.png";
import sale from "../../../../assets/images/sale.png";
import van from "../../../../assets/flaticons/delivery-van-basecolor.png";
import secureShield from "../../../../assets/flaticons/secure-basecolor.png";

import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../../Context/contextAPI";
import { toast } from "react-toastify";
import api from "../../../../Utils/api";
import Answers from "../AnswerList/Answers";
import MobileBackHeader from "../../../common/components/layout/MobileCommonHeader/MobileBackHeader";
import coupon from "../../../../assets/QuickSellNewIcons/discount-coupon.png";
import arrow from "../../../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";
import closeIcon from "../../../../assets/QuickSellNewIcons/Cross.svg";
import AddressForm from "../../../checkout/components/AddressForm/AddressForm";
import PaymentForm from "../../../checkout/components/PaymentForm/PaymentForm";
import Payment from "../../../checkout/components/Payment/Payment";
import CheckOut from "../../../checkout/components/CheckOut/CheckOut";

const CouponContent = ({ styles }) => {
  const [couponCode, setCouponCode] = useState('');
  const [showError, setShowError] = useState(false);

  const handleApply = () => {
    // Show "no coupon found" message when Apply is clicked
    setShowError(true);
  };

  return (
    <div className={styles.modalContentWrapper}>
      {/* Icon */}
      <div className={styles.modalIcon}>
        <img
          src={coupon}
          alt=""
          className={styles.featureOption}
          style={{ width: "40px", height: "40px" }}
        />
      </div>

      {/* Title */}
      <h2 className={styles.modalTitle}>Apply Coupon</h2>

      {/* Text */}
      <p className={styles.modalText}>
        Have a promo code? Enter it below to redeem your discount.
      </p>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter Coupon Code"
        className={styles.couponInput}
        value={couponCode}
        onChange={(e) => {
          setCouponCode(e.target.value);
          setShowError(false); // Hide error when user types
        }}
      />

      {/* Apply Button */}
      <button className={styles.applyButton} onClick={handleApply}>
        Apply
      </button>

      {/* Error Message */}
      {showError && (
        <p className={styles.couponError}>No coupon found</p>
      )}
    </div>
  );
};

function OrderSummary() {
  // ... existing hooks ...
  const {
    currentEvaluationId,
    setCurrentEvaluationId,
    selectedAddress,
    setSelectedAddress,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  } = useContext(UserContext);

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState({ upi: [], bank: [] });
  const navigate = useNavigate();
  const [showAnswersModal, setShowAnswersModal] = useState(false);
  const openCouponModal = () => setIsCouponModalOpen(true);
  const closeCouponModal = () => setIsCouponModalOpen(false);
  const location = useLocation();

  // ... existing effects and handlers ...
  // (Copying context from previous view to ensure nothing is lost, but relying on "StartLine" to replace only the necessary parts if possible.
  // However, since I need to insert the helper component OUTSIDE the function or define it inside,
  // and I need to update the JSX return, I will do a targeted replace for the return statement
  // and a separate one for the helper definition if needed.
  // Actually, defining it inside is easier for now to access imports, but imports are top level.)

  // WAIT, I can't put the helper component *inside* the replace block if I'm only replacing the `return` or specific parts.
  // The tool replaces a block.
  // I will replace the END of the file to include the component definition if I place it outside, or just define it inside OrderSummary before return.
  // Let's define it inside OrderSummary for simplicity of this edit, or better, keep the file structure clean.
  // I will assume imports are available.

  // Let's stick to replacing the JSX part primarily.

  // Re-reading file content...
  // I will use a larger replacement to be safe.

  const queryParams = new URLSearchParams(location.search);
  const { slug } = useParams();

  const FetchPriceDetails = useCallback(async () => {
    setLoading(true);
    try {
      const finalPriceResp = await api.get("/sell-module/user/view-finalprice");
      setCurrentEvaluationId(finalPriceResp?.data[0]);
    } catch (error) {
      console.error("Error fetching final price:", error);
      toast.error("Error fetching final price");
    } finally {
      setLoading(false);
    }
  }, [setCurrentEvaluationId]);

  const fetchAddresses = useCallback(async () => {
    try {
      const resp = await api.get("/sell-module/user/address");
      const fetchedAddresses = resp?.data.data?.addresses || [];
      setAddresses(fetchedAddresses);
      if (fetchedAddresses.length > 0 && !selectedAddress) {
        const activeAddress = fetchedAddresses.find(
          (addr) => addr.isActive === true,
        );
        const defaultAddress = activeAddress || fetchedAddresses[0];
        setSelectedAddress(defaultAddress);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Error fetching addresses");
    }
  }, [selectedAddress, setSelectedAddress]);

  const fetchPaymentMethods = useCallback(async () => {
    try {
      const [upiResp, bankResp] = await Promise.all([
        api.get("/sell-module/user/payment-upi"),
        api.get("/sell-module/user/payment-bank"),
      ]);
      const upiMethods = upiResp.data?.upiMethods || [];
      const bankMethods = bankResp.data?.bankMethods || [];
      setPaymentMethods({ upi: upiMethods, bank: bankMethods });

      if (!selectedPaymentMethod) {
        const activeUpi = upiMethods.find((method) => method.isActive === true);
        if (activeUpi) {
          setSelectedPaymentMethod({ type: "upi", ...activeUpi });
          return;
        }
        const activeBank = bankMethods.find(
          (method) => method.isActive === true,
        );
        if (activeBank) {
          setSelectedPaymentMethod({ type: "bank", ...activeBank });
          return;
        }
        if (upiMethods.length > 0) {
          setSelectedPaymentMethod({ type: "upi", ...upiMethods[0] });
        } else if (bankMethods.length > 0) {
          setSelectedPaymentMethod({ type: "bank", ...bankMethods[0] });
        }
      }
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      toast.error("Error fetching payment methods");
    }
  }, [selectedPaymentMethod, setSelectedPaymentMethod]);

  useEffect(() => {
    FetchPriceDetails();
    fetchAddresses();
    fetchPaymentMethods();
  }, [FetchPriceDetails, fetchAddresses, fetchPaymentMethods]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address");
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
        orderPayload,
      );
      toast.success("Order placed successfully!");
      navigate("/thank-you", {
        replace: true,
        state: { orderData: placeOrder.data },
      });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(`${error?.response?.data?.error || "Failed to place order"}`);
    }
  };

  const handleChangeAddress = () => {
    const queryString = queryParams.toString();
    const urlSuffix = queryString ? `?${queryString}` : "";
    if (addresses.length === 0) {
      navigate(`/${slug}/check-out/add-address${urlSuffix}`, {
        state: { returnPath: location.pathname + location.search },
      });
    } else {
      // Don't pass addresses - force fresh fetch for latest data
      navigate(`/${slug}/check-out${urlSuffix}`, {
        state: { returnPath: location.pathname + location.search },
      });
    }
  };

  const handleChangePayment = () => {
    const queryString = queryParams.toString();
    const urlSuffix = queryString ? `?${queryString}` : "";
    // Don't pass paymentMethods - force fresh fetch for latest data
    navigate(`/${slug}/payment-mode-selection${urlSuffix}`, {
      state: { returnPath: location.pathname + location.search },
    });
  };

  const renderLeftContent = () => {
    const path = location.pathname;
    if (path.includes("/add-address") || path.includes("/edit-address")) {
      return <AddressForm />;
    }
    if (path.includes("/add-payment") || path.includes("/edit-payment")) {
      return <PaymentForm />;
    }
    if (path.includes("/payment-mode-selection")) {
      return <Payment />;
    }
    if (path.includes("/check-out") && !path.includes("/price-summary")) {
      return <CheckOut />;
    }
    return null;
  };

  // Get title for desktop content heading
  const getContentTitle = () => {
    const path = location.pathname;
    if (path.includes("/check-out") && !path.includes("/price-summary"))
      return "Select Delivery Address";
    if (path.includes("/payment-mode-selection"))
      return "Select Payment Method";
    if (path.includes("/add-address")) return "Add Address";
    if (path.includes("/edit-address")) return "Edit Address";
    if (path.includes("/add-payment")) return "Add Payment";
    if (path.includes("/edit-payment")) return "Edit Payment";
    return null; // No title for root order summary page
  };

  return (
    <>
      <MobileBackHeader title="Order Summary" />
      <div className={`page-content-wrapper ${styles.orderSummary}`}>
        <div className={styles.leftColumn}>
          {renderLeftContent() ? (
            <>
              {/* Desktop-only heading */}
              {getContentTitle() && (
                <h2 className={styles.contentHeading}>{getContentTitle()}</h2>
              )}
              {renderLeftContent()}
            </>
          ) : (
            <>
              <div className={styles.LeftBox}>
                <div className={styles.DeviceImg}>
                  <div className={styles.mobileImg}>
                    <img
                      src={currentEvaluationId?.devicePic || MobileImg}
                      alt=""
                    />
                  </div>
                  <div className={styles.DeviceDetails}>
                    <h2 className={styles.name}>
                      <>
                        {currentEvaluationId?.deviceName} (
                        {currentEvaluationId?.deviceVariant})
                      </>
                    </h2>
                    <div className={styles.pricing}>
                      <h2 className={styles.price}>Selling Price</h2>
                      <span className="color-red">
                        {`₹ ${(currentEvaluationId?.finalPrice || 0).toFixed(2)}`}
                      </span>
                    </div>
                    <>
                      <NavLink
                        to={`/${slug}/final-price-calculator?${queryParams.toString()}`}
                        className={styles.recalculate}
                        onClick={() => {
                          const productId = queryParams.get("pid");
                          const variantId = queryParams.get("vid");
                          if (productId) {
                            const packageDetailsKey = `packageDetails_${productId}`;
                            sessionStorage.removeItem(packageDetailsKey);
                            const storageKey = `step3PackageData_${productId}_${variantId || "unknown"}`;
                            sessionStorage.removeItem(storageKey);
                            const currentIndexKey = `currentPackageIndex_${storageKey}`;
                            sessionStorage.removeItem(currentIndexKey);
                            const packagesKey = `packages_${productId}`;
                            sessionStorage.removeItem(packagesKey);
                            const formSubmittedKey = `formSubmitted_${productId}`;
                            sessionStorage.removeItem(formSubmittedKey);
                            const recalculateKey = `recalculate_${productId}`;
                            sessionStorage.setItem(recalculateKey, "true");
                          }
                        }}
                      >
                        Recalculate
                      </NavLink>
                    </>
                  </div>
                </div>
                <div className={styles.deliveryfeature}>
                  <div className={styles.feature}>
                    <img
                      src={clock}
                      alt=""
                      className={styles.featureOption}
                    ></img>
                    <p>Instant Payment</p>
                  </div>
                  <div className={styles.feature}>
                    <img
                      src={van}
                      alt=""
                      className={styles.featureOption}
                    ></img>
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
              </div>

              <div className={styles.detailsDown}>
                <div className={styles.deviceDetailsBtn}>
                  <button onClick={() => setShowAnswersModal(true)}>
                    <div className={styles.bottonTitle}>
                      <img
                        src={evalution}
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
              </div>

              <div className={styles.summaryCardAddress}>
                <div className={styles.summaryHeader}>
                  <div className={styles.summaryHeaderLeft}>
                    <img
                      src={locations}
                      alt=""
                      className={styles.featureOption}
                    ></img>
                    <span className={styles.summaryLabel}>Pickup Address</span>
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
                      {selectedAddress?.cityName}, {selectedAddress?.state} -{" "}
                      {selectedAddress?.zipCode}
                    </p>
                    <p className={styles.addressText}>
                      {selectedAddress?.alternatePhone}
                    </p>
                  </div>
                ) : addresses.length === 0 ? (
                  <p className={styles.notSelected}>
                    No addresses found. Click "Add" button above to add a
                    delivery address.
                  </p>
                ) : (
                  <p className={styles.notSelected}>
                    No address selected. Click "Add" button above to select an
                    address.
                  </p>
                )}
              </div>

              <div className={styles.summaryCardPayment}>
                <div className={styles.summaryHeader}>
                  <div className={styles.summaryHeaderLeft}>
                    <img
                      src={creditCard}
                      alt=""
                      className={styles.featureOption}
                    ></img>
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
                    No payment method selected. Click "Add" button above to
                    select a payment method.
                  </p>
                )}
              </div>

              {/* "Apply Coupon" Button for MOBILE VIEW ONLY - Triggers Modal */}

              {/* New Coupon Card in Left Column */}
              <div className={styles.summaryCardCoupon}>
                <div className={styles.summaryHeader}>
                  <div className={styles.summaryHeaderLeft}>
                    <img
                      src={sale}
                      alt=""
                      className={styles.featureOption}
                      style={{
                        width: "30px",
                        height: "30px",
                        padding: "2px",
                        background: "transparent",
                      }}
                    ></img>
                    <span className={styles.summaryLabel}>Apply Coupon</span>
                  </div>
                </div>
                <div className={styles.couponContent}>
                  {/* Desktop View: Inline Form */}
                  <div className={styles.desktopCouponForm}>
                    <input
                      type="text"
                      placeholder="Enter Coupon Code"
                      className={styles.couponInput}
                    />
                    <button className={styles.applyButton}>Apply</button>
                  </div>

                  {/* Mobile View: Trigger Button */}
                  <div className={styles.mobileCouponTrigger}>
                    <div
                      className={styles.applyCoupon}
                      onClick={openCouponModal}
                    >
                      <button>
                        <div className={styles.bottonTitle}>
                          <img
                            src={sale}
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
                </div>
              </div>
            </>
          )}
        </div>

        {showAnswersModal && (
          <div className={styles.modalOverlay} onClick={() => setShowAnswersModal(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <Answers
                onBack={() => setShowAnswersModal(false)}
                onRecalculate={() =>
                  navigate(`/${slug}/final-price-calculator${location.search}`)
                }
              />
            </div>
          </div>
        )}

        <div
          className={`${styles.rightColumn} ${(location.pathname.includes('/check-out') && !location.pathname.includes('/price-summary')) ||
            location.pathname.includes('/payment-mode-selection') ||
            location.pathname.includes('/add-payment')
            ? styles.hideOnMobile
            : ''
            }`}
        >
          <div className={styles.RightBox}>
            {/* Device Image Section */}
            <div className={styles.deviceSection}>
              <div className={styles.imageContainer}>
                <img
                  src={currentEvaluationId?.devicePic || MobileImg}
                  alt={currentEvaluationId?.deviceName || "Device"}
                />
              </div>
              <div className={styles.deviceInfo}>
                <span className={styles.deviceName}>
                  {currentEvaluationId?.deviceName || ""}
                  {currentEvaluationId?.deviceVariant
                    ? ` (${currentEvaluationId.deviceVariant})`
                    : ""}
                </span>
              </div>
            </div>

            <div className={styles.details}>
              <div className={styles.summary}>Summary</div>
              <div className={styles.row}>
                <span className={styles.label}>Phone Price</span>
                <span
                  className={styles.value}
                >{`₹ ${currentEvaluationId?.finalPrice}`}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Pickup Charges</span>
                <div className={styles.pickupCharges}>
                  <>
                    <span className={styles.free}>Free</span>
                    <span className={styles.striked}>₹ 150</span>
                  </>
                </div>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Processing</span>
                <span className={styles.value}>Free</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Coupon</span>
                <span className={styles.value}>--</span>
              </div>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span
                  className={styles.totalValue}
                >{`₹ ${currentEvaluationId?.finalPrice}`}</span>
              </div>
            </div>

            {/* Only show Continue button if NOT on address/payment selection pages */}
            {!renderLeftContent() && (
              <div className={styles.sellNowContainer}>
                <button
                  className={styles.sellNow}
                  onClick={
                    selectedAddress ? handlePlaceOrder : handleChangeAddress
                  }
                  disabled={loading}
                >
                  {selectedAddress ? "Place Order" : "Add Address to Continue"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Coupon Content for MOBILE VIEW ONLY (Triggered by Button) */}
        {isCouponModalOpen && (
          <div className={styles.modalOverlay} onClick={closeCouponModal}>
            <div className={styles.simpleModal} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeButton} onClick={closeCouponModal}>
                <img src={closeIcon} alt="Close" />
              </button>
              <CouponContent styles={styles} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default OrderSummary;
