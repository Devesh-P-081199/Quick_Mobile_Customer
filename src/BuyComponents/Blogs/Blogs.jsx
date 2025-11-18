const Blogs = () => {
  return (
    <section className="blogs-section homepage-section">
      <div className="blogs-container">
        <div className="blogs-header">
          <h1 className="blogs-title">Blogs</h1>
          <p className="blogs-subtitle">Refurbished tech helps the planet</p>
        </div>

        <div className="blogs-grid">
          {/* Blog Card 1 */}
          <div className="blog-card bg-green">
            <div className="blog-card-overlay">
              <p className="blog-overlay-text">
                We’ve prevented <br />{" "}
                <a href="" className="text-[#EBFFCB]">
                  {" "}
                  1 million tons
                </a>{" "}
                of carbon emissions.
              </p>
            </div>
            <div className="blog-content">
              <h2 className="blog-title">Reduction in E-Waste</h2>
              <p className="blog-description">
                Prevent approximately 70-80% of the e-waste generated from
                manufacturing and disposing of a new device.
              </p>
              <span className="see-more">See more</span>
            </div>
          </div>

          {/* Blog Card 2 */}
          <div className="blog-card bg-purple">
            <div className="blog-card-overlay">
              <p className="blog-overlay-text">
                The environmental impact of{" "}
                <a href="" className="text-[#D2CBFF]">
                  {" "}
                  refurbished tech{" "}
                </a>
              </p>
            </div>
            <div className="blog-content">
              <h2 className="blog-title">Reduction in E-Waste</h2>
              <p className="blog-description">
                Prevent approximately 70-80% of the e-waste generated from
                manufacturing and disposing of a new device.
              </p>
              <span className="see-more">See more</span>
            </div>
          </div>

          {/* Blog Card 3 */}
          <div className="blog-card bg-orange">
            <div className="blog-card-overlay">
              <p className="blog-overlay-text">
                <a href="" className="text-[#FFEACB]">
                  {" "}
                  Refurbished{" "}
                </a>
                is better than Used.
              </p>
            </div>
            <div className="blog-content">
              <h2 className="blog-title">Reduction in E-Waste</h2>
              <p className="blog-description">
                Prevent approximately 70-80% of the e-waste generated from
                manufacturing and disposing of a new device.
              </p>
              <span className="see-more">See more</span>
            </div>
          </div>

          {/* Blog Card 4 */}
          <div className="blog-card bg-blue">
            <div className="blog-card-overlay">
              <p className="blog-overlay-text">
                How buying Refurbished tech{" "}
                <a href="" className="text-[#CBDDFF]">
                  helps the planet.{" "}
                </a>
              </p>
            </div>
            <div className="blog-content">
              <h2 className="blog-title">Reduction in E-Waste</h2>
              <p className="blog-description">
                Prevent approximately 70-80% of the e-waste generated from
                manufacturing and disposing of a new device.
              </p>
              <span className="see-more">See more</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
