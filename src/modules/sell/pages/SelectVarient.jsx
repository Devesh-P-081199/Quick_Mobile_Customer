import SellDeviceVarient from "../components/SellDeviceVarientSelect/SellDeviceVarient";
import TopSellingBrand from "../../common/components/TrustedBrands/TopSellingBrand";
import TopSellingModel from "../../common/components/TopSellingModel/TopSellingModel";
import MobileBackHeader from "../../common/components/layout/MobileCommonHeader/MobileBackHeader";

function SelectVarient() {
  return (
    <>
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
