import React from "react";
// import SelectSeries from "../../../Components/SelectSeries/SelectSeries";
import BrowsePicks from "../../../Components/BrowsePicks/BrowsePicks";
// import SelectBrand from "../../../Components/SelectBrand/SelectBrand";
// import FAQ from '../../../Components/FAQ/FAQ'
// import SelectModel from "../../../Components/SelectModel/SelectModel";
import SelectedSeries from "../../../Components/SelectedSeries/SelectedSeries";
import FAQ from "../../../Components/layout/FAQ/FAQ";


function SeriesSelection() {
  return (
    <>
      <SelectedSeries />
      {/* <SelectModel /> */}
      <BrowsePicks />
      {/* <SelectBrand /> */}
      <FAQ />
    </>
  );
}

export default SeriesSelection;
