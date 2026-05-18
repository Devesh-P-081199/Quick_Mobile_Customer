import React from "react";
import { Helmet } from "react-helmet-async";
import styles from "./Maintenance.module.css";

const Maintenance = () => {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Under Maintenance | QuickMobile</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          {/* A clean, rotating gear icon inside the glassmorphic card */}
          <svg
            className={styles.gearIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>

        <div className={styles.badge}>System Offline</div>
        
        <h1 className={styles.title}>Under Maintenance</h1>
        
        <p className={styles.subtitle}>
          QuickMobile is currently undergoing scheduled updates to improve our services.
          We will be back shortly. Thank you for your patience!
        </p>
      </div>

      <div className={styles.footer}>
        &copy; {new Date().getFullYear()} QuickMobile. All rights reserved.
      </div>
    </div>
  );
};

export default Maintenance;
