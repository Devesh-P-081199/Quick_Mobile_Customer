import { useEffect, useRef } from "react";
import SellBanner from "../components/SellBanner/SellBanner";
import StaticBanner from "../../common/components/SellYourOldDevice/StaticBanner";
import SelectBrand from "../components/SelectBrand/SelectBrand";
import SellingPhoneIsSimple from "../components/SellingPhoneIsSimple/SellingPhoneIsSimple";
import TopSellingModel from "../../common/components/TopSellingModel/TopSellingModel";
import FAQ from "../../common/components/layout/FAQ/FAQ";

import BrowsePicks from "../../common/components/BrowsePicks/BrowsePicks";

import SuggestionProductSlider from "../../common/components/SuggestionProductSlider/SuggestionProductSlider";
import Testimonials from "../../buy/components/Cards/Testimonials";

function SellHome() {
  const brandRef = useRef(null);
  useEffect(() => {
    const fakeDelay = setTimeout(() => {
      // setLoading(false); // This line is commented out because loading state is removed
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
            const offset = 90; // increased offset to ensure header is visible
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
