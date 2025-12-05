import React, { useContext } from "react";
import SellDeviceVarient from "../components/SellDeviceVarientSelect/SellDeviceVarient";
import BreadCrumb from "../../../Components/layout/BreadCrumb/BreadCrumb";
import TopSellingBrand from "../../../Components/TrustedBrands/TopSellingBrand";
import TopSellingModel from "../../../Components/TopSellingModel/TopSellingModel";
import MobileCommonHeaderthree from "../../../Components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../Context/contextAPI";
// import MobileCommonHeadertow from "../../Common/MobileCommonHeader/MobileCommonHeadertow";

function SelectVarient() {
  const navigate = useNavigate();
  const { slug1 } = useParams();
  const { userSelection } = useContext(UserContext);

  const handleBack = () => {
    // Linear navigation: Go back to SelectSeries (brand page)
    // Use brandSlug from userSelection (stored when navigating from SelectSeries)
    const brandSlug = userSelection?.brandSlug;
    const catSlug = userSelection?.catSubcatSlug || slug1;

    if (brandSlug && catSlug) {
      navigate(`/${catSlug}/${brandSlug}`, { replace: true });
    } else if (catSlug) {
      // Fallback to category page if no brand slug
      navigate(`/${catSlug}`, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <>
      {/* <BreadCrumb items={["Home", "Sell Your Phone"]} /> */}
      <MobileCommonHeaderthree
        title="Your Device"
        onBack={handleBack}
      />

      <div className="page-content-wrapper">
        <SellDeviceVarient />
        <TopSellingBrand />
        <TopSellingModel />
      </div>
    </>
  );
}

export default SelectVarient;
