import React from "react";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* About Us Section */}
        <h2 className={styles.heading}>About Us</h2>
        <p className={styles.text}>
          Welcome to Quick Mobile, India’s most trusted and transparent platform
          for buying, selling, and repairing mobile phones. Established in 2017,
          Quick Mobile has grown into a reliable name in the re-commerce
          industry, providing seamless solutions for individuals looking to
          upgrade their devices or get the best value for their old smartphones.
        </p>
        {/* Mission & Vision */}
        <div className={styles.missionVision}>
          <div className={styles.cardBlue}>
            <h3 className={styles.cardTitle}>Our Mission</h3>
            <p className={styles.subtext}>
              <center>
                At Quick Mobile, our mission is to make the process of selling
                used phones, purchasing refurbished devices, and repairing
                smartphones simple, secure, and hassle-free. We strive to offer
                fair prices, instant payments, and reliable services, ensuring
                that our customers enjoy a seamless experience from start to
                finish.
              </center>
            </p>
          </div>
          <div className={styles.cardYellow}>
            <h3 className={styles.cardTitle}>Our Vision</h3>
            <p className={styles.subtext}>
              <center>
                We envision becoming the go-to platform for re-commerce in India
                by continuously delivering value, trust, and convenience to our
                customers. Our goal is to reduce e-waste and promote a
                sustainable future through device reuse and recycling.
              </center>
            </p>
          </div>
        </div>
        {/* Greener Planet */}
        <h2 className={styles.heading}>
          How We Contribute to a Greener Planet
        </h2>
        <div className={styles.grid}>
          <div className={styles.cardBlack}>
            <h4>Reducing E-Waste</h4>
            <p>
              By encouraging individuals to sell, buy, and repair their mobile
              devices instead of discarding them, we help reduce the amount of
              electronic waste that ends up in landfills. Every refurbished
              phone sold through Quick Mobile prevents one less device from
              contributing to hazardous e-waste.
            </p>
          </div>
          <div className={styles.cardBlack}>
            <h4>Promoting Reuse and Refurbishment</h4>
            <p>
              Refurbishing phones not only extends their lifespan but also
              conserves the raw materials and energy required to produce new
              devices. By giving used phones a second life, we reduce the demand
              for new smartphones, which in turn reduces the carbon footprint
              associated with manufacturing.
            </p>
          </div>
          <div className={styles.cardBlack}>
            <h4>Conserving Natural Resources</h4>
            <p>
              The production of smartphones involves extracting valuable
              minerals like cobalt, lithium, and gold. These resources are
              finite, and their extraction causes environmental degradation.
              Through refurbishment and resale, Quick Mobile helps reduce the
              need for resource-intensive mining and manufacturing processes.
            </p>
          </div>
          <div className={styles.cardBlack}>
            <h4>Reducing Carbon Footprint</h4>
            <p>
              Manufacturing a single smartphone generates around 55 kg of carbon
              dioxide emissions. By opting for a refurbished device, consumers
              can significantly cut down their carbon footprint. Quick Mobile
              promotes the adoption of refurbished phones, contributing to a
              more sustainable and eco-conscious consumer choice.
            </p>
          </div>
          <div className={styles.cardBlack}>
            <h4>Responsible Recycling of E-Waste</h4>
            <p>
              Devices that can no longer be refurbished or reused are
              responsibly recycled, ensuring that hazardous materials are safely
              disposed of and valuable components are extracted for reuse. Our
              recycling partners adhere to environmentally friendly practices
              that prevent harmful substances from contaminating the
              environment.
            </p>
          </div>
        </div>
        {/* Commitment */}
        <h2 className={styles.heading}>Our Commitment to Sustainability</h2>
        <p className={styles.btmtext}>
          At Quick Mobile, we recognize that sustainability is not just a
          responsibility but a necessity. Our efforts to promote circular
          economy principles in the mobile industry align with global
          sustainability goals. We aim to continue raising awareness about the
          importance of reducing e-waste and making conscious choices to protect
          our planet.
        </p>
        <p className={styles.btmtext}>
          <strong>Join Us in Making a Difference</strong>
          <br />
          By choosing to sell, buy, or repair your mobile devices with Quick
          Mobile, you are playing a vital role in reducing e-waste and
          conserving natural resources. Together, we can make technology more
          sustainable for future generations.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
