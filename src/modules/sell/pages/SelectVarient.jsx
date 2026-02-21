import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import SellDeviceVarient from "../components/SellDeviceVarientSelect/SellDeviceVarient";
import TopSellingBrand from "../../common/components/TrustedBrands/TopSellingBrand";
import TopSellingModel from "../../common/components/TopSellingModel/TopSellingModel";
import MobileBackHeader from "../../common/components/layout/MobileCommonHeader/MobileBackHeader";
import { UserContext } from "../../../Context/contextAPI";

function SelectVarient() {
  const { phoneName } = useContext(UserContext);

  return (
    <>
      <Helmet>
        <title>
          {phoneName
            ? `Select ${phoneName} Variant to Sell | QuickMobile`
            : "Select Device Variant to Sell | QuickMobile"}
        </title>
        <meta
          name="description"
          content={
            phoneName
              ? `Choose the right variant of your ${phoneName} and get the best sell price. Free pickup & instant cash with QuickMobile.`
              : "Select your device variant and get the best sell price online with QuickMobile. Free pickup and instant cash."
          }
        />
      </Helmet>
      <MobileBackHeader title="Your Device" />

      <div className="page-content">
        <SellDeviceVarient />
        <TopSellingBrand />
        <TopSellingModel />
      </div>
    </>
  );
}

export default SelectVarient;
