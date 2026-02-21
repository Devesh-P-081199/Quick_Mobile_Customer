import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styles from "./ComingSoon.module.css";
// import MobileBackHeader from "../../components/layout/MobileCommonHeader/MobileBackHeader";

const ComingSoon = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.pageContainer}>
            <Helmet>
                <title>Coming Soon | QuickMobile</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            {/* If you want the mobile header to appear above the red background, 
                 you might need to adjust the structure or z-index. 
                 For a full page immersive design, we might omit it or style it transparently. */}

            <div className={styles.signContainer}>
                {/* The Pin holding the sign */}
                <div className={styles.pin}></div>

                {/* The Strings */}
                <div className={styles.stringLeft}></div>
                <div className={styles.stringRight}></div>

                {/* The Sign Board */}
                <div className={styles.signBoard}>
                    <span className={styles.textComing}>COMING</span>
                    <span className={styles.textSoon}>SOON</span>

                    {/* Optional subtitle inside or below */}
                    <div className={styles.underConstruction}>
                        This page is under construction
                    </div>
                </div>
            </div>

            <button
                onClick={() => navigate("/")}
                className={styles.backButton}
            >
                Back to Home
            </button>
        </div>
    );
};

export default ComingSoon;
