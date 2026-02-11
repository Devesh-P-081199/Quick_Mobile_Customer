import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./Testimonials.module.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rohit Mehra",
      date: "Delhi",
      rating: 5.00,
      model: "Sold Oneplus Nord 5",
      review:
        "I had a OnePlus phone with me and I did not want to deal with the hassle of selling it. I saw QuickMobile and I instantly got a quote. They picked up my device the next day and I received the payment right away.",
      image: "",
    },
    {
      id: 2,
      name: "Neha Joshi",
      date: "Pune",
      rating: 5.00,
      model: "Sold Xiaomi Mi 11x",
      review:
        "I was on a time crunch and they scheduled a pickup for the morning just how I wanted. The agent arrived and checked my phone. I got the cash right on the spot. I really loved the simple and quick transaction process.",
      image: "",
    },
    {
      id: 3,
      name: "Amit Verma",
      date: "Bengaluru",
      rating: 5.00,
      model: "Sold Apple iPhone 12",
      review:
        "I was worried that my photos and files would get leaked or there would be data security threat. QuickMobile did a complete data wipe and all my past data was securely transferred. I would recommend it for a secure and fast process.",
      image: "",
    },
    {
      id: 4,
      name: "Rishikesh Patil",
      date: "Mumbai",
      rating: 5.00,
      model: "Sold Apple iPhone 14",
      review:
        "Great experience, no complaints. Selling my phone was fast and stress-free.",
      image: "",
    },
    {
      id: 5,
      name: "Abhi Gupta",
      date: "NaviMumbai",
      rating: 5.00,
      model: "Sold samsung note 20 ultra",
      review:
        "Feel process Quick and easy, as their name” The payment was processed instantly, and the entire experience was smooth and fast. Highly recommend!",
      image: "",
    },
  ];

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

  // helper function to get initials
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    return parts
      .map((p) => p[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div>
      <div className={(styles.container, styles.testimonialWrapper)}>
        <div className={styles.headerSection}>
          <h2 className={styles.heading}>Testimonials</h2>
          <div className={styles.navButtons}>
            <button
              onClick={() => scroll("left")}
              className={styles.arrowBtnLight}
            >
              <IoIosArrowBack size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className={styles.arrowBtnDark}
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className={styles.cardContainer}>
          {testimonials.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.profileSection}>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarFallback}>
                    <p>{getInitials(item.name)}</p>
                  </div>
                )}

                <div className={styles.userDetails}>
                  <h3 className={styles.name}>{item.name}, {item.date}</h3>
                  <p className={styles.date}>{item.model}</p>
                  <p className={styles.rating}>
                    {"✦".repeat(5)}
                    <span className={styles.ratingValue}>
                      {item.rating.toFixed(1)}
                    </span>
                  </p>
                </div>
              </div>
              <p className={styles.review}>{item.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
