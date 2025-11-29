import { useContext, useEffect, useRef, useState } from "react";
import "./Step3.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import DeviceImg from "../../../assets/images/Products/mobile.png";
import { UserContext } from "../../../Context/contextAPI";
// import { toast } from "react-toastify";
import Cookies from "js-cookie";
import api from "../../../Utils/api";
import MobileCommonHeaderthree from "../../layout/MobileCommonHeader/MobileCommonHeaderthree";

// Import flaticons for broken items
import cameraIcon from "../../../assets/flaticons/camera.png";
import issueIcon from "../../../assets/flaticons/issue.png";
import bluetoothIcon from "../../../assets/flaticons/bluetooth-off.png";
import muteIcon from "../../../assets/flaticons/mute.png";
import silenceIcon from "../../../assets/flaticons/silence.png";
import lightningIcon from "../../../assets/flaticons/lightning.png";

// ====== Icon mapping for broken items ======
const getIconForOption = (optionLabel) => {
  const label = optionLabel.toLowerCase();

  if (label.includes("front camera") || label.includes("back camera")) {
    return cameraIcon;
  }
  if (label.includes("wifi")) {
    return issueIcon;
  }
  if (label.includes("bluetooth")) {
    return bluetoothIcon;
  }
  if (label.includes("audio receiver")) {
    return muteIcon;
  }
  if (label.includes("speaker")) {
    return silenceIcon;
  }
  if (label.includes("charging port")) {
    return lightningIcon;
  }

  return null; // Return null if no match, will use API icon or no icon
};

// ====== Transform questions ======
const transformQuestions = (apiQuestions) =>
  apiQuestions.map((q) => {
    let type = "radio";
    switch (q.questionType) {
      case "Radio":
        type = "radio";
        break;
      case "Multiple Select":
        type = "checkbox";
        break;
      case "Icon+Radio":
        type = "icon-radio";
        break;
      case "Icon+Select":
        type = "icon-checkbox";
        break;
      case "Dropdown":
        type = "dropdown";
        break;
      default:
        type = "radio";
    }

    const options =
      q.options?.map((opt, index) => ({
        id: opt._id || `${q._id}-${index}`,
        label: opt.label || opt.text || `Option ${index + 1}`,
        value: String(index),
        img: opt.iconUrl,
        description: opt.description || "",
      })) || [];

    return {
      id: q._id,
      question: q.questionName,
      questionExplanation: q.questionExplanation,
      type,
      options,
    };
  });

const extractAnsweredQuestions = (packageDataArray) => {
  const results = [];

  packageDataArray.forEach((pkg) => {
    const { packageName, packageType, questions, answers } = pkg;

    const answeredQuestions = Object.entries(answers || {})
      .map(([questionId, userAnswer]) => {
        const question = questions.find((q) => q.id === questionId);
        if (!question) return null;

        let selectedLabels = [];

        if (Array.isArray(userAnswer)) {
          selectedLabels = userAnswer
            .map((ans) => {
              const option = question.options.find((o) => o.value === ans);
              return option?.label;
            })
            .filter(Boolean);
        } else {
          const option = question.options.find((o) => o.value === userAnswer);
          if (option) selectedLabels = [option.label];
        }

        return {
          question: question.question,
          explanation: question.questionExplanation,
          selectedAnswers: selectedLabels,
        };
      })
      .filter(Boolean);

    if (answeredQuestions.length > 0) {
      results.push({
        packageName,
        packageType,
        questions: answeredQuestions,
      });
    }
  });

  return results;
};

function Step3() {
  let { slug } = useParams();
  const location = useLocation();
  const {
    packages,
    allPackageData,
    setAllPackageData,
    deviceInfo,
    userSelection,
    setIsLoginModalOpen,
    setanswersforMobile,
  } = useContext(UserContext);

  // Generate unique session storage key
  const getStorageKey = () => {
    // Always use URL parameters which are available even on refresh
    const urlParams = new URLSearchParams(location.search);
    const productId = urlParams.get("pid") || "unknown";
    const variantFromUrl = urlParams.get("vid") || "unknown";

    // Also try to use context data if available
    const variantId = userSelection?.variantId || variantFromUrl;

    return `step3PackageData_${productId}_${variantId}`;
  };

  const assignedPackages = packages || [];
  const [currentPackageIndex, setCurrentPackageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if we have valid packages data
  const hasValidPackages = assignedPackages && assignedPackages.length > 0;

  const currentPackageData = allPackageData[currentPackageIndex] || {};
  const currentQuestions = currentPackageData?.questions || [];

  // ===== Conditions pagination =====
  const [conditionsPagination, setConditionsPagination] = useState({
    currentPage: 0,
    questionsPerPage: 3,
  });

  const isConditionRelatedPackage =
    currentPackageData.packageType?.includes("Condition") ||
    currentPackageData.packageName?.includes("Condition");

  const conditionsPaginationEnabled =
    isConditionRelatedPackage &&
    currentQuestions.length > conditionsPagination.questionsPerPage;

  const currentConditionsPage = conditionsPagination.currentPage;
  const conditionsQuestionsPerPage = conditionsPagination.questionsPerPage;
  const totalConditionsPages = Math.ceil(
    currentQuestions.length / conditionsQuestionsPerPage
  );

  const getPaginatedQuestions = () => {
    if (!conditionsPaginationEnabled) return currentQuestions;
    return currentQuestions.slice(
      currentConditionsPage * conditionsQuestionsPerPage,
      (currentConditionsPage + 1) * conditionsQuestionsPerPage
    );
  };

  const goToNextConditionsPage = () => {
    if (!validateCurrentConditionPage()) return;
    setConditionsPagination((prev) => ({
      ...prev,
      currentPage: prev.currentPage + 1,
    }));
  };

  const goToPrevConditionsPage = () => {
    setConditionsPagination((prev) => ({
      ...prev,
      currentPage: prev.currentPage - 1,
    }));
  };

  const resetConditionsPagination = () => {
    setConditionsPagination((prev) => ({
      ...prev,
      currentPage: 0,
    }));
  };

  useEffect(() => {
    resetConditionsPagination();
  }, [currentPackageIndex]);

  // ===== Adjust icon option containers for long text and equalize label heights =====
  useEffect(() => {
    const adjustIconOptions = () => {
      const iconContainers = document.querySelectorAll(
        ".icon-option-container"
      );

      iconContainers.forEach((container) => {
        // Check for long text (more than 3 lines)
        const optionTexts = container.querySelectorAll(".option-text");
        let hasLongText = false;

        optionTexts.forEach((textElement) => {
          const lineHeight = parseFloat(
            getComputedStyle(textElement).lineHeight
          );
          const height = textElement.offsetHeight;
          const lines = Math.round(height / lineHeight);

          if (lines > 3) {
            hasLongText = true;
          }
        });

        // Add or remove two-columns class
        if (hasLongText) {
          container.classList.add("two-columns");
        } else {
          container.classList.remove("two-columns");
        }

        // Equalize label heights within this container
        const labels = container.querySelectorAll(".label-inside-icon");
        if (labels.length > 0) {
          // Reset heights first
          labels.forEach((label) => {
            label.style.minHeight = "auto";
            label.style.height = "auto";
          });

          // Find max height
          let maxHeight = 0;
          labels.forEach((label) => {
            const height = label.offsetHeight;
            if (height > maxHeight) {
              maxHeight = height;
            }
          });

          // Apply min-height instead of fixed height to allow growth
          labels.forEach((label) => {
            label.style.minHeight = `${maxHeight}px`;
            label.style.height = "auto";
          });
        }
      });
    };

    // Run after render
    const timer = setTimeout(adjustIconOptions, 100);

    return () => clearTimeout(timer);
  }, [allPackageData, currentPackageIndex, currentConditionsPage]);

  const getQuestionNumber = (index) => {
    if (!conditionsPaginationEnabled) return index + 1;
    return index + 1 + currentConditionsPage * conditionsQuestionsPerPage;
  };

  // ===== Refs + error tracking =====
  const questionRefs = useRef({});
  const [missingQuestions, setMissingQuestions] = useState([]);

  // ===== Validation =====
  const validateCurrentConditionPage = () => {
    const questionsToValidate = getPaginatedQuestions();

    const unansweredRequired = questionsToValidate.filter(
      (q) =>
        (q.type === "radio" ||
          q.type === "icon-radio" ||
          q.type === "dropdown") &&
        currentPackageData.answers[q.id] === undefined
    );

    if (unansweredRequired.length > 0) {
      const ids = unansweredRequired.map((q) => q.id);
      setMissingQuestions(ids);

      // Scroll to first missing question
      const firstId = ids[0];
      if (questionRefs.current[firstId]) {
        questionRefs.current[firstId].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      // toast.error(
      //   `Please answer ${unansweredRequired.length} required question(s) before continuing`
      // );
      return false;
    }

    setMissingQuestions([]);
    return true;
  };

  const validateCurrentPackage = () => {
    const currentPackage = allPackageData[currentPackageIndex];

    if (!currentPackage.questions || currentPackage.questions.length === 0) {
      return true;
    }

    if (conditionsPaginationEnabled) {
      return validateCurrentConditionPage();
    }

    const unansweredRequired = currentPackage.questions.filter(
      (q) =>
        (q.type === "radio" ||
          q.type === "icon-radio" ||
          q.type === "dropdown") &&
        currentPackage.answers[q.id] === undefined
    );

    if (unansweredRequired.length > 0) {
      const ids = unansweredRequired.map((q) => q.id);
      setMissingQuestions(ids);

      const firstId = ids[0];
      if (questionRefs.current[firstId]) {
        questionRefs.current[firstId].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      // toast.error("Please answer all required questions before continuing");
      return false;
    }

    setMissingQuestions([]);
    return true;
  };

  // ===== Load questions from packages =====
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);

      const storageKey = getStorageKey();
      const urlParams = new URLSearchParams(location.search);
      const productId = urlParams.get("pid");

      // Check if this is a fresh entry from Get Price or Recalculate
      const freshEntryKey = `freshEntry_${productId}`;
      const recalculateKey = `recalculate_${productId}`;
      const isFreshEntry = sessionStorage.getItem(freshEntryKey);
      const isRecalculate = sessionStorage.getItem(recalculateKey);

      if (isFreshEntry || isRecalculate) {
        // Clear the flags immediately
        sessionStorage.removeItem(freshEntryKey);
        sessionStorage.removeItem(recalculateKey);

        // Clear all old form data for fresh start
        sessionStorage.removeItem(storageKey);
        sessionStorage.removeItem(`currentPackageIndex_${storageKey}`);
        sessionStorage.removeItem(`packages_${productId}`);
        sessionStorage.removeItem(`formSubmitted_${productId}`);

        console.log("🔄 Loading fresh Step3 form (recalculate mode)");
      }

      const savedData = sessionStorage.getItem(storageKey);

      // If we have saved data, use it (only if not fresh entry)
      if (savedData && !isFreshEntry) {
        try {
          const parsedData = JSON.parse(savedData);
          setAllPackageData(parsedData);

          // Also load the current package index from session storage
          const currentIndexKey = `currentPackageIndex_${getStorageKey()}`;
          const savedCurrentIndex = sessionStorage.getItem(currentIndexKey);

          if (savedCurrentIndex !== null) {
            const index = parseInt(savedCurrentIndex);
            if (!isNaN(index) && index >= 0 && index < parsedData.length) {
              setCurrentPackageIndex(index);
            }
          }
          // If no saved index, keep it at 0 (don't search for unanswered questions)

          setIsLoading(false);
          return;
        } catch (error) {
          console.error("Error parsing saved data:", error);
          // Continue to initialize new data if parsing fails
        }
      }

      // If no packages available in context, try to reconstruct from URL
      if (!hasValidPackages) {
        const urlParams = new URLSearchParams(location.search);
        const productId = urlParams.get("pid");

        if (!productId) {
          // toast.error("Invalid URL. Please start over.");
          // Redirect to product selection page instead of using navigate(-1)
          navigate(`/${slug}`);
          return;
        }

        // Try to get packages from session storage or redirect
        const packagesKey = `packages_${productId}`;
        const savedPackages = sessionStorage.getItem(packagesKey);

        if (savedPackages) {
          try {
            const parsedPackages = JSON.parse(savedPackages);
            const transformed = parsedPackages.map((pkg) => ({
              packageId: pkg.packageId._id,
              packageName: pkg.packageId.packageName,
              packageType: pkg.packageId.packageType,
              pageTitle: pkg.packageId.pageTitle,
              titleExplanation: pkg.packageId.titleExplanation,
              questions: transformQuestions(pkg.packageId.questions || []),
              answers: {},
            }));

            setAllPackageData(transformed);
            sessionStorage.setItem(storageKey, JSON.stringify(transformed));
            setIsLoading(false);
            return;
          } catch (error) {
            console.error("Error restoring packages:", error);
          }
        }

        // If we can't restore packages, redirect to variant selection
        // toast.error("Session expired. Please select device variant again.");
        navigate(`/${slug}`);
        return;
      }

      // Initialize new package data from context (fresh entry from Get Price)
      const transformed = assignedPackages.map((pkg) => ({
        packageId: pkg.packageId._id,
        packageName: pkg.packageId.packageName,
        packageType: pkg.packageId.packageType,
        pageTitle: pkg.packageId.pageTitle,
        titleExplanation: pkg.packageId.titleExplanation,
        questions: transformQuestions(pkg.packageId.questions || []),
        answers: {},
      }));

      setAllPackageData(transformed);

      // Clear the form submitted flag (fresh entry from Get Price)
      // productId already declared at top of function
      const formSubmittedKey = `formSubmitted_${productId}`;
      sessionStorage.removeItem(formSubmittedKey);

      // Save both packages and current data to sessionStorage
      sessionStorage.setItem(storageKey, JSON.stringify(transformed));
      sessionStorage.setItem(
        `packages_${productId}`,
        JSON.stringify(assignedPackages)
      );

      setIsLoading(false);
    };

    initializeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packages, location.search, slug]);

  // ===== Handle option change =====
  const handleOptionChange = (questionId, optionValue, isMulti) => {
    setAllPackageData((prev) => {
      const updatedData = prev.map((pkg, index) => {
        if (index !== currentPackageIndex) return pkg;

        const prevAnswers = pkg.answers || {};
        let updatedAnswers;

        if (isMulti) {
          const current = prevAnswers[questionId] || [];
          updatedAnswers = {
            ...prevAnswers,
            [questionId]: current.includes(optionValue)
              ? current.filter((v) => v !== optionValue)
              : [...current, optionValue],
          };
        } else {
          updatedAnswers = {
            ...prevAnswers,
            [questionId]: optionValue,
          };
        }

        return { ...pkg, answers: updatedAnswers };
      });

      // Save to sessionStorage with unique key
      const storageKey = getStorageKey();
      sessionStorage.setItem(storageKey, JSON.stringify(updatedData));

      // Also save current package index when changing options (for paginated conditions)
      const currentIndexKey = `currentPackageIndex_${getStorageKey()}`;
      sessionStorage.setItem(currentIndexKey, currentPackageIndex.toString());

      return updatedData;
    });

    setMissingQuestions((prev) => prev.filter((id) => id !== questionId));

    // Auto-scroll to next question after selection (only for single-select types)
    if (!isMulti) {
      setTimeout(() => {
        const paginatedQuestions = getPaginatedQuestions();
        const currentQuestionIndex = paginatedQuestions.findIndex(
          (q) => q.id === questionId
        );

        // If there's a next question, check if it's visible and scroll if needed
        if (
          currentQuestionIndex !== -1 &&
          currentQuestionIndex < paginatedQuestions.length - 1
        ) {
          const nextQuestion = paginatedQuestions[currentQuestionIndex + 1];
          const nextQuestionRef = questionRefs.current[nextQuestion.id];

          if (nextQuestionRef) {
            // Check if the options of next question are visible in viewport (using 80% of screen)
            const optionsContainer = nextQuestionRef.querySelector(
              ".options, .dropdown-select"
            );
            const viewportHeight = window.innerHeight * 0.8;

            if (optionsContainer) {
              const rect = optionsContainer.getBoundingClientRect();
              const isOptionsVisible =
                rect.top >= 0 && rect.bottom <= viewportHeight;

              // Only scroll if options are not fully visible in 80% viewport
              if (!isOptionsVisible) {
                nextQuestionRef.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            } else {
              // Fallback: if no options container found, check the whole question
              const rect = nextQuestionRef.getBoundingClientRect();
              const isVisible = rect.top >= 0 && rect.bottom <= viewportHeight;

              if (!isVisible) {
                nextQuestionRef.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            }
          }
        }
      }, 300); // Small delay to allow state update
    }
  };

  // ===== Render options =====
  const renderOptions = (q) => {
    const isMulti = q.type === "checkbox" || q.type === "icon-checkbox";
    const showIcons = q.type === "icon-radio" || q.type === "icon-checkbox";
    const isDropdown = q.type === "dropdown";
    const currentAnswers = allPackageData[currentPackageIndex]?.answers || {};
    const selected = currentAnswers[q.id] || (isMulti ? [] : "");

    if (isDropdown) {
      const selectedValue = currentAnswers[q.id] || "";
      return (
        <select
          className="dropdown-select"
          name={q.id}
          value={selectedValue}
          onChange={(e) => handleOptionChange(q.id, e.target.value, false)}
        >
          <option value="" disabled>
            Select an option
          </option>
          {q.options.map((opt) => (
            <option key={opt.id} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <div
        className={`options ${
          showIcons
            ? "box-grid icon-option-container"
            : q.options.some(
                (opt) =>
                  (opt.label?.length || 0) > 40 ||
                  (opt.description?.length || 0) > 60
              )
            ? "long-text"
            : "short-text"
        }`}
      >
        {q.options.map((opt) => {
          const isSelected = isMulti
            ? selected.includes(opt.value)
            : selected === opt.value;

          // Get local icon based on option label, fallback to API icon
          const localIcon = getIconForOption(opt.label);
          const iconToUse = localIcon || opt.img;

          return showIcons ? (
            <div
              key={opt.id}
              className={`select-box ${isSelected ? "selected" : ""}`}
              onClick={() => handleOptionChange(q.id, opt.value, isMulti)}
            >
              {iconToUse && (
                <div className="icon-space">
                  <img src={iconToUse} alt={opt.label} />
                </div>
              )}
              <label
                className="label-inside-icon"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type={isMulti ? "checkbox" : "radio"}
                  name={q.id}
                  value={opt.value}
                  className="custom-radio"
                  checked={isSelected}
                  onChange={() => handleOptionChange(q.id, opt.value, isMulti)}
                />
                <span className="option-text">{opt.label}</span>
                {opt.description && (
                  <p className="option-text-des">{opt.description}</p>
                )}
              </label>
            </div>
          ) : (
            <label
              key={opt.id}
              className={`option ${
                isSelected ? "selected" : ""
              } option-with-des-box`}
              onClick={() => handleOptionChange(q.id, opt.value, isMulti)}
            >
              <input
                type={isMulti ? "checkbox" : "radio"}
                name={q.id}
                value={opt.value}
                checked={isSelected}
                onChange={() => handleOptionChange(q.id, opt.value, isMulti)}
                className="custom-radio"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="option-input-flex">
                <span className="option-text">{opt.label}</span>
                {opt.description && (
                  <span className="option-text-des">{opt.description}</span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    );
  };

  // ===== Transform answers for backend =====
  const transformAnswersForBackend = (answers, questions) => {
    const transformed = {};
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const question = questions.find((q) => q.id === questionId);
      if (!question) return;

      if (Array.isArray(answerValue)) {
        transformed[questionId] = answerValue.map((val) =>
          isNaN(val) ? val : Number(val)
        );
      } else {
        transformed[questionId] = isNaN(answerValue)
          ? answerValue
          : Number(answerValue);
      }
    });
    return transformed;
  };

  // ===== Save and price calculation =====
  const priceCalculationAndSave = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth-token"));
      if (!token) return;

      if (!deviceInfo.deviceName) return;

      // Use URL parameters as fallback for device info
      const urlParams = new URLSearchParams(location.search);
      const deviceName =
        deviceInfo.deviceName || urlParams.get("pn") || "Unknown Device";

      if (!userSelection?.cityId || !userSelection?.cityName) {
        // toast.error("Please select city first");
        return;
      }

      const transformedPackageData = allPackageData.map((pkg) => ({
        ...pkg,
        answers: transformAnswersForBackend(pkg.answers || {}, pkg.questions),
      }));

      console.log(
        "Transformed Package Data for Backend 🤔🤔🤔:",
        transformedPackageData
      );

      await api.post("/sell-module/user/price-estimation", {
        packagesAnswer: transformedPackageData,
        basePrice: 50000,
        userSelection,
        deviceName: deviceName,
        deviceVariant:
          deviceInfo.variantDetail || urlParams.get("vid") || "Unknown Variant",
      });

      // Store allPackageData in sessionStorage for device details component
      const productId = urlParams.get("pid");
      const packageDetailsKey = `packageDetails_${productId}`;

      // Store the original allPackageData which has questions, options, and answers
      sessionStorage.setItem(packageDetailsKey, JSON.stringify(allPackageData));

      console.log(
        "💾 Stored packageDetails in sessionStorage:",
        allPackageData
      );

      // Set flag that form was submitted (so data persists if user comes back)
      const formSubmittedKey = `formSubmitted_${productId}`;
      sessionStorage.setItem(formSubmittedKey, "true");

      // Don't clear session storage - keep data so user can come back and edit
      // Data will only be cleared when user goes back to Get Price page

      navigate(`/${slug}/price-summary?${urlParams.toString()}`);
    } catch (error) {
      console.error("Error fetching final price:", error);
      // toast.error("Error fetching final price");
    }
  };

  // ===== Continue / Previous =====
  const handleContinue = async () => {
    if (!validateCurrentPackage()) return;

    if (conditionsPaginationEnabled) {
      if (currentConditionsPage < totalConditionsPages - 1) {
        goToNextConditionsPage();
        return;
      }
    }

    // Move to next package sequentially (one at a time)
    if (currentPackageIndex < allPackageData.length - 1) {
      const nextIndex = currentPackageIndex + 1;
      setCurrentPackageIndex(nextIndex);

      // Save the current package index to session storage
      const currentIndexKey = `currentPackageIndex_${getStorageKey()}`;
      sessionStorage.setItem(currentIndexKey, nextIndex.toString());

      return;
    }

    const savedToken = Cookies.get("auth-token");
    if (!savedToken) {
      setIsLoginModalOpen(true);
      return;
    }

    setanswersforMobile(extractAnsweredQuestions(allPackageData));
    await priceCalculationAndSave();
  };

  const handlePrevious = () => {
    // First check if we're in paginated conditions and not on first page
    if (conditionsPaginationEnabled && currentConditionsPage > 0) {
      goToPrevConditionsPage();
      return;
    }

    // If we're not on the first package, go to previous package
    if (currentPackageIndex > 0) {
      const prevIndex = currentPackageIndex - 1;
      setCurrentPackageIndex(prevIndex);

      // Save the current package index to session storage
      const currentIndexKey = `currentPackageIndex_${getStorageKey()}`;
      sessionStorage.setItem(currentIndexKey, prevIndex.toString());
      return;
    }

    // Only navigate away if we're on the first package and first page
    const storageKey = getStorageKey();
    const currentIndexKey = `currentPackageIndex_${storageKey}`;
    const urlParams = new URLSearchParams(location.search);
    const productId = urlParams.get("pid");
    const packagesKey = `packages_${productId}`;

    // Check if form was submitted (user went to Order Summary)
    const formSubmittedKey = `formSubmitted_${productId}`;
    const wasFormSubmitted = sessionStorage.getItem(formSubmittedKey);

    // Only clear data if coming from Get Price (not from Order Summary)
    if (!wasFormSubmitted) {
      // Remove all form-related data when going back to Get Price
      sessionStorage.removeItem(storageKey);
      sessionStorage.removeItem(currentIndexKey);
      sessionStorage.removeItem(packagesKey);
    }
    // If coming from Order Summary, keep the data so user can edit

    // ALWAYS clear the flag when exiting form (so next fresh entry is clean)
    sessionStorage.removeItem(formSubmittedKey);

    // Use browser history to go back to the previous page
    navigate(-1);
  };

  const getButtonText = () => {
    if (conditionsPaginationEnabled) {
      return currentConditionsPage < totalConditionsPages - 1
        ? "Next Page"
        : currentPackageIndex < allPackageData.length - 1
        ? "Continue"
        : "Get Price";
    }
    return currentPackageIndex < allPackageData.length - 1
      ? "Continue"
      : "Get Price";
  };

  const renderAnsweredQuestions = () => {
    if (!allPackageData || allPackageData.length === 0) return null;

    return allPackageData.map((packageData, index) => {
      const hasAnswers =
        packageData.answers && Object.keys(packageData.answers).length > 0;

      if (!hasAnswers) return null;

      return (
        <div key={packageData.packageId} className="package-answers">
          <h3 className="answer-heading">
            {`${index + 1}. ${
              packageData?.packageType || packageData?.packageName
            }`}
          </h3>
          {Object.entries(packageData.answers).map(([qid, ans], ansIndex) => {
            const q = packageData.questions.find((q) => q.id === qid);
            if (!q) return null;

            let displayValue;
            if (Array.isArray(ans)) {
              displayValue = ans
                .map((value) => {
                  const opt = q.options.find((o) => o.value === value);
                  return opt?.label || value;
                })
                .filter(Boolean)
                .join(", ");
            } else {
              const opt = q.options.find((o) => o.value === ans);
              displayValue = opt?.label || ans;
            }

            if (!displayValue) return null;

            return (
              <div key={qid} className="answer-item">
                <p className="question-text">
                  {`${ansIndex + 1}. ${q?.question}`}
                </p>
                <ul className="answer-text">
                  {displayValue.split(",").map((item, i) => (
                    <li key={i}>• {item.trim()}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      );
    });
  };

  // Show loading or redirect if no packages
  if (isLoading) {
    return (
      <>
        <MobileCommonHeaderthree title="Calculation" />
        <section className="form-section mobile-pt-section">
          <div className="wrapper">
            <div className="loading-container">
              <p>Loading device information...</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!allPackageData || allPackageData.length === 0) {
    return (
      <>
        <MobileCommonHeaderthree title="Calculation" />
        <section className="form-section mobile-pt-section">
          <div className="wrapper">
            <div className="error-container">
              <p>
                No packages available. Please select your device variant again.
              </p>
              <button
                className="continue-btn"
                onClick={() => navigate(`/${slug}`)}
              >
                Select Device Variant
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <MobileCommonHeaderthree title="Calculation" onBack={handlePrevious} />
      <section className="form-section mobile-pt-section">
        <div className="wrapper">
          {/* Left Side */}
          <div className="form-left">
            <div className="device-detail">
              <img src={deviceInfo?.devicePic || DeviceImg} alt="Device" />
              <div className="device-name">
                <h2>
                  {deviceInfo?.deviceName ||
                    new URLSearchParams(location.search).get("pn")}
                </h2>
                <span>
                  {deviceInfo?.variantDetail ||
                    new URLSearchParams(location.search).get("vid")}
                </span>
              </div>
            </div>

            <div className="form-details">
              <span>Device Details</span>
              {renderAnsweredQuestions()}
            </div>
          </div>

          {/* Right Side */}
          <div className="form-right page-content-wrapper">
            <div className="package-progress">
              {/* Progress Bar */}
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${
                      ((currentPackageIndex + 1) / allPackageData.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            <h2>
              {allPackageData[currentPackageIndex]?.pageTitle ||
                "Device Condition Form"}
            </h2>

            <h3>{allPackageData[currentPackageIndex]?.titleExplanation}</h3>

            <form className="form-content scrollbar-hidden">
              {getPaginatedQuestions().map((q, index) => (
                <div
                  className="form-box"
                  key={q?.id || index}
                  ref={(el) => (questionRefs.current[q.id] = el)}
                >
                  <div className="question">
                    <p className="question-text">
                      {`${getQuestionNumber(index)}. ${q?.question}`}
                      {(q.type === "radio" ||
                        q.type === "icon-radio" ||
                        q.type === "dropdown") && (
                        <sup className="required-asterisk">*</sup>
                      )}
                    </p>
                    <p className="question-explaination-text">
                      {q?.questionExplanation}
                    </p>
                    {missingQuestions.includes(q.id) && (
                      <p className="error-text">
                        Please fill required question
                      </p>
                    )}
                  </div>
                  {renderOptions(q)}
                </div>
              ))}

              {/* Main navigation buttons */}
              <div className="button-box">
                <button
                  type="button"
                  className="pre-btn"
                  onClick={handlePrevious}
                >
                  {conditionsPaginationEnabled && currentConditionsPage > 0
                    ? "Previous Page"
                    : "Previous"}
                </button>
                <div className="fixed-btn">
                  <button
                    type="button"
                    className="continue-btn enabled whitespace-nowrap overflow-hidden"
                    onClick={handleContinue}
                  >
                    {getButtonText()}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Step3;
