/**
 * Header Component - Main navigation header for the QuickMobile application
 *
 * Features:
 * - Responsive design with desktop and mobile layouts
 * - Universal search functionality with real-time results
 * - User authentication (login/signup) integration
 * - City selection modal
 * - Mobile sidebar navigation
 * - Category and brand navigation dropdowns
 * - Profile management dropdown
 */

import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useRef,
  Suspense,
} from "react";
import styles from "./Header.module.css";

// Assets - Logo and Icons
import HeaderLogo from "../../../assets/QuickSellNewIcons/New_icon_18-10-25.jpg";
import dropdownIcon from "../../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";
import usericon from "../../../assets/images/icons/user.png";
import RightArrow from "../../../assets/icons/RightArrow.svg";
import NewSearchIcon from "../../../assets/QuickSellNewIcons/Search.svg";
import NewCartIcon from "../../../assets/QuickSellNewIcons/Cart.svg";
import NewMenuBar from "../../../assets/QuickSellNewIcons/MenuBar.svg";
import NewCloseIcon from "../../../assets/QuickSellNewIcons/Cross.svg";
import NewLocationIcon from "../../../assets/QuickSellNewIcons/Location.svg";
import NewOrderIcon from "../../../assets/QuickSellNewIcons/OrderBox.svg";
import NewProfileIcon from "../../../assets/QuickSellNewIcons/Profile.svg";
import NewBackArrow from "../../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";

// External Dependencies
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/contextAPI";
import debounce from "lodash.debounce";
import api from "../../../Utils/api";
import {
  FaShoppingBag,
  FaSignOutAlt,
  FaTags,
  FaUserCircle,
} from "react-icons/fa";

// Components
import Loader from "../Loader/Loader";
import MobileFullScreenModal from "./FullScreenModal";

// Lazy-loaded components for better performance
const SignUp = React.lazy(() =>
  import("../../../features/profile/components/Signup/Signup")
);
const Login = React.lazy(() =>
  import("../../../features/profile/components/Login/Login")
);
const SetupProfile = React.lazy(() =>
  import("../../../features/profile/components/SetupProfile/SetupProfile")
);
const Cities = React.lazy(() => import("./Cities"));

/**
 * Main Header Component
 * Handles navigation, search, user authentication, and mobile interactions
 */
const Header = () => {
  // Router hooks for navigation and location tracking
  const location = useLocation();
  const navigate = useNavigate();

  // UI State Management
  const [openMobileCategory, setOpenMobileCategory] = useState(null); // Mobile category selection state
  const [isVisible, setIsVisible] = useState(true); // Header visibility on scroll
  const [isOpen, setIsOpen] = useState(false); // Mobile sidebar open/close state
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false); // Category modal state
  const [isBrandModalOpen, setBrandModalOpen] = useState(false); // Brand modal state
  const [isProfileDropDown] = useState(false); // Profile dropdown state (unused)
  const [home, setHome] = useState(false); // Home navigation trigger

  // Search Functionality State
  const [searchTerm, setSearchTerm] = useState(""); // Current search input
  const [showDropdown, setShowDropdown] = useState(false); // Search results dropdown visibility
  const [isMobileSearchDrop, setIsMobileSearchDrop] = useState(false); // Mobile search overlay state
  const [results, setResults] = useState({
    ActiveBrands: { buy: [], recycle: [], sell: [] },
    ActiveProducts: { buy: [], recycle: [], sell: [] },
  }); // Search results data

  // Navigation and Category State
  const [category, setCategories] = useState([]); // Available categories
  const [brandsWithProducts, setBrandsWithProducts] = useState([]); // Brands with their products
  // const [slugs, setSlugs] = useState({
  //   sell: "",
  //   buy: "",
  //   recycle: "",
  // }); // URL slugs for different sections (commented out since not used)

  // Dropdown and Hover State
  const [hoveredItem, setHoveredItem] = useState(null); // Currently hovered navigation item
  const [activeCategory, setActiveCategory] = useState(null); // Active category in dropdown
  const [hoveredBrand, setHoveredBrand] = useState(null); // Currently hovered brand
  const [activeBrand, setActiveBrand] = useState(null); // Active brand name
  const [activeProducts, setActiveProducts] = useState([]); // Products of active brand
  const [openMobileInnerDropdown, setOpenMobileInnerDropdown] = useState(null); // Mobile inner dropdown state

  // Authentication State
  const [authType, setAuthType] = useState("login"); // Current auth modal type (login/signup)

  // Refs for DOM manipulation
  const searchRef = useRef(null); // Search container reference
  const dropdownRef = useRef(null); // Dropdown container reference
  const searchInputRef = useRef(null); // Mobile search input reference

  // Context data from UserContext
  const {
    userSelection, // Selected city data
    user, // Current user data
    toggleModal, // City selection modal toggle
    isLoginModalOpen, // Login modal state
    setIsLoginModalOpen, // Login modal state setter
    loadCities, // Cities loading state
  } = useContext(UserContext);

  /**
   * Effect: Manage body scroll when mobile search overlay is active
   * Prevents background scrolling when search overlay is open
   */
  useEffect(() => {
    if (isMobileSearchDrop) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileSearchDrop]);

  /**
   * Effect: Fetch categories with active brands on component mount
   * Used for navigation dropdowns and mobile category selection
   */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/common-module/categoryHasActiveBrands");
        setCategories(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  /**
   * Effect: Handle clicks outside search dropdown to close it
   * Improves UX by closing search results when clicking elsewhere
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /**
   * Authentication Handlers
   */
  const handleLoginClick = () => {
    setAuthType("login");
    setIsLoginModalOpen(true);
  };

  const handleSignupClick = () => {
    setAuthType("signup");
    setIsLoginModalOpen(true);
  };

  const handlemobilelogin = () => {
    setAuthType("login");
    setIsLoginModalOpen(true);
    setIsOpen(false); // Close mobile sidebar
  };

  /**
   * Effect: Keep header always visible and fixed at top
   * Header now stays fixed at the top on all pages
   * Ensures proper positioning and body padding
   */
  useEffect(() => {
    // Always keep header visible for fixed behavior
    setIsVisible(true);

    // Ensure fixed positioning works properly on container
    const ensureFixedBehavior = () => {
      const containerElement = document.querySelector(`.${styles.container}`);
      if (!containerElement) return;

      // Ensure fixed positioning is applied to container
      containerElement.style.position = "fixed";
      containerElement.style.top = "0";
      containerElement.style.left = "0";
      containerElement.style.right = "0";
      containerElement.style.zIndex = "1002";
      containerElement.style.width = "100%";
      containerElement.style.display = "flex";
      containerElement.style.visibility = "visible";

      // Ensure body has proper padding to prevent content overlap
      // Force 70px padding for desktop, 0 for mobile
      const isMobile = window.innerWidth <= 768;
      document.body.style.setProperty(
        "padding-top",
        isMobile ? "0px" : "70px",
        "important"
      );
    };

    // Run after DOM is ready
    const timer = setTimeout(ensureFixedBehavior, 100);

    return () => {
      clearTimeout(timer);
      // Note: We don't remove body padding on cleanup to maintain layout
      // The CSS handles the body padding globally
    };
  }, [location.pathname]);

  /**
   * Effect: Handle scroll to add sticky border to container
   * Adds border-bottom to container when user scrolls down
   */
  useEffect(() => {
    const handleScroll = () => {
      const containerElement = document.querySelector(`.${styles.container}`);
      if (!containerElement) return;

      // Add sticky class when scrolled down, remove when at top
      if (window.scrollY > 0) {
        containerElement.classList.add(styles.sticky);
      } else {
        containerElement.classList.remove(styles.sticky);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * Navigation Handlers
   */
  const handlehomeButton = () => {
    navigate("/");
  };

  /**
   * Extract user initials from name
   * @param {string} name - User's full name
   * @returns {string} - User's initials (e.g., "AV" for "Abhishek Vishwakarma")
   */
  const getUserInitials = (name) => {
    if (!name) return "U"; // Default to "U" for User if no name

    const nameParts = name.trim().split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }

    // Take first letter of first name and first letter of last name
    const firstInitial = nameParts[0].charAt(0).toUpperCase();
    const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();

    return firstInitial + lastInitial;
  };

  // Legacy home navigation effect (can be simplified)
  useEffect(() => {
    if (home) {
      navigate("/");
      setHome(false);
    }
  }, [home, navigate]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const SidebarCityModal = () => {
    setIsOpen(false); // Close sidebar first
    toggleModal(); // Then open city modal
  };

  /**
   * Search Functionality
   */

  // Debounced search to avoid excessive API calls
  const debouncedSearchMain = useMemo(
    () =>
      debounce((value) => {
        handleMainSearch(value);
      }, 300),
    []
  );

  // Main search API call handler
  const handleMainSearch = async (search = "") => {
    try {
      const resp = await api.get(
        `/sell-module/user/SearchUniversal?search=${search}`
      );

      if (resp.data == null) {
        setShowDropdown(false);
        return;
      }

      setResults(resp?.data[0]);
      setShowDropdown(true);
    } catch (error) {
      console.error("Search error:", error);
      setShowDropdown(false);
    }
  };

  // Handle search input changes
  const handleMainSearchChange = (e) => {
    const value = e.target.value.trimStart();
    setSearchTerm(value);
    debouncedSearchMain(value);
  };

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearchMain.cancel();
    };
  }, [debouncedSearchMain]);

  /**
   * Navigation Click Handlers
   */

  // Handle brand selection from search results or dropdowns
  const handleBrandClick = (id, brand) => {
    setIsVisible(false);

    // Navigate based on available slug structure
    if (brand?.subCategorySlug) {
      navigate(`/${brand.subCategorySlug}/${brand.slugSell}`);
    } else if (brand?.categorySlug && brand?.slugSell) {
      navigate(`/${brand.categorySlug}/${brand.slugSell}`);
    }

    // Clean up search state
    setShowDropdown(false);
    setSearchTerm("");
  };

  // Handle product selection from search results
  const handleProductClick = (id, prod) => {
    setHoveredItem(null);
    setIsVisible(false);

    // Navigate based on product's category structure
    if (prod?.subCategorySlug) {
      navigate(`/${prod?.subCategorySlug}/${prod.slugSell}`);
    } else if (prod?.categorySlug && prod?.slugSell) {
      navigate(`/${prod.categorySlug}/${prod.slugSell}`);
    }

    // Clean up search state
    setShowDropdown(false);
    setSearchTerm("");
  };

  // Handle category selection from search results
  const handleCategoryClick = (cat) => {
    setIsVisible(false);
    navigate(`/${cat.slug.sell}`);
    setShowDropdown(false);
    setSearchTerm("");
  };

  /**
   * Hover Handlers for Dropdown Interactions
   */
  const handleCategoryHover = (cat) => {
    setActiveCategory(cat.categoryName);
  };

  const handleBrandHover = (brand) => {
    setHoveredBrand(brand);
    setActiveBrand(brand.brandName);
    setActiveProducts(brand.products || []);
  };

  // Navigate to view all products page for a specific brand
  const handleProductnavigation = (id) => {
    setIsVisible(false);
    setHoveredItem(null);
    navigate(`/view-all-products/${id}`);
  };

  /**
   * Effect: Handle clicks outside dropdown menus to close them
   * Manages both search dropdown and navigation dropdown interactions
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close navigation dropdown when clicking outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHoveredItem(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /**
   * Effect: Fetch brands with their products for mobile phone navigation
   * Used in mobile modals for brand and product selection
   */
  useEffect(() => {
    const fetchBrandsAndProducts = async () => {
      try {
        const response = await api.get("/common-module/getBrandsAndProducts");
        setBrandsWithProducts(response.data?.BrandsWithProducts || []);
      } catch (error) {
        console.error("Error fetching brands and products:", error);
      }
    };

    fetchBrandsAndProducts();
  }, []);

  /**
   * Effect: Manage body scroll when mobile sidebar is open
   * Prevents background scrolling when sidebar is active
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /**
   * Effect: Fetch URL slugs for different sections (sell, buy, recycle)
   * Used to build navigation links dynamically (commented out since not used)
   */
  // useEffect(() => {
  //   const fetchFirstCategory = async () => {
  //     try {
  //       const res = await api.get("/common-module/first-category");
  //       if (res.data?.success) {
  //         setSlugs(res.data.slugs);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching first category:", err);
  //     }
  //   };

  //   fetchFirstCategory();
  // }, []);

  /**
   * Navigation Configuration
   */

  // Currently commenting out recycle navigation item
  // const navDisplayNames = {
  //   recycle: "Recycle Device",
  // };

  // Build navigation items from display names and slugs (commented out)
  // const navItems = Object.keys(navDisplayNames).map((type) => ({
  //   icon: recycleIcon,
  //   text: navDisplayNames[type],
  //   path: `/${slugs[type]}`,
  // }));

  // const navItems = []; // Empty array since recycle device is commented out

  // Routes where the bottom navigation should be hidden
  const hiddenRoutes = [
    "/my-profile",
    "/my-profile-orders",
    "/Address",
    "/my-profile-payments",
    "/offers",
    "/edit-my-profile",
  ];

  // Determine if bottom navigation should be shown
  const shouldShowNavbar =
    (location.pathname === "/" ||
      /^\/[a-zA-Z0-9-]+$/.test(location.pathname)) &&
    !hiddenRoutes.includes(location.pathname);

  /**
   * Effect: Auto-focus mobile search input when overlay opens
   * Improves mobile UX by immediately showing keyboard
   */
  useEffect(() => {
    if (isMobileSearchDrop && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isMobileSearchDrop]);

  return (
    <>
      {/* Main Header Container */}
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Left Group: Logo + City Selector */}
          <div className={styles.leftGroup}>
            {/* Company Logo */}
            <img
              src={HeaderLogo}
              alt="Logo"
              className={styles.logo}
              onClick={handlehomeButton}
            />

            {/* City Selection */}
            <div className={styles.citySelector} onClick={toggleModal}>
              <img
                src={NewLocationIcon}
                alt="Location"
                className={[styles.locationicon, "nav-icons"].join(" ")}
              />
              <div className={styles.cityNameContainer}>
                <span>{userSelection?.cityName || "Select City"}</span>
              </div>
              <img
                src={dropdownIcon}
                alt=""
                className={[styles.arrowImg, "nav-icons"].join(" ")}
              />
            </div>
          </div>

          {/* Search Bar with Dropdown Results */}
          <div className={styles.header_searchBar}>
            <div className={styles.searchContainer} ref={searchRef}>
              <input
                type="text"
                placeholder="What are you looking for..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={handleMainSearchChange}
                aria-label="Search"
              />
              <img
                src={NewSearchIcon}
                alt=""
                className={[styles.headerSearchIcon, "nav-icons"].join(" ")}
              />

              {/* Search Results Dropdown */}
              {showDropdown && (
                <div className={styles.dropdown} ref={dropdownRef}>
                  {["sell", "buy", "recycle"].map((contextType) => {
                    const hasBrands =
                      results.ActiveBrands?.[contextType]?.length > 0;
                    const hasProducts =
                      results.ActiveProducts?.[contextType]?.length > 0;
                    const hasCategories =
                      results.ActiveCategories?.[contextType]?.length > 0;

                    if (!hasBrands && !hasProducts && !hasCategories)
                      return null;

                    return (
                      <div key={contextType} className={styles.contextBlock}>
                        {/* Categories */}
                        {hasCategories && (
                          <div className={styles.resultGroup}>
                            {results.ActiveCategories[contextType].map(
                              (cat) => (
                                <div
                                  key={cat._id}
                                  className={styles.resultItem}
                                  onClick={() => handleCategoryClick(cat)}
                                >
                                  {cat.categoryName}
                                  <span className={styles.resultTag}>
                                    in {contextType}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        )}

                        {/* Brands */}
                        {hasBrands && (
                          <div>
                            {results.ActiveBrands[contextType].map((brand) => (
                              <div
                                key={brand._id}
                                className={styles.resultItem}
                                onClick={() =>
                                  handleBrandClick(brand._id, brand)
                                }
                              >
                                <div>
                                  <img
                                    height={15}
                                    width={15}
                                    src={brand?.brandLogo}
                                    alt={brand?.brandName}
                                  />
                                </div>
                                <div className={styles.searchNames}>
                                  {brand?.brandName}
                                  <span className={styles.resultTag}>
                                    in {contextType}{" "}
                                    {brand?.categoryData?.categoryName}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Products */}
                        {hasProducts && (
                          <div className={styles.resultGroup}>
                            {results.ActiveProducts[contextType].map(
                              (product) => (
                                <div
                                  key={product._id}
                                  className={styles.resultItem}
                                  onClick={() =>
                                    handleProductClick(product._id, product)
                                  }
                                >
                                  <div className={styles.productImage}>
                                    <img
                                      src={product?.devicePic}
                                      alt={product?.deviceName}
                                      height={20}
                                      width={20}
                                    />
                                  </div>
                                  <div className={styles.searchNames}>
                                    {product?.deviceName}
                                    <span className={styles.resultTag}>
                                      in {contextType}{" "}
                                      {product?.categoryData?.categoryName}
                                    </span>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Group: Become Partner + Login/User */}
          <div className={styles.rightGroup}>
            {/* Become Partner */}
            <Link to="/become-partner" className={styles.becomePartner}>
              {/* <img src={recycleIcon} alt="" className="nav-icons" /> */}
              <span>Become Partner</span>
            </Link>

            {/* Vertical Divider */}
            <div className={styles.verticalDivider}></div>

            {/* User Authentication Section */}
            <div className={styles.user}>
              {user?.phone ? (
                <div className={styles.dropdownContainer}>
                  <span className={styles.loginUserHover}>
                    <div className={styles.userInitials}>
                      {getUserInitials(user.name || user.phone)}
                    </div>
                    <img
                      src={dropdownIcon}
                      alt="dropdown"
                      className={[styles.dropdownArrow, "nav-icons"].join(" ")}
                    />
                  </span>
                  <div className={styles.profiledropdownMenu}>
                    <div
                      onClick={() => navigate("/my-profile-orders")}
                      className={styles.dropdownItem}
                    >
                      <FaUserCircle className={styles.icon} />
                      My Profile
                    </div>
                    <div
                      onClick={() => navigate("/my-orders")}
                      className={styles.dropdownItem}
                    >
                      <FaShoppingBag className={styles.icon} />
                      My Orders
                    </div>
                    <div
                      onClick={() => navigate("/offers")}
                      className={styles.dropdownItem}
                    >
                      <FaTags className={styles.icon} />
                      Offers
                    </div>
                    <div className={styles.dropdownItem}>
                      <FaSignOutAlt className={styles.icon} />
                      Logout
                    </div>
                  </div>
                </div>
              ) : (
                <div onClick={handleLoginClick} className={styles.loginButton}>
                  <img
                    src={usericon}
                    alt=""
                    className={[styles.usericon, "nav-icons"].join(" ")}
                  />
                  <span>Login</span>
                  <img
                    src={dropdownIcon}
                    alt=""
                    className={[styles.arrowImg, "nav-icons"].join(" ")}
                  />
                </div>
              )}
            </div>

            {isProfileDropDown && user?.phone && (
              <div className={styles.dropdownMenu}>
                <div
                  onClick={() => navigate("/my-profile")}
                  className={styles.dropdownItem}
                >
                  Profile
                </div>
                <div
                  onClick={() => navigate("/my-profile-orders")}
                  className={styles.dropdownItem}
                >
                  My Orders
                </div>
                <div
                  onClick={() => navigate("/")}
                  className={styles.dropdownItem}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Login/Signup Modal */}
        {isLoginModalOpen && (
          <div className={styles.loginmodalBackdrop}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <Suspense fallback={<Loader />}>
                {authType === "login" && (
                  <Login onSwitchToSignup={handleSignupClick} />
                )}

                {authType === "setup" && <SetupProfile />}
              </Suspense>
            </div>
          </div>
        )}

        {/* City Selection Modal */}
        <Suspense fallback={<Loader />}>
          <Cities />
        </Suspense>

        {/* Mobile Navigation Container */}
        {shouldShowNavbar && !isBrandModalOpen && !isCategoryModalOpen && (
          <div className={styles.mobileContainer}>
            <div className={styles.mobilerow}>
              {/* Mobile Header: Hamburger | Logo | Search */}
              <div className={styles.mobileHeaderLeftRow}>
                {/* Hamburger Menu - Far Left */}
                <div className={styles.mobileMenuIconMain}>
                  <img
                    src={NewMenuBar}
                    onClick={toggleSidebar}
                    alt="Menu"
                    className="nav-icons"
                  />
                </div>

                {/* Logo - Center */}
                <img
                  src={HeaderLogo}
                  alt="Logo"
                  className={styles.MobileLogo}
                  onClick={handlehomeButton}
                />
              </div>

              {/* Search Icon - Rightmost */}
              <div className={styles.mobileHeaderRightRow}>
                <div
                  className={styles.mobileSearchIcon}
                  onClick={() => setIsMobileSearchDrop(true)}
                >
                  <img src={NewSearchIcon} alt="Search" className="nav-icons" />
                </div>
                {isMobileSearchDrop && (
                  <div
                    className={styles.mobileSearchOverlay}
                    onClick={() => {
                      if (searchInputRef.current) {
                        searchInputRef.current.blur();
                      }
                    }}
                  >
                    <div
                      className={styles.topFixBox}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className={styles.mobileSearchHeader}>
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={handleMainSearchChange}
                          className={styles.mobileSearchInput}
                          ref={searchInputRef}
                        />
                        <img
                          src={NewSearchIcon}
                          alt=""
                          className={[styles.searchIcon, "nav-icons"].join(" ")}
                        />
                        <img
                          src={NewBackArrow}
                          alt=""
                          className={[styles.backArrow, "nav-icons"].join(" ")}
                          onClick={() => setIsMobileSearchDrop(false)}
                        />
                      </div>
                    </div>
                    <div
                      className={styles.mobileSearchResults}
                      onTouchStart={() => {
                        if (searchInputRef.current) {
                          searchInputRef.current.blur();
                        }
                      }}
                    >
                      {["sell", "buy", "recycle"].map((contextType) => {
                        const hasProducts =
                          results.ActiveProducts?.[contextType]?.length > 0;
                        if (!hasProducts) return null;

                        return (
                          <div
                            key={contextType}
                            className={styles.contextBlock}
                          >
                            {results.ActiveProducts[contextType].map(
                              (products) => (
                                <div
                                  key={products._id}
                                  className={styles.resultItem}
                                  onClick={() =>
                                    handleProductClick(products._id, products)
                                  }
                                >
                                  <img
                                    src={products.devicePic}
                                    alt=""
                                    className={styles.resultImage}
                                  />
                                  <div>
                                    <div>{products.deviceName}</div>
                                    <span className={styles.resultTag}>
                                      In {contextType}
                                    </span>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Mobile Sidebar Menu */}
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
          <div className={styles.sidebarHeader}>
            <div className={styles.citySelector} onClick={SidebarCityModal}>
              <img
                src={NewLocationIcon}
                alt="Location"
                className={[styles.locationicon, "nav-icons"].join(" ")}
              />
              <div className={styles.cityNameBox}>
                <p>your city </p>
                {userSelection?.cityName || "Select City"}
              </div>
              <img
                src={dropdownIcon}
                alt=""
                className={[styles.dropDownArrow, "nav-icons"].join(" ")}
              />
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              <img src={NewCloseIcon} alt="" className="nav-icons" />
            </button>
          </div>
          <div className={styles.sidebarContent}>
            {!user?.name && !user?.phone ? (
              <div className={styles.loginBox}>
                <div>
                  <p className={styles.greeting}>Hi!</p>
                  <p className={styles.prompt}>
                    <strong>{user?.userName || "Please Login/Signup"}</strong>
                  </p>
                  <p className={styles.note}>
                    For the best experience and customized offer
                  </p>
                </div>
                <button
                  className={styles.loginButton}
                  onClick={handlemobilelogin}
                >
                  Login
                </button>
              </div>
            ) : (
              <div className={styles.loginBox}>
                <div>
                  <p className={styles.greeting}>
                    Hi, <br /> {user?.name || user?.phone}!
                  </p>
                  <p className={styles.prompt}>Welcome back</p>
                </div>
                <button
                  className={styles.loginButton}
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/my-profile");
                  }}
                >
                  Profile
                </button>
              </div>
            )}

            <ul className={styles.menuList}>
              <li
                onClick={() => {
                  setIsOpen(false); // Close sidebar
                  setBrandModalOpen(true);
                }}
              >
                Sell Phone{" "}
                <span className={styles.arrow}>
                  <img src={NewBackArrow} alt="" className="nav-icons" />
                </span>
              </li>

              <li>
                <div
                  onClick={() => {
                    setIsOpen(false); // Close sidebar
                    setCategoryModalOpen(true);
                  }}
                  className={styles.menuItemWithArrow}
                >
                  Sell Gadgets{" "}
                  <span className={styles.arrow}>
                    <img src={NewBackArrow} alt="" className="nav-icons" />
                  </span>
                </div>
                {openMobileInnerDropdown === "sellGadgets" && (
                  <ul className={styles.subMenu}>
                    {/* Dynamically render categories */}
                    {category.map((cat) => (
                      <li key={cat._id}>
                        <div
                          onClick={() =>
                            setOpenMobileCategory(
                              openMobileCategory === cat._id ? null : cat._id
                            )
                          }
                          className={styles.menuItemWithArrow}
                        >
                          <div>
                            <img
                              src={cat.categoryImageUrl}
                              alt={cat.categoryName}
                              className={styles.mobileCategoryIcon}
                              style={{ width: 20, height: 20, marginRight: 8 }}
                            />
                            {cat.categoryName}
                          </div>

                          <span className={styles.arrow}>
                            <img
                              src={RightArrow}
                              alt=""
                              className="nav-icons"
                            />
                          </span>
                        </div>
                        {/* Show brands if this category is open */}
                        {openMobileCategory === cat._id && (
                          <ul className={styles.subMenu}>
                            {cat.brands && cat.brands.length > 0 ? (
                              cat.brands.slice(0, 10).map((brand) => (
                                <li
                                  key={brand._id}
                                  className={styles.brandName}
                                  onClick={() => {
                                    setIsOpen(false);
                                    setOpenMobileInnerDropdown(null);
                                    setOpenMobileCategory(null);
                                    handleBrandClick(brand._id, brand);
                                  }}
                                >
                                  <img
                                    src={brand.brandLogo}
                                    alt={cat.categoryName}
                                    className={styles.mobileCategoryIcon}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      marginRight: 8,
                                    }}
                                  />
                                  {brand.brandName}
                                </li>
                              ))
                            ) : (
                              <li style={{ color: "#888" }}>No brands</li>
                            )}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>Buy Phone</li>
              <li>Recycle Device</li>
              <li>Accessories</li>
              <li
                onClick={() => {
                  setIsOpen(false);
                  navigate("/our-stores");
                }}
              >
                Our Stores
              </li>
              <li>Become Partner</li>
              <li>More</li>
            </ul>
          </div>
        </div>
        {/* Mobile Category Selection Modal */}
        {isCategoryModalOpen && (
          <MobileFullScreenModal
            title="Sell Gadgets"
            onClose={() => {
              setCategoryModalOpen(false);
              navigate("/");
              setIsOpen(true); // Open sidebar
            }}
            onCloseBtn={() => {
              setCategoryModalOpen(false);
              setOpenMobileInnerDropdown(null);
              setOpenMobileCategory(null);
              setIsOpen(false);
            }}
          >
            <div className={styles.MobileInnerBox}>
              {/* Left: Categories */}
              <div className={styles.leftBrandBox}>
                <ul className={styles.mobileModalUl}>
                  {category.map((cat) => (
                    <li
                      key={cat._id}
                      onClick={() =>
                        setOpenMobileCategory(
                          openMobileCategory === cat._id ? null : cat._id
                        )
                      }
                      className={
                        openMobileCategory === cat._id ? styles.selected : ""
                      }
                    >
                      <img src={cat.categoryImageUrl} alt={cat.categoryName} />
                      {cat.categoryName}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Brands of selected category */}
              <div className={styles.rightBrandBox}>
                <h2>Popular Brands</h2>
                {openMobileCategory && (
                  <ul className={styles.mobileModalUl}>
                    {(
                      category.find((cat) => cat._id === openMobileCategory)
                        ?.brands || []
                    ).length > 0 ? (
                      category
                        .find((cat) => cat._id === openMobileCategory)
                        ?.brands.slice(0, 10)
                        .map((brand) => (
                          <li
                            key={brand._id}
                            onClick={() => {
                              setIsOpen(false);
                              setOpenMobileInnerDropdown(null);
                              setOpenMobileCategory(null);
                              setCategoryModalOpen(false);
                              handleBrandClick(brand._id, brand);
                            }}
                          >
                            <img
                              src={brand.brandLogo}
                              alt={brand.brandName}
                              className="brandimage"
                            />
                            {brand.brandName}
                          </li>
                        ))
                    ) : (
                      <li>No brands</li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </MobileFullScreenModal>
        )}
        {/* Mobile Brand Selection Modal */}
        {isBrandModalOpen && (
          <MobileFullScreenModal
            title="Sell Phone"
            onClose={() => {
              setBrandModalOpen(false);
              navigate("/");
              setIsOpen(true); // Open sidebar
            }}
            onCloseBtn={() => {
              setBrandModalOpen(false);
              setOpenMobileInnerDropdown(null);
              setOpenMobileCategory(null);
              setIsOpen(false);
            }}
          >
            <div className={styles.MobileInnerBox}>
              {/* Left: Brands list */}
              <div className={styles.leftBrandBox}>
                <ul className={styles.mobileModalUl}>
                  {brandsWithProducts.map((brand) => (
                    <li
                      key={brand._id}
                      onClick={() =>
                        setOpenMobileCategory(
                          openMobileCategory === brand._id ? null : brand._id
                        )
                      }
                      className={
                        openMobileCategory === brand._id ? styles.selected : ""
                      }
                    >
                      <img src={brand.brandLogo} alt={brand.brandName} />
                      {brand.brandName}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Phone models of selected brand */}
              {openMobileCategory && (
                <div className={styles.rightBrandBox}>
                  <h2>Popular Model</h2>
                  <ul className={styles.mobileModalUl}>
                    {(
                      brandsWithProducts.find(
                        (b) => b._id === openMobileCategory
                      )?.products || []
                    ).length > 0 ? (
                      brandsWithProducts
                        .find((b) => b._id === openMobileCategory)
                        .products.slice(0, 10)
                        .map((prod) => (
                          <li
                            key={prod._id}
                            onClick={() => {
                              setIsOpen(false);
                              setOpenMobileInnerDropdown(null);
                              setOpenMobileCategory(null);
                              setBrandModalOpen(false);
                              handleProductClick(prod._id, prod); // Navigate to product page
                            }}
                          >
                            <img
                              src={prod.devicePic}
                              alt={prod.deviceName}
                              className="brandimage"
                            />
                            {prod.deviceName}
                          </li>
                        ))
                    ) : (
                      <li>No models</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </MobileFullScreenModal>
        )}

        {isOpen && (
          <div className={styles.backdrop} onClick={toggleSidebar}></div>
        )}
        {loadCities && (
          <Suspense fallback={<Loader />}>
            <Cities />
          </Suspense>
        )}
        {/* Bottom Navigation Bar */}
        <div className={styles.bottomNavContainer}>
          {isVisible && (
            <div
              className={`${styles.bottomNav} ${!isVisible ? styles.hide : ""}`}
            >
              {[
                "Good deals",
                "Sell Phone",
                "Sell Gadget",
                "Buy Phone",
                "Recycle Device",
                "Accessories",
                "Our Store",
                "More",
              ].map((item, index) => (
                <div
                  key={index}
                  className={
                    item === "Sell Phone" || item === "Sell Gadget"
                      ? styles.dropdownTrigger
                      : styles.navItemNoDropdown
                  }
                  onMouseEnter={() => {
                    // Only set hover state for items with dropdowns
                    if (item === "Sell Phone" || item === "Sell Gadget") {
                      setHoveredItem(item);
                    }
                  }}
                  onMouseLeave={() => {
                    // Clear all dropdown states when leaving the trigger
                    if (item === "Sell Phone" || item === "Sell Gadget") {
                      setHoveredItem(null);
                      setActiveCategory(null);
                      setHoveredBrand(null);
                      setActiveBrand(null);
                      setActiveProducts([]);
                    }
                  }}
                >
                  <span>{item}</span>
                  {/* Only show dropdown icon for items that have dropdowns */}
                  {(item === "Sell Phone" || item === "Sell Gadget") && (
                    <img
                      src={dropdownIcon}
                      alt="Dropdown"
                      className="nav-icons"
                    />
                  )}

                  {item === "Sell Gadget" && hoveredItem === "Sell Gadget" && (
                    <div
                      className={styles.dropdownMenu}
                      ref={dropdownRef}
                      onMouseEnter={() => setHoveredItem("Sell Gadget")} // Keep dropdown open when hovering over it
                      onMouseLeave={() => {
                        setHoveredItem(null);
                        setActiveCategory(null);
                      }}
                    >
                      <div className={styles.categories}>
                        {category?.map((cat) => (
                          <div
                            key={cat._id}
                            className={`${styles.categoryItem} ${
                              activeCategory === cat.categoryName
                                ? styles.active
                                : ""
                            }`}
                            onMouseEnter={() => handleCategoryHover(cat)}
                          >
                            <img
                              src={cat?.categoryImageUrl}
                              alt={cat?.categoryName}
                            />
                            {cat?.categoryName}
                            <span className={styles.arrow}>
                              <img src={RightArrow} alt="" />
                            </span>
                          </div>
                        ))}
                      </div>

                      {activeCategory && (
                        <div className={styles.subMenu}>
                          <h4>Brands</h4>
                          <div className={styles.brandList}>
                            {category.map(
                              (brand) =>
                                activeCategory === brand.categoryName && (
                                  <div
                                    key={brand._id}
                                    className={styles.brandItems}
                                  >
                                    {brand?.brands
                                      ?.slice(0, 10)
                                      .map((brandTwo) => (
                                        <span
                                          key={brandTwo._id}
                                          className={styles.brandName}
                                          onMouseEnter={() =>
                                            setHoveredBrand(brandTwo)
                                          }
                                          onClick={() =>
                                            handleBrandClick(
                                              brandTwo._id,
                                              brandTwo
                                            )
                                          }
                                        >
                                          {brandTwo?.brandName}
                                          <br />
                                        </span>
                                      ))}
                                    {brand?.brands?.length > 4 && (
                                      <button className={styles.viewMoreButton}>
                                        View More
                                      </button>
                                    )}
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {item === "Sell Phone" && hoveredItem === "Sell Phone" && (
                    <div
                      className={styles.dropdownMenu}
                      ref={dropdownRef}
                      onMouseEnter={() => setHoveredItem("Sell Phone")} // Keep dropdown open when hovering over it
                      onMouseLeave={() => {
                        setHoveredItem(null);
                        setHoveredBrand(null);
                        setActiveBrand(null);
                        setActiveProducts([]);
                      }}
                    >
                      <div className={styles.categories}>
                        {brandsWithProducts?.slice(0, 3)?.map((brand) => (
                          <div
                            key={brand._id}
                            className={`${styles.categoryItem} 
                            ${
                              activeBrand === brand.brandName
                                ? styles.active
                                : ""
                            }
                            `}
                            onMouseEnter={() => handleBrandHover(brand)}
                          >
                            <img src={brand?.brandLogo} alt="" />
                            {brand?.brandName}
                            <span className={styles.arrow}>
                              <img src={RightArrow} alt="" />
                            </span>
                          </div>
                        ))}
                      </div>
                      {hoveredBrand && (
                        <div className={styles.subMenu}>
                          <h4>Top Selling Phones</h4>
                          <div className={styles.brandList}>
                            {activeProducts?.slice(0, 5)?.map((prod) => (
                              <div key={prod._id} className={styles.brandItems}>
                                <span
                                  className={styles.brandName}
                                  onClick={() =>
                                    handleProductClick(prod._id, prod)
                                  }
                                >
                                  {prod?.deviceName}
                                  <br />
                                </span>
                              </div>
                            ))}
                            {activeProducts.length > 4 && (
                              <button
                                onClick={() =>
                                  handleProductnavigation(hoveredBrand._id)
                                }
                                className={styles.viewMoreButton}
                              >
                                View More
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {item === "Buy Phone" && hoveredItem === "Buy Phone" && (
                    <div
                      className={styles.dropdownMenu}
                      ref={dropdownRef}
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "15%",
                        transform: "translateX(-15%)",
                        zIndex: 10000,
                        marginTop: "0px",
                        opacity: 1,
                        visibility: "visible",
                        pointerEvents: "auto",
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                      }}
                      onMouseEnter={() => setHoveredItem("Buy Phone")}
                      onMouseLeave={() => {
                        setHoveredItem(null);
                        setHoveredBrand(null);
                        setActiveBrand(null);
                        setActiveProducts([]);
                      }}
                    >
                      <div className={styles.categories}>
                        {brandsWithProducts?.slice(0, 3)?.map((brand) => (
                          <div
                            key={brand._id}
                            className={`${styles.categoryItem} ${
                              activeBrand === brand.brandName
                                ? styles.active
                                : ""
                            }`}
                            onMouseEnter={() => handleBrandHover(brand)}
                          >
                            <img src={brand?.brandLogo} alt="" />
                            {brand?.brandName}
                            <span className={styles.arrow}>
                              <img src={RightArrow} alt="" />
                            </span>
                          </div>
                        ))}
                      </div>
                      {hoveredBrand && (
                        <div className={styles.subMenu}>
                          <h4>Available Phones</h4>
                          <div className={styles.brandList}>
                            {activeProducts?.slice(0, 5)?.map((prod) => (
                              <div key={prod._id} className={styles.brandItems}>
                                <span
                                  className={styles.brandName}
                                  onClick={() =>
                                    handleProductClick(prod._id, prod)
                                  }
                                >
                                  {prod?.deviceName}
                                  <br />
                                </span>
                              </div>
                            ))}
                            {activeProducts.length > 4 && (
                              <button
                                onClick={() =>
                                  handleProductnavigation(hoveredBrand._id)
                                }
                                className={styles.viewMoreButton}
                              >
                                View More
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {item === "Accessories" && hoveredItem === "Accessories" && (
                    <div
                      className={styles.dropdownMenu}
                      ref={dropdownRef}
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "15%",
                        transform: "translateX(-15%)",
                        zIndex: 10000,
                        marginTop: "0px",
                        opacity: 1,
                        visibility: "visible",
                        pointerEvents: "auto",
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                      }}
                      onMouseEnter={() => setHoveredItem("Accessories")}
                      onMouseLeave={() => {
                        setHoveredItem(null);
                        setActiveCategory(null);
                      }}
                    >
                      <div className={styles.categories}>
                        <div className={styles.categoryItem}>
                          <span>Phone Cases</span>
                        </div>
                        <div className={styles.categoryItem}>
                          <span>Screen Protectors</span>
                        </div>
                        <div className={styles.categoryItem}>
                          <span>Chargers</span>
                        </div>
                        <div className={styles.categoryItem}>
                          <span>Headphones</span>
                        </div>
                        <div className={styles.categoryItem}>
                          <span>Power Banks</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {item === "Good deals" && hoveredItem === "Good deals" && (
                    <div
                      className={styles.dropdownMenu}
                      ref={dropdownRef}
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "15%",
                        transform: "translateX(-15%)",
                        zIndex: 10000,
                        marginTop: "0px",
                        opacity: 1,
                        visibility: "visible",
                        pointerEvents: "auto",
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                      }}
                      onMouseEnter={() => setHoveredItem("Good deals")}
                      onMouseLeave={() => {
                        setHoveredItem(null);
                      }}
                    >
                      <div className={styles.categories}>
                        <div className={styles.categoryItem}>
                          <span>Flash Sales</span>
                        </div>
                        <div className={styles.categoryItem}>
                          <span>Daily Deals</span>
                        </div>
                        <div className={styles.categoryItem}>
                          <span>Clearance</span>
                        </div>
                        <div className={styles.categoryItem}>
                          <span>Bundle Offers</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {item === "Recycle Device" &&
                    hoveredItem === "Recycle Device" && (
                      <div
                        className={styles.dropdownMenu}
                        ref={dropdownRef}
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "15%",
                          transform: "translateX(-15%)",
                          zIndex: 10000,
                          marginTop: "0px",
                          opacity: 1,
                          visibility: "visible",
                          pointerEvents: "auto",
                          willChange: "transform",
                          backfaceVisibility: "hidden",
                        }}
                        onMouseEnter={() => setHoveredItem("Recycle Device")}
                        onMouseLeave={() => {
                          setHoveredItem(null);
                        }}
                      >
                        <div className={styles.categories}>
                          <div className={styles.categoryItem}>
                            <span>Recycle Phone</span>
                          </div>
                          <div className={styles.categoryItem}>
                            <span>Recycle Tablet</span>
                          </div>
                          <div className={styles.categoryItem}>
                            <span>Recycle Laptop</span>
                          </div>
                          <div className={styles.categoryItem}>
                            <span>E-Waste Program</span>
                          </div>
                        </div>
                      </div>
                    )}

                  {item === "Our Store" && hoveredItem === "Our Store" && (
                    <div
                      className={styles.dropdownMenu}
                      ref={dropdownRef}
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "15%",
                        transform: "translateX(-15%)",
                        zIndex: 10000,
                        marginTop: "0px",
                        opacity: 1,
                        visibility: "visible",
                        pointerEvents: "auto",
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                      }}
                      onMouseEnter={() => setHoveredItem("Our Store")}
                      onMouseLeave={() => {
                        setHoveredItem(null);
                      }}
                    >
                      <div className={styles.categories}>
                        <NavLink
                          to="/our-stores"
                          className={styles.categoryItem}
                          onClick={() => setHoveredItem(null)}
                        >
                          <span>Visit Our Stores</span>
                        </NavLink>
                        <div className={styles.categoryItem}>
                          <span>Store Hours</span>
                        </div>
                        <div className={styles.categoryItem}>
                          <span>In-Store Services</span>
                        </div>
                        <div className={styles.categoryItem}>
                          <span>Book Appointment</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {item === "More" && hoveredItem === "More" && (
                    <div
                      className={styles.dropdownMenu}
                      ref={dropdownRef}
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "15%",
                        transform: "translateX(-15%)",
                        zIndex: 10000,
                        marginTop: "0px",
                        opacity: 1,
                        visibility: "visible",
                        pointerEvents: "auto",
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                      }}
                      onMouseEnter={() => setHoveredItem("More")}
                      onMouseLeave={() => {
                        setHoveredItem(null);
                      }}
                    >
                      <div className={styles.categories}>
                        <div className={styles.categoryItem}>
                          <span>About Us</span>
                        </div>
                        <div className={styles.categoryItem}>
                          <span>Contact</span>
                        </div>
                        <div className={styles.categoryItem}>
                          <span>FAQ</span>
                        </div>
                        <div className={styles.categoryItem}>
                          <span>Support</span>
                        </div>
                        <div className={styles.categoryItem}>
                          <span>Blog</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
