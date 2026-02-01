import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ProfileLayout.module.css";
import ProfileCard from "../ProfileCard";
import MobileBackHeader from "../../../common/components/layout/MobileCommonHeader/MobileBackHeader";

// Import child components
import MyOrder from "../MyOrder/MyOrder";
import EditProfile from "../SetupProfile/EditProfile";
import SavedAddress from "../../pages/SavedAddress";
import ProfilePayments from "../../pages/PaymentOptions";
import NoOffer from "../Offer/Offer";
import AddressForm from "../../../checkout/components/AddressForm/AddressForm";
import PaymentForm from "../../../checkout/components/PaymentForm/PaymentForm";
import Payment from "../../../checkout/components/Payment/Payment";
import OrderDetails from "../MyOrder/OrderDetails";

const ProfileLayout = () => {
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync URL with panel state (mobile only)
  useEffect(() => {
    if (isMobile) {
      const isRoot = location.pathname === "/my-profile";
      setShowLeftPanel(isRoot);
    } else {
      // Desktop: always show both panels
      setShowLeftPanel(true);
    }
  }, [location.pathname, isMobile]);

  // Handle option click from ProfileCard
  const handleOptionClick = (path) => {
    navigate(path);
    // Mobile: auto-switch to right panel
    if (isMobile) {
      setShowLeftPanel(false);
    }
  };

  // Handle back button
  const handleBack = () => {
    if (location.pathname !== "/my-profile") {
      navigate("/my-profile");
      if (isMobile) {
        setShowLeftPanel(true);
      }
    } else {
      navigate(-1); // Go to previous page outside profile
    }
  };

  // Render content based on URL
  const renderContent = () => {
    const path = location.pathname;

    if (path.includes("/order-details/")) return <OrderDetails />;
    if (path.includes("/my-profile-orders")) return <MyOrder />;
    if (path.includes("/edit-my-profile")) return <EditProfile />;
    if (path.includes("/Address")) return <SavedAddress />;
    if (path.includes("/my-profile-payments")) return <ProfilePayments />;
    if (path.includes("/payment-selection")) return <Payment />;
    if (path.includes("/offers")) return <NoOffer />;
    if (
      path.includes("/saved-address/add-address") ||
      path.includes("/saved-address/edit-address")
    )
      return <AddressForm />;
    if (path.includes("/add-payment") || path.includes("/edit-payment"))
      return <PaymentForm />;

    // Default: return null (empty right panel at /my-profile root)
    return null;
  };

  // Get title for mobile header based on current route
  const getHeaderTitle = () => {
    const path = location.pathname;
    if (path.includes("/order-details/")) return "Order Details";
    if (path.includes("/my-profile-orders")) return "My Orders";
    if (path.includes("/edit-my-profile")) return "Edit Profile";
    if (path.includes("/Address")) return "Saved Addresses";
    if (path.includes("/my-profile-payments")) return "Payment Options";
    if (path.includes("/payment-selection")) return "Select Payment";
    if (path.includes("/offers")) return "Offers";
    if (path.includes("/add-address")) return "Add Address";
    if (path.includes("/edit-address")) return "Edit Address";
    if (path.includes("/add-payment")) return "Add Payment";
    if (path.includes("/edit-payment")) return "Edit Payment";
    return "Profile";
  };

  // Get title for desktop content heading
  const getContentTitle = () => {
    const path = location.pathname;
    if (path.includes("/order-details/")) return "Order Details";
    if (path.includes("/my-profile-orders")) return "My Orders";
    if (path.includes("/edit-my-profile")) return "Edit Profile";
    if (
      path.includes("/Address") &&
      !path.includes("add-address") &&
      !path.includes("edit-address")
    )
      return "Saved Addresses";
    if (path.includes("/my-profile-payments")) return "Payment Options";
    if (path.includes("/payment-selection")) return "Select Payment Method";
    if (path.includes("/offers")) return "Offers";
    if (path.includes("/add-address")) return "Add Address";
    if (path.includes("/edit-address")) return "Edit Address";
    if (path.includes("/add-payment")) return "Add Payment";
    if (path.includes("/edit-payment")) return "Edit Payment";
    return null; // No title for root profile page
  };

  return (
    <>
      {/* Mobile Header - only show when on right panel content */}
      {isMobile && !showLeftPanel && (
        <MobileBackHeader title={getHeaderTitle()} onBack={handleBack} />
      )}

      {isMobile && showLeftPanel && <MobileBackHeader title="Profile" />}

      <div className={styles.layoutContainer}>
        {/* Left Panel - ProfileCard */}
        <div
          className={`${styles.leftPanel} ${
            isMobile && !showLeftPanel ? styles.hidden : ""
          }`}
        >
          <ProfileCard onOptionClick={handleOptionClick} />
        </div>

        {/* Right Panel - Content */}
        <div
          className={`${styles.rightPanel} ${
            isMobile && showLeftPanel ? styles.hidden : ""
          }`}
        >
          {/* Desktop-only heading */}
          {!isMobile && getContentTitle() && (
            <h2 className={styles.contentHeading}>{getContentTitle()}</h2>
          )}
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
