import React, { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import blog from "../../assets/QuickSellNewIcons/ty-mobile.png";
import styles from "./Blogs.module.css";

const Blogs = () => {
  const blogs = [
    {
      image: blog,
      title: "Designing for Impact: Trends That Matter",
      subtitle: "Designing • By writer name • 21st May 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      image: blog,
      title: "Designing for Impact: Trends That Matter",
      subtitle: "Designing • By writer name • 21st May 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      image: blog,
      title: "Designing for Impact: Trends That Matter",
      subtitle: "Designing • By writer name • 21st May 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      image: blog,
      title: "Designing for Impact: Trends That Matter",
      subtitle: "Designing • By writer name • 21st May 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      image: blog,
      title: "Designing for Impact: Trends That Matter",
      subtitle: "Designing • By writer name • 21st May 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
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

  return (
    <section>
      <div className={styles.blogsWrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>Blogs</h2>
          <div className={styles.navigation}>
            <button onClick={() => scroll("left")} className={styles.arrowLeft}>
              <IoIosArrowBack size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className={styles.arrowRight}
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
        <div ref={scrollRef} className={styles.blogList}>
          {blogs.map((blog, index) => (
            <div key={index} className={styles.blogCard}>
              <img
                src={blog.image}
                alt={blog.title}
                className={styles.blogImage}
              />
              <div className={styles.blogContent}>
                <h3 className={styles.blogTitle}>{blog.title}</h3>
                <p className={styles.blogSubtitle}>{blog.subtitle}</p>
                <p className={styles.blogDescription}>{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
