import React from "react";
import SelectSeries from "../components/SelectSeries/SelectSeries";
import BrowsePicks from "../../../Components/BrowsePicks/BrowsePicks";
import BreadCrumb from "../../../components/layout/BreadCrumb/BreadCrumb";
import FAQ from "../../../components/layout/FAQ/FAQ";
import TopSellingModel from "../../../Components/TopSellingModel/TopSellingModel";
import TopSellingBrand from "../../../Components/TrustedBrands/TopSellingBrand";

function SeriesSelection() {
  return (
    <>
      <BreadCrumb items={["Home", "Sell Your Phone"]} />
      <SelectSeries />
      {/* <SelectModel/> */}
      <BrowsePicks />
      <TopSellingModel />
      <TopSellingBrand />

      {/* <TopSellingModel/> */}

      {/* <TopSellingProducts/> */}
      <FAQ />
    </>
  );
}

export default SeriesSelection;
