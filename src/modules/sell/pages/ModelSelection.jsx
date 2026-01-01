import BrowsePicks from "../../common/components/BrowsePicks/BrowsePicks";
import SelectBrand from "../components/SelectBrand/SelectBrand";
import SelectModel from "../components/SelectModel/SelectModel";
import SelectedSeries from "../../common/components/SelectedSeries/SelectedSeries";
import FAQ from "../../common/components/layout/FAQ/FAQ";

function ModelSelection() {
  return (
    <>
      <SelectedSeries />
      <SelectModel />
      <BrowsePicks />
      <SelectBrand />
      <FAQ />
    </>
  );
}

export default ModelSelection;
