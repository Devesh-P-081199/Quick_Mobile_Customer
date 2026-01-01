import React, { useEffect, useRef, useState } from "react";
import SellBanner from "../components/SellBanner/SellBanner";
import StaticBanner from "../../../Components/SellYourOldDevice/StaticBanner";
import WhySell from "../components/WhySellYourPhone/WhySellYourPhone";
import SelectBrand from "../components/SelectBrand/SelectBrand";
import WhyShell from "../components/WhySellYourPhone/WhySellYourPhone";
import SellingPhoneIsSimple from "../components/SellingPhoneIsSimple/SellingPhoneIsSimple";
import TopSellingModel from "../../../Components/TopSellingModel/TopSellingModel";
import FAQ from "../../../Components/layout/FAQ/FAQ";

import TopSellingProducts from "../../../BuyComponents/TopSellingProducts/TopSellingProducts";
import BreadCrumb from "../../../components/layout/BreadCrumb/BreadCrumb";
import SellBannerSkeleton from "../components/SellBanner/SellBannerSkeleton";
import BrowsePicks from "../../../Components/BrowsePicks/BrowsePicks";

import SuggestionProductSlider from "../../../Components/SuggestionProductSlider/SuggestionProductSlider";
import api from "../../../Utils/api";
import { useParams } from "react-router-dom";
import Testimonials from "../../../BuyComponent/Cards/Testimonials";

function SellHome() {
  const [loading, setLoading] = useState(true);
  const [seoData, setSeo] = useState({});
  const { slug1 } = useParams();

  const brandRef = useRef(null);
  useEffect(() => {
    const fakeDelay = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(fakeDelay);
  }, []);

  return (
    <>

      <SellBanner
        onViewAllClick={() => {
          if (brandRef.current) {
            const offsetTop =
              brandRef.current.getBoundingClientRect().top + window.pageYOffset;
            const offset = 50; // scroll 20px above
            window.scrollTo({
              top: offsetTop - offset,
              behavior: "smooth",
            });
          }
        }}
      />

      <SuggestionProductSlider />
      <StaticBanner />
      <div ref={brandRef}>
        <SelectBrand />
      </div>
      <SellingPhoneIsSimple />
      <TopSellingModel />
      <BrowsePicks />

      <div className="page-content-wrapper">
        <Testimonials />
      </div>

      <FAQ />
    </>
  );
}

export default SellHome;
