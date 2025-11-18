import React from "react";
import SelectSeries from "../../../Components/SelectSeries/SelectSeries";
import BrowsePicks from "../../../Components/BrowsePicks/BrowsePicks";
import SelectBrand from "../../../Components/SelectBrand/SelectBrand";

import SelectModel from "../../../Components/SelectModel/SelectModel";
import TopSellingProducts from "../../../Components/TopSellingProducts/TopSellingProducts";
import BreadCrumb from "../../../Components/layout/BreadCrumb/BreadCrumb";
import FAQ from "../../../Components/layout/FAQ/FAQ";
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
