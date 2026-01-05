import GetUpto from "../components/GetUpto/GetUpto";
import BreadCrumb from "../../common/components/layout/BreadCrumb/BreadCrumb";

function GetPriceUpto() {
  return (
    <>
      <BreadCrumb items={["Home", "Sell Your Phone"]} />
      <GetUpto />
    </>
  );
}

export default GetPriceUpto;
