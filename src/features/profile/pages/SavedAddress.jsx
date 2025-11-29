import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SavedAddress.module.css";
import ProfileCard from "../components/ProfileCard";
import MobileCommonHeaderthree from "../../../Components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import { FaMapMarkerAlt, FaPlus, FaHome, FaBriefcase } from "react-icons/fa";
import api from "../../../Utils/api";
import { toast } from "react-toastify";
import trash from "../../../assets/flaticons/trash-basecolor.png";
import edit from "../../../assets/flaticons/pen-basecolor.png";

const SavedAddress = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);

  // Fetch addresses from API
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await api.get("/sell-module/user/address");
      setAddresses(response?.data?.data?.addresses || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Error fetching addresses");
    }
  };

  const handleAddNew = () => {
    navigate("/profile/saved-address/add-address");
  };

  const handleEdit = (address) => {
    const addressId = address._id || address.id;
    navigate(`/profile/saved-address/edit-address/${addressId}`, {
      state: { address },
    });
  };

  const handleDelete = async (address) => {
    if (confirm("Are you sure you want to delete this address?")) {
      try {
        const addressId = address._id || address.id;
        await api.delete(`/sell-module/user/address/${addressId}`);
        toast.success("Address deleted successfully");
        fetchAddresses();
      } catch (error) {
        console.error("Error deleting address:", error);
        toast.error("Error deleting address");
      }
    }
  };

  const getAddressIcon = (saveAs) => {
    switch (saveAs) {
      case "Home":
        return <FaHome />;
      case "Office":
      case "Work":
        return <FaBriefcase />;
      default:
        return <FaMapMarkerAlt />;
    }
  };

  return (
    <>
      <MobileCommonHeaderthree title="Saved Addresses" />
      <section className="zero-padding-section">
        <div className={styles.panelWrapper}>
          <div className={styles.left}>
            <div className={styles.header}>
              <button className={styles.addBtn} onClick={handleAddNew}>
                <FaPlus /> Add New Address
              </button>
            </div>

            <div className={styles.addressList}>
              {addresses.length > 0 ? (
                addresses.map((address, index) => (
                  <div
                    key={address._id || address.id || index}
                    className={styles.addressCard}
                  >
                    <div className={styles.addressDetails}>
                      <div className={styles.addressHeader}>
                        <span className={styles.addressType}>
                          {address.saveAs}
                        </span>
                      </div>
                      {address.alternatePhone && (
                        <div className={styles.addressPhone}>
                          {address.alternatePhone}
                        </div>
                      )}
                      <div className={styles.addressText}>
                        {address.houseNumber}, {address.street}
                        {address.landmark && `, ${address.landmark}`}
                      </div>
                      <div className={styles.addressText}>
                        {address.cityName}, {address.state} - {address.zipCode}
                      </div>
                    </div>
                    <div className={styles.addressActions}>
                      <button
                        className={styles.editIconBtn}
                        onClick={() => handleEdit(address)}
                      >
                        <img src={edit} alt="edit" />
                      </button>
                      <button
                        className={styles.deleteIconBtn}
                        onClick={() => handleDelete(address)}
                      >
                        <img src={trash} alt="trash" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <FaMapMarkerAlt className={styles.emptyIcon} />
                  <h3>No Saved Addresses</h3>
                  <p>Add an address to make checkout faster.</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.right}>
            <ProfileCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default SavedAddress;
