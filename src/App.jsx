import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import './App.css';

// Import Pages - Updated to use feature-based structure
import SellHome from "./features/sell/pages/SellHome";
const SeriesSelection = React.lazy(() =>
  import("./features/sell/pages/SeriesSelection")
);
const ModelSelection = React.lazy(() =>
  import("./features/sell/pages/ModelSelection")
);
const SelectVarient = React.lazy(() =>
  import("./features/sell/pages/SelectVarient")
);
const GetPriceUpto = React.lazy(() =>
  import("./features/sell/pages/GetPriceUpto")
);
const FormStep3 = React.lazy(() => import("./features/sell/pages/FormStep3"));
const FormStep6 = React.lazy(() => import("./features/sell/pages/FormStep6"));
const CheckOut = React.lazy(() =>
  import("./features/checkout/components/CheckOut/CheckOut")
);
const AddressForm = React.lazy(() =>
  import("./features/checkout/components/AddressForm/AddressForm")
);
const PaymentComponent = React.lazy(() =>
  import("./features/checkout/components/Payment/Payment")
);
const PaymentForm = React.lazy(() =>
  import("./features/checkout/components/PaymentForm/PaymentForm")
);
// import ThankYouPage from "./Pages/ThankYouPage";
const ThankYouPage = React.lazy(() => import("./pages/ThankYouPage"));
// import SelectSubCata from "./Components/SelectSubCategories/SelectSubCata";
const SelectSubCata = React.lazy(() =>
  import("./features/sell/components/SelectSubCategories/SelectSubCata")
);

// import ViewAllCata from "./Pages/SellModule/ViewAllCata";
const ViewAllCata = React.lazy(() =>
  import("./features/sell/pages/ViewAllCata")
);
import FAQPage from "./features/sell/pages/FAQPage";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
// Updated imports to use new feature-based structure
const Login = React.lazy(() =>
  import("./features/profile/components/Login/Login")
);
const SignUp = React.lazy(() =>
  import("./features/profile/components/Signup/Signup")
);
const Address = React.lazy(() =>
  import("./features/profile/pages/SavedAddress")
);
const PaymentOptions = React.lazy(() =>
  import("./features/checkout/components/Payment/Payment")
);
const ProfilePayments = React.lazy(() =>
  import("./features/profile/pages/PaymentOptions")
);

const SetupProfile = React.lazy(() =>
  import("./features/profile/components/SetupProfile/SetupProfile")
);
const MyOrder = React.lazy(() =>
  import("./features/profile/components/MyOrder/MyOrder")
);
const EditProfile = React.lazy(() =>
  import("./features/profile/components/SetupProfile/EditProfile")
);
import { Suspense } from "react";

// testing for loader
import Loader from "./components/layout/Loader/Loader";
import CategoryRouter from "./features/sell/pages/CategoryRouter";
import DynamicRouteHandler from "./pages/DynamicRouteHandler";
import NotFoundPage from "./pages/NotFoundPage";
const BlogDetail = React.lazy(() => import("./pages/BlogDetail"));
const BlogsPage = React.lazy(() => import("./pages/BlogsPage"));
const StorePage = React.lazy(() => import("./pages/StorePage"));
const StoresListPage = React.lazy(() => import("./pages/StoresListPage"));
import HomePage from "./features/buy/pages/HomePage";
import AboutUs from "./pages/general/AboutUs/AboutUs";
import Cookies from "./pages/general/Cookies/Cookies";
import TermsOfService from "./pages/general/Terms/Terms";
import RefundPolicy from "./pages/general/RefundPolicy/RefundPolicy";
import ContactUs from "./pages/general/ContactUs/ContactUs";
import QuickImpact from "./pages/general/QuickImpact/QuickImpact";
import SearchBar from "./components/layout/SearchBar/SearchBar";
import GuidePrivacyPolicy from "./pages/general/Privacy/Privacy";
import ProfileCard from "./features/profile/components/ProfileCard";
import NoOffer from "./features/profile/components/Offer/Offer";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  // const location = useLocation();
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
        document.body
      ).paddingTop;
      const expectedPadding = window.innerWidth <= 768 ? "55px" : "0px";

      if (currentPaddingTop !== expectedPadding) {
        document.body.style.setProperty(
          "padding-top",
          expectedPadding,
          "important"
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
  const hideFooter =
    isMobile &&
    (location.pathname.includes("final-price-calculator") ||
      location.pathname === "/404" ||
      location.pathname.includes("price-summary") ||
      location.pathname.includes("check-out") ||
      location.pathname.includes("dfds"));

  return (
    <>
      {/* {loading && <Loader />} */}
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/loader-testing" element={<Loader />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/:slug/final-price-calculator/*"
          element={
            <Suspense fallback={<Loader />}>
              <FormStep3 />
            </Suspense>
          }
        />

        <Route
          path="/:slug/price-summary/*"
          element={
            <Suspense fallback={<Loader />}>
              <FormStep6 />
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
          path="/:slug/check-out/payment"
          element={
            <Suspense fallback={<Loader />}>
              <PaymentComponent />
            </Suspense>
          }
        />

        <Route
          path="/:slug/check-out/add-payment"
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
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/Cookies" element={<Cookies />} />
        <Route path="/About-us" element={<AboutUs />} />
        <Route path="/Terms" element={<TermsOfService />} />
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
          path="/blog/:blogId"
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
