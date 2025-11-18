import { useRef } from "react";
import gadget from "../../assets/images/Products/iphone.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./BuyPhone.module.css";

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
    image: gadget,
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
    image: gadget,
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
    image: gadget,
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
    image: gadget,
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
    image: gadget,
  },
  {
    id: 6,
    title: "Apple iPhone 16 Pro Max",
    storage: "64 GB",
    color: "Black",
    price: 39999,
    originalPrice: 49999,
    discount: "20% OFF",
    reviews: "2,456",
    rating: 5.0,
    emi: "3,999/Month",
    image: gadget,
  },
];

const BuyPhone = () => {
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
          <h2 className={styles.heading}>Buy Refurbished Phone</h2>
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
              <div className={styles.imageWrapper}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.image}
                />
                <span className={styles.saleBadge}>On Sale</span>
              </div>
              <h3 className={styles.title}>{product.title}</h3>
              <p className={styles.details}>
                {product.storage} - {product.color}
              </p>
              <div className={styles.ratingRow}>
                {"★".repeat(5)}
                <span className={styles.reviews}>
                  {product.rating} ({product.reviews} Reviews)
                </span>
              </div>
              <div className={styles.priceRow}>
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

export default BuyPhone;
