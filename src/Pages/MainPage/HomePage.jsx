import StaticBanner from "../../Components/SellYourOldDevice/StaticBanner";
import HomeSlider from "../../BuyComponents/HomeSlider/HomeSlider";

import OurService from "../../BuyComponents/OurService/OurService";
import SellingProductCard from "../../BuyComponents/TopSellingProducts/SellingProductCard";
import HomeTwoSlider from "../../BuyComponents/HomeTwoSlider/HomeTwoSlider";
import SellingAccessories from "../../BuyComponents/SellingAccessories/SellingAccessories";
import UsedVsBrand from "../../BuyComponents/UsedVsBrands/UsedVsBrands";
import BrowsePicks from "../../Components/BrowsePicks/BrowsePicks";
import Blogs from "../../BuyComponents/Blogs/Blogs";
import TopSellingProducts from "../../BuyComponents/TopSellingProducts/TopSellingProducts.jsx";

import FAQ from "../../Components/layout/FAQ/FAQ";
import Testimonials from "../../BuyComponent/Cards/Testimonials";
import TestPartyComponent from "../../Components/TestPartyComponent/TestPartyComponent";
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
        <UsedVsBrand />
        <BrowsePicks />
        <Blogs />
        <FAQ />
      </div>
    </div>
  );
}
