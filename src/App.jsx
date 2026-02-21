import React, { useEffect, useState, Suspense, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Pages - Updated to use feature-based structure
// const SeriesSelection = React.lazy(
//   () => import("./modules/sell/pages/SeriesSelection"),
// );
// const ModelSelection = React.lazy(
//   () => import("./modules/sell/pages/ModelSelection"),
// );
// const SelectVarient = React.lazy(
//   () => import("./modules/sell/pages/SelectVarient"),
// );
// const GetPriceUpto = React.lazy(
//   () => import("./modules/sell/pages/GetPriceUpto"),
// );
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
  () => import("./modules/common/pages/thank-you/ThankYouPage"),
);
// const SelectSubCata = React.lazy(
//   () => import("./modules/sell/components/SelectSubCategories/SelectSubCata"),
// );
import Loader from "./modules/common/components/layout/Loader/Loader";
import DynamicRouteHandler from "./modules/common/pages/dynamic/DynamicRouteHandler";
import NotFoundPage from "./modules/common/pages/not-found/NotFoundPage";

const BlogDetail = React.lazy(
  () => import("./modules/common/pages/blogs/BlogDetail"),
);
const BlogsPage = React.lazy(() => import("./modules/common/pages/blogs/BlogsPage"));
const StorePage = React.lazy(() => import("./modules/common/pages/stores/StorePage"));
const StoresListPage = React.lazy(
  () => import("./modules/common/pages/stores/StoresListPage"),
);

const ComingSoon = React.lazy(
  () => import("./modules/common/pages/coming-soon/ComingSoon"),
);

// Updated imports to use new feature-based structure
// const Login = React.lazy(
//   () => import("./modules/profile/components/Login/Login"),
// );
// const SignUp = React.lazy(
//   () => import("./modules/profile/components/Signup/Signup"),
// );
const Address = React.lazy(
  () => import("./modules/profile/pages/SavedAddress"),
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

const ViewAllCata = React.lazy(
  () => import("./modules/sell/pages/ViewAllCata"),
);
const FAQFullPage = React.lazy(() => import("./modules/common/components/FAQ/FAQFullPage"));
import Header from "./modules/common/components/layout/Header/Header";
import Footer from "./modules/common/components/layout/Footer/Footer";
import HomePage from "./modules/buy/pages/HomePage";
import { Helmet } from "react-helmet-async";
import { UserContext } from "./Context/contextAPI";

const AboutUs = React.lazy(
  () => import("./modules/common/pages/general/AboutUs/AboutUs"),
);
const Cookies = React.lazy(
  () => import("./modules/common/pages/general/Cookies/Cookies"),
);
const TermsOfService = React.lazy(
  () => import("./modules/common/pages/general/Terms/Terms"),
);
const TermsAndConditions = React.lazy(
  () =>
    import("./modules/common/pages/general/TermsAndConditions/TermsAndConditions"),
);
const PrivacyPolicy = React.lazy(
  () => import("./modules/common/pages/general/PlatformPrivacy/PrivacyPolicy"),
);
const CookiesPolicy = React.lazy(
  () => import("./modules/common/pages/general/PlatformCookies/CookiesPolicy"),
);
const RefundPolicy = React.lazy(
  () => import("./modules/common/pages/general/RefundPolicy/RefundPolicy"),
);
const ContactUs = React.lazy(
  () => import("./modules/common/pages/general/ContactUs/ContactUs"),
);
const QuickImpact = React.lazy(
  () => import("./modules/common/pages/general/QuickImpact/QuickImpact"),
);
const SearchBar = React.lazy(
  () => import("./modules/common/components/layout/SearchBar/SearchBar"),
);
const GuidePrivacyPolicy = React.lazy(
  () => import("./modules/common/pages/general/Privacy/Privacy"),
);
const ProfileCard = React.lazy(
  () => import("./modules/profile/components/ProfileCard"),
);
const NoOffer = React.lazy(
  () => import("./modules/profile/components/Offer/Offer"),
);
const ProfileLayout = React.lazy(
  () => import("./modules/profile/components/ProfileLayout/ProfileLayout"),
);

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
  // Hide footer only on mobile for specific routes
  const hideFooter =
    isMobile &&
    (location.pathname.includes("final-price-calculator") ||
      location.pathname.includes("price-summary") ||
      location.pathname.includes("check-out") ||
      location.pathname.includes("payment-mode-selection") ||
      location.pathname.includes("/payment/add-payment"));

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
              <OrderSummaryPage />
            </Suspense>
          }
        />

        <Route
          path="/:slug/check-out/add-address"
          element={
            <Suspense fallback={<Loader />}>
              <OrderSummaryPage />
            </Suspense>
          }
        />

        <Route
          path="/:slug/check-out/edit-address/:addressId"
          element={
            <Suspense fallback={<Loader />}>
              <OrderSummaryPage />
            </Suspense>
          }
        />

        <Route
          path="/:slug/payment-mode-selection"
          element={
            <Suspense fallback={<Loader />}>
              <OrderSummaryPage />
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
              <OrderSummaryPage />
            </Suspense>
          }
        />

        <Route
          path="/:slug/payment/edit-payment/:paymentId"
          element={
            <Suspense fallback={<Loader />}>
              <OrderSummaryPage />
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
              <ProfileLayout />
            </Suspense>
          }
        />

        <Route
          path="/profile/saved-address/edit-address/:addressId"
          element={
            <Suspense fallback={<Loader />}>
              <ProfileLayout />
            </Suspense>
          }
        />

        <Route
          path="/profile/add-payment"
          element={
            <Suspense fallback={<Loader />}>
              <ProfileLayout />
            </Suspense>
          }
        />

        <Route
          path="/profile/edit-payment/:paymentId"
          element={
            <Suspense fallback={<Loader />}>
              <ProfileLayout />
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
          path="/my-profile"
          element={
            <Suspense fallback={<Loader />}>
              <ProfileLayout />
            </Suspense>
          }
        />
        <Route
          path="/my-profile-orders"
          element={
            <Suspense fallback={<Loader />}>
              <ProfileLayout />
            </Suspense>
          }
        />
        <Route
          path="/edit-my-profile"
          element={
            <Suspense fallback={<Loader />}>
              <ProfileLayout />
            </Suspense>
          }
        />
        <Route
          path="/my-profile-payments"
          element={
            <Suspense fallback={<Loader />}>
              <ProfileLayout />
            </Suspense>
          }
        />
        <Route
          path="/Address"
          element={
            <Suspense fallback={<Loader />}>
              <ProfileLayout />
            </Suspense>
          }
        />
        <Route
          path="/offers"
          element={
            <Suspense fallback={<Loader />}>
              <ProfileLayout />
            </Suspense>
          }
        />
        <Route
          path="/payment-selection"
          element={
            <Suspense fallback={<Loader />}>
              <ProfileLayout />
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
              <ProfileLayout />
            </Suspense>
          }
        />

        <Route
          path="/sell-gadgets"
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

        <Route
          path="/Faq"
          element={
            <Suspense fallback={<Loader />}>
              <FAQFullPage />
            </Suspense>
          }
        />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route
          path="/Cookies"
          element={
            <Suspense fallback={<Loader />}>
              <Cookies />
            </Suspense>
          }
        />
        <Route
          path="/about-us"
          element={
            <Suspense fallback={<Loader />}>
              <AboutUs />
            </Suspense>
          }
        />
        <Route
          path="/Terms-of-Use"
          element={
            <Suspense fallback={<Loader />}>
              <TermsOfService />
            </Suspense>
          }
        />
        <Route
          path="/Terms-and-conditions"
          element={
            <Suspense fallback={<Loader />}>
              <TermsAndConditions />
            </Suspense>
          }
        />
        <Route
          path="/Return&Refund"
          element={
            <Suspense fallback={<Loader />}>
              <RefundPolicy />
            </Suspense>
          }
        />
        <Route
          path="/Contact-us"
          element={
            <Suspense fallback={<Loader />}>
              <ContactUs />
            </Suspense>
          }
        />
        <Route
          path="/Impact"
          element={
            <Suspense fallback={<Loader />}>
              <QuickImpact />
            </Suspense>
          }
        />
        <Route
          path="/Search"
          element={
            <Suspense fallback={<Loader />}>
              <SearchBar />
            </Suspense>
          }
        />
        <Route
          path="/Privacy"
          element={
            <Suspense fallback={<Loader />}>
              <GuidePrivacyPolicy />
            </Suspense>
          }
        />
        <Route
          path="/Privacy-policy"
          element={
            <Suspense fallback={<Loader />}>
              <PrivacyPolicy />
            </Suspense>
          }
        />
        <Route
          path="/Cookies-policy"
          element={
            <Suspense fallback={<Loader />}>
              <CookiesPolicy />
            </Suspense>
          }
        />
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
          path="/blog/:blogTitle"
          element={
            <Suspense fallback={<Loader />}>
              <BlogDetail />
            </Suspense>
          }
        />
        <Route path="/sitemap.xml" element={<Navigate to="/sitemap.xml" replace />} />
        <Route
          path="/coming-soon"
          element={
            <Suspense fallback={<Loader />}>
              <ComingSoon />
            </Suspense>
          }
        />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
};
const SEOUpdater = () => {
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;
  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};
function App() {
  const dynamicUrl = window.location.origin + window.location.pathname;
  return (
    <Router>
      <SEOUpdater />
      <AppContent />
      <ToastContainer />
    </Router>
  );
}

export default App;
