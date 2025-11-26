import StaticBanner from "../../Components/SellYourOldDevice/StaticBanner";
import HomeSlider from "../../BuyComponents/HomeSlider/HomeSlider";

import OurService from "../../BuyComponents/OurService/OurService";
import SellingProductCard from "../../BuyComponents/TopSellingProducts/SellingProductCard";
import HomeTwoSlider from "../../BuyComponents/HomeTwoSlider/HomeTwoSlider";
import SellingAccessories from "../../BuyComponents/SellingAccessories/SellingAccessories";
// import Testimonials from "../../BuyComponents/Testimonial/Testimonial";
import UsedVsBrand from "../../BuyComponents/UsedVsBrands/UsedVsBrands";
import BrowsePicks from "../../Components/BrowsePicks/BrowsePicks";
// import SelectBrand from "../../Components/SelectBrand/SelectBrand";
import Blogs from "../../BuyComponents/Blogs/Blogs";
// import FAQ from "../../Components/FAQ/FAQ";
import TopSellingProducts from "../../BuyComponents/TopSellingProducts/TopSellingProducts.jsx";

import FAQ from "../../Components/layout/FAQ/FAQ";
// import FooterContent from "../../../src/Components/layout/Footer/FooterContent.jsx";
import Testimonials from "../../BuyComponent/Cards/Testimonials";
import TestPartyComponent from "../../Components/TestPartyComponent/TestPartyComponent";
// import TopSellingModel from "../../Components/TopSellingModel/TopSellingModel";
export default function Home() {
  return (
    <div>
      <HomeSlider />
      <div
        style={{
          backgroundColor: "#f5f6fa",
          minHeight: "100vh",
        }}
        className="homepage-main-content"
      >
        <div className="wrapper black-banner">
          <p>India’s most transparent mobile selling platform</p>
        </div>
        <StaticBanner />
        <OurService />
        <TopSellingProducts />
        <HomeTwoSlider />
        <SellingAccessories />
        {/* <Testimonials /> */}
        <UsedVsBrand />
        <BrowsePicks />
        {/* <SelectBrand /> */}
        <Blogs />
        <FAQ />
        {/* <FooterContent /> */}
      </div>
    </div>
  );
}
