import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./BlogDetail.module.css";
import MobileCommonHeaderthree from "../components/layout/MobileCommonHeader/MobileCommonHeaderthree";
import blogsData from "./block-content.json";

const BlogDetail = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const getImageUrl = (name) => {
    return new URL(`../assets/images/blog/${name}`, import.meta.url).href;
  };

  useEffect(() => {
    // Find blog by _id
    const foundBlog = blogsData.find((b) => b._id === blogId);
    setBlog(foundBlog);
    setLoading(false);
  }, [blogId]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <>
        <MobileCommonHeaderthree title="Blog" />
        <div className={styles.errorContainer}>
          <h2>Blog not found</h2>
          <p>The blog you're looking for doesn't exist.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <MobileCommonHeaderthree title="Blog" />

      <div className={styles.blogDetailContainer}>
        {/* Blog Header */}
        <div className={styles.blogHeader}>
          <h1 className={styles.blogTitle}>{blog.title}</h1>
          <img src={getImageUrl(blog.img)} alt={blog.title} className={styles.blogImage} />
        </div>

        {/* Blog Content */}
        <div className={styles.blogContent}>
          {blog["content-details"] &&
            blog["content-details"].map((item, index) => (
              <div key={index} className={styles.contentItem}>
                {/* Render Headers */}
                {item.header && (
                  Array.isArray(item.header) ? (
                    item.header.map((h, i) => (
                      <h4 key={`h-${i}`} className={styles.contentHeader}>{h}</h4>
                    ))
                  ) : (
                    <h4 className={styles.contentHeader}>{item.header}</h4>
                  )
                )}

                {/* Render Content Paragraphs */}
                {item.content && (
                  Array.isArray(item.content) ? (
                    item.content.map((c, i) => (
                      <p key={`c-${i}`} className={styles.contentText}>{c}</p>
                    ))
                  ) : (
                    <p className={styles.contentText}>{item.content}</p>
                  )
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
