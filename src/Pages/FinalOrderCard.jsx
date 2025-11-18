import { useNavigate, useLocation } from "react-router-dom";
import coupenicon from "../assets/images/icons/coupen.png";
import rightarrow from "../assets/images/icons/rightarrow.png";
import MobileIcon from "../assets/images/Products/mobile.png";
import styles from "../features/checkout/components/CheckOut/RightCard.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/contextAPI";
import { toast } from "react-toastify";
import api from "../Utils/api";
function FinalOrderCard() {
  const { selectedAddress, selectedPaymentMethod, currentEvaluationId } =
    useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({});

  //console.log("Sleetced payment method",selectedPaymentMethod)

  const FetchPriceDetails = async (evaluationId) => {
    try {
      // console.log("Evalution id,", evaluationId);

      const finalPriceResp = await api.get(
        `/sell-module/user/view-finalprice-byId/${evaluationId?._id}`
      );
      // console.log("finalPriceResp", finalPriceResp.data);

      setData(finalPriceResp.data);
    } catch (error) {
      console.error("Error fetching final price:", error);
      toast.error("Error fetching final price");
    }
  };

  useEffect(() => {
    if (currentEvaluationId) {
      FetchPriceDetails(currentEvaluationId);
    } else {
      // console.log("No evaluation ID found");

      navigate("/step6");
    }
  }, [currentEvaluationId]);

  // console.log("selectedAddress", selectedAddress);

  const handlePlaceOrder = async () => {
    // console.log("Clicked continue", location.pathname);

    if (location.pathname === "/checkOut") {
      if (!selectedAddress) {
        alert("Please select address");
        return;
      }

      navigate("/payment");
    } else if (location.pathname === "/payment") {
      // This is the actual order placing step
      try {
        if (selectedAddress === null && selectedPaymentMethod === null) {
          toast.error("Please select address and payment method");
          return;
        }

        // console.log("Selected Address", selectedAddress);

        // console.log("Selected Payment Method", selectedPaymentMethod);

        const orderPayload = {
          deviceEvaluationId: currentEvaluationId?._id,
          address: selectedAddress,
          paymentDetail: selectedPaymentMethod,
        };

        const placeOrder = await api.post(
          "/sell-module/user/orders",
          orderPayload
        );

        // console.log("Order response", placeOrder.data);

        toast.success("Order placed successfully!");
        navigate("/thank-you"); // Redirect to success page
      } catch (error) {
        console.error("Error placing order:", error);
        toast.error(`${error?.response?.data?.error}`);
      }
    }
  };

  //console.log("Sleectedrd PAYMEnt===>>>>>",selectedPaymentMethod)

  return (
    <div className="ty-bg">
      <div className="right-box">
        <div className={styles.RightBox}>
          <div className={styles.Frame1597882160}>
            <div className={styles.ImageContainer}>
              <img
                src={MobileIcon}
                alt={data?.deviceName}
                title={data?.deviceName}
              />
            </div>
            <div className={styles.Frame1597882163}>
              <span className={styles.ProductName}>
                {data?.deviceName} ({data?.deviceVariant})
              </span>
            </div>
          </div>
          <div className={styles.summary}>Summary</div>
          <div className={styles.details}>
            <div className={styles.row}>
              <span className={styles.label}>Phone Price</span>
              <span className={styles.value}>₹ {data?.finalPrice}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Pickup Charges</span>
              <div className={styles.pickupCharges}>
                <span className={styles.free}>Free</span>
                <span className={styles.striked}>₹ 150</span>
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
              <span className={styles.totalValue}>₹ {data?.finalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinalOrderCard;
