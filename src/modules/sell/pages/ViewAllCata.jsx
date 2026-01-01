import AllCategory from "../../common/components/AllCategory/AllCategory";
import BreadCrumb from "../../common/components/layout/BreadCrumb/BreadCrumb";

function ViewAllCata() {
  return (
    <>
      <BreadCrumb items={["Home", "View all category"]} />
      <AllCategory />
    </>
  );
}

export default ViewAllCata;
