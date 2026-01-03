import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "./Checkout.module.css";
import RightCard from "./RightCard";
import { toast } from "react-toastify";
import { UserContext } from "../../../../Context/contextAPI";
import api from "../../../../Utils/api";
import BreadCrumb from "../../../common/components/layout/BreadCrumb/BreadCrumb";
import MobileCommonHeaderthree from "../../../common/components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import { FaPlus } from "react-icons/fa";
import trash from "../../../../assets/flaticons/trash-basecolor.png";
import edit from "../../../../assets/flaticons/pen-basecolor.png";

function CheckOut() {
  const location = useLocation();
  const [address, setAddress] = useState([]);
  const navigate = useNavigate();
  const { slug } = useParams();

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
    const addressId = address._id || address.id;
    navigate(`/${slug}/check-out/edit-address/${addressId}`, {
      state: { address, returnPath: location.pathname },
    });
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
    navigate(`/${slug}/check-out/add-address`, {
      state: { returnPath: location.pathname },
    });
  };

  // Handle back navigation - preserve query params for Step6
  const handleBack = () => {
    const queryParams = new URLSearchParams(location.search).toString();
    const targetUrl = queryParams
      ? `/${slug}/price-summary?${queryParams}`
      : `/${slug}/price-summary`;
    navigate(targetUrl, { replace: true });
  };

  useEffect(() => {
    // Check if addresses were passed from Step6 via navigation state
    if (location.state?.addresses && location.state.addresses.length > 0) {
      const sortedAddresses = sortAddressesBySelected(location.state.addresses);
      setAddress(sortedAddresses);
    } else {
      fetchAddress();
    }
    // Don't clear selectedAddress - keep the one from Step6
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sort addresses to show selected one on top
  const sortAddressesBySelected = (addresses) => {
    if (!selectedAddress) {
      return addresses;
    }

    const selectedId = selectedAddress._id || selectedAddress.id;

    const sorted = [...addresses].sort((a, b) => {
      const aId = a._id || a.id;
      const bId = b._id || b.id;
      if (aId === selectedId) return -1;
      if (bId === selectedId) return 1;
      return 0;
    });

    return sorted;
  };

  return (
    <>
      <BreadCrumb items={["Home", "Sell Your Phone"]} />
      <MobileCommonHeaderthree title="Address" onBack={handleBack} />
      <section className={`${styles.CheckOutSection} mobile-pt-section `}>
        <div className={styles.Wrapper}>
          <div className={styles.LeftContainer}>
            <div className={styles.addressBoxes}>
              <button className={styles.addBtn} onClick={handleAddNew}>
                <FaPlus /> Add New Address
              </button>
              <div className={styles.addressList}>
                {address?.length > 0 ? (
                  address.map((item, index) => {
                    const itemId = item._id || item.id;
                    const selectedId =
                      selectedAddress?._id || selectedAddress?.id;
                    const isSelected =
                      selectedAddress !== null && itemId === selectedId;

                    return (
                      <div
                        key={itemId || index}
                        className={`${styles.addressCard} ${
                          isSelected ? styles.selectedCard : ""
                        }`}
                      >
                        <label className={styles.addressLabel}>
                          <input
                            type="radio"
                            name="address"
                            className={styles.radioInput}
                            onChange={() => {
                              setSelectedAddress(item);
                            }}
                            checked={isSelected}
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
                            <p>{item?.alternatePhone}</p>
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
                    );
                  })
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>

          <RightCard />
        </div>
      </section>
    </>
  );
}

export default CheckOut;
