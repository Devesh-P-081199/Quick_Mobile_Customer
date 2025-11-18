import React from "react";
import SelectVarient from "../components/SellDeviceVarientSelect/SellDeviceVarient";
import GetUpto from "../components/GetUpto/GetUpto";
import BreadCrumb from "../../../components/layout/BreadCrumb/BreadCrumb";
import SelectBrand from "../components/SelectBrand/SelectBrand";
import SelectModel from "../components/SelectModel/SelectModel";

function GetPriceUpto() {
  return (
    <>
      <BreadCrumb items={["Home", "Sell Your Phone"]} />
      <GetUpto />
    </>
  );
}

export default GetPriceUpto;
