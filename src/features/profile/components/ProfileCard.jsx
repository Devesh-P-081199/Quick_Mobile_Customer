import React, { useContext } from "react";
import styles from "./ProfileCard.module.css";
// import user  from "../../../assets/icons/user.png"
import {
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBoxOpen,
  FaEdit,
  FaPen,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { UserContext } from "../../../Context/contextAPI";
import MobileCommonHeaderthree from "../../../components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import rightangle from "../../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";

const ProfileCard = () => {
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);

  // console.log("User",user)
  const handleLogOut = () => {
    let res = confirm("Are you sure want to logout");
    if (res) {
      Cookies.remove("userSelection");
      Cookies.remove("user");
      Cookies.remove("auth-token");
      setUser({});
      navigate("/");
    }
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
          {/* <button className={styles.editIcon} onClick={() => navigate("/setup-profile")} ><FaPen /></button> */}
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
              Payments Options <img src={rightangle} alt="" />
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
    </>
  );
};

export default ProfileCard;
