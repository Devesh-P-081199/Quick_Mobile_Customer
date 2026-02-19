import HomeSlider from "./HomeSlider/HomeSlider";
import PressRelease from "./PressRelease/PressRelease";
import UsedvsBrand from "./UsedvsBrand/UsedvsBrand";
import Newsletter from "./NewsLetter/NewsLetter";
import GuidePrivacyPolicy from "./Privacy/Privacy";
import Download from "./Download/Download";
import SellingService from "./Services/SellingService";
import OurServices from "./Services/OurServices";
import BuyPhone from "./Cards/BuyPhone";
import BuyDevices from "./Cards/BuyDevices";
import LearnTemplate from "./LearnTemplate/LearnTemplate"
import Blogs from "./Cards/Blogs";
import Testimonials from "./Cards/Testimonials";
import AllCategory from "../Components/AllCategory/AllCategory";
import Allcategoryhome from "../Components/AllCategory/AllCategoryHome";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <>
    <div>
      <HomeSlider />
      {/* <SellingService/> */}
      {/* <OurServices/> */}
      {/* <AllCategory/> */}
      <Allcategoryhome/>
      {/*<BuyPhone/>*/}
      <LearnTemplate/>
      {/*<BuyDevices/>*/}
      <Blogs/>
      <Testimonials/>
      <UsedvsBrand/>
      <PressRelease/>
      <Newsletter/>
      {/* <GuidePrivacyPolicy/> */}
      <Download/>
      </div>
    </>
  );
};

export default HomePage;
