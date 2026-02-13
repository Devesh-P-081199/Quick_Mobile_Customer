import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./SelectedSeries.module.css";
import { useLocation } from "react-router-dom";

const SelectedSeries = () => {
  const {seriesId} = useParams()
  const location = useLocation();
  const { seriesName } = location.state || {};

  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <h2 className={styles.heading}>Select Series</h2>
        </div>

        <div>
          <div className={styles.seriesBox}>
            <span className={styles.seriesLabel}>{seriesName}</span>
            <NavLink to={`/select-series/${seriesId}`}>
              <AiOutlineClose className={styles.closeIcon} size={20} />
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedSeries;
