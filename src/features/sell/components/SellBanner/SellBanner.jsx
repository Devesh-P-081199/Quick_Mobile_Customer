import React, { useEffect, useRef, useState, useMemo, useContext } from "react";
import BannerImage from "../../../../assets/images/static/banner-img.png";
import styles from "../SellBanner/SellBanner.module.css";
import MobileIcon from "../../../../assets/images/Products/mobile.png";
import debounce from "lodash.debounce";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import api from "../../../../Utils/api";
import { UserContext } from "../../../../Context/contextAPI";
import { BiSearch } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NewSearchIcon from "../../../../assets/QuickSellNewIcons/Search.svg";
import MobileSearchModal from "./MobileSearchModal/MobileSearchModal";

function SellHomeBanner({ onViewAllClick }) {
  const navigate = useNavigate();
  const texts = ["Highest Price", "Hassle Free Pickup", "Instant Payment"];
  //const [currentTextIndex, setCurrentTextIndex] = useState(0);
  //const [displayedText, setDisplayedText] = useState("");
  // const [charIndex, setCharIndex] = useState(0);
  const [category, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const sliderRef = useRef(null);
  const brandSectionRef = useRef(null);
  const [catName, setCatName] = useState("");
  const [results, setResults] = useState({
    ActiveBrands: { buy: [], repair: [], sell: [] },
    ActiveProducts: { buy: [], repair: [], sell: [] },
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const categoryRef = useRef(null);
  const { setSelectedCategory, setHaveSubCategory, selectedCategory } =
    useContext(UserContext);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const handleFocus = () => {
    if (window.innerWidth <= 768) {
      setIsMobileSearchOpen(true);
    }
  };
  const [mobileResults, setMobileResults] = useState({
    ActiveBrands: { buy: [], repair: [], sell: [] },
    ActiveProducts: { buy: [], repair: [], sell: [] },
  });

  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingBrands, setIsLoadingBrands] = useState(true);

  const { slug1 } = useParams();

  // console.log("slug1 in sellBannaer",slug1);

  const scrollToBrands = () => {
    if (brandSectionRef.current) {
      brandSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setTimeout(() => {
        window.scrollBy(0, -100);
      }, 500);
    }
  };

  const updateArrowVisibility = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const fetchCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const response = await api.get(
        "/common-module/category?option=Sell&all=true"
      );
      const allCategories = response?.data?.categories || [];
      setCategories(allCategories);

      // 🟡 If URL has a slug, match category using slug
      let selectedCat = allCategories.find((cat) => cat?.slug?.sell === slug1);

      // 🟢 If no match, fallback to first
      if (!selectedCat && allCategories.length > 0) {
        selectedCat = allCategories[0];
      }

      if (selectedCat) {
        setSelectedCategory(selectedCat._id);
        setSelectedCategoryId(selectedCat._id);
        setCatName(selectedCat.categoryName);
        categoryRef.current = selectedCat._id;

        await GotoSearchBrands(selectedCat._id);
      }
    } catch (error) {
      console.log("Error fetching Categories ", error);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const GotoSearchBrands = async (id) => {
    setIsLoadingBrands(true);
    try {
      const brandResp = await api.get(
        `/common-module/FetchbrandByCatSelection?option=Sell&categoryId=${id}`
      );

      setBrands(brandResp.data?.data);
    } catch (innerError) {
      console.log("Error fetching brands:", innerError);
    } finally {
      setIsLoadingBrands(false);
    }
  };

  // const handleMainSearch = async (search = "") => {

  //   const catId = categoryRef.current;
  //   if (!catId) return;

  //   try {
  //     const resp = await api.get(
  //       `/sell-module/user/main-Search?search=${search}&catId=${catId}`
  //     );
  //     const data = resp.data?.[0];

  //     if (!data) {
  //       setShowDropdown(false);
  //       return;
  //     }
  //     //  console.log("vvvvvvv",data)
  //     setResults(data);
  //     const allMatchingBrands = [
  //       ...(data?.ActiveBrands?.buy || []),
  //       ...(data?.ActiveBrands?.repair || []),
  //       ...(data?.ActiveBrands?.sell || []),
  //     ];

  //     setBrands(allMatchingBrands);
  //     setShowDropdown(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleMainSearch = async (search = "", isMobile = false) => {
    const catId = categoryRef.current;
    if (!catId) return;

    try {
      const resp = await api.get(
        `/sell-module/user/main-Search?search=${search}&catId=${catId}`
      );
      const data = resp.data?.[0];

      if (!data) {
        if (isMobile) {
          setMobileResults({
            ActiveBrands: { buy: [], repair: [], sell: [] },
            ActiveProducts: { buy: [], repair: [], sell: [] },
          });
        } else {
          setResults({
            ActiveBrands: { buy: [], repair: [], sell: [] },
            ActiveProducts: { buy: [], repair: [], sell: [] },
          });
          setShowDropdown(false);
        }
        return;
      }

      if (isMobile) {
        setMobileResults(data); // ✅ mobile results
      } else {
        setResults(data); // ✅ desktop results
        setShowDropdown(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("After setup vivek",results);

  const debouncedSearchMain = useMemo(
    () =>
      debounce((value, isMobile) => {
        handleMainSearch(value, isMobile);
      }, 300),
    []
  );

  const handleMainSearchChange = (e, isMobile = false) => {
    const value = e.target.value.trimStart();
    setSearchTerm(value);

    if (value === "") {
      if (isMobile) {
        setMobileResults({
          ActiveBrands: { buy: [], repair: [], sell: [] },
          ActiveProducts: { buy: [], repair: [], sell: [] },
        });
      } else {
        setShowDropdown(false);
      }
    } else {
      debouncedSearchMain(value, isMobile);
    }
  };

  const handleNavigate = async (id, categoryName, slug) => {
    setCatName(categoryName);
    setSelectedCategory(id);
    setSelectedCategoryId(id);
    categoryRef.current = id;
    setShowDropdown(false);

    await GotoSearchBrands(id);

    if (slug1 !== slug) {
      navigate(`/${slug}`);
    }
  };

  const handleBrandClick = (brand) => {
    if (brand?.subCategorySlug) {
      navigate(`/${brand?.subCategorySlug}/${brand.slugSell}`);
    } else {
      navigate(`/${brand.categorySlug}/${brand.slugSell}`);
    }
    setShowDropdown(false);
    setSearchTerm("");
  };

  const handleProductClick = (prod) => {
    //console.log("Product clicked:", prod);
    if (prod?.subCategorySlug) {
      navigate(`/${prod?.subCategorySlug}/${prod.slugSell}`);
    } else {
      navigate(`/${prod.categorySlug}/${prod.slugSell}`);
    }
    setShowDropdown(false);
    setSearchTerm("");
  };

  useEffect(() => {
    const animate = () => {
      const fullText = texts[currentTextIndexRef.current];
      if (charIndexRef.current < fullText.length) {
        textRef.current += fullText[charIndexRef.current];
        setDisplayedText(textRef.current);
        charIndexRef.current += 1;
        timeoutRef.current = setTimeout(animate, 100);
      } else {
        timeoutRef.current = setTimeout(() => {
          textRef.current = "";
          charIndexRef.current = 0;
          currentTextIndexRef.current =
            (currentTextIndexRef.current + 1) % texts.length;
          animate();
        }, 2000);
      }
    };

    animate();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const [displayedText, setDisplayedText] = useState("");
  const textRef = useRef("");
  const charIndexRef = useRef(0);
  const currentTextIndexRef = useRef(0);
  const timeoutRef = useRef(null); // To store timeout reference

  // useEffect(() => {
  //   const fullText = texts[currentTextIndexRef.current];

  //   const animate = () => {
  //     if (charIndexRef.current < fullText.length) {
  //       textRef.current += fullText[charIndexRef.current];
  //       setDisplayedText(textRef.current);
  //       charIndexRef.current += 1;

  //       timeoutRef.current = setTimeout(animate, 100);
  //     } else {
  //       timeoutRef.current = setTimeout(() => {
  //         textRef.current = "";
  //         charIndexRef.current = 0;
  //         currentTextIndexRef.current =
  //           (currentTextIndexRef.current + 1) % texts.length;
  //         animate();
  //       }, 2000);
  //     }
  //   };

  //   animate();

  //   return () => {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    fetchCategories();
    return () => {
      debouncedSearchMain.cancel();
    };
  }, []);

  useEffect(() => {
    categoryRef.current = selectedCategoryId;
  }, [selectedCategoryId]);

  useEffect(() => {
    updateArrowVisibility();
    if (sliderRef.current) {
      sliderRef.current.addEventListener("scroll", updateArrowVisibility);
    }
    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener("scroll", updateArrowVisibility);
      }
    };
  }, [category]);

  return (
    <section className="default-padding-section sell-banner-only zero-padding-section">
      <div className="common-container wrapper">
        <div className={styles.sellerbanner}>
          <div className={styles.leftImg}>
            <img src={BannerImage} alt="Sell Banner" title="Sell Banner" />
          </div>
          <div className={styles.rightContent}>
            <div className={styles.sliderWrapper}>
              {showLeftArrow && (
                <button className={styles.arrowLeft} onClick={scrollLeft}>
                  &#10094;
                </button>
              )}
              {isMobileSearchOpen && (
                <MobileSearchModal
                  searchTerm={searchTerm}
                  onChange={(e) => handleMainSearchChange(e, true)} // mobile = true
                  onClose={() => setIsMobileSearchOpen(false)}
                  results={mobileResults} // important!
                  onBrandClick={handleBrandClick}
                  onProductClick={handleProductClick}
                />
              )}

              <div
                className={`${styles.imgSlider} scrollbar-hidden`}
                ref={sliderRef}
              >
                {isLoadingCategories
                  ? Array(5)
                      .fill()
                      .map((_, index) => (
                        <div className={styles.imgCard} key={index}>
                          <div className={styles.imageBg}>
                            <Skeleton circle height={50} width={50} />
                          </div>
                          <Skeleton
                            width={70}
                            height={10}
                            style={{ marginTop: "5px" }}
                          />
                        </div>
                      ))
                  : [...category]
                      .sort((a, b) => {
                        if (a._id === selectedCategoryId) return -1;
                        if (b._id === selectedCategoryId) return 1;
                        return 0;
                      })
                      .map((cat, index) => (
                        <div
                          // className={styles.imgCard}
                          key={index}
                          onClick={() =>
                            handleNavigate(
                              cat._id,
                              cat.categoryName,
                              cat?.slug?.sell
                            )
                          }
                          className={`${styles.imgCard} ${
                            selectedCategoryId === cat._id
                              ? styles.selectedCategory
                              : ""
                          }`}
                        >
                          <div className={styles.imageBg}>
                            <img
                              src={cat?.categoryImageUrl || MobileIcon}
                              alt={cat?.categoryName}
                              title={cat?.categoryName}
                            />
                            <span className={styles.cardName}>
                              {cat.categoryName}
                            </span>
                          </div>
                        </div>
                      ))}

                <div
                  className={`${styles.imgCard} ${styles.viewAllCard}`}
                  onClick={() => {
                    const brandElement = document.getElementById("brand-id");
                    if (brandElement) {
                      brandElement.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <NavLink to="/view-all-category" className={styles.imageBg}>
                    <span className={styles.dotButton}>
                      <div className={styles.dotsContainer}>
                        <span className={styles.dot} />
                        <span className={styles.dot} />
                        <span className={styles.dot} />
                      </div>
                    </span>
                    <span className={styles.morelink}>More</span>
                  </NavLink>
                </div>
              </div>

              {showRightArrow && (
                <button className={styles.arrowRight} onClick={scrollRight}>
                  &#10095;
                </button>
              )}
            </div>

            <div className={styles.bannerHeading}>
              <h2>Sell Your Used {catName} And Get! </h2>
              <div className={styles.animatedText}>
                <h2>{displayedText}</h2>
              </div>
            </div>

            <div className={styles.searchBox}>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="What are you looking for..."
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={handleMainSearchChange}
                  aria-label="Search"
                  onFocus={() => {
                    if (window.innerWidth <= 768) {
                      setIsMobileSearchOpen(true);
                    }
                  }}
                />
                <div className={styles.searchIcon}>
                  {/* <BiSearch fontSize={21}></BiSearch> */}
                  <img src={NewSearchIcon} alt="icon" title="icon" />
                </div>

                {showDropdown &&
                  !isMobileSearchOpen && ( // ✅ prevent double rendering
                    <div className={styles.dropdownStyled}>
                      {results.ActiveBrands?.length > 0 && (
                        <div className={styles.sectionGroup}>
                          {results.ActiveBrands?.map((brand) => (
                            <div
                              key={brand._id}
                              className={styles.suggestionRow}
                              onClick={() => handleBrandClick(brand)}
                            >
                              <span className={styles.name}>
                                {brand.brandName}
                              </span>
                              <span className={styles.tag}>in Brand</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {results.ActiveProducts?.length > 0 && (
                        <div className={styles.sectionGroup}>
                          {results.ActiveProducts?.map((product) => (
                            <div
                              key={product._id}
                              className={styles.suggestionRow}
                              onClick={() => handleProductClick(product)}
                            >
                              <span className={styles.name}>
                                {product.deviceName}
                              </span>
                              <span className={styles.tag}>in Product</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
              </div>
            </div>
            <div className={styles.suggestionBrandBox}>
              {isLoadingBrands
                ? Array(4)
                    .fill()
                    .map((_, i) => (
                      <div key={i} className={styles.brands}>
                        <div className={styles.brandImageBg}>
                          <Skeleton circle width={50} height={50} />
                        </div>
                        <Skeleton
                          width={60}
                          height={9}
                          style={{ marginTop: 5 }}
                        />
                      </div>
                    ))
                : brands.slice(0, 4).map((icon, index) => (
                    <div key={index}>
                      <div
                        className={styles.brandImageBg}
                        onClick={() => navigate(`${icon.slugSell}`)}
                      >
                        <img
                          src={icon?.brandLogo}
                          alt={icon?.brandName}
                          title={icon?.brandName}
                        />
                      </div>
                      {/* <span className={styles.cardName}>{icon?.brandName}</span> */}
                    </div>
                  ))}
              {/* {!isLoadingBrands && brands.length > 4 && (
              )} */}
            </div>
            <button className={styles.laptopviewall} onClick={onViewAllClick}>
              View all
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SellHomeBanner;
