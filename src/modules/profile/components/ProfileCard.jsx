import { useContext, useState } from "react";
import styles from "./ProfileCard.module.css";
import {
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBoxOpen,
  FaUserEdit,
  FaTicketAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../../../Context/contextAPI";
import rightangle from "../../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";

const ProfileCard = ({ onOptionClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, user } = useContext(UserContext);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Check if a path is currently active
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  const handleLogOut = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    Cookies.remove("userSelection");
    Cookies.remove("user");
    Cookies.remove("auth-token");
    setUser({});
    navigate("/");
    setShowLogoutModal(false);
  };

  // Get user initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Handle navigation with optional parent callback
  const handleNavigate = (path) => {
    if (onOptionClick) {
      onOptionClick(path);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.profile}>
          <div className={styles.profileImage}>
            {user?.profilePic ? (
              <img src={user.profilePic} alt={user?.name} title={user?.name} />
            ) : (
              <div className={styles.initialsCircle}>
                <p>{getInitials(user?.name)}</p>
              </div>
            )}
          </div>
          <div className={styles.profileDetails}>
            <div className={styles.profileName}>
              {user?.name || "Name: N/A"}
            </div>
            <div className={styles.profileEmail}>
              {user?.email || "Email: N/A"}
            </div>
            <div className={styles.profilePhone}>{user?.phone}</div>
          </div>
        </div>
        <div className={styles.options}>
          <div
            className={`${styles.optionRow} ${isActive("/edit-my-profile") ? styles.active : ""}`}
          >
            <FaUserEdit />
            <span onClick={() => handleNavigate("/edit-my-profile")}>
              Edit Profile <img src={rightangle} alt="" />
            </span>
          </div>
        </div>

        <div className={styles.options}>
          <div
            className={`${styles.optionRow} ${isActive("/my-profile-orders") ? styles.active : ""}`}
          >
            <FaBoxOpen />
            <span onClick={() => handleNavigate("/my-profile-orders")}>
              My Orders <img src={rightangle} alt="" />
            </span>
          </div>
          <div
            className={`${styles.optionRow} ${isActive("/my-profile-payments") ? styles.active : ""}`}
          >
            <FaCreditCard />
            <span onClick={() => handleNavigate("/my-profile-payments")}>
              Saved Payments <img src={rightangle} alt="" />
            </span>
          </div>
          <div
            className={`${styles.optionRow} ${isActive("/Address") ? styles.active : ""}`}
          >
            <FaMapMarkerAlt />
            <span onClick={() => handleNavigate("/Address")}>
              Saved Address <img src={rightangle} alt="" />
            </span>
          </div>
          <div
            className={`${styles.optionRow} ${isActive("/offers") ? styles.active : ""}`}
          >
            <FaTicketAlt />
            <span onClick={() => handleNavigate("/offers")}>
              Offers <img src={rightangle} alt="" />
            </span>
          </div>
        </div>

        <div className={styles.options}>
          <div className={styles.optionRow}>
            <FaSignOutAlt />
            <span onClick={handleLogOut}>
              Logout <img src={rightangle} alt="" />
            </span>
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Are you sure you want to logout?</h3>
            <p>Hope to see you back soon!!</p>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button className={styles.logoutBtn} onClick={confirmLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
