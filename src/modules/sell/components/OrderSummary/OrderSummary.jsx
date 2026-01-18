import { useContext, useEffect, useState, useCallback } from "react";
import styles from "./OrderSummary.module.css";
import MobileImg from "../../../../assets/images/Products/mobile.png";
import "../../../../assets/images/icons/rightarrow.png";
import Recalculate from "../../../../assets/images/recalculate_icon.png";
import FreePickup from "../../../../assets/images/free_pickup_icon.png";
import clock from "../../../../assets/flaticons/clock-basecolor.png";
import van from "../../../../assets/flaticons/delivery-van-basecolor.png";
import secureShield from "../../../../assets/flaticons/secure-basecolor.png";

import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../../Context/contextAPI";
import { toast } from "react-toastify";
import api from "../../../../Utils/api";
import Answers from "../AnswerList/Answers";
import MobileBackHeader from "../../../common/components/layout/MobileCommonHeader/MobileBackHeader";
import arrow from "../../../../assets/QuickSellNewIcons/backarrowwithouttail.svg";
import closeIcon from "../../../../assets/QuickSellNewIcons/cross.svg";

function OrderSummary() {
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

  // Fetch addresses and auto-select default
  const fetchAddresses = useCallback(async () => {
    try {
      const resp = await api.get("/sell-module/user/address");
      const fetchedAddresses = resp?.data.data?.addresses || [];

      setAddresses(fetchedAddresses);

      // Auto-select address with isActive: true, or first address if none have isActive
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

  // Fetch payment methods and auto-select default
  const fetchPaymentMethods = useCallback(async () => {
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

          return;
        }

        // Check Bank methods
        const activeBank = bankMethods.find(
          (method) => method.isActive === true,
        );
        if (activeBank) {
          setSelectedPaymentMethod({ type: "bank", ...activeBank });

          return;
        }

        // If no active method, select first available
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
    // Preserve query params for back navigation
    const queryString = queryParams.toString();
    const urlSuffix = queryString ? `?${queryString}` : "";

    // If no addresses exist, go directly to add-address page
    if (addresses.length === 0) {
      navigate(`/${slug}/check-out/add-address${urlSuffix}`, {
        state: { returnPath: location.pathname + location.search },
      });
    } else {
      // Pass addresses to CheckOut component via navigation state
      navigate(`/${slug}/check-out${urlSuffix}`, { state: { addresses } });
    }
  };

  const handleChangePayment = () => {
    // Preserve query params for back navigation
    const queryString = queryParams.toString();
    const urlSuffix = queryString ? `?${queryString}` : "";

    // If no payment methods exist, go directly to add-payment page
    if (paymentMethods.upi.length === 0 && paymentMethods.bank.length === 0) {
      navigate(`/${slug}/payment/add-payment${urlSuffix}`, {
        state: { returnPath: location.pathname + location.search },
      });
    } else {
      // Pass payment methods to Payment component via navigation state
      navigate(`/${slug}/payment${urlSuffix}`, { state: { paymentMethods } });
    }
  };

  // const isOrderReady = !!selectedAddress;

  return (
    <>
      <MobileBackHeader title="Order Summery" />
      <div className="page-content-wrapper">
        {/* Left Section */}
        <div className={styles.LeftBox}>
          <div className={styles.DeviceImg}>
            <div className={styles.mobileImg}>
              <img src={currentEvaluationId?.devicePic || MobileImg} alt="" />
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
              <span className={styles.infoLine}>
                "5,933+ Sold on QuickMobile"
              </span>
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
            {`Congratulations! Based on the details you provided, your device is
            valued at ₹ ${currentEvaluationId?.finalPrice}. This is the best
            price we offer, reflecting the current market demand and the
            condition of your device. Ready to move forward?`}
          </p>
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
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryHeader}>
            <div className={styles.summaryHeaderLeft}>
              <img src={van} alt="" className={styles.featureOption}></img>
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

        <div className={styles.summaryCard}>
          <div className={styles.summaryHeader}>
            <div className={styles.summaryHeaderLeft}>
              <img
                src={secureShield}
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
              No payment method selected. Click "Add" button above to select a
              payment method.
            </p>
          )}
        </div>
        <div className={styles.detailsDown}>
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
                  navigate(
                    `/${slug}/final-price-calculator${location.search}`,
                  )
                }
              />
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className={styles.RightBox}>
          <div className={styles.details}>
            <div className={styles.summary}>Summary</div>
            <div className={styles.row}>
              <span className={styles.label}>Phone Price</span>
              <span className={styles.value}>
                {`₹ ${currentEvaluationId?.finalPrice}`}
              </span>
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
              <span className={styles.label}>Offer/Coupon</span>
              <span className={styles.value}>₹10.00</span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>
                {`₹ ${currentEvaluationId?.finalPrice}`}
              </span>
            </div>
          </div>

          {/* Place Order Button */}
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

          {/* Apply Coupon Button */}
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
