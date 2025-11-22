import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./BlogDetail.module.css";
import api from "../Utils/api";
import MobileCommonHeaderthree from "../components/layout/MobileCommonHeader/MobileCommonHeaderthree";

const BlogDetail = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogDetail();
  }, [blogId]);

  const fetchBlogDetail = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API endpoint when ready
      // const response = await api.get(`/blogs/${blogId}`);
      // setBlog(response.data);

      // DUMMY DATA - Remove this when API is ready
      setTimeout(() => {
        const dummyBlog = {
          id: blogId,
          title: "Designing for Impact: Trends That Matter in 2025",
          author: "John Doe",
          category: "Technology",
          publishDate: "21st May 2025",
          readTime: "5 min read",
          featuredImage: "https://via.placeholder.com/1200x600",
          content: `
            <h2>Introduction</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            
            <h2>The Evolution of Design</h2>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            <img src="https://via.placeholder.com/800x400" alt="Design Evolution" />
            
            <h2>Key Trends to Watch</h2>
            <ul>
              <li><strong>Minimalism:</strong> Less is more in modern design approaches</li>
              <li><strong>Dark Mode:</strong> User preference for eye-friendly interfaces</li>
              <li><strong>Micro-interactions:</strong> Small animations that enhance UX</li>
              <li><strong>Accessibility:</strong> Designing for everyone, regardless of ability</li>
              <li><strong>Sustainability:</strong> Eco-conscious design decisions</li>
            </ul>
            
            <h2>Impact on User Experience</h2>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            
            <blockquote>
              "Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs
            </blockquote>
            
            <h2>Practical Applications</h2>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            
            <h3>Case Study: Mobile App Redesign</h3>
            <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            
            <h2>Conclusion</h2>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
            
            <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
          `,
          tags: ["Design", "UX", "Trends", "Technology", "Innovation"],
          relatedBlogs: [
            {
              id: "2",
              title: "The Future of Mobile Design",
              image: "https://via.placeholder.com/300x200",
              date: "18th May 2025",
            },
            {
              id: "3",
              title: "Understanding User Psychology",
              image: "https://via.placeholder.com/300x200",
              date: "15th May 2025",
            },
            {
              id: "4",
              title: "Color Theory in Modern UI",
              image: "https://via.placeholder.com/300x200",
              date: "12th May 2025",
            },
          ],
        };
        setBlog(dummyBlog);
        setLoading(false);
      }, 500); // Simulate API delay
    } catch (error) {
      console.error("Error fetching blog:", error);
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRelatedBlogClick = (relatedBlogId) => {
    navigate(`/blog/${relatedBlogId}`);
  };

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
      {/* Mobile Header with Back Button */}
      <MobileCommonHeaderthree title="Blog" />

      <div className={styles.blogDetailContainer}>
        {/* Featured Image */}
        <div className={styles.featuredImageContainer}>
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className={styles.featuredImage}
          />
        </div>

        {/* Blog Header */}
        <div className={styles.blogHeader}>
          <div className={styles.blogMeta}>
            <span className={styles.category}>{blog.category}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.author}>By {blog.author}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.date}>{blog.publishDate}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.readTime}>{blog.readTime}</span>
          </div>
          <h1 className={styles.blogTitle}>{blog.title}</h1>
        </div>

        {/* Blog Content */}
        <div
          className={styles.blogContent}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        <div className={styles.tagsContainer}>
          <h3>Tags:</h3>
          <div className={styles.tags}>
            {blog.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Blogs */}
        {blog.relatedBlogs && blog.relatedBlogs.length > 0 && (
          <div className={styles.relatedBlogsContainer}>
            <h2>Related Articles</h2>
            <div className={styles.relatedBlogsList}>
              {blog.relatedBlogs.map((relatedBlog) => (
                <div
                  key={relatedBlog.id}
                  className={styles.relatedBlogCard}
                  onClick={() => handleRelatedBlogClick(relatedBlog.id)}
                >
                  <img
                    src={relatedBlog.image}
                    alt={relatedBlog.title}
                    className={styles.relatedBlogImage}
                  />
                  <div className={styles.relatedBlogContent}>
                    <h3>{relatedBlog.title}</h3>
                    <p>{relatedBlog.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogDetail;
