import press from "../../assets/QuickSellNewIcons/ty-mobile.png";
import styles from "./PressRelease.module.css";

const pressReleases = [
  {
    id: 1,
    logo: press,
    title: "Are refurbished phones tested before being sold?",
    date: "25 June 2025",
  },
  {
    id: 2,
    logo: press,
    title: "Are refurbished phones tested before being sold?",
    date: "25 June 2025",
  },
  {
    id: 3,
    logo: press,
    title: "Are refurbished phones tested before being sold?",
    date: "25 June 2025",
  },
];

export function PressReleaseCard({ logo, title, date }) {
  return (
    <div className={styles.card}>
      <img src={logo} alt="Press Release Logo" className={styles.logo} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.date}>{date}</p>
    </div>
  );
}

export default function PressRelease() {
  return (
    <section className="section-container section-padding-lg">
      <div className={styles.container}>
        <h2 className={styles.heading}>Press Release</h2>
        <div className={styles.grid}>
          {pressReleases.map((item) => (
            <PressReleaseCard
              key={item.id}
              logo={item.logo}
              title={item.title}
              date={item.date}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
