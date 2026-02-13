import React from "react";
import SellDeviceVarient from "../../Components/SellDeviceVarientSelect/SellDeviceVarient";
import BreadCrumb from "../../Common/BreadCrumb/BreadCrumb";
import TopSellingBrand from "../../Components/TrustedBrands/TopSellingBrand";
import TopSellingModel from "../../Components/TopSellingModel/TopSellingModel";
import MobileCommonHeaderthree from "../../Common/MobileCommonHeader/MobileCommonHeaderthree";
// import MobileCommonHeadertow from "../../Common/MobileCommonHeader/MobileCommonHeadertow";

function SelectVarient() {
  return (
    <>
      {/* <BreadCrumb items={["Home", "Sell Your Phone"]} /> */}
      <MobileCommonHeaderthree
        title="Your Device"
        onBack={() => window.history.back()}
      />
      <SellDeviceVarient />
      <TopSellingBrand />
      <TopSellingModel />
    </>
  );
}

export default SelectVarient;
