import React from "react";
import AllCategory from "../../../Components/AllCategory/AllCategory";
import BreadCrumb from "../../../Components/layout/BreadCrumb/BreadCrumb";

function ViewAllCata() {
  return (
    <>
      <BreadCrumb items={["Home", "View all category"]} />
      <AllCategory />
    </>
  );
}

export default ViewAllCata;
