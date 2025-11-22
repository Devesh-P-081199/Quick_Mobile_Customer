import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import blog from "../../assets/QuickSellNewIcons/ty-mobile.png";
import styles from "./Blogs.module.css";

const Blogs = () => {
  const navigate = useNavigate();

  const blogs = [
    {
      id: "1",
      image: blog,
      title: "Designing for Impact: Trends That Matter",
      subtitle: "Designing • By writer name • 21st May 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      id: "2",
      image: blog,
      title: "The Future of Mobile Design",
      subtitle: "Technology • By writer name • 18th May 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      id: "3",
      image: blog,
      title: "Understanding User Psychology",
      subtitle: "UX Design • By writer name • 15th May 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      id: "4",
      image: blog,
      title: "Color Theory in Modern UI",
      subtitle: "Design • By writer name • 12th May 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      id: "5",
      image: blog,
      title: "Accessibility Best Practices",
      subtitle: "Web Development • By writer name • 9th May 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
  ];

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

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
          {blogs.map((blogItem) => (
            <div
              key={blogItem.id}
              className={styles.blogCard}
              onClick={() => handleBlogClick(blogItem.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={blogItem.image}
                alt={blogItem.title}
                className={styles.blogImage}
              />
              <div className={styles.blogContent}>
                <h3 className={styles.blogTitle}>{blogItem.title}</h3>
                <p className={styles.blogSubtitle}>{blogItem.subtitle}</p>
                <p className={styles.blogDescription}>{blogItem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
