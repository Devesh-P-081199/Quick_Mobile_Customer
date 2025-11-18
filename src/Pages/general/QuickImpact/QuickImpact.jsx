import React from "react";
import styles from "./QuickImpact.module.css";
import { PiLeafBold, PiTreeLight } from "react-icons/pi";
import { TbDroplet } from "react-icons/tb";
import { AiFillGolden } from "react-icons/ai";
import { RiCopperCoinFill } from "react-icons/ri";
import { LiaCarSideSolid } from "react-icons/lia";
import { IoHomeOutline } from "react-icons/io5";
import wasteImg from "../../../assets/E-Waste.png";
import resourcesImg from "../../../assets/Resources.png";
import economyImg from "../../../assets/Economy.png";
import emissionImg from "../../../assets/Emissions.png";

const QuickImpact = () => {
  return (
    <section className={styles.mainContainer}>
      <div className={styles.quickImpact}>
        <div className={styles.intro}>
          <h2>Quick Mobile Impact</h2>
          <h4>
            The Environmental Impact of Reusing and Refurbishing Phones, How
            Quick Mobile is Driving Sustainability
          </h4>
          <p>
            Every year, the world generates a staggering 50 million metric tons
            of electronic waste (e-waste), yet only 20% of it is properly
            recycled. Smartphones alone make up 12% of this waste, with millions
            of discarded devices ending up in landfills. Quick Mobile is
            tackling this growing problem by refurbishing and reselling used
            smartphones, reducing e-waste by 30-40% and keeping harmful
            materials out of our environment.
          </p>
        </div>
        <div className={styles.block}>
          <div className={styles.imageBox}>
            <img src={wasteImg} alt="E-Waste" title="E-Waste" />
          </div>
          <div className={`${styles.textBox} && ${styles.textBox2}`}>
            <h3>♻ Reducing E-Waste</h3>
            <p>
              E-waste contains toxic substances like lead, mercury, and cadmium,
              which can seep into the soil and water, harming ecosystems and
              human health. By giving used smartphones a second life, Quick
              Mobile helps prevent these hazardous materials from becoming
              environmental threats.
            </p>
          </div>
        </div>

        {/* Conserving Resources */}
        <div className={styles.blockReverse}>
          <div className={styles.textBox}>
            <h3>
              <PiLeafBold /> Conserving Natural Resources
            </h3>
            <p>
              Manufacturing a new smartphone requires around 34 kg of raw
              materials, including rare and valuable metals such as:
            </p>
            <div className={styles.metalCards}>
              <div className={styles.metalCard}>
                <span className={`${styles.icon} ${styles.gold}`}>
                  <AiFillGolden size={30} />
                </span>
                <p>Gold: 0.034g</p>
              </div>
              <div className={styles.metalCard}>
                <span className={`${styles.icon}`}>
                  <AiFillGolden size={30} />
                </span>
                <p>Silver: 0.31g</p>
              </div>
              <div className={styles.metalCard}>
                <span className={`${styles.icon} ${styles.copper}`}>
                  <RiCopperCoinFill size={30} />
                </span>
                <p>Copper: 15g</p>
              </div>
              <div className={styles.metalCard}>
                <span className={`${styles.icon}`}>
                  <AiFillGolden size={30} />
                </span>
                <p>Aluminum: 15g</p>
              </div>
            </div>
            <p>
              Mining these resources is an environmentally damaging process{" "}
              <br /> that depletes natural reserves and contaminates water
              sources. <br />
              Even more shocking, producing just one smartphone consumes 16,000
              liters of water—enough to sustain a <br />
              person for 10 years.
            </p>
            <p className={styles.highlight}>
              If 100 million people chose refurbished phones instead of new
              ones, we could:
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <TbDroplet size={50} /> Save 3.4 million tons of raw materials
                annually
              </div>
              <div className={styles.stat}>
                <TbDroplet size={50} /> Conserve 1.6 trillion liters of water,
                equivalent to a year’s supply for 20 million people
              </div>
            </div>
          </div>
          <div className={`${styles.imageBox} && ${styles.textBox2}`}>
            <img src={resourcesImg} alt="Resources" title="Resources" />
          </div>
        </div>
        <div className={styles.textBox}>
          <p>
            Through its refurbishment efforts, Quick Mobile is helping minimize
            unnecessary mining, preserve Earth’s limited resources, and
            significantly reduce water consumption.
          </p>
        </div>

        {/* Lowering Carbon Emissions */}
        <div className={styles.block}>
          <div className={styles.imageBox}>
            <img src={emissionImg} alt="Carbon Emissions" />
          </div>
          <div className={styles.textBox}>
            <h3>
              <PiLeafBold size={35} style={{ marginRight: "10px" }} />
              Lowering Carbon Emissions
            </h3>
            <p>
              A brand-new smartphone’s production generates 50 kg of CO₂
              emissions, contributing to the smartphone industry’s 4% share of
              global emissions—a figure that could double by 2030 if current
              trends continue.
            </p>
            <p>
              Refurbished phones, however, produce 80% less CO₂ than new ones.
              If 1 billion people switched to refurbished devices, the impact
              would be game-changing:
            </p>
          </div>
        </div>
        <div className={styles.box}>
          <p className={styles.highlight}>
            Prevent 50 million metric tons of CO₂ emissions each year
          </p>
          <p style={{ fontSize: "16px" }}>This is equivalent to:</p>
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <LiaCarSideSolid size={40} />
              Removing 10 million cars <br /> from the road for a year
            </div>
            <div className={styles.statCard}>
              <IoHomeOutline size={40} /> Powering 8 million homes
              <br /> with electricity for a year
            </div>
            <div className={styles.statCard}>
              <PiTreeLight size={40} /> Planting 2 billion trees to absorb
              <br /> the same amount of CO₂
            </div>
          </div>
          <div className={styles.textBox}>
            <p>
              By extending the lifespan of smartphones, Quick Mobile plays a
              vital role in reducing carbon emissions and fighting climate
              change.
            </p>
          </div>
        </div>

        {/* Circular Economy */}
        <div className={styles.blockReverse}>
          <div className={styles.textBox}>
            <h3>♻ Promoting a Circular Economy</h3>
            <p>
              Most smartphones are discarded after just 2-3 years, even though
              they can last much longer with proper care. Refurbishing extends a
              phone’s life by 3-5 additional years, cutting down the need for
              new production and reducing waste.
            </p>
            <p>
              A circular economy focuses on reusing and refurbishing products
              instead of constantly manufacturing new ones. Quick Mobile
              embraces this sustainable approach by keeping smartphones in
              circulation longer, reducing the environmental footprint of the
              mobile industry.
            </p>
          </div>
          <div className={styles.imageBox}>
            <img src={economyImg} alt="Circular Economy" />
          </div>
        </div>

        {/* Affordable & Sustainable */}
        <div className={styles.techblock}>
          <div className={styles.textBox}>
            <h3>♻ Making Technology Affordable & Sustainable</h3>
            <p>
              Most smartphones are discarded after just 2-3 years, even though
              they can last much longer with proper care. Refurbishing extends a
              phone’s life by 3-5 additional years, cutting down the need for
              new production and reducing waste.
            </p>
            <p>
              A circular economy focuses on reusing and refurbishing products
              instead of constantly manufacturing new ones. Quick Mobile
              embraces this sustainable approach by keeping smartphones in
              circulation longer, reducing the environmental footprint of the
              mobile industry.
            </p>
          </div>
          <div className={styles.imageBox}>
            <img src={economyImg} alt="Affordable & Sustainable" />
          </div>
        </div>
        {/*Table div */}
        <div className={styles.tableSection}>
          {/* Desktop/Tablet Table*/}
          <div className={styles.desktopTable}>
            <h2>Quick Mobile’s Environmental Impact in Numbers</h2>
            <table className={styles.impactTable}>
              <thead>
                <tr>
                  <th>Impact Area</th>
                  <th>Without Refurbishment</th>
                  <th>With Quick Mobile</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>E-waste produced</td>
                  <td>50 million metric tons/year</td>
                  <td>30–40% Reduction</td>
                </tr>
                {[...Array(8)].map((_, i) => (
                  <tr key={i}>
                    <td>CO₂ emissions per phone</td>
                    <td>50 kg</td>
                    <td>80% lower emissions</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Table*/}
          <div className={styles.mobileTable}>
            <h2>Quick Mobile vs Second hand phone</h2>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th>Benefits</th>
                  <th>Quick Mobile</th>
                  <th>Other Second Hand Phone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>25 Quality Check Points</td>
                  <td>✅</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td>Upto 12 Months Warranty</td>
                  <td>✅</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td>15 Days Refund</td>
                  <td>✅</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td>Phone as Brand New</td>
                  <td>✅</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td>Service Assured</td>
                  <td>✅</td>
                  <td>❌</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Conclusion */}
        <div className={styles.conclusion}>
          <h2>Conclusion</h2>
          <p>
            The increasing demand for new smartphones places immense pressure on
            our planet, contributing to rising e-waste, resource depletion, and
            carbon emissions. Choosing refurbished devices is a simple yet
            impactful way to reduce waste, conserve natural resources, and lower
            CO₂ emissions—all while saving money.
          </p>
          <p>
            Quick Mobile is leading the charge in sustainability, ensuring that
            used smartphones don’t end up as waste but instead get a second
            life. Through its efforts, Quick Mobile is helping to:
          </p>
          <ol>
            <li>Reduce global e-waste</li>
            <li>Save valuable raw materials and water</li>
            <li>Significantly cut carbon emissions</li>
            <li>Make sustainable technology accessible for everyone</li>
          </ol>
          <p>
            Switching to a refurbished phone isn’t just about saving money—it’s
            about making a real difference for the planet. Choose Quick Mobile
            today and be part of the solution!
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuickImpact;
