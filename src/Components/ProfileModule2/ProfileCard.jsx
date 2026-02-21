import React, { useContext } from 'react';
import styles from './ProfileCard.module.css';
// import user  from "../../../assets/icons/user.png"
import { FaSignOutAlt, FaMapMarkerAlt, FaCreditCard, FaBoxOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import { UserContext } from '../../Context/contextAPI';

const ProfileCard = () => {
  const navigate = useNavigate();
  const { setUser,user } =
  useContext(UserContext);
  
  const handleLogOut=()=>{
    alert("Are you sure want to logout");
    Cookies.remove('userSelection');
    Cookies.remove('user');
    Cookies.remove('auth-token');
    setUser({});
    navigate("/")
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.profile}>
        <div className={styles.profileImage}>

            {/* <img src={user} alt="" /> */}
        </div>
        <div className={styles.profileDetails}>
          <div className={styles.profileName}>{user?.name || "Name: N/A"}</div>
          <div className={styles.profileEmail}>{user?.email || "Email: N/A"}</div>
          <div className={styles.profilePhone}>{user?.phone}</div>
          <button className={styles.editButton} onClick={()=>navigate("/edit-my-profile")}>Edit Profile</button>
        </div>
        <div className={styles.editIcon}></div>
      </div>

      <div className={styles.options}>
      <div className={styles.optionRow}>
          <FaBoxOpen />
          <span onClick={()=>navigate("/my-profile-orders")}>My Orders</span>
</div>
        <div className={styles.optionRow}>
          <FaCreditCard />
          <span onClick={()=>navigate("/my-profile-payments")}>Payments Options</span>
        </div>
        <div className={styles.optionRow}>
          <FaMapMarkerAlt />
          <span onClick={()=>navigate("/Address")}>Saved Address</span>
        </div>
        <div className={styles.optionRow}>
          <FaSignOutAlt />
          <span onClick={handleLogOut}>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
