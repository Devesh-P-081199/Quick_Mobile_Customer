// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams, NavLink, useLocation } from "react-router-dom";
// import styles from "./SelectSeries.module.css";
// import api from "../../Utils/api";
// import { Helmet } from "react-helmet";
// import { FaCross } from "react-icons/fa";
// import closeicon from "../../assets/flaticons/close.png";

// function SelectSeries() {
//   const [series, setSeries] = useState([]);
//   const [seriesId, setSeriesId] = useState(null);
//   const [model, setModel] = useState([]);
//   const [seoData, setSeoData] = useState({});
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { slug1,slug2,slug3 } = useParams();

//   let finalSlug=slug1;
//   if(slug2){
//     finalSlug=slug2;
//   }

//   //console.log("Final slug in SERIES SELECTION component:", finalSlug);

//   const handleSelection = (type, id) => {
//     if (type === "series") {
//       setSeriesId((prevId) => (prevId === id ? null : id));
//     }
//   };

//   let brandId = "2223232";

//   const fetchSeriesModels = async () => {
//     try {
//       const resp = await api.get(
//         `/sell-module/user/fetchSeriesModels?option=Sell&brandSlug=${finalSlug}&seriesId=${seriesId}`
//       );
//       setSeries(resp.data?.series);
//       setModel(resp.data?.models);
//     } catch (error) {
//       console.log("error in fetching series models : ", error);
//     }
//   };

//   useEffect(() => {
//     fetchSeriesModels();
//   }, [seriesId, brandId]);

//   useEffect(() => {
//     fetchSeriesModels();
//   }, [seriesId]);

//   const fetchBrandSeo = async () => {
//     try {
//       const resp = await api.get(`/sell-module/user/fetchBrandSeo/${brandId}`);
//       setSeoData(resp.data?.data);
//     } catch (error) {
//       console.log("Error in fetching brand SEO : ", error);
//     }
//   };

//   useEffect(() => {
//     fetchBrandSeo();
//     console.log("THis running ");
//   }, []);

//   return (
//     <>
//       <section className="default-padding-section">
//         <div className="wrapper">
//           <h2 className={styles.SellOldSection}>Sell Old Apple Product</h2>
//         </div>
//       </section>
//       <section className="default-padding-section">
//         {seoData && (
//           <Helmet>
//             {/* Static Fields */}
//             {seoData.title && <title>{seoData.title}</title>}
//             {seoData.description && (
//               <meta name="description" content={seoData.description} />
//             )}
//             {seoData.footer && <meta name="footer" content={seoData.footer} />}

//             {/* Open Graph */}
//             {seoData.title && (
//               <meta property="og:title" content={seoData.title} />
//             )}
//             {seoData.description && (
//               <meta property="og:description" content={seoData.description} />
//             )}

//             {/* Headings */}
//             {seoData.headings?.h1 && (
//               <meta name="h1" content={seoData.headings.h1} />
//             )}

//             {/* Dynamic 'others' array */}
//             {seoData.others?.map((item, index) =>
//               item?.type && item?.text ? (
//                 <meta
//                   key={index}
//                   name={item.type.toLowerCase()} // e.g., 'h2', 'h3'
//                   content={item.text}
//                 />
//               ) : null
//             )}
//           </Helmet>
//         )}
//         <div className="wrapper">
//           <div className={styles.wrapper}>
//             <div className={styles.headingFlex}>
//               <h2 className={styles.sectionHeading}>Select Series</h2>
//             </div>
//             {series.length > 0 ? (

//             <ul className={styles.seriesList}>
//               {(seriesId
//                 ? series.filter(s => s._id === seriesId)  // show only selected series
//                 : series  // show all series if none selected
//               ).map((series, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleSelection("series", series._id)}
//                   className={styles.seriesItem}
//                 >
//                   {series?.seriesName}
//                   {seriesId === series._id && (
//                     <span
//                       className={styles.crossIcon}
//                       onClick={(e) => {
//                         e.stopPropagation(); // prevent triggering onClick of li
//                         setSeriesId(null); // clear selection on clicking cross
//                       }}
//                     >
//                       <img src={closeicon} alt="" width={16} height={16} />
//                     </span>
//                   )}
//                 </li>
//               ))}
//             </ul>
//             ) : (
//               <div className="mt-2"> No Series found</div>
//             )}
//           </div>
//         </div>
//       </section>

//       <section className="default-padding-section">

// <div className="wrapper">
//   {model?.length > 0 ? (
//     <div className={styles.wrapper}>
//       <div className={styles.headingFlex}>
//         <h2 className={styles.sectionHeading}>Select Model</h2>
//       </div>
//       <ul className={styles.modellist}>
//         {model?.map((modelItem, index) => (
//           <li
//             key={index}
//             onClick={() => {
//               // Navigate to: /slug1/productSlug
//               const newPath = `/${slug1}/${modelItem.slugSell}`;
//               navigate(newPath); // Push new route so back button works
//             }}
//             className={styles.brandSingleBox}
//             style={{ cursor: "pointer" }}
//           >
//             <div className={styles.imgIndividual}>
//               <img
//                 src={modelItem?.devicePic || modelItem.icon}
//                 alt={modelItem.deviceName}
//               />
//             </div>
//             {modelItem?.deviceName}
//           </li>
//         ))}
//       </ul>
//     </div>
//   ) : (
//     <div className="mt-2">No Models found</div>
//   )}
// </div>

//       </section>
//     </>
//   );
// }

// export default SelectSeries;

// ------------------------ 2nd version ------------------------

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import styles from "./SelectSeries.module.css";
// import api from "../../Utils/api";
// import { Helmet } from "react-helmet";
// import closeicon from "../../assets/flaticons/close.png";
// import MobileCommonHeader from "../../Common/MobileCommonHeader/MobileCommonHeader";

// function SelectSeries() {
//   const [series, setSeries] = useState([]);
//   const [seriesId, setSeriesId] = useState(null); // selected series ID
//   const [allModels, setAllModels] = useState([]); // all models for this brand
//   const [seoData, setSeoData] = useState({});

//   const navigate = useNavigate();
//   const { slug1, slug2 } = useParams();

//   const finalSlug = slug2 || slug1;

//   // Fetch series and models only once
//   useEffect(() => {
//     const fetchSeriesModels = async () => {
//       try {
//         const resp = await api.get(
//           `/sell-module/user/fetchSeriesModels?option=Sell&brandSlug=${finalSlug}`
//         );
//         console.log("called", resp.data);
//         setSeries(resp.data?.series || []);
//         setAllModels(resp.data?.models || []);
//         setSeoData(resp.data?.seo || {});
//       } catch (error) {
//         console.error("Error fetching series/models:", error);
//       }
//     };

//     fetchSeriesModels();
//   }, [finalSlug]);

//   // Filter models based on selected series
//   const filteredModels = seriesId
//     ? allModels.filter((model) => model.seriesId === seriesId)
//     : allModels;

//   return (
//     <>
//       {/* <section className="default-padding-section">
//         <div className="wrapper">
//           <h2 className={styles.SellOldSection}>Sell Old Product</h2>
//         </div>
//       </section> */}

//       <MobileCommonHeader
//       title = "Select Series"
//       onSearch

//       />

//       {/* SEO Helmet */}
//       {seoData && (
//         <Helmet>
//           {seoData.title && <title>{seoData.title}</title>}
//           {seoData.description && (
//             <meta name="description" content={seoData.description} />
//           )}
//           {seoData.footer && <meta name="footer" content={seoData.footer} />}
//           {seoData.title && (
//             <meta property="og:title" content={seoData.title} />
//           )}
//           {seoData.description && (
//             <meta property="og:description" content={seoData.description} />
//           )}
//           {seoData.headings?.h1 && (
//             <meta name="h1" content={seoData.headings.h1} />
//           )}
//           {seoData.others?.map((item, index) =>
//             item?.type && item?.text ? (
//               <meta
//                 key={index}
//                 name={item.type.toLowerCase()}
//                 content={item.text}
//               />
//             ) : null
//           )}
//         </Helmet>
//       )}

//       {/* Series List */}
//       <section className="default-padding-section mobile-pt-section">
//         <div className="wrapper">
//           <div className={styles.wrapper}>
//             <div className={styles.headingFlex}>
//               <h2 className={styles.sectionHeading}>Select Series</h2>
//             </div>
//             {series.length > 0 ? (
//               <ul className={styles.seriesList}>
//                 {series.map((item, index) => (
//                   <li
//                     key={index}
//                     onClick={() =>
//                       setSeriesId((prev) =>
//                         prev === item._id ? null : item._id
//                       )
//                     }
//                     className={`${styles.seriesItem} ${
//                       seriesId === item._id ? styles.active : ""
//                     }`}
//                   >
//                     {item.seriesName}
//                     {seriesId === item._id && (
//                       <span
//                         className={styles.crossIcon}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setSeriesId(null);
//                         }}
//                       >
//                         <img
//                           src={closeicon}
//                           alt="close"
//                           width={16}
//                           height={16}
//                         />
//                       </span>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No Series Found</p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Models List */}
//       <section className="default-padding-section">
//         <div className="wrapper">
//           {filteredModels.length > 0 ? (
//             <div className={styles.wrapper}>
//               <div className={styles.headingFlex}>
//                 <h2 className={styles.sectionHeading}>Select Model</h2>
//               </div>
//               <ul className={styles.modellist}>
//                 {filteredModels.map((modelItem, index) => (
//                   <li
//                     key={index}
//                     onClick={() => navigate(`/${slug1}/${modelItem.slugSell}`)}
//                     className={styles.brandSingleBox}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <div className={styles.imgIndividual}>
//                       <img
//                         src={modelItem?.devicePic || modelItem.icon}
//                         alt={modelItem.deviceName}
//                       />
//                     </div>
//                     {modelItem?.deviceName}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ) : (
//             <p>No Models Found</p>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }

// export default SelectSeries;

// ------------------------ fix style and cross issue ----------------------------

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import styles from "./SelectSeries.module.css";
// import api from "../../Utils/api";
// // import { Helmet } from "react-helmet";
// import closeicon from "../../assets/flaticons/close.png";
// import MobileCommonHeader from "../../Common/MobileCommonHeader/MobileCommonHeader";
// import TopSellingModel from "../TopSellingModel/TopSellingModel";
// import BrowsePicks from "../BrowsePicks/BrowsePicks";
// import TopSellingBrand from "../TrustedBrands/TopSellingBrand";

// function SelectSeries() {
//   const [series, setSeries] = useState([]);
//   const [seriesId, setSeriesId] = useState(null);
//   const [allModels, setAllModels] = useState([]);
//   const [seoData, setSeoData] = useState({});

//   const navigate = useNavigate();
//   const { slug1, slug2 } = useParams();
//   const finalSlug = slug2 || slug1;

//   useEffect(() => {
//     const fetchSeriesModels = async () => {
//       try {
//         const resp = await api.get(
//           `/sell-module/user/fetchSeriesModels?option=Sell&brandSlug=${finalSlug}`
//         );
//         console.log("RESPONC in series page", resp.data);
//         setSeries(resp.data?.series || []);
//         setAllModels(resp.data?.models || []);
//         setSeoData(resp.data?.seo || {});
//       } catch (error) {
//         console.error("Error fetching series/models:", error);
//       }
//     };
//     fetchSeriesModels();
//   }, [finalSlug]);

//   // Filter series based on selection
//   const displayedSeries =
//     seriesId !== null ? series.filter((item) => item._id === seriesId) : series;

//   // Filter models based on selected series
//   const filteredModels = seriesId
//     ? allModels.filter(
//         (model) => model.deviceSeries?.toString() === seriesId?.toString()
//       )
//     : allModels;

//   return (
//     <>
//       <MobileCommonHeader title="Sell {Brand} {Category}" onSearch />

//       {/* {seoData && (
//         <Helmet>
//           {seoData.title && <title>{seoData.title}</title>}
//           {seoData.description && (
//             <meta name="description" content={seoData.description} />
//           )}
//           {seoData.footer && <meta name="footer" content={seoData.footer} />}
//           {seoData.title && (
//             <meta property="og:title" content={seoData.title} />
//           )}
//           {seoData.description && (
//             <meta property="og:description" content={seoData.description} />
//           )}
//           {seoData.headings?.h1 && (
//             <meta name="h1" content={seoData.headings.h1} />
//           )}
//           {seoData.others?.map((item, index) =>
//             item?.type && item?.text ? (
//               <meta
//                 key={index}
//                 name={item.type.toLowerCase()}
//                 content={item.text}
//               />
//             ) : null
//           )}
//         </Helmet>
//       )} */}

//       <div className="mobile-pt-section">
//         {displayedSeries.length > 0 && (
//           <section className="default-padding-section mobile-pt-section">
//             <div className="wrapper">
//               <div className={styles.wrapper}>
//                 <div className={styles.headingFlex}>
//                   <h2 className={styles.sectionHeading}>Select Series</h2>
//                 </div>
//                 <ul className={styles.seriesList}>
//                   {displayedSeries.map((item) => (
//                     <li
//                       key={item._id}
//                       onClick={() =>
//                         setSeriesId((prev) =>
//                           prev === item._id ? null : item._id
//                         )
//                       }
//                       className={`${styles.seriesItem} ${
//                         seriesId === item._id ? styles.active : ""
//                       }`}
//                     >
//                       {item.seriesName}
//                       {seriesId === item._id && (
//                         <span
//                           className={styles.crossIcon}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setSeriesId(null);
//                           }}
//                         >
//                           <img
//                             src={closeicon}
//                             alt="close"
//                             width={16}
//                             height={16}
//                           />
//                         </span>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </section>
//         )}
//       </div>
//       {/* Series List */}

//       {/* Models List */}
//       <section className="default-padding-section">
//         <div className="wrapper">
//           {filteredModels.length > 0 ? (
//             <div className={styles.wrapper}>
//               <div className={styles.headingFlex}>
//                 <h2 className={styles.sectionHeading}>Select Model</h2>
//               </div>
//               <ul className={styles.modellist}>
//                 {filteredModels.map((modelItem) => (
//                   <li
//                     key={modelItem._id}
//                     onClick={() => {
//                       if (modelItem?.singleVariant) {
//                         navigate(`/${slug1}/${modelItem.variantSlug}`);
//                         return;
//                       } else {
//                         console.log(
//                           "SLUG AFTER",
//                           `/${slug1}/${modelItem.slugSell}`
//                         );
//                         navigate(`/${slug1}/${modelItem.slugSell}`);
//                         return;
//                       }
//                     }}
//                     className={styles.brandSingleBox}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <div className={styles.imgIndividual}>
//                       <img
//                         src={modelItem?.devicePic || modelItem.icon}
//                         alt={modelItem.deviceName}
//                       />
//                     </div>
//                     {modelItem?.deviceName}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ) : (
//             <p>No Models Found</p>
//           )}
//         </div>
//       </section>
//       <TopSellingBrand />

      
//       <TopSellingModel />
//     </>
//   );
// }

// export default SelectSeries;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./SelectSeries.module.css";
import api from "../../Utils/api";
// import { Helmet } from "react-helmet";
import closeicon from "../../assets/flaticons/close.png";
import MobileCommonHeader from "../../Common/MobileCommonHeader/MobileCommonHeader";
import TopSellingModel from "../TopSellingModel/TopSellingModel";
import TopSellingBrand from "../TrustedBrands/TopSellingBrand";

function SelectSeries() {
  const [series, setSeries] = useState([]);
  const [seriesId, setSeriesId] = useState(null);
  const [allModels, setAllModels] = useState([]);
  const [seoData, setSeoData] = useState({});

  const navigate = useNavigate();
  const { slug1, slug2 } = useParams();
  const finalSlug = slug2 || slug1;

  useEffect(() => {
    const fetchSeriesModels = async () => {
      try {
        const resp = await api.get(
          `/sell-module/user/fetchSeriesModels?option=Sell&brandSlug=${finalSlug}`
        );
        console.log("RESPONCE in series page", resp.data);
        setSeries(resp.data?.series || []);
        setAllModels(resp.data?.models || []);
        setSeoData(resp.data?.seo || {});
      } catch (error) {
        console.error("Error fetching series/models:", error);
      }
    };
    fetchSeriesModels();
  }, [finalSlug]);

  // Filter series based on selection
  const displayedSeries =
    seriesId !== null ? series.filter((item) => item._id === seriesId) : series;

  // Filter models based on selected series
  const filteredModels = seriesId
    ? allModels.filter(
        (model) => model.deviceSeries?.toString() === seriesId?.toString()
      )
    : allModels;

  return (
    <>
      <MobileCommonHeader title="Sell {Brand} {Category}" onSearch />

      <div className="mobile-pt-section">
        {displayedSeries.length > 0 && (
          <section className="default-padding-section mobile-pt-section">
            <div className="wrapper">
              <div className={styles.wrapper}>
                <div className={styles.headingFlex}>
                  <h2 className={styles.sectionHeading}>Select Series</h2>
                </div>
                <ul className={styles.seriesList}>
                  {displayedSeries.map((item) => (
                    <li
                      key={item._id}
                      onClick={() =>
                        setSeriesId((prev) =>
                          prev === item._id ? null : item._id
                        )
                      }
                      className={`${styles.seriesItem} ${
                        seriesId === item._id ? styles.active : ""
                      }`}
                    >
                      {item.seriesName}
                      {seriesId === item._id && (
                        <span
                          className={styles.crossIcon}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSeriesId(null);
                          }}
                        >
                          <img
                            src={closeicon}
                            alt="close"
                            title="close"
                            width={16}
                            height={16}
                          />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Models List */}
      <section className="default-padding-section">
        <div className="wrapper">
          {filteredModels.length > 0 ? (
            <div className={styles.wrapper}>
              <div className={styles.headingFlex}>
                <h2 className={styles.sectionHeading}>Select Model</h2>
              </div>
              <ul className={styles.modellist}>
                {filteredModels.map((modelItem) => (
                  <li
                    key={modelItem._id}
                    onClick={() => {
                      if (modelItem?.singleVariant) {
                        navigate(`/${slug1}/${modelItem.variantSlug}`);
                        return;
                      } else {
                        navigate(`/${slug1}/${modelItem.slugSell}`);
                        return;
                      }
                    }}
                    className={styles.brandSingleBox}
                    style={{ cursor: "pointer" }}
                  >
                    <div className={styles.imgIndividual}>
                      <img
                        src={modelItem?.devicePic || modelItem.icon}
                        alt={modelItem.deviceName}
                        title={modelItem.deviceName}

                      />
                    </div>
                    {modelItem?.deviceName}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No Models Found</p>
          )}
        </div>
      </section>

      <TopSellingBrand />
      <TopSellingModel />
    </>
  );
}

export default SelectSeries;

