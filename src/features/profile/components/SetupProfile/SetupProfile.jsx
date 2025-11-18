import React, { useContext, useEffect, useState } from "react";
import styles from "./SetupProfile.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import api from "../../../Utils/api";
// import { UserContext } from "../../../Context/contextAPI";
import axios from "axios";
import api from "../../../../Utils/api";
import { UserContext } from "../../../../Context/contextAPI";

const SetupProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const [profilePic, setProfilePic] = useState(null); // Image file state
  const [previewUrl, setPreviewUrl] = useState(""); // Image preview state
  const [profilePicUrl, setProfilePicUrl] = useState(""); // Fetched image URL state

  const navigate = useNavigate();
  // const location = useLocation();
  const fromPage = location.state?.from || "/";

  // Fetching existing data (including profile picture URL)
  const fetchExisitngData = async () => {
    try {
      const existingUser = await api.get(
        "/sell-module/user/fetch-one-customer"
      );
      // console.log("Existing user", existingUser.data);

      if (existingUser.data) {
        setName(existingUser?.data?.user?.name);
        setEmail(existingUser?.data?.user?.email);
        if (existingUser?.data?.user?.profilePic) {
          setProfilePicUrl(existingUser?.data?.user?.profilePic);
          setPreviewUrl(existingUser?.data?.user?.profilePic); // Set preview if already uploaded
        }
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchExisitngData();
  }, []);

  // Handle Image Upload
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/file/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // console.log('Image URL:', res.data);

      return res.data.location; // Return the uploaded image URL
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  // Handle form submit
  const formSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !email) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      // Check if a new profile picture is selected
      let finalProfilePicUrl = profilePicUrl;

      if (profilePic) {
        // Upload the new image and get the new URL
        finalProfilePicUrl = await handleImageUpload(profilePic);
      }

      // Send the data to the API
      const response = await api.put("/sell-module/user/set-password", {
        name,
        email,
        password,
        profilePic: finalProfilePicUrl, // Send the profile picture URL
      });

      // console.log("Profile setup success", response.data);

      setUser(response?.data?.payload);
      toast.success("Profile setup successfully");
      navigate(fromPage);
    } catch (err) {
      console.error("Error occurred", err);
      toast.error("Error setting up profile");
    }
  };

  return (
    <div>
      <div className={styles.signUpWrapper}>
        {/* <div className={styles.leftPanel}>
        <div className={styles.leftHeader}>
          <h1 className={styles.brand}>
            Quick <span className="color-orange">Mobile </span>{" "}
          </h1>
          <h2 className={styles.tagline}>Setup Your Profile</h2>
          <p className={styles.subtext}>
            Complete these easy steps to set up your profile.
          </p>
        </div>
        <div className={styles.leftButtons}>
          <button className={styles.secondaryBtn}>1. Signup your account </button>
          <button className={styles.primaryBtn}>Setup your profile</button>
        </div>
      </div> */}

        <div className={styles.formCard}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Setup Profile</h2>
              <p className={styles.formSubtitle}>
                Enter your personal details to complete your profile setup.
              </p>
            </div>

            {/* Name Input */}
            <div className={styles.inputGroup}>
              <div className={styles.inputRow}>
                <div className={styles.inputContent}>
                  <label htmlFor="name" className={styles.label}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.inputField}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div className={styles.inputGroup}>
              <div className={styles.inputRow}>
                <div className={styles.inputContent}>
                  <label htmlFor="email" className={styles.label}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputField}
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
            </div>

            {/* Password Input */}
            {/* <div className={styles.inputGroup}>
            <div className={styles.inputRow}>
              <div className={styles.inputContent}>
                <label htmlFor="password" className={styles.label}>
                  Enter Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.inputField}
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div> */}

            {/* Confirm Password Input */}
            {/* <div className={styles.inputGroup}>
            <div className={styles.inputRow}>
              <div className={styles.inputContent}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.inputField}
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          </div> */}

            {/* Profile Picture Input */}
            <div className={styles.inputGroup}>
              <div className={styles.inputRow}>
                <div className={styles.inputContent}>
                  <label htmlFor="profilePic" className={styles.label}>
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    id="profilePic"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProfilePic(file);
                        setPreviewUrl(URL.createObjectURL(file)); // Show preview
                      }
                    }}
                    className="border-gray-300 rounded p-2 mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Profile Preview */}
            {previewUrl && (
              <div className="mt-4 flex justify-center">
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  title="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 shadow-md"
                />
              </div>
            )}

            <button className={styles.submitBtn} onClick={formSubmit}>
              Setup Profile
            </button>

            <p className={styles.loginLink}>
              Already have an account?
              <NavLink to="/login" className={styles.loginLink}>
                Log in
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupProfile;
