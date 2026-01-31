import React from "react";
import { Link } from "react-router-dom";
import styles from "./BreadCrumb.module.css";

function BreadCrumb({ items = [] }) {
  return (
    <div className={styles.breadcrumbsection}>
      <div className={styles.wrapper}>
        {items.map((item, index) => {
          // Support both string format (backward compatibility) and object format { label, path }
          const label = typeof item === "string" ? item : item.label;
          const path = typeof item === "string" ? null : item.path;
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              {!isLast && path ? (
                <Link to={path} className={styles.breadcrumbLink}>
                  <h2>{label}</h2>
                </Link>
              ) : (
                <h2 className={isLast ? styles.currentPage : ""}>{label}</h2>
              )}
              &nbsp;&nbsp;
              {index < items.length - 1 && ">"}
              &nbsp;&nbsp;
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default BreadCrumb;
