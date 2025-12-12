import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BlogsPage.module.css";
import MobileCommonHeaderthree from "../Components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import blog from "../assets/images/store_img.jpg";
import blogsData from "./block-content.json";

const BlogsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Design",
    "Technology",
    "Web Development",
    "UX Design",
  ];

  const handleBlogClick = (id) => {
    navigate(`/blog-details/${id}`);
  };

  const filteredBlogs =
    selectedCategory === "All"
      ? blogsData
      : blogsData.filter((blog) => blog.category === selectedCategory);

  return (
    <>
      <MobileCommonHeaderthree title="Blogs" />

      <div className={styles.blogsPageContainer}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <h1 className={styles.pageTitle}>Our Blogs</h1>
        </div>

        {/* Blogs Grid */}
        <div className={styles.blogsGrid}>
          {filteredBlogs.map((blogItem) => (
            <div
              key={blogItem._id}
              className={styles.blogCard}
              onClick={() => handleBlogClick(blogItem._id)}
            >
              <img
                src={blog}
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
    </>
  );
};

export default BlogsPage;
