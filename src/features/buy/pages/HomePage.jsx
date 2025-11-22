import HomeSlider from "../../../BuyComponents/HomeSlider/HomeSlider";
import PressRelease from "../../../BuyComponent/PressRelease/PressRelease";
import UsedvsBrand from "../../../BuyComponent/UsedvsBrand/UsedvsBrand";
import Newsletter from "../../../BuyComponent/NewsLetter/NewsLetter";
import Download from "../../../BuyComponent/Download/Download";
import LearnTemplate from "../../../BuyComponent/LearnTemplate/LearnTemplate";
import Blogs from "../../../BuyComponent/Cards/Blogs";
import Testimonials from "../../../BuyComponent/Cards/Testimonials";
import Allcategoryhome from "../../../Components/AllCategory/AllCategoryHome";
import FooterContent from "../../../Components/layout/Footer/FooterContent.jsx";
import BlackBanner from "../../../Components/BlackBanner/BlackBanner";

const HomePage = () => {
  return (
    <>
      <div>
        {/* COMPONENT WRAPPER: Each component wrapped individually for granular padding control */}

        <BlackBanner />
        <HomeSlider />
        {/* <SellingService/> */}
        {/* <OurServices/> */}
        {/* <AllCategory/> */}

        <div className="page-content-wrapper">
          <Allcategoryhome />
        </div>

        {/*<BuyPhone/>*/}

        <div className="page-content-wrapper">
          <LearnTemplate />
        </div>

        {/*<BuyDevices/>*/}

        <div className="page-content-wrapper">
          <Blogs />
        </div>

        <div className="page-content-wrapper">
          <Testimonials />
        </div>

        <div className="page-content-wrapper">
          <UsedvsBrand />
        </div>

        <div className="page-content-wrapper">
          <PressRelease />
        </div>

        <div className="page-content-wrapper">
          <Newsletter />
        </div>

        {/* <GuidePrivacyPolicy/> */}

        <div className="page-content-wrapper">
          <Download />
        </div>

        {/* FooterContent excluded - no wrapper */}
        <FooterContent />
      </div>
    </>
  );
};

export default HomePage;
