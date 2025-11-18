import React, { useContext, Suspense } from "react";
import SellHome from "./SellHome";
import Loader from "../../../components/layout/Loader/Loader"; // or any spinner
import { UserContext } from "../../../Context/contextAPI";

const SelectSubCata = React.lazy(() =>
  import("../components/SelectSubCategories/SelectSubCata")
);

const CategoryRouter = () => {
  const { haveSubCategory } = useContext(UserContext);

  if (haveSubCategory === undefined || haveSubCategory === null) {
    return <Loader />; // optional: show while data loads
  }

  return (
    <Suspense fallback={<Loader />}>
      {haveSubCategory ? <SelectSubCata /> : <SellHome />}
    </Suspense>
  );
};

export default CategoryRouter;
