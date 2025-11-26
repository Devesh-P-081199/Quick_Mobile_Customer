import React, { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import profile from "../../assets/images/icons/user.png";
import styles from "./Testimonials.module.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Willian Vangence",
      date: "Purchased on October 14, 2024",
      rating: 4.2,
      review:
        "I recently purchased an iPhone from QuickMobile, and I couldn't be happier with my experience! The website was easy to navigate, and the phone arrived quickly with free shipping.",
      image: "",
    },
    {
      id: 2,
      name: "Willian Vangence",
      date: "Purchased on October 14, 2024",
      rating: 4.2,
      review:
        "I recently purchased an iPhone from QuickMobile, and I couldn't be happier with my experience! The website was easy to navigate, and the phone arrived quickly with free shipping.",
      image: "",
    },
    {
      id: 3,
      name: "Willian Vangence",
      date: "Purchased on October 14, 2024",
      rating: 4.2,
      review:
        "I recently purchased an iPhone from QuickMobile, and I couldn't be happier with my experience! The website was easy to navigate, and the phone arrived quickly with free shipping.",
      image: "",
    },
    {
      id: 4,
      name: "Deepak Sharma",
      date: "Purchased on October 14, 2024",
      rating: 4.2,
      review:
        "I recently purchased an iPhone from QuickMobile, and I couldn't be happier with my experience! The website was easy to navigate, and the phone arrived quickly with free shipping.",
      image: "",
    },
    {
      id: 5,
      name: "Willian Vangence",
      date: "Purchased on October 14, 2024",
      rating: 4.2,
      review:
        "I recently purchased an iPhone from QuickMobile, and I couldn't be happier with my experience! The website was easy to navigate, and the phone arrived quickly with free shipping.",
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
    <section>
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
                  <h3 className={styles.name}>{item.name}</h3>
                  <p className={styles.date}>{item.date}</p>
                  <p className={styles.rating}>
                    {"☆".repeat(5)}
                    <span className={styles.ratingValue}>{item.rating}</span>
                  </p>
                </div>
              </div>
              <p className={styles.review}>{item.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
