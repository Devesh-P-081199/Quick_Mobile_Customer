import React from "react";

import BreadCrumb from "../../../components/layout/BreadCrumb/BreadCrumb";
import FAQFullPage from "../../../Components/FAQ/FAQFullPage";
// import FAQFullPage from "../../Components/FAQ/FAQFullPage";
// import FAQFullPage from "../../Components/FAQ/FAQFullPage";

function FAQPage() {
  return (
    <>
      <BreadCrumb items={["Home", "Sell Your Phone"]} />
      <FAQFullPage />
    </>
  );
}

export default FAQPage;
