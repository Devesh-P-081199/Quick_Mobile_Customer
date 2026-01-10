import iPhone from "../../../../assets/images/Products/mobile.png";
import styles from "./BrowsePicks.module.css";

const serviceData = [
  {
    title: "service1",
    img: iPhone,
    text: "iPhone",
  },
  {
    title: "service2",
    img: iPhone,
    text: "MacBook",
  },
  {
    title: "service3",
    img: iPhone,
    text: "iPad",
  },
  {
    title: "service4",
    img: iPhone,
    text: "Gaming Consoles",
  },
  {
    title: "service5",
    img: iPhone,
    text: "Android",
  },
  {
    title: "service6",
    img: iPhone,
    text: "Smart Watch",
  },
];

const BrowsePicks = () => {
  return (
    <div className="page-content-wrapper">
      <div className={styles.browserPick}>
        <h2 className={styles.heading}>Top Selling Category</h2>

        <div className={styles.cardContainer}>
          {serviceData.map((data, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={data.img} alt={data.title} />
              </div>
              <p className={styles.cardText}>{data.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowsePicks;
