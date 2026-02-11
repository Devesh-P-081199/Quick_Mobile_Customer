import { useNavigate } from "react-router-dom";
import styles from "./StoresListPage.module.css";
import MobileBackHeader from "../../components/layout/MobileCommonHeader/MobileBackHeader";
import location from "../../../../assets/flaticons/location.png";
import time from "../../../../assets/flaticons/clock.png";
import storeImg from "../../../../assets/images/store_img.jpg";

// Sample stores data - replace with API call
const STORES_DATA = [
  {
    id: "store-1",
    name: "Quick Mobile - Thane",
    time: "9:00 AM - 6:00 PM",
    address:
      "Shop no. 09, St. John Baptist School Building, Opp. Jyoti Stores, Charai, Thane West - 400601",
    images: [storeImg],
  },
];

function StoresListPage() {
  const navigate = useNavigate();

  const handleStoreClick = (storeId) => {
    navigate(`/our-store/${storeId}`);
  };

  return (
    <>
      <MobileBackHeader title="Our Stores" />
      <div className={styles.storesListPage}>
        <div className="wrapper page-content-wrapper">
          <h1 className={styles.pageTitle}>Our Stores</h1>
          <p className={styles.pageDescription}>
            Visit our store for the best deals on refurbished phones, repairs,
            and accessories
          </p>

          <div className={styles.storesGrid}>
            {STORES_DATA.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onClick={() => handleStoreClick(store.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function StoreCard({ store, onClick }) {
  // const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  // const handleThumbnailClick = (e, index) => {
  //   e.stopPropagation(); // Prevent card click
  //   setCurrentImageIndex(index);
  // };

  return (
    <div className={styles.storeCard} onClick={onClick}>
      <div className={styles.imageSection}>
        <div className={styles.mainImage}>
          <img src={store.images[0]} alt={store.name} />
        </div>
      </div>

      <div className={styles.storeInfo}>
        <h3 className={styles.storeName}>{store.name}</h3>
        <div className={styles.address}>
          <img src={location} alt="" />
          <p>{store.address}</p>
        </div>
        <div className={styles.time}>
          <img src={time} alt="" />
          <p>{store.time}</p>
        </div>
        <button className={styles.viewDetailsBtn}>View Details</button>
      </div>
    </div>
  );
}

export default StoresListPage;
