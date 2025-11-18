import styles from "./UsedVsBrand.module.css"

const benefits = [
  {
    id: 1,
    title: 'Reduction in E-Waste',
    description:
      'Prevent approximately 70-80% of the e-waste generated from manufacturing and disposing of a new device.',
    borderColor: "borderLime",
  },
  {
    id: 2,
    title: 'Conservation of Resources',
    description:
      'Save over 7,500 liters of water used during the production of a single smartphone.',
    borderColor: 'borderIndigo',
  },
  {
    id: 3,
    title: 'Lower Carbon Footprint',
    description:
      'Avoid emitting up to 60kg of CO₂, significantly reducing environmental impact.',
    borderColor: 'borderOrange',
  },
  {
    id: 4,
    title: 'Reduction in E-Waste',
    description:
      'Prevent approximately 70-80% of the e-waste generated from manufacturing and disposing of a new device.',
    borderColor: 'borderBlue',
  },
];

export default function UsedVsBrandNew() {
  return (
    <section className={styles.section}>
    <div className={styles.container}>
        <h3 className={styles.heading}>Used vs. Brand New</h3>
        <p className={styles.description}>
          Here’s what you help prevent on average by choosing a reborn smartphone over a brand new one.
        </p>
        <div className={styles.benefitsGrid}>
          {benefits.map(({ id, title, description, borderColor }) => (
            <div
              key={id}
              className={`${styles.benefitCard} ${styles[borderColor]}`}
            >
              <h3 className={styles.benefitTitle}>{title}</h3>
              <p className={styles.benefitDescription}>{description}</p>
            </div>
          ))}
        </div>
    </div>
    </section>
  );
}
