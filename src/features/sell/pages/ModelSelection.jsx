import BrowsePicks from "../../../Components/BrowsePicks/BrowsePicks";
import SelectBrand from "../components/SelectBrand/SelectBrand";
import SelectModel from "../components/SelectModel/SelectModel";
import SelectedSeries from "../../../Components/SelectedSeries/SelectedSeries";
import FAQ from "../../../components/layout/FAQ/FAQ";

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
