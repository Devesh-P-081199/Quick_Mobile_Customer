// import React from "react";
// import Header from "../components/layout/Header";
// import Blogs from "../components/modules/Blog";
// import FAQ from "../components/modules/FAQ";

import StaticBanner from "../../Components/SellYourOldDevice/StaticBanner";

import OurService from "../../BuyComponents/OurService/OurService"
import SellingProductCard from "../../BuyComponents/TopSellingProducts/SellingProductCard";
import HomeTwoSlider from "../../BuyComponents/HomeTwoSlider/HomeTwoSlider";
import SellingAccessories from "../../BuyComponents/SellingAccessories/SellingAccessories";
// import Testimonials from "../../BuyComponents/Testimonial/Testimonial";
import UsedVsBrand from "../../BuyComponents/UsedVsBrands/UsedVsBrands";
import BrowsePicks from "../../Components/BrowsePicks/BrowsePicks";
import SelectBrand from "../../Components/SelectBrand/SelectBrand";
import Blogs from "../../BuyComponents/Blogs/Blogs";
// import FAQ from "../../Components/FAQ/FAQ";
import TopSellingProducts from "../../BuyComponents/TopSellingProducts/TopSellingProducts";

import FAQ from "../../Components/FAQ/FAQ";
import Testimonials from "../../BuyComponent/Cards/Testimonials";
// import TopSellingModel from "../../Components/TopSellingModel/TopSellingModel";
export default function Home() {
  return (
    <div>
      <HomeSlide />
      <StaticBanner />
      <OurService />
      <TopSellingProducts />
      <HomeTwoSlider />
      <SellingAccessories />
      {/* <Testimonials /> */}
      <UsedVsBrand />
      <BrowsePicks />
      <SelectBrand />
      <Blogs />
      <FAQ />
    </div>
  );
}
