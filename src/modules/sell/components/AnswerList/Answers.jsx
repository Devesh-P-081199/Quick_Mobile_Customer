import { useContext, useEffect, useState } from "react";
import styles from "./answers.module.css";
import { UserContext } from "../../../../Context/contextAPI";
import backArrow from "../../../../assets/QuickSellNewIcons/BackArrow.svg";
import { useLocation } from "react-router-dom";

const Answers = ({ onBack, onRecalculate }) => {
  const { answersforMobile } = useContext(UserContext);
  const location = useLocation();
  const [displayAnswers, setDisplayAnswers] = useState([]);

  useEffect(() => {
    // Try to get packageDetails from sessionStorage
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get("pid");

    if (productId) {
      const packageDetailsKey = `packageDetails_${productId}`;
      const storedPackageDetails = sessionStorage.getItem(packageDetailsKey);

      if (storedPackageDetails) {
        try {
          const parsedDetails = JSON.parse(storedPackageDetails);

          // Transform the stored data to match the expected format
          const transformedData = parsedDetails.map((pkg) => {
            const questionsWithAnswers =
              pkg.questions?.map((q) => {
                // Get the selected answer value from answers object
                const selectedValue = pkg.answers?.[q.id];

                // Find the matching option to get the label
                let selectedLabels = [];
                if (selectedValue !== undefined && selectedValue !== null) {
                  if (Array.isArray(selectedValue)) {
                    // Multiple select
                    selectedLabels = selectedValue.map((val) => {
                      const option = q.options?.find(
                        (opt) => String(opt.value) === String(val),
                      );
                      return option?.label || String(val);
                    });
                  } else {
                    // Single select - compare as strings
                    const option = q.options?.find(
                      (opt) => String(opt.value) === String(selectedValue),
                    );
                    selectedLabels = option
                      ? [option.label]
                      : [String(selectedValue)];
                  }
                }

                return {
                  question: q.question,
                  explanation: q.questionExplanation,
                  selectedAnswers:
                    selectedLabels.length > 0 ? selectedLabels : [],
                };
              }) || [];

            return {
              packageName: pkg.packageName,
              packageType: pkg.pageTitle || pkg.packageType,
              questions: questionsWithAnswers,
            };
          });

          setDisplayAnswers(transformedData);
          return;
        } catch (error) {
          console.error("Error parsing stored packageDetails:", error);
        }
      }
    }

    // Fallback to answersforMobile from context
    if (answersforMobile && answersforMobile.length > 0) {
      setDisplayAnswers(answersforMobile);
    }
  }, [answersforMobile, location.search]);

  return (
    <div className={styles.modal}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.iconButton} onClick={onBack}>
          <img
            src={backArrow}
            alt="Back"
            style={{ width: "28px", height: "28px" }}
            onClick={onBack}
          />
        </button>
        <h2 className={styles.title}>Device Details</h2>
        <button
          className={styles.recalculateButton}
          onClick={() => {
            // Clear all Step3 form data from sessionStorage when recalculating
            const queryParams = new URLSearchParams(location.search);
            const productId = queryParams.get("pid");

            if (productId) {
              // Clear packageDetails so old selections don't show in Device Details
              const packageDetailsKey = `packageDetails_${productId}`;
              sessionStorage.removeItem(packageDetailsKey);

              // Clear step3 form data
              const storageKey = `step3PackageData_${productId}_${
                queryParams.get("vid") || "unknown"
              }`;
              sessionStorage.removeItem(storageKey);

              // Clear current package index
              const currentIndexKey = `currentPackageIndex_${storageKey}`;
              sessionStorage.removeItem(currentIndexKey);

              // Clear packages data

              // Clear form submitted flag
              const formSubmittedKey = `formSubmitted_${productId}`;
              sessionStorage.removeItem(formSubmittedKey);

              // Set recalculate flag to force Step3 to load fresh
              const recalculateKey = `recalculate_${productId}`;
              sessionStorage.setItem(recalculateKey, "true");
            }

            onRecalculate();
          }}
        >
          Recalculate
        </button>
      </div>

      {/* Scrollable content */}
      <div className={styles.answersWrapper}>
        {displayAnswers?.map((pkg, pkgIndex) => (
          <div key={pkgIndex} className={styles.packageBlock}>
            <h4>
              {pkgIndex + 1}. {pkg.packageType}
            </h4>
            <ol className={styles.questionList}>
              {pkg.questions?.map((q, qIndex) => (
                <li key={qIndex}>
                  <p className={styles.question}>{q.question}</p>
                  {q?.selectedAnswers?.length > 0 ? (
                    <div
                      className={
                        q.selectedAnswers[0]?.toLowerCase() === "yes"
                          ? styles.yes
                          : styles.no
                      }
                    >
                      {q.selectedAnswers.map((ans, idx) => (
                        <div key={idx}>{ans}</div>
                      ))}
                    </div>
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
