import { useContext, useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import RightCard from "./RightCard";
import { toast } from "react-toastify";
import { UserContext } from "../../../../Context/contextAPI";
import api from "../../../../Utils/api";
import BreadCrumb from "../../../../components/layout/BreadCrumb/BreadCrumb";
import MobileCommonHeaderthree from "../../../../Components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import { FaPlus } from "react-icons/fa";
import trash from "../../../../assets/flaticons/trash-basecolor.png";
import edit from "../../../../assets/flaticons/pen-basecolor.png";
import AddressModal from "../AddressModal/AddressModal";

function CheckOut() {
  const [address, setAddress] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const { selectedAddress, setSelectedAddress } = useContext(UserContext);

  // Fetch existing addresses
  const fetchAddress = async () => {
    try {
      const resp = await api.get("/sell-module/user/address");
      setAddress(resp?.data.data?.addresses || []);
    } catch (error) {
      console.error("Error fetching address:", error);
      toast.error("Error fetching address");
    }
  };

  // Handle edit address
  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  // Handle delete address
  const handleDelete = async (address) => {
    if (confirm("Are you sure you want to delete this address?")) {
      try {
        const addressId = address._id || address.id;
        await api.delete(`/sell-module/user/address/${addressId}`);
        toast.success("Address deleted successfully");
        fetchAddress();
      } catch (error) {
        console.error("Error deleting address:", error);
        toast.error("Error deleting address");
      }
    }
  };

  // Handle add new address
  const handleAddNew = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  // Handle successful address save
  const handleAddressSuccess = () => {
    fetchAddress();
  };

  useEffect(() => {
    fetchAddress();
    // Clear any previously selected address when component mounts
    console.log("Clearing selectedAddress on mount");
    setSelectedAddress(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debug: Log selectedAddress changes
  useEffect(() => {
    console.log("selectedAddress changed:", selectedAddress);
  }, [selectedAddress]);

  return (
    <>
      <BreadCrumb items={["Home", "Sell Your Phone"]} />
      <MobileCommonHeaderthree title="Checkout" />
      <section className={`${styles.CheckOutSection} mobile-pt-section `}>
        <div className={styles.Wrapper}>
          <div className={styles.LeftContainer}>
            <div className={styles.addressBoxes}>
              <button className={styles.addBtn} onClick={handleAddNew}>
                <FaPlus /> Add New Address
              </button>
              <div className={styles.addressList}>
                {address?.length > 0 ? (
                  <>
                    {address.map((item, index) => (
                      <div
                        key={item._id || item.id || index}
                        className={`${styles.addressCard} ${
                          selectedAddress !== null &&
                          (selectedAddress?.id === item.id ||
                            selectedAddress?._id === item._id)
                            ? styles.selectedCard
                            : ""
                        }`}
                      >
                        <label className={styles.addressLabel}>
                          <input
                            type="radio"
                            name="address"
                            className={styles.radioInput}
                            onChange={() => setSelectedAddress(item)}
                            checked={
                              selectedAddress !== null &&
                              (selectedAddress?.id === item.id ||
                                selectedAddress?._id === item._id)
                            }
                          />
                          <span className={styles.customRadio}></span>
                          <div className={styles.addressContent}>
                            <span className={styles.saveTag}>
                              {item?.saveAs}
                            </span>
                            <p>
                              {item?.houseNumber}, {item?.street},
                              {item?.landmark}
                            </p>
                            <p>
                              {item?.cityName}, {item?.state} - {item?.zipCode}
                            </p>
                          </div>
                        </label>
                        <div className={styles.addressActions}>
                          <button
                            className={styles.editIconBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(item);
                            }}
                          >
                            <img src={edit} alt="edit" />
                          </button>
                          <button
                            className={styles.deleteIconBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item);
                            }}
                          >
                            <img src={trash} alt="trash" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>No address found</p>
                )}
              </div>
            </div>
          </div>

          <RightCard />
        </div>
      </section>

      {/* Address Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        editingAddress={editingAddress}
        onSuccess={handleAddressSuccess}
      />
    </>
  );
}

export default CheckOut;
