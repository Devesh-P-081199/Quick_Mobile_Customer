import React from "react";

import BreadCrumb from "../../Common/BreadCrumb/BreadCrumb";
import FAQFullPage from "../../Components/FAQ/FAQFullPage";
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
