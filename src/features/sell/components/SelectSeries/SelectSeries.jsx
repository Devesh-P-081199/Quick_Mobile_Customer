import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./SelectSeries.module.css";
import api from "../../../../Utils/api";
// import { Helmet } from "react-helmet";
import closeicon from "../../../../assets/QuickSellNewIcons/Cross.svg";
import MobileCommonHeader from "../../../../components/layout/MobileCommonHeader/MobileCommonHeader";
import TopSellingModel from "../../../../Components/TopSellingModel/TopSellingModel";
import TopSellingBrand from "../../../../Components/TrustedBrands/TopSellingBrand";

function SelectSeries() {
  const [series, setSeries] = useState([]);
  const [seriesId, setSeriesId] = useState(null);
  const [allModels, setAllModels] = useState([]);
  const [, setSeoData] = useState({});

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

  // Debug: Log filtered models
  useEffect(() => {
    console.log("Filtered Models:", filteredModels);
    console.log("All Models:", allModels);
    console.log("Selected Series ID:", seriesId);
  }, [filteredModels, allModels, seriesId]);

  return (
    <>
      <MobileCommonHeader title="Sell {Brand} {Category}" onSearch />

      <div className={styles.mobilePtSection}>
        {displayedSeries.length > 0 && (
          <section className="default-padding-section">
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
                          <img src={closeicon} alt="close" title="close" />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Models List */}
        <section className="default-padding-section">
          <div className="wrapper">
            {console.log(
              "Rendering models section, count:",
              filteredModels.length
            )}
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
                        console.log("=== Model Click Debug ===");
                        console.log(
                          "Full modelItem:",
                          JSON.stringify(modelItem, null, 2)
                        );
                        console.log("singleVariant:", modelItem?.singleVariant);
                        console.log("variantSlug:", modelItem?.variantSlug);
                        console.log("slugSell:", modelItem?.slugSell);
                        console.log("variantId:", modelItem?.variantId);
                        console.log("_id:", modelItem?._id);

                        if (modelItem?.singleVariant) {
                          // Use variantSlug preferably, fallback to variantId
                          const variantPath =
                            modelItem?.variantSlug || modelItem?.variantId;
                          console.log(
                            "Navigating to single variant:",
                            `/${slug1}/${variantPath}`
                          );
                          console.log("variantPath chosen:", variantPath);
                          navigate(`/${slug1}/${variantPath}`);
                          return;
                        } else {
                          console.log(
                            "Navigating to model:",
                            `/${slug1}/${modelItem.slugSell}`
                          );
                          navigate(`/${slug1}/${modelItem.slugSell}`);
                          return;
                        }
                      }}
                      className={styles.brandSingleBox}
                      style={{ cursor: "pointer" }}
                    >
                      <div className={styles.imgIndividual}>
                        <img
                          src={
                            modelItem?.devicePic ||
                            modelItem?.icon ||
                            "https://via.placeholder.com/160x160?text=No+Image"
                          }
                          alt={modelItem?.deviceName || "Device"}
                          title={modelItem?.deviceName || "Device"}
                          onError={(e) => {
                            console.log("Image failed to load:", modelItem);
                            e.target.src =
                              "https://via.placeholder.com/160x160?text=No+Image";
                          }}
                        />
                      </div>
                      {modelItem?.deviceName || "Unknown Device"}
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
      </div>
    </>
  );
}

export default SelectSeries;
