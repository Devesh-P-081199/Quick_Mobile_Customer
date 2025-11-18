import { useRef } from "react";
import laptop from "../../assets1/images/Products/laptop.png";
import tablet from "../../assets1/images/Products/tablet.png";
import watch from "../../assets1/images/Products/mobile.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./BuyDevices.module.css";

const products = [
  {
    id: 1,
    title: "Apple iPhone 16 Pro Max",
    storage: "64 GB",
    color: "Black",
    price: 39999,
    originalPrice: 49999,
    discount: "20% OFF",
    reviews: "2,456",
    rating: 5.0,
    emi: "3,999/Month",
    image: laptop,
  },
  {
    id: 2,
    title: "Apple iPhone 16 Pro Max",
    storage: "64 GB",
    color: "Black",
    price: 39999,
    originalPrice: 49999,
    discount: "20% OFF",
    reviews: "2,456",
    rating: 5.0,
    emi: "3,999/Month",
    image: tablet,
  },
  {
    id: 3,
    title: "Apple iPhone 16 Pro Max",
    storage: "64 GB",
    color: "Black",
    price: 39999,
    originalPrice: 49999,
    discount: "20% OFF",
    reviews: "2,456",
    rating: 5.0,
    emi: "3,999/Month",
    image: watch,
  },
  {
    id: 4,
    title: "Apple iPhone 16 Pro Max",
    storage: "64 GB",
    color: "Black",
    price: 39999,
    originalPrice: 49999,
    discount: "20% OFF",
    reviews: "2,456",
    rating: 5.0,
    emi: "3,999/Month",
    image: laptop,
  },
  {
    id: 5,
    title: "Apple iPhone 16 Pro Max",
    storage: "64 GB",
    color: "Black",
    price: 39999,
    originalPrice: 49999,
    discount: "20% OFF",
    reviews: "2,456",
    rating: 5.0,
    emi: "3,999/Month",
    image: tablet,
  },
];

const BuyDevices = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 300;
      direction === "left"
        ? current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
        : current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Buy Refurbished Devices</h2>
          <div className={styles.navButtons}>
            <button onClick={() => scroll("left")} className={styles.leftArrow}>
              <IoIosArrowBack size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className={styles.rightArrow}
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
        <div ref={scrollRef} className={styles.productList}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.image}
                />
                <span className={styles.saleBadge}>On Sale</span>
              </div>
              <h3 className={styles.title}>{product.title}</h3>
              <p className={styles.subtext}>
                {product.storage} - {product.color}
              </p>
              <div className={styles.rating}>
                {"★".repeat(5)}
                <span className={styles.reviews}>
                  {product.rating} ({product.reviews} Reviews)
                </span>
              </div>
              <div className={styles.priceSection}>
                <span className={styles.price}>
                  ₹ {product.price.toLocaleString()}
                </span>
                <span className={styles.originalPrice}>
                  ₹ {product.originalPrice.toLocaleString()}
                </span>
                <span className={styles.discount}>{product.discount}</span>
              </div>
              <div className={styles.emi}>₹ {product.emi} EMI Available</div>
              <div className={styles.delivery}>
                <span>• Free Delivery</span>
                <span>• COD Available</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyDevices;
