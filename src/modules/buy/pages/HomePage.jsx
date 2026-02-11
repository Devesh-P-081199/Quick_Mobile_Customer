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

const HomePage = () => {
  return (
    <>
      <div>
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
