import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/contextAPI";
import api from "../../Utils/api";
import Cookies from "js-cookie";
import { FaCheckCircle } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import styles from "./EditProfile.module.css";
import MobileCommonHeaderthree from "../../Common/MobileCommonHeader/MobileCommonHeaderthree";
import ProfileCard from "../ProfileCard";

const EditProfile = () => {
  const { setUser, user } = useContext(UserContext);
  const id = user.userId;

  const [ProfileUpdate, setProfileUpdate] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [isPhoneVerified, setIsPhoneVerified] = useState(true); // mock for now
  const [isEmailVerified, setIsEmailVerified] = useState(false); // mock for now

  const handleUpdateProfile = async () => {
    try {
      const resp = await api.put(`/sell-module/user/update-profile/${id}`, {
        ProfileUpdate,
      });

      setUser((prev) => ({
        ...prev,
        ...ProfileUpdate,
      }));

      Cookies.set("user", JSON.stringify({ ...user, ...ProfileUpdate }), {
        expires: 2,
        sameSite: "strict",
      });

      alert("Profile updated successfully");
    } catch (error) {
      console.log("Error in updating profile", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileUpdate((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <MobileCommonHeaderthree title="Edit Profile" />
      <section className={styles.container}>
        {/* Avatar */}

        <div className={styles.left}>


          <div className={styles.avatarWrapper}>
            <img
              src={user?.profilePic || "https://via.placeholder.com/90"}
              alt="profile"
              className={styles.avatar}
            />
            <div className={styles.editIcon}>
              <FiEdit2 size={16} />
            </div>
          </div>

          {/* Full Name */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Full Name</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your fullname"
                value={ProfileUpdate.name}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          {/* Phone */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="phone">Phone Number</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="phone"
                name="phone"
                value={ProfileUpdate.phone}
                disabled
                className={styles.input}
              />
              {isPhoneVerified ? (
                <FaCheckCircle className={styles.statusIcon} color="green" />
              ) : (
                <span className={styles.verify}>Verify</span>
              )}
            </div>
            <div className={styles.notEditable}>Not Editable</div>
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email Address</label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                id="email"
                name="email"
                value={ProfileUpdate.email}
                onChange={handleChange}
                className={styles.input}
              />
              {isEmailVerified ? (
                <FaCheckCircle className={styles.statusIcon} color="green" />
              ) : (
                <span className={styles.verify}>Verify</span>
              )}
            </div>
          </div>

          {/* Save Button */}
          <button className={styles.saveButton} onClick={handleUpdateProfile}>
            Save
          </button>
        </div>
        <div className={styles.right}>
          <ProfileCard />

        </div>

      </section>

    </>

  );
};

export default EditProfile;
