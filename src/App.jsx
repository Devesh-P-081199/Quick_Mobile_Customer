import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Pages - Updated to use feature-based structure
const SeriesSelection = React.lazy(
  () => import("./modules/sell/pages/SeriesSelection"),
);
const ModelSelection = React.lazy(
  () => import("./modules/sell/pages/ModelSelection"),
);
const SelectVarient = React.lazy(
  () => import("./modules/sell/pages/SelectVarient"),
);
const GetPriceUpto = React.lazy(
  () => import("./modules/sell/pages/GetPriceUpto"),
);
const DeviceEvaluationPage = React.lazy(
  () => import("./modules/sell/pages/DeviceEvaluationPage"),
);
const OrderSummaryPage = React.lazy(
  () => import("./modules/sell/pages/OrderSummaryPage"),
);
const CheckOut = React.lazy(
  () => import("./modules/checkout/components/CheckOut/CheckOut"),
);
const AddressForm = React.lazy(
  () => import("./modules/checkout/components/AddressForm/AddressForm"),
);
const PaymentComponent = React.lazy(
  () => import("./modules/checkout/components/Payment/Payment"),
);
const PaymentForm = React.lazy(
  () => import("./modules/checkout/components/PaymentForm/PaymentForm"),
);
const ThankYouPage = React.lazy(
  () => import("./modules/common/pages/ThankYouPage"),
);
const SelectSubCata = React.lazy(
  () => import("./modules/sell/components/SelectSubCategories/SelectSubCata"),
);

const ViewAllCata = React.lazy(
  () => import("./modules/sell/pages/ViewAllCata"),
);
import FAQPage from "./modules/sell/pages/FAQPage";
import Header from "./modules/common/components/layout/Header/Header";
import Footer from "./modules/common/components/layout/Footer/Footer";
// Updated imports to use new feature-based structure
const Login = React.lazy(
  () => import("./modules/profile/components/Login/Login"),
);
const SignUp = React.lazy(
  () => import("./modules/profile/components/Signup/Signup"),
);
const Address = React.lazy(
  () => import("./modules/profile/pages/SavedAddress"),
);
const PaymentOptions = React.lazy(
  () => import("./modules/checkout/components/Payment/Payment"),
);
const ProfilePayments = React.lazy(
  () => import("./modules/profile/pages/PaymentOptions"),
);

const SetupProfile = React.lazy(
  () => import("./modules/profile/components/SetupProfile/SetupProfile"),
);
const MyOrder = React.lazy(
  () => import("./modules/profile/components/MyOrder/MyOrder"),
);
const EditProfile = React.lazy(
  () => import("./modules/profile/components/SetupProfile/EditProfile"),
);
const OrderDetails = React.lazy(
  () => import("./modules/profile/components/MyOrder/OrderDetails"),
);
import { Suspense } from "react";

// testing for loader
import Loader from "./modules/common/components/layout/Loader/Loader";
import DynamicRouteHandler from "./modules/common/pages/DynamicRouteHandler";
import NotFoundPage from "./modules/common/pages/NotFoundPage";
const BlogDetail = React.lazy(
  () => import("./modules/common/pages/BlogDetail"),
);
const BlogsPage = React.lazy(() => import("./modules/common/pages/BlogsPage"));
const StorePage = React.lazy(() => import("./modules/common/pages/StorePage"));
const StoresListPage = React.lazy(
  () => import("./modules/common/pages/StoresListPage"),
);
import HomePage from "./modules/buy/pages/HomePage";
import AboutUs from "./modules/common/pages/general/AboutUs/AboutUs";
import Cookies from "./modules/common/pages/general/Cookies/Cookies";
import TermsOfService from "./modules/common/pages/general/Terms/Terms";
import TermsAndConditions from "./modules/common/pages/general/TermsAndConditions/Terms-and-condition";
import PrivacyPolicy from "./modules/common/pages/general/PrivacyPolicy/Privacy-policy";
import CookiesPolicy from "./modules/common/pages/general/CookiesPolicy/Cookies-policy";
import RefundPolicy from "./modules/common/pages/general/RefundPolicy/RefundPolicy";
import ContactUs from "./modules/common/pages/general/ContactUs/ContactUs";
import QuickImpact from "./modules/common/pages/general/QuickImpact/QuickImpact";
import SearchBar from "./modules/common/components/layout/SearchBar/SearchBar";
import GuidePrivacyPolicy from "./modules/common/pages/general/Privacy/Privacy";
import ProfileCard from "./modules/profile/components/ProfileCard";
import NoOffer from "./modules/profile/components/Offer/Offer";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Scroll to top immediately on any route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search]);

  return null;
};

const AppContent = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Remove inline padding-top style and apply mobile padding
  useEffect(() => {
    let isApplying = false;

    const applyBodyPadding = () => {
      if (isApplying) return; // Prevent infinite loop

      isApplying = true;
      const currentPaddingTop = window.getComputedStyle(
        document.body,
      ).paddingTop;
      const expectedPadding = window.innerWidth <= 768 ? "55px" : "0px";

      if (currentPaddingTop !== expectedPadding) {
        document.body.style.setProperty(
          "padding-top",
          expectedPadding,
          "important",
        );
      }

      setTimeout(() => {
        isApplying = false;
      }, 0);
    };

    // Apply on mount
    applyBodyPadding();

    // Apply on resize
    window.addEventListener("resize", applyBodyPadding);

    // Observe for any changes to body style attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          applyBodyPadding();
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => {
      window.removeEventListener("resize", applyBodyPadding);
      observer.disconnect();
    };
  }, []);

  // hide footer if mobile & url includes "final-price-calculator"
  // Also hide footer for checkout and payment routes on all devices
  const hideFooter =
    (isMobile &&
      (location.pathname.includes("final-price-calculator") ||
        location.pathname === "/not-found" ||
        location.pathname.includes("price-summary") ||
        location.pathname.includes("dfds"))) ||
    location.pathname.includes("check-out") ||
    location.pathname.includes("/payment") ||
    location.pathname.includes("payment-mode-selection");

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/loader-testing" element={<Loader />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/:slug/final-price-calculator/*"
          element={
            <Suspense fallback={<Loader />}>
              <DeviceEvaluationPage />
            </Suspense>
          }
        />

        <Route
          path="/:slug/price-summary/*"
          element={
            <Suspense fallback={<Loader />}>
              <OrderSummaryPage />
            </Suspense>
          }
        />

        <Route
          path="/:slug/check-out"
          element={
            <Suspense fallback={<Loader />}>
              <CheckOut />
            </Suspense>
          }
        />

        <Route
          path="/:slug/check-out/add-address"
          element={
            <Suspense fallback={<Loader />}>
              <AddressForm />
            </Suspense>
          }
        />

        <Route
          path="/:slug/check-out/edit-address/:addressId"
          element={
            <Suspense fallback={<Loader />}>
              <AddressForm />
            </Suspense>
          }
        />

        <Route
          path="/:slug/payment-mode-selection"
          element={
            <Suspense fallback={<Loader />}>
              <PaymentComponent />
            </Suspense>
          }
        />

        <Route
          path="/:slug/payment"
          element={
            <Suspense fallback={<Loader />}>
              <PaymentComponent />
            </Suspense>
          }
        />

        <Route
          path="/:slug/payment/add-payment"
          element={
            <Suspense fallback={<Loader />}>
              <PaymentForm />
            </Suspense>
          }
        />

        <Route
          path="/:slug/payment/edit-payment/:paymentId"
          element={
            <Suspense fallback={<Loader />}>
              <PaymentForm />
            </Suspense>
          }
        />

        <Route path="/:slug1/:slug2/:slug3" element={<DynamicRouteHandler />} />
        <Route path="/:slug1/:slug2" element={<DynamicRouteHandler />} />
        <Route path="/:slug1" element={<DynamicRouteHandler />} />

        <Route
          path="/checkout"
          element={
            <Suspense fallback={<Loader />}>
              <CheckOut />
            </Suspense>
          }
        />

        <Route
          path="/thank-you"
          element={
            <Suspense fallback={<Loader />}>
              <ThankYouPage />
            </Suspense>
          }
        />

        <Route
          path="/Address"
          element={
            <Suspense fallback={<Loader />}>
              <Address />
            </Suspense>
          }
        />

        <Route
          path="/profile/saved-address"
          element={
            <Suspense fallback={<Loader />}>
              <Address />
            </Suspense>
          }
        />

        <Route
          path="/profile/saved-address/add-address"
          element={
            <Suspense fallback={<Loader />}>
              <AddressForm />
            </Suspense>
          }
        />

        <Route
          path="/profile/saved-address/edit-address/:addressId"
          element={
            <Suspense fallback={<Loader />}>
              <AddressForm />
            </Suspense>
          }
        />

        <Route
          path="/my-profile-payments"
          element={
            <Suspense fallback={<Loader />}>
              <ProfilePayments />
            </Suspense>
          }
        />

        <Route
          path="/profile/add-payment"
          element={
            <Suspense fallback={<Loader />}>
              <PaymentForm />
            </Suspense>
          }
        />

        <Route
          path="/profile/edit-payment/:paymentId"
          element={
            <Suspense fallback={<Loader />}>
              <PaymentForm />
            </Suspense>
          }
        />

        <Route
          path="/customer/user-profile"
          element={
            <Suspense fallback={<Loader />}>
              <ProfileCard />
            </Suspense>
          }
        />

        <Route
          path="/my-profile-orders"
          element={
            <Suspense fallback={<Loader />}>
              <MyOrder />
            </Suspense>
          }
        />
        <Route
          path="/my-profile"
          element={
            <Suspense fallback={<Loader />}>
              <ProfileCard />
            </Suspense>
          }
        />

        <Route
          path="/edit-my-profile"
          element={
            <Suspense fallback={<Loader />}>
              <EditProfile />
            </Suspense>
          }
        />

        <Route
          path="/setup-profile"
          element={
            <Suspense fallback={<Loader />}>
              <SetupProfile />
            </Suspense>
          }
        />

        <Route
          path="/profile/order-details/:orderId"
          element={
            <Suspense fallback={<Loader />}>
              <OrderDetails />
            </Suspense>
          }
        />

        <Route
          path="/view-all-category"
          element={
            <Suspense fallback={<Loader />}>
              <ViewAllCata />
            </Suspense>
          }
        />
        <Route
          path="/offers"
          element={
            <Suspense fallback={<Loader />}>
              <NoOffer />
            </Suspense>
          }
        />

        <Route path="/FAQPage" element={<FAQPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/Cookies" element={<Cookies />} />
        <Route path="/About-us" element={<AboutUs />} />
        <Route path="/Terms-of-Use" element={<TermsOfService />} />
        <Route path="/Terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/Privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/Cookies-policy" element={<CookiesPolicy />} />
        <Route path="/Refund" element={<RefundPolicy />} />
        <Route path="/Contact-us" element={<ContactUs />} />
        <Route path="/Impact" element={<QuickImpact />} />
        <Route path="/Search" element={<SearchBar />} />
        <Route path="/Privacy" element={<GuidePrivacyPolicy />} />
        <Route
          path="/blogs"
          element={
            <Suspense fallback={<Loader />}>
              <BlogsPage />
            </Suspense>
          }
        />
        <Route
          path="/our-stores"
          element={
            <React.Suspense fallback={<Loader />}>
              <StoresListPage />
            </React.Suspense>
          }
        />
        <Route
          path="/our-store/:storeId"
          element={
            <React.Suspense fallback={<Loader />}>
              <StorePage />
            </React.Suspense>
          }
        />
        <Route
          path="/blog-details/:blogId"
          element={
            <Suspense fallback={<Loader />}>
              <BlogDetail />
            </Suspense>
          }
        />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
      <ToastContainer />
    </Router>
  );
}

export default App;
