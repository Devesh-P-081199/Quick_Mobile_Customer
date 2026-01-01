
import BreadCrumb from "../../common/components/layout/BreadCrumb/BreadCrumb";
import FAQFullPage from "../../common/components/FAQ/FAQFullPage";

function FAQPage() {
  return (
    <>
      <BreadCrumb items={["Home", "Sell Your Phone"]} />
      <FAQFullPage />
    </>
  );
}

export default FAQPage;
