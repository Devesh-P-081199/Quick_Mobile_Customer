// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BlogsPage.module.css";
import MobileBackHeader from "../../components/layout/MobileCommonHeader/MobileBackHeader";
import blogsData from "./block-content.json";
import { slugify } from "../../../../Utils/slugify";

const BlogsPage = () => {
  const navigate = useNavigate();
  // const [selectedCategory, setSelectedCategory] = useState("All");
  const selectedCategory = "All";

  // const categories = [
  //   "All",
  //   "Design",
  //   "Technology",
  //   "Web Development",
  //   "UX Design",
  //   "App Development",
  // ];

  const handleBlogClick = (title) => {
    navigate(`/blogs/${slugify(title)}`);
  };

  const getImageUrl = (name) => {
    return new URL(`../../../../assets/images/blog/${name}`, import.meta.url).href;
  };

  const filteredBlogs =
    selectedCategory === "All"
      ? blogsData
      : blogsData.filter((blog) => blog.category === selectedCategory);

  return (
    <>
      <MobileBackHeader title="Blogs" />

      <div className="page-content-wrapper">
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
              onClick={() => handleBlogClick(blogItem.title)}
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
                <p className={styles.blogDescription}>{blogItem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogsPage;
