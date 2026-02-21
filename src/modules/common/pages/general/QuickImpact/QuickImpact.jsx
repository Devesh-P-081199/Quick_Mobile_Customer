import styles from "./QuickImpact.module.css";
import { PiLeafBold, PiTreeLight } from "react-icons/pi";
import { TbDroplet } from "react-icons/tb";
import { AiFillGolden } from "react-icons/ai";
import { RiCopperCoinFill } from "react-icons/ri";
import { LiaCarSideSolid } from "react-icons/lia";
import { IoHomeOutline } from "react-icons/io5";
import wasteImg from "../../../../../assets/E-Waste.jpeg";
import resourcesImg from "../../../../../assets/Resources.png";
import economyImg from "../../../../../assets/Economy.png";
import technologyImg from "../../../../../assets/Technology.jpeg";
import emissionImg from "../../../../../assets/Emissions.jpeg";
import { Helmet } from "react-helmet-async";

const QuickImpact = () => {
  return (<>
    <Helmet>
      <title>Impact through Sustainable Use of Technology | Quick Mobile
      </title>
      <meta name="description" content="Innovation shouldn’t create waste. Quick Mobile exists to give second life of technology, reduce e-waste, and help people earn from the devices they no longer use.
" />
      <meta property="og:title" content="Impact through Sustainable Use of Technology | Quick Mobile" />
      <meta property="og:description" content="Innovation shouldn't create waste. Quick Mobile exists to give second life of technology, reduce e-waste, and help people earn from the devices they no longer use." />
    </Helmet>
    <div className="page-content-wrapper">
      <div className={styles.quickImpact}>
        <div className={styles.intro}>
          <h1> Quick Mobile Mission to saves the environment by refurbishing and reusing phones.


          </h1>
          <h4>
            Quick Mobile Mission to saves the environment by refurbishing and reusing phones.

          </h4>
          <p>
            Only 20% of the world's e-waste, which amounts to over 50 million metric tons annually, Smartphones make up 12% of all trash, and millions of old phones/device wind up in landfills. Quick Mobile wants to solve this problem by fixing up and selling secondhand smartphones. This method keeps dangerous chemicals out of our environment and reduces e-waste by 30–40%.

          </p>
        </div>
        <div className={styles.block}>
          <div className={styles.imageBox}>
            <img src={wasteImg} alt="E-Waste" title="E-Waste" />
          </div>
          <div className={`${styles.textBox} && ${styles.textBox2}`}>
            <h3>Reducing E-Waste</h3>
            <p>
              Lead, mercury, and cadmium are some of the dangerous compounds found in e-waste. These pollutants can get into the ground and water, which can harm ecosystems and people's health. Quick Mobile provides new life to old gadgets. This procedure keeps these hazardous materials from hurting the environment.

            </p>
          </div>
        </div>

        {/* Conserving Resources */}
        <div className={styles.blockReverse}>
          <div className={styles.textBox}>
            <h3>Conserving Natural Resources</h3>
            <p>
              Lead, mercury, and cadmium are some of the dangerous compounds found in e-waste. These pollutants can get into the ground and water, which can harm ecosystems and people's health. Quick Mobile provides new life to old gadgets. This procedure keeps these hazardous materials from hurting the environment.
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
              Mining these minerals harms the environment by using up natural resources and contaminating water systems. It takes more than 16,000 gallons of water to make one smartphone.  A person can live on that much water for more than five years.
            </p>
          </div>
          <div className={`${styles.imageBox} && ${styles.textBox2}`}>
            <img src={resourcesImg} alt="Resources" title="Resources" />
          </div>
        </div>
        <div className={styles.textBox}>
          <p className={styles.highlight}>

            If 100 million people choose to reuse phones instead of new phones, we could:

          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              Save 3.4 million tons of raw materials annually.
            </div>
            <div className={styles.stat}>
              Save 1.6 trillion litres of water, equivalent to a year’s supply for 20 million people.

            </div>
          </div>
          <p>
            Quick Mobile is helping to protect the Earth's resources by significantly reducing water use and minimizing resource waste from mining through the reuse of phones and the breakdown of e-waste material.

          </p>
        </div>

        {/* Lowering Carbon Emissions */}
        <div className={styles.block}>
          <div className={styles.imageBox}>
            <img src={emissionImg} alt="Carbon Emissions" />
          </div>
          <div className={styles.textBox}>
            <h3>Lowering Carbon Emissions</h3>
            <p>
              The smartphone industry is responsible for 4% of all emissions in the world. Making a new smartphone produces 50 kg of CO₂. If things keep going the way they are, this number might triple by 2030.

            </p>
            <p>
              Refurbished phones, on the other hand, release 80% less CO₂ than new ones. If a billion people converted to secondhand devices, it would be a significant deal:

            </p>
          </div>
        </div>
        <div className={styles.box}>
          <p className={styles.highlight}>
            Prevent 50 million metric tons of CO₂ are released into the air every year.
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
              Quick Mobile is a significant part of the fight against climate change and decreasing carbon emissions because it helps gadgets last longer.

            </p>
          </div>
        </div>

        {/* Circular Economy */}
        <div className={styles.blockReverse}>
          <div className={styles.textBox}>
            <h3>Promoting a Circular Economy</h3>
            <p>
            People discard their phones after two or three years, even though they can last much longer with care. Fixing up a phone can help it last three to five years longer, which means that fewer new phones need to be built and less waste is made.

            </p>
            <p>
            A circular economy doesn't always make new things; instead, it focuses on fixing and reusing them. Quick Mobile supports this environmentally beneficial initiative by keeping cell phones in use longer, which lessens the mobile industry's impact on the environment.

            </p>
          </div>
          <div className={styles.imageBox}>
            <img src={economyImg} alt="Circular Economy" />
          </div>
        </div>

        {/* Affordable & Sustainable */}
        <div className={styles.techblock}>
          <div className={styles.textBox}>
            <h3>Making Technology Affordable & Sustainable</h3>
            <p>
             People discard their smartphones after only two or three years, despite their potential to last much longer with proper care. Refurbishing a phone provides it 3 to 5 more years of life. This implies that fewer new phones need to be made and less waste is made.

            </p>
            <p>
     A circular economy doesn't always make new things; instead, it focuses on Reuse and recycling things. Quick Mobile supports this environmentally friendly plan by making phones/device live longer, which makes the mobile business have less of an impact on the environment.

            </p>
          </div>
          <div className={styles.imageBox}>
            <img src={technologyImg} alt="Affordable & Sustainable" />
          </div>
        </div>
        {/*Table div */}
        <div className={styles.tableSection}>
          <div className={styles.desktopTable}>
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
        The growing demand for new smartphones puts a lot of pressure to extract minerals, which causes more e-waste, resource depletion, and carbon emissions. Choosing used / refurbished device  is a simple yet effective approach to save money, reduce waste, protect natural resources, and lessen CO₂ emissions.

          </p>
          <p>
          Quick Mobile aims to lead in sustainability since it makes sure that old smartphones don't go to trash; instead, they get a second life. Quick Mobile is assisting with:
    </p>
          <ol>
            <li>Reduce global e-waste</li>
            <li>Save water and raw materials for the future.</li>
            <li>Cut down on carbon emissions</li>
            <li>Let everyone use eco-friendly technologies.</li>
          </ol>
          <p>
            Buying a used phone is a terrific way to help the world and save money at the same time. Join the solution by choosing Quick Mobile today!

          </p>
        </div>
      </div>
    </div>
  </>
  );
};

export default QuickImpact;
