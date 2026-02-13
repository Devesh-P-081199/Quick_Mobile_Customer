import React, { useContext } from "react";
import styles from "./answers.module.css";
import { FaArrowLeft, FaCalculator } from "react-icons/fa";
import { UserContext } from "../../../Context/contextAPI";
import backArrow from "../../../assets/QuickSellNewIcons/backArrow.svg"

const Answers = ({ onBack, onRecalculate }) => {
  const { answersforMobile } = useContext(UserContext);

  return (
    <div className={styles.modal}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.left} onClick={onBack}>
          <img src={backArrow} alt="" />
          <span className={styles.title}>Device Details</span>
        </div>

        <button className={styles.recalculateButton} onClick={onRecalculate}>
          <FaCalculator className={styles.calcIcon} />
          Recalculate
        </button>
      </div>

      {/* Scrollable content */}
      <div className={styles.answersWrapper}>
        {answersforMobile?.map((pkg, pkgIndex) => (
          <div key={pkgIndex} className={styles.packageBlock}>
            <h4>
              <strong>{pkgIndex + 1}.</strong> {pkg.packageType}
            </h4>
            <ol className={styles.questionList}>
              {pkg.questions?.map((q, qIndex) => (
                <li key={qIndex}>
                  <p className={styles.question}>{q.question}</p>
                  {q?.selectedAnswers?.length > 0 ? (
                    <span
                      className={
                        q.selectedAnswers[0].toLowerCase() === "yes"
                          ? styles.yes
                          : styles.no
                      }
                    >
                      {q.selectedAnswers[0]}
                    </span>
                  ) : (
                    <span className={styles.no}>No answer</span>
                  )}
                </li>
              ))}
            </ol>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Answers;
