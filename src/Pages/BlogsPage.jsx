import { useState } from "react";
import { useNavigate } from "react-router-dom";
import blog from "../assets/QuickSellNewIcons/ty-mobile.png";
import styles from "./BlogsPage.module.css";
import MobileCommonHeaderthree from "../components/layout/MobileCommonHeader/MobileCommonHeaderthree";

const BlogsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extended blog data - you can fetch this from API later
  const blogs = [
    {
      id: "1",
      image: blog,
      title: "Designing for Impact: Trends That Matter",
      category: "Design",
      author: "Writer Name",
      date: "21st May 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      id: "2",
      image: blog,
      title: "The Future of Mobile Design",
      category: "Technology",
      author: "Writer Name",
      date: "18th May 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      id: "3",
      image: blog,
      title: "Understanding User Psychology",
      category: "UX Design",
      author: "Writer Name",
      date: "15th May 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      id: "4",
      image: blog,
      title: "Color Theory in Modern UI",
      category: "Design",
      author: "Writer Name",
      date: "12th May 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      id: "5",
      image: blog,
      title: "Accessibility Best Practices",
      category: "Web Development",
      author: "Writer Name",
      date: "9th May 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      id: "6",
      image: blog,
      title: "Mobile App Performance Optimization",
      category: "Technology",
      author: "Writer Name",
      date: "6th May 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
  ];

  const categories = [
    "All",
    "Design",
    "Technology",
    "UX Design",
    "Web Development",
  ];

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <>
      {/* Mobile Header with Back Button */}
      <MobileCommonHeaderthree title="Blogs" />

      <div className={styles.blogsPageContainer}>
        <div className={styles.blogsPageWrapper}>
          {/* Header Section */}
          <div className={styles.headerSection}>
            <h1 className={styles.pageTitle}>Our Blogs</h1>
            <p className={styles.pageSubtitle}>
              Explore insights, tips, and stories from our team
            </p>
          </div>

          {/* Category Filter */}
          <div className={styles.categoryFilter}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryBtn} ${
                  selectedCategory === category ? styles.active : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blogs Grid */}
          <div className={styles.blogsGrid}>
            {filteredBlogs.map((blogItem) => (
              <div
                key={blogItem.id}
                className={styles.blogCard}
                onClick={() => handleBlogClick(blogItem.id)}
              >
                <img
                  src={blogItem.image}
                  alt={blogItem.title}
                  className={styles.blogImage}
                />
                <div className={styles.blogContent}>
                  <span className={styles.blogCategory}>
                    {blogItem.category}
                  </span>
                  <h3 className={styles.blogTitle}>{blogItem.title}</h3>
                  <p className={styles.blogMeta}>
                    By {blogItem.author} • {blogItem.date}
                  </p>
                  <p className={styles.blogDescription}>
                    {blogItem.description}
                  </p>
                  <button className={styles.readMoreBtn}>Read More →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsPage;
