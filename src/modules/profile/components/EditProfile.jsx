import React, { useContext } from "react";
import ProfileCard from "./ProfileCard";
import { UserContext } from "../../../Context/contextAPI";
import api from "../../../Utils/api";
import MobileBackHeader from "../../components/layout/MobileCommonHeader/MobileBackHeader";
const EditProfile = () => {
  const [ProfileUpdate, setProfileUpdate] = React.useState({
    name: "",
    email: "",
  });
  const { setUser, user } = useContext(UserContext);
  const id = user.userId;

  const handleUpdateProfile = async () => {
    try {
      const resp = await api.put(`/sell-module/user/update-profile/${id}`, {
        ProfileUpdate,
      });
      // clear fields
      setProfileUpdate({
        name: "",
        email: "",
      });
      // update user context
      setUser((prev) => ({
        ...prev,
        name: ProfileUpdate.name,
        email: ProfileUpdate.email,
      }));
      // update cookies
      Cookies.set(
        "user",
        JSON.stringify({
          ...user,
          name: ProfileUpdate.name,
          email: ProfileUpdate.email,
        }),
        {
          expires: 2,
          sameSite: "strict",
        },
      );
      alert("Profile updated successfully");
    } catch (error) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileUpdate((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <MobileBackHeader title="Edit Profile" />
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 p-4">
          <div>
            <div>
              <h2>Edit My Profile</h2>
              <br />
              <div className="flex flex-col gap-4 m-auto items-center">
                <div>
                  <label htmlFor="name">Name</label>
                  <br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={ProfileUpdate.name}
                    placeholder="Enter your name"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <br />
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    name="email"
                    value={ProfileUpdate.email}
                    onChange={handleChange}
                  />
                </div>

                <button onClick={handleUpdateProfile}>Update Profile</button>
              </div>
            </div>
          </div>
          <div>
            <ProfileCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProfile;
