import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../Context/contextAPI";
import Cookies from "js-cookie";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import styles from "./EditProfile.module.css";
import MobileCommonHeaderthree from "../../../../components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import ProfileCard from "../ProfileCard";
import newCloseBtn from "../../../../assets/QuickSellNewIcons/Cross.svg";
import cameraIcon from "../../../../assets/images/icons/camera-new.png";
import folderIcon from "../../../../assets/images/icons/folder.png";
import api from "../../../../Utils/api";

const EditProfile = () => {
  const { setUser, user } = useContext(UserContext);

  const [ProfileUpdate, setProfileUpdate] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return "";
    const names = name.trim().split(" ");
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  const [isPhoneVerified] = useState(true); // mock for now
  const [isEmailVerified, setIsEmailVerified] = useState(false); // mock for now
  const [showEmailOtp, setShowEmailOtp] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [profileImage, setProfileImage] = useState(user?.profilePic || "");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleAutoVerifyOtp = async () => {
    setIsVerifying(true);
    setVerificationStatus(null);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mock: Accept "123456" as valid OTP
          if (emailOtp === "123456") {
            resolve({ success: true });
          } else {
            reject(new Error("Invalid OTP"));
          }
        }, 1500);
      });

      // Success - only show tick in OTP field, not email field yet
      setVerificationStatus("success");
    } catch (error) {
      // Error
      setVerificationStatus("error");
      console.log("OTP verification failed", error);
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (emailOtp.length === 6 && showEmailOtp) {
      handleAutoVerifyOtp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailOtp]);

  const handleUpdateProfile = async () => {
    try {
      // Call API to update profile
      await api.put(`/sell-module/user/update-profile/${user.userId}`, {
        ProfileUpdate,
      });

      // Update user context
      setUser((prev) => ({
        ...prev,
        ...ProfileUpdate,
      }));

      // Update cookies
      Cookies.set("user", JSON.stringify({ ...user, ...ProfileUpdate }), {
        expires: 2,
        sameSite: "strict",
      });

      // Set email as verified and reset OTP field after successful form submission
      setIsEmailVerified(true);
      setShowEmailOtp(false);
      setEmailOtp("");
      setVerificationStatus(null);

      alert("Profile updated successfully");
    } catch (error) {
      console.log("Error in updating profile", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Show preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to server
      setIsUploadingImage(true);
      setShowImageUploadModal(false);

      try {
        const formData = new FormData();
        formData.append("profilePic", file);

        const response = await api.post(
          `/sell-module/user/upload-profile-pic/${user.userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data && response.data.profilePicUrl) {
          // Update with server URL
          setProfileImage(response.data.profilePicUrl);

          // Update user context
          setUser((prev) => ({
            ...prev,
            profilePic: response.data.profilePicUrl,
          }));

          // Update cookies
          Cookies.set(
            "user",
            JSON.stringify({
              ...user,
              profilePic: response.data.profilePicUrl,
            }),
            {
              expires: 2,
              sameSite: "strict",
            }
          );

          alert("Profile picture updated successfully");
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        alert("Failed to upload profile picture. Please try again.");
        // Revert to original image on error
        setProfileImage(user?.profilePic || "");
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  const handleEditIconClick = () => {
    setShowImageUploadModal(true);
  };

  const handleCameraCapture = () => {
    document.getElementById("cameraInput").click();
  };

  const handleFileUpload = () => {
    document.getElementById("fileInput").click();
  };

  const handleEmailVerify = () => {
    setShowEmailOtp(true);
    // TODO: Send OTP to email
  };

  return (
    <>
      <MobileCommonHeaderthree title="Edit Profile" />
      <section className={styles.container}>
        <div className={styles.left}>
          <div className={styles.avatarWrapper}>
            <div className={styles.profile}>
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="profile"
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.initialsAvatar}>
                  {getInitials(ProfileUpdate.name)}
                </div>
              )}
            </div>
            {isUploadingImage && (
              <div className={styles.uploadingOverlay}>
                <div className={styles.uploadingSpinner}></div>
              </div>
            )}
            <div className={styles.editIcon} onClick={handleEditIconClick}>
              <FiEdit2 size={16} />
            </div>
            <input
              type="file"
              id="cameraInput"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>

          {/* Image Upload Modal */}
          {showImageUploadModal && (
            <div
              className={styles.modalOverlay}
              onClick={() => setShowImageUploadModal(false)}
            >
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.modalCloseButton}
                  onClick={() => setShowImageUploadModal(false)}
                >
                  <img
                    src={newCloseBtn}
                    alt="close-button"
                    title="close"
                    className="nav-icons"
                  />
                </button>
                <h3 className={styles.modalTitle}>Upload Profile Picture</h3>
                <div className={styles.modalOptions}>
                  <button
                    className={styles.modalButton}
                    onClick={handleCameraCapture}
                  >
                    <img src={cameraIcon} alt="camera" className="nav-icons" />
                    Take Photo
                  </button>
                  <button
                    className={styles.modalButton}
                    onClick={handleFileUpload}
                  >
                    <img src={folderIcon} alt="folder" className="nav-icons" />
                    Choose from Device
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Full Name */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">
              Full Name
            </label>
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
            <label className={styles.label} htmlFor="phone">
              Phone Number
            </label>
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
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Email Address
            </label>
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
                <span className={styles.verify} onClick={handleEmailVerify}>
                  Verify
                </span>
              )}
            </div>
          </div>

          {/* Email OTP Field */}
          {showEmailOtp && (
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="emailOtp">
                Enter OTP
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  id="emailOtp"
                  name="emailOtp"
                  placeholder="Enter 6-digit OTP"
                  value={emailOtp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setEmailOtp(value);
                    if (verificationStatus === "error") {
                      setVerificationStatus(null);
                    }
                  }}
                  className={styles.input}
                  maxLength={6}
                />
                {isVerifying && <div className={styles.loader}></div>}
                {!isVerifying && verificationStatus === "success" && (
                  <FaCheckCircle className={styles.successIcon} />
                )}
                {!isVerifying && verificationStatus === "error" && (
                  <FaTimes className={styles.errorIcon} />
                )}
              </div>
            </div>
          )}

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
