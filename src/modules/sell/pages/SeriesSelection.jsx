import SelectSeries from "../components/SelectSeries/SelectSeries";
import BrowsePicks from "../../common/components/BrowsePicks/BrowsePicks";
import BreadCrumb from "../../common/components/layout/BreadCrumb/BreadCrumb";
import FAQ from "../../common/components/layout/FAQ/FAQ";
import TopSellingModel from "../../common/components/TopSellingModel/TopSellingModel";
import TopSellingBrand from "../../common/components/TrustedBrands/TopSellingBrand";

function SeriesSelection() {
  return (
    <>
      <BreadCrumb items={["Home", "Sell Your Phone"]} />
      <SelectSeries />
      <BrowsePicks />
      <TopSellingModel />
      <TopSellingBrand />

      <FAQ />
    </>
  );
}

export default SeriesSelection;
