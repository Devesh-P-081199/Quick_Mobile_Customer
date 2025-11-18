import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./SelectSeries.module.css";
import api from "../../../../Utils/api";

function SelectSeries() {
  const [series, setSeries] = useState([]);
  const [seriesId, setSeriesId] = useState(null);
  const [model, setModel] = useState([]);

  const navigate = useNavigate();
  const { brandId } = useParams();

  // const handleSeriesClick = (seriesId, seriesName) => {
  //   navigate(
  //     `/select-model/${seriesId}`,
  //     { state: { seriesName } }
  //   );
  // };

  const handleSelection = (type, id) => {
    if (type === "series") {
      setSeriesId((prevId) => (prevId === id ? null : id));
    }
  };

  const fetchSeriesModels = async () => {
    try {
      const resp = await api.get(
        `/sell-module/user/fetchSeriesModels?option=Sell&brandId=${brandId}&seriesId=${seriesId}`
      );
      // console.log("Series Models : ", resp.data);

      setSeries(resp.data?.series);
      setModel(resp.data?.models);
    } catch (error) {
      // console.log("error in fetching series models : ", error);
    }
  };
  useEffect(() => {
    fetchSeriesModels();
  }, [seriesId]);

  // console.log("Series ID : ", seriesId);

  return (
    <section className="default-padding-section">
      <div className="wrapper">
        <div className={styles.wrapper}>
          <div className={styles.headingFlex}>
            <h2 className={styles.sectionHeading}>Select Series</h2>
          </div>
          <ul className={styles.seriesList}>
            {series?.map((series, index) => (
              <li
                key={index}
                // onClick={() => setSeriesId(series._id)}
                onClick={() => handleSelection("series", series._id)}
                className={styles.seriesItem}
              >
                {series.seriesName}
                {seriesId === series._id && (
                  <span className={styles.crossIcon}> ❌</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.headingFlex}>
            <h2 className={styles.sectionHeading}>Select Model</h2>
          </div>
          <ul className={styles.seriesList}>
            {model?.map((model, index) => (
              <NavLink
                key={index}
                to={`/select-varient/${model._id}`}
                className={styles.brandSingleBox}
              >
                <div className={styles.imgIndividual}>
                  <img
                    src={model?.devicePic || model.icon}
                    alt={model.name}
                    title={model.name}
                  />
                </div>
                {model?.deviceName}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SelectSeries;
