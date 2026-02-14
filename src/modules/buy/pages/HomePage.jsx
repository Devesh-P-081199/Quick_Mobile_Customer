import HomeSlider from "../components/HomeSlider/HomeSlider";
// import PressRelease from "../components/PressRelease/PressRelease";
import UsedvsBrand from "../components/UsedvsBrand/UsedvsBrand";
import Newsletter from "../components/NewsLetter/NewsLetter";

import LearnTemplate from "../components/LearnTemplate/LearnTemplate";
import HomeBlogSlider from "../components/Cards/HomeBlogSlider";
import Testimonials from "../components/Cards/Testimonials";
import Allcategoryhome from "../../common/components/AllCategory/AllCategoryHome";
import FooterContent from "../../common/components/layout/Footer/FooterContent.jsx";
import BlackBanner from "../../common/components/BlackBanner/BlackBanner";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <>
      <div>
        <Helmet>
          <title>Buy/Sell Old & Used Second hand Mobile Phones Online in India | QuickMobile
          </title>
          <meta name="description" content="Sell/Buy Old Mobile Phones, Laptops, Tablets, Smartwatches Online From Doorstep and Get Best Price, Pickup and Get Instant Cash. Sell Your Used device Now!" />
        </Helmet>
        {/* COMPONENT WRAPPER: Each component wrapped individually for granular padding control */}

        <BlackBanner />
        <HomeSlider />

        <div>
          <Allcategoryhome />
        </div>

        <div className="page-content-wrapper">
          <LearnTemplate />
        </div>

        <div className="page-content-wrapper">
          <HomeBlogSlider />
        </div>

        <div className="page-content-wrapper">
          <Testimonials />
        </div>

        <div className="page-content-wrapper">
          <UsedvsBrand />
        </div>

        {/* <div className="page-content-wrapper">
          <PressRelease />
        </div> */}

        <div className="page-content-wrapper">
          <Newsletter />
        </div>

        {/* FooterContent excluded - no wrapper */}
        <FooterContent page="home" />
      </div>
    </>
  );
};

export default HomePage;
