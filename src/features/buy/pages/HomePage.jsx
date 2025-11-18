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
        <BlackBanner />
        <HomeSlider />
        {/* <SellingService/> */}
        {/* <OurServices/> */}
        {/* <AllCategory/> */}
        <Allcategoryhome />
        {/*<BuyPhone/>*/}
        <LearnTemplate />
        {/*<BuyDevices/>*/}
        <Blogs />
        <Testimonials />
        <UsedvsBrand />
        <PressRelease />
        <Newsletter />
        {/* <GuidePrivacyPolicy/> */}
        <Download />
        <FooterContent />
      </div>
    </>
  );
};

export default HomePage;
