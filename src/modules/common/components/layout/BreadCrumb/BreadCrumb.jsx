import React from "react";
import styles from "./BreadCrumb.module.css";

function BreadCrumb({ items = [] }) {
  return (
    <div className={styles.breadcrumbsection}>
      <div className={styles.wrapper}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <h2>{item}</h2>
            &nbsp;&nbsp;
            {index < items.length - 1 && ">"}
            &nbsp;&nbsp;
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default BreadCrumb;
