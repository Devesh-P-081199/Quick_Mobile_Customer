import { useContext } from "react";
import SellDeviceVarient from "../components/SellDeviceVarientSelect/SellDeviceVarient";
import TopSellingBrand from "../../common/components/TrustedBrands/TopSellingBrand";
import TopSellingModel from "../../common/components/TopSellingModel/TopSellingModel";
import MobileCommonHeaderthree from "../../common/components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../Context/contextAPI";

function SelectVarient() {
  const navigate = useNavigate();
  const { slug1 } = useParams();
  const { userSelection } = useContext(UserContext);

  const handleBack = () => {
    const brandSlug = userSelection?.brandSlug;
    const catSlug = userSelection?.catSubcatSlug || slug1;

    if (brandSlug && catSlug) {
      navigate(`/${catSlug}/${brandSlug}`, { replace: true });
    } else if (catSlug) {
      // Fallback to category page if no brand slug
      navigate(`/${catSlug}`, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      <MobileCommonHeaderthree title="Your Device" onBack={handleBack} />

      <div className="page-content">
        <SellDeviceVarient />
        <TopSellingBrand />
        <TopSellingModel />
      </div>
    </>
  );
}

export default SelectVarient;
