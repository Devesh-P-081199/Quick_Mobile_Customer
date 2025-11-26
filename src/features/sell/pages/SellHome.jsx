import React, { useEffect, useRef, useState } from "react";
import SellBanner from "../components/SellBanner/SellBanner";
import StaticBanner from "../../../Components/SellYourOldDevice/StaticBanner";
import WhySell from "../components/WhySellYourPhone/WhySellYourPhone";
import SelectBrand from "../components/SelectBrand/SelectBrand";
import WhyShell from "../components/WhySellYourPhone/WhySellYourPhone";
import SellingPhoneIsSimple from "../components/SellingPhoneIsSimple/SellingPhoneIsSimple";
import TopSellingModel from "../../../Components/TopSellingModel/TopSellingModel";
import FAQ from "../../../Components/layout/FAQ/FAQ";

import TopSellingProducts from "../../../BuyComponents/TopSellingProducts/TopSellingProducts";
import BreadCrumb from "../../../components/layout/BreadCrumb/BreadCrumb";
import SellBannerSkeleton from "../components/SellBanner/SellBannerSkeleton";
import BrowsePicks from "../../../Components/BrowsePicks/BrowsePicks";

import SuggestionProductSlider from "../../../Components/SuggestionProductSlider/SuggestionProductSlider";
import api from "../../../Utils/api";
import { useParams } from "react-router-dom";
import Testimonials from "../../../BuyComponent/Cards/Testimonials";
// import { Helmet} from "react-helmet-async";

function SellHome() {
  const [loading, setLoading] = useState(true);
  const [seoData, setSeo] = useState({});
  const { slug1 } = useParams();

  // const fetchSeoData = async (seoType="Sell") => {
  //   try {
  //    // console.log("Fetching SEO data for slug:", slug1, "and seoType:", seoType);
  //     const res = await api.get(`/sell-module/user/cat-seo-data/${slug1}/${seoType}`);
  //    console.log("SEO Data Response Called:", res.data);
  //     setSeo(res.data.seo || {});
  //   } catch (error) {
  //     console.error("Error in fetching SEO data:", error);

  //   }
  // };

  const brandRef = useRef(null);
  useEffect(() => {
    const fakeDelay = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(fakeDelay);
  }, []);

  // useEffect(() => {
  //   if(slug1){
  //   fetchSeoData();
  //   }
  // }, [slug1]);

  return (
    <>
      {/* {seoData && (
  <Helmet>
   
    {seoData.title && <title>{seoData.title}</title>}

   
    {seoData.description && (
      <meta name="description" content={seoData.description} />
    )}

    
    {seoData.footer && <meta name="footer" content={seoData.footer} />}

    
    {seoData.headings?.h1 && (
      <meta name="h1" content={seoData.headings.h1} />
    )}
    {seoData.headings?.others?.map(
      (item, index) =>
        item?.type &&
        item?.text && (
          <meta
            key={index}
            name={item.type.toLowerCase()} 
            content={item.text}
          />
        )
    )}
  </Helmet>
)} */}

      {/* <BreadCrumb items={["Home", "Sell Your Phone"]} /> */}
      {/* {loading ? <SellBannerSkeleton /> : <SellBanner />} */}
      {/* <SellBannerSkeleton /> */}
      <SellBanner
        onViewAllClick={() => {
          if (brandRef.current) {
            const offsetTop =
              brandRef.current.getBoundingClientRect().top + window.pageYOffset;
            const offset = 50; // scroll 20px above
            window.scrollTo({
              top: offsetTop - offset,
              behavior: "smooth",
            });
          }
        }}
      />

      <SuggestionProductSlider />
      <StaticBanner />
      {/* <WhyShell /> */}
      <div ref={brandRef}>
        <SelectBrand />
      </div>
      {/* <TopSellingProducts /> */}
      <SellingPhoneIsSimple />
      <TopSellingModel />
      <BrowsePicks />

      <div className="page-content-wrapper">
        <Testimonials />
      </div>

      <FAQ />
    </>
  );
}

export default SellHome;
