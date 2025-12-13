import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./HomeBlogSlider.module.css";
// Importing data from the same source as BlogsPage
import blogsData from "../../Pages/block-content.json";

const HomeBlogSlider = () => {
    const navigate = useNavigate();
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

    const handleBlogClick = (id) => {
        navigate(`/blog-details/${id}`);
    };

    const getImageUrl = (name) => {
        try {
            // Adjust path to be relative to this file: 
            // src/BuyComponent/Cards -> ../../assets/images/blog
            return new URL(`../../assets/images/blog/${name}`, import.meta.url).href;
        } catch (e) {
            console.error("Error loading image:", name, e);
            return "";
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Our Blogs</h2>
                    <div className={styles.navigation}>
                        <button
                            onClick={() => scroll("left")}
                            className={styles.arrowLeft}
                            aria-label="Scroll left"
                        >
                            <IoIosArrowBack size={20} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className={styles.arrowRight}
                            aria-label="Scroll right"
                        >
                            <IoIosArrowForward size={20} />
                        </button>
                    </div>
                </div>

                <div ref={scrollRef} className={styles.blogList}>
                    {blogsData.map((blogItem) => (
                        <div
                            key={blogItem._id}
                            className={styles.blogCard}
                            onClick={() => handleBlogClick(blogItem._id)}
                        >
                            <img
                                src={getImageUrl(blogItem.img)}
                                alt={blogItem.title}
                                className={styles.blogImage}
                            />
                            <div className={styles.blogContent}>
                                <h3 className={styles.blogTitle}>{blogItem.title}</h3>
                                <p className={styles.blogMeta}>
                                    By Quick Mobile • {blogItem.date}
                                </p>
                                <p className={styles.blogDescription}>
                                    {blogItem.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeBlogSlider;
