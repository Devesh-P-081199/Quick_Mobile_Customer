import { useContext, useState } from "react";
import styles from "./ProfileCard.module.css";
import {
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBoxOpen,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../../../Context/contextAPI";
import MobileCommonHeaderthree from "../../../components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import rightangle from "../../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";

const ProfileCard = () => {
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

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

  return (
    <>
      <MobileCommonHeaderthree title="Profile" />
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
          <div className={styles.optionRow}>
            <FaBoxOpen />
            <span onClick={() => navigate("/edit-my-profile")}>
              Edit Profile <img src={rightangle} alt="" />
            </span>
          </div>
        </div>

        <div className={styles.options}>
          <div className={styles.optionRow}>
            <FaBoxOpen />
            <span onClick={() => navigate("/my-profile-orders")}>
              My Orders <img src={rightangle} alt="" />
            </span>
          </div>
          <div className={styles.optionRow}>
            <FaCreditCard />
            <span onClick={() => navigate("/my-profile-payments")}>
              Saved Payments <img src={rightangle} alt="" />
            </span>
          </div>
          <div className={styles.optionRow}>
            <FaMapMarkerAlt />
            <span onClick={() => navigate("/Address")}>
              Saved Address <img src={rightangle} alt="" />
            </span>
          </div>
          <div className={styles.optionRow}>
            <FaMapMarkerAlt />
            <span onClick={() => navigate("/offers")}>
              Offer <img src={rightangle} alt="" />
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
