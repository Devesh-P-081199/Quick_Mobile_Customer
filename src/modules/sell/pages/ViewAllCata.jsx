import AllCategory from "../../common/components/AllCategory/AllCategory";
import BreadCrumb from "../../common/components/layout/BreadCrumb/BreadCrumb";
import { Helmet } from "react-helmet-async";

function ViewAllCata() {
  return (
    <>
      <Helmet>
        <title>Sell Your Old Gadget – All Categories | QuickMobile</title>
        <meta
          name="description"
          content="Browse all device categories available to sell on QuickMobile. Get the best price for your old phone, tablet, laptop, or other gadget with free doorstep pickup."
        />
      </Helmet>
      <BreadCrumb items={["Home", "Sell Gadgets"]} />
      <AllCategory />
    </>
  );
}

export default ViewAllCata;
