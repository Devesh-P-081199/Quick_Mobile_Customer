import React from "react";
import styles from "./MobileCommonHeader.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/icons/logo.svg";
import newBackIcon from "../../../assets/QuickSellNewIcons/BackArrow.svg";

const MobileCommonHeadertwo = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <button className={styles.iconButton} onClick={() => navigate(-1)}>
        <img src={newBackIcon} alt="Back" />
      </button>
      <img src={logo} alt="Logo" />
    </div>
  );
};

export default MobileCommonHeadertwo;
