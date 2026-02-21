// import React, {
//   useState,
//   useEffect,
//   useContext,
//   useMemo,
//   useRef,
//   Suspense,
// } from "react";
// import styles from "./Header.module.css";
// import HeaderLogo from "../../assets/newicons/logo.svg";
// import sellIcon from "../../assets/newicons/sell.svg";
// import buyIcon from "../../assets/newicons/buy.svg";
// import repairIcon from "../../assets/newicons/repair.svg";
// import locationIcon from "../../assets/newicons/location.svg";
// import dropdownIcon from "../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";
// import usericon from "../../assets/newicons/user.svg";
// import CartIcon from "../../assets/newicons/cart.svg";
// import { IoIosSearch, IoMdClose } from "react-icons/io";
// import { BiCart, BiMenu, BiSearch, BiShoppingBag } from "react-icons/bi";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import RightArrow from "../../assets/icons/RightArrow.svg";
// import { UserContext } from "../../Context/contextAPI";
// import debounce from "lodash.debounce";
// import api from "../../Utils/api";
// import {
//   FaAngleRight,
//   FaShoppingBag,
//   FaSignOutAlt,
//   FaTags,
//   FaUserCircle,
// } from "react-icons/fa";
// import Loader from "../../Common/Loader/Loader";

// // ----------------------newicons-------------------------

// import NewSearchIcon from "../../assets/QuickSellNewIcons/Search.svg";
// import NewCartIcon from "../../assets/QuickSellNewIcons/Cart.svg";
// import NewMenuBar from "../../assets/QuickSellNewIcons/MenuBar.svg";
// import NewCloseIcon from "../../assets/QuickSellNewIcons/Cross.svg";
// import NewLocationIcon from "../../assets/QuickSellNewIcons/Location.svg";
// import NewOrderIcon from "../../assets/QuickSellNewIcons/OrderBox.svg";
// import NewProfileIcon from "../../assets/QuickSellNewIcons/Profile.svg";
// import NewOfferIcon from "../../assets/QuickSellNewIcons/Profile.svg";
// import NewBackArrow from "../../assets/QuickSellNewIcons/BackArrowwithouttail.svg"

// // import MenuBar from  "../../assets/QuickSellNewIcons/MenuBar.svg"

// const SignUp = React.lazy(() => import("../../ProfileModule/Signup/Signup"));
// const Login = React.lazy(() => import("../../ProfileModule/Login/Login"));
// const SetupProfile = React.lazy(() =>
//   import("../../ProfileModule/SetupProfile/SetupProfile")
// );
// const Cities = React.lazy(() => import("./Cities"));

// const Header = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [openMobileCategory, setOpenMobileCategory] = useState(null);
//   const [isVisible, setIsVisible] = useState(true);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
//   const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
//   const [isProfileDropDown, setIsProfileDropDown] = useState(false);
//   const [home, setHome] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [results, setResults] = useState({
//     ActiveBrands: { buy: [], repair: [], sell: [] },
//     ActiveProducts: { buy: [], repair: [], sell: [] },
//   });
//   const searchRef = useRef(null);
//   const [category, setCategories] = useState([]);
//   const dropdownRef = useRef(null);
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [authType, setAuthType] = useState("login");
//   const [hoveredBrand, setHoveredBrand] = useState(null);
//   const [openMobileInnerDropdown, setOpenMobileInnerDropdown] = useState(null);
//   const [isMobileSearchDrop, setIsMobileSearchDrop] = useState(false);
//   const [brandsWithProducts, setBrandsWithProducts] = useState([]);
//   const [activeProducts, setActiveProducts] = useState([]);
//   const [activeBrand, setActiveBrand] = useState(null);

//   const [slugs, setSlugs] = useState({
//     sell: "",
//     buy: "",
//     repair: "",
//   });

//   const {
//     userSelection,
//     user,
//     toggleModal,
//     isLoginModalOpen,
//     setIsLoginModalOpen,
//     loadCities,
//   } = useContext(UserContext);

//   const handlemobiledropdown = (menu) => {
//     setOpenMobileInnerDropdown(openMobileInnerDropdown === menu ? null : menu);
//   };

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await api.get("/common-module/categoryHasActiveBrands");
//         setCategories(res.data?.data || []);
//         console.log("Fetched Categories:", res.data);
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//       }
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowDropdown(false); // Close the dropdown
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleLoginClick = () => {
//     setAuthType("login");
//     setIsLoginModalOpen(true);
//   };

//   const handleSignupClick = () => {
//     setAuthType("signup");
//     setIsLoginModalOpen(true);
//   };

//   const handlemobilelogin = () => {
//     setAuthType("login");
//     setIsLoginModalOpen(true);
//     setIsOpen(false);
//   };

//   const handleloginclose = () => {
//     setIsLoginModalOpen(!true);
//   };

//   useEffect(() => {
//     if (location.pathname === "/") {
//       let lastScrollY = window.scrollY;
//       let ticking = false;

//       const handleScroll = () => {
//         if (!ticking) {
//           window.requestAnimationFrame(() => {
//             const currentScrollY = window.scrollY;
//             // Add a buffer of 20px to prevent flicker
//             if (currentScrollY <= 180) {
//               setIsVisible(true);
//             } else if (currentScrollY > 220) {
//               setIsVisible(false);
//             }
//             lastScrollY = currentScrollY;
//             ticking = false;
//           });
//           ticking = true;
//         }
//       };

//       window.addEventListener("scroll", handleScroll);
//       return () => window.removeEventListener("scroll", handleScroll);
//     } else {
//       setIsVisible(true);
//     }
//   }, [location.pathname]);

//   const handlehomeButton = () => {
//     setHome(true);
//   };

//   useEffect(() => {
//     if (home) {
//       navigate("/");
//       setHome(false);
//     }
//   }, [home]);

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const SidebarCityModal = () => {
//     setIsOpen(false);
//     toggleModal();
//   };

//   const debouncedSearchMain = useMemo(
//     () =>
//       debounce((value) => {
//         handleMainSearch(value);
//       }, 300),
//     []
//   );

//   const handleMainSearch = async (search = "") => {
//     try {
//       const resp = await api.get(
//         `/sell-module/user/SearchUniversal?search=${search}`
//       );
//       console.log("Data : ", resp.data);
//       if (resp.data == null) {
//         setShowDropdown(false);
//       }
//       setResults(resp.data[0]);
//       setShowDropdown(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleMainSearchChange = (e) => {
//     const value = e.target.value.trimStart();
//     setSearchTerm(value);
//     console.log(searchTerm);
//     debouncedSearchMain(value);
//   };

//   useEffect(() => {
//     return () => {
//       debouncedSearchMain.cancel();
//     };
//   }, [debouncedSearchMain]);

//   const handleBrandClick = (id, brand) => {
//     setIsVisible(false);
//     //console.log("Previous slug",location.pathname);
//     console.log("Brand navigateion click-->", brand);
//     if (brand?.subCategorySlug) {
//       navigate(`/${brand.subCategorySlug}/${brand.slugSell}`);
//     } else if (brand?.categorySlug && brand?.slugSell) {
//       navigate(`/${brand.categorySlug}/${brand.slugSell}`);
//     }
//     setShowDropdown(false);
//     setSearchTerm("");
//   };

//   const handleProductClick = (id, prod) => {
//     setHoveredItem(null);
//     setIsVisible(false);
//     console.log("Product navigation click-->", prod);
//     if (prod?.subCategorySlug) {
//       navigate(`/${prod?.subCategorySlug}/${prod.slugSell}`);
//     } else if (prod?.categorySlug && prod?.slugSell) {
//       navigate(`/${prod.categorySlug}/${prod.slugSell}`);
//       setShowDropdown(false);
//       setSearchTerm("");
//     }
//   };

//   const handleCategoryClick = (cat) => {
//     setIsVisible(false);
//     navigate(`/${cat.slug.sell}`);
//     setShowDropdown(false);
//     setSearchTerm("");
//   };

//   const handleCategoryHover = (cat) => {
//     setActiveCategory(cat.categoryName);
//   };
//   const handleBrandHover = (brand) => {
//     setHoveredBrand(brand);
//     setActiveBrand(brand.brandName);
//     setActiveProducts(brand.products || []);
//   };

//   const handleProductnavigation = (id) => {
//     setIsVisible(false);
//     setHoveredItem(null);
//     navigate(`/view-all-products/${id}`);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowDropdown(false); // Close the dropdown
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setHoveredItem(null); // Hide the dropdown
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const fetchBrandsAndProducts = async () => {
//     try {
//       const response = await api.get("/common-module/getBrandsAndProducts");
//       console.log("finall", response.data);
//       setBrandsWithProducts(response.data?.BrandsWithProducts || []);
//       console.log("Fetched Brands and Products:", response.data);
//     } catch (error) {
//       console.error("Error fetching brands and products:", error);
//     }
//   };
//   useEffect(() => {
//     fetchBrandsAndProducts();
//   }, []);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await api.get("/common-module/categoryHasActiveBrands");
//         setCategories(res.data?.data || []);
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//       }
//     };

//     const fetchFirstCategory = async () => {
//       try {
//         const res = await api.get("/common-module/first-category");
//         // console.log("First Category fetched:", res.data);
//         if (res.data?.success) {
//           setSlugs(res.data.slugs); // { sell: "slug1", buy: "slug2", repair: "slug3" }
//         }
//       } catch (err) {
//         console.error("Error fetching first category:", err);
//       }
//     };

//     fetchCategories();
//     fetchFirstCategory();
//   }, []);

//   const navIcons = {
//     sell: sellIcon,
//     buy: buyIcon,
//     repair: repairIcon,
//   };

//   const navDisplayNames = {
//     sell: "Sell",
//     buy: "Buy",
//     repair: "Repair",
//   };

//   const navItems = Object.keys(slugs).map((type) => ({
//     icon: navIcons[type],
//     text: navDisplayNames[type],
//     path: `/${slugs[type]}`,
//   }));

//   const shouldShowNavbar =
//     location.pathname === "/" || /^\/[a-zA-Z0-9\-]+$/.test(location.pathname);

//   const searchInputRef = useRef(null);
//   useEffect(() => {
//     if (isMobileSearchDrop && searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, [isMobileSearchDrop]);

//   return (
//     <>
//       <header className={styles.header}>
//         <div className={styles.container}>
//           <img
//             src={HeaderLogo}
//             alt="Logo"
//             className={styles.logo}
//             onClick={handlehomeButton}
//           />

//           <div className={styles.navLinks}>
//             <div className={styles.navLinks}>
//               {navItems.map((item, index) => (
//                 <Link
//                   to={item.path}
//                   state={{ from: "/" }}
//                   key={index}
//                   className={styles.navItem}
//                 >
//                   <img src={item.icon} alt={item.text} className="nav-icons" />
//                   <span>{item.text}</span>
//                 </Link>
//               ))}
//             </div>

//             <div className={styles.becomePartner}>Become Partner</div>
//           </div>
//           <div className={styles.header_searchBar}>
//             <div className={styles.searchContainer} ref={searchRef}>
//               <input
//                 type="text"
//                 placeholder="What are you looking for..."
//                 className={styles.searchInput}
//                 value={searchTerm}
//                 onChange={handleMainSearchChange}
//                 aria-label="Search"
//               />
//               <img src={NewSearchIcon} alt="" />

//               {showDropdown && (
//                 <div className={styles.dropdown} ref={dropdownRef}>
//                   {["sell", "buy", "repair"].map((contextType) => {
//                     const hasBrands =
//                       results.ActiveBrands?.[contextType]?.length > 0;
//                     const hasProducts =
//                       results.ActiveProducts?.[contextType]?.length > 0;
//                     const hasCategories =
//                       results.ActiveCategories?.[contextType]?.length > 0;

//                     if (!hasBrands && !hasProducts && !hasCategories)
//                       return null;

//                     return (
//                       <div key={contextType} className={styles.contextBlock}>
//                         {/* Categories */}
//                         {hasCategories && (
//                           <div className={styles.resultGroup}>
//                             {results.ActiveCategories[contextType].map(
//                               (cat) => (
//                                 <div
//                                   key={cat._id}
//                                   className={styles.resultItem}
//                                   onClick={() => handleCategoryClick(cat)}
//                                 >
//                                   {cat.categoryName}
//                                   <span className={styles.resultTag}>
//                                     in {contextType}
//                                   </span>
//                                 </div>
//                               )
//                             )}
//                           </div>
//                         )}

//                         {/* Brands */}
//                         {hasBrands && (
//                           <div className={styles.resultGroup}>
//                             {results.ActiveBrands[contextType].map((brand) => (
//                               <div
//                                 key={brand._id}
//                                 className={styles.resultItem}
//                                 onClick={() =>
//                                   handleBrandClick(brand._id, brand)
//                                 }
//                               >
//                                 <div className={styles.searchImg}>
//                                   <img src={brand?.brandLogo} alt="" />
//                                 </div>
//                                 <div className={styles.searchNames}>
//                                   {brand?.brandName}
//                                   <span className={styles.resultTag}>
//                                     in {contextType}{" "}
//                                     {brand?.categoryId?.categoryName}
//                                   </span>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         )}

//                         {/* Products */}
//                         {hasProducts && (
//                           <div className={styles.resultGroup}>
//                             {results.ActiveProducts[contextType].map(
//                               (product) => (
//                                 <div
//                                   key={product._id}
//                                   className={styles.resultItem}
//                                   onClick={() =>
//                                     handleProductClick(product._id, product)
//                                   }
//                                 >
//                                   <div className={styles.searchImg}>
//                                     <img src={product?.devicePic} alt="" />
//                                   </div>
//                                   <div className={styles.searchNames}>
//                                     {product?.deviceName}
//                                     <span className={styles.resultTag}>
//                                       in {contextType}{" "}
//                                       {product?.deviceCategory?.categoryName}
//                                     </span>
//                                   </div>
//                                 </div>
//                               )
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className={styles.actions}>
//             <div className={styles.citySelector} onClick={toggleModal}>
//               <img
//                 src={NewLocationIcon}
//                 alt="Location"
//                 className={styles.locationicon}
//               />
//               <div className={styles.cityNameContainer}>
//                 <span>{userSelection?.cityName || "Select City"}</span>
//               </div>
//               <img src={dropdownIcon} alt="" />
//             </div>
//             <div className={styles.user}>
//               {user?.phone ? (
//                 <div className={styles.dropdownContainer}>
//                   <span className={styles.loginUserHover}>
//                     <img src={usericon} alt="" className={styles.usericon} />
//                     {user.name}
//                     <img
//                       src={dropdownIcon}
//                       alt="dropdown"
//                       className={styles.dropdownArrow}
//                     />
//                   </span>
//                   <div className={styles.profiledropdownMenu}>
//                     <div
//                       onClick={() => navigate("/my-profile-orders")}
//                       className={styles.dropdownItem}
//                     >
//                       <FaUserCircle className={styles.icon} />
//                       My Profile
//                     </div>
//                     <div
//                       onClick={() => navigate("/my-orders")}
//                       className={styles.dropdownItem}
//                     >
//                       <FaShoppingBag className={styles.icon} />
//                       My Orders
//                     </div>
//                     <div
//                       onClick={() => navigate("/offers")}
//                       className={styles.dropdownItem}
//                     >
//                       <FaTags className={styles.icon} />
//                       Offers
//                     </div>
//                     <div className={styles.dropdownItem}>
//                       <FaSignOutAlt className={styles.icon} />
//                       Logout
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div onClick={handleLoginClick} className={styles.loginButton}>
//                   <img src={usericon} alt="" className={styles.usericon} />
//                   <span>Login</span>
//                   <img src={dropdownIcon} alt="" />
//                 </div>
//               )}
//             </div>

//             {isProfileDropDown && user?.phone && (
//               <div className={styles.dropdownMenu}>
//                 <div
//                   onClick={() => navigate("/my-profile-orders")}
//                   className={styles.dropdownItem}
//                 >
//                   Profile
//                 </div>
//                 <div
//                   onClick={() => navigate("/my-profile-orders")}
//                   className={styles.dropdownItem}
//                 >
//                   My Orders
//                 </div>
//                 <div
//                   onClick={() => navigate("/")}
//                   className={styles.dropdownItem}
//                 >
//                   Logout
//                 </div>
//               </div>
//             )}
//             <img src={NewCartIcon} alt="Bag" className={styles.bagIcon} />
//           </div>
//         </div>
//         {isLoginModalOpen && (
//           <div className={styles.loginmodalBackdrop}>
//             <div
//               className={styles.modal}
//               onClick={(e) => e.stopPropagation()} // prevent backdrop close when clicking inside modal
//             >
//               <button onClick={handleloginclose} className={styles.closebtn}>
//                 <img src={NewCloseIcon} alt="" />
//               </button>
//               <Suspense fallback={<Loader />}>
//                 {/* <Login onSwitchToSignup={handleSignupClick} /> */}
//                 {authType === "login" && (
//                   <Login onSwitchToSignup={handleSignupClick} />
//                 )}

//                 {authType === "setup" && <SetupProfile />}
//               </Suspense>
//             </div>
//           </div>
//         )}

//         {shouldShowNavbar && (
//           <div className={styles.mobileContainer}>
//             <div className={styles.mobilerow}>
//               <div
//                 className={styles.mobileMenuIconMain}
//                 onClick={toggleSidebar}
//               >
//                 <img src={NewMenuBar} alt="" />

//                 <img
//                   src={HeaderLogo}
//                   alt="Logo"
//                   className={styles.MobileLogo}
//                   onClick={handlehomeButton}
//                 />
//               </div>

//               <div className={styles.mobileHeaderRightRow}>
//                 <div
//                   className={styles.mobileMenuIcon}
//                   onClick={() => setIsMobileSearchDrop(true)}
//                 >
//                   <img src={NewSearchIcon} alt="" />
//                 </div>

//                 {isMobileSearchDrop && (
//                   <div className={styles.mobileSearchOverlay}>
//                     <div className={styles.mobileSearchHeader}>
//                       <input
//                         type="text"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         onChange={handleMainSearchChange}
//                         className={styles.mobileSearchInput}
//                         ref={searchInputRef}
//                       />
//                       <img src={NewSearchIcon} alt="" />

//                        <img src={NewBackArrow} alt="" className={styles.backArrow} />

//                     </div>

//                     <div className={styles.mobileSearchResults}>
//                       {["sell", "buy", "repair"].map((contextType) => {
//                         const hasProducts =
//                           results.ActiveProducts?.[contextType]?.length > 0;
//                         if (!hasProducts) return null;

//                         return (
//                           <div
//                             key={contextType}
//                             className={styles.contextBlock}
//                           >
//                             {results.ActiveProducts[contextType].map(
//                               (product) => (
//                                 <div
//                                   key={product._id}
//                                   className={styles.resultItem}
//                                   onClick={() =>
//                                     handleProductClick(product._id, product)
//                                   }
//                                 >
//                                   <img
//                                     src={product.devicePic}
//                                     alt=""
//                                     className={styles.resultImage}
//                                   />
//                                   <div>
//                                     <div>{product.deviceName}</div>
//                                     <span className={styles.resultTag}>
//                                       In {contextType}
//                                     </span>
//                                   </div>
//                                 </div>
//                               )
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 <div className={styles.mobileMenuIcon} onClick={toggleSidebar}>
//                   <img src={NewCartIcon} alt="Bag" className={styles.bagIcon} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
//           <div>
//             <div className={styles.citySelector} onClick={SidebarCityModal}>
//               <img
//                 src={NewLocationIcon}
//                 alt="Location"
//                 className={styles.locationicon}
//               />
//               <div className={styles.cityNameBox}>
//                 <p>your city </p>
//                 {userSelection?.cityName || "Select City"}
//               </div>
//               <img src={dropdownIcon} alt="" className={styles.dropDownArrow} />
//             </div>
//             <button
//               className={styles.closeBtn}
//               onClick={() => setIsOpen(false)}
//             >
//               <img src={NewCloseIcon} alt="" />
//             </button>
//           </div>

//           {!user?.name ? (
//             <div className={styles.loginBox}>
//               <div>
//                 <p className={styles.greeting}>Hi!</p>
//                 <p className={styles.prompt}>
//                   <strong> {user?.userName || "Please Login/Signup"}</strong>
//                 </p>
//                 <p className={styles.note}>
//                   For the best experience and customized offer
//                 </p>
//               </div>
//               <button
//                 className={styles.loginButton}
//                 onClick={handlemobilelogin}
//               >
//                 Login
//               </button>
//             </div>
//           ) : (
//             <div className={styles.loginBox}>
//               <div>
//                 <p className={styles.greeting}>Hi, {user?.name}!</p>
//                 <p className={styles.prompt}>Welcome back</p>
//                 <p className={styles.note}>
//                   For the best experience and customized offer
//                 </p>
//               </div>
//               <button
//                 className={styles.loginButton}
//                 onClick={() => {
//                   setIsOpen(false);
//                   navigate("/my-profile-orders");
//                 }}
//               >
//                 View Profile
//               </button>
//             </div>
//           )}

//           <div className={styles.profileBoxes}>
//             <ul>
//               <li>
//                 <img src={NewProfileIcon} alt="" />
//                 <span>Profile</span>
//               </li>
//               <li>
//                 <img src={NewOrderIcon} alt="" />
//                 <span>Orders</span>
//               </li>

//               <li>
//                 <img src={NewOrderIcon} alt="" />
//                 <span>Offers</span>
//               </li>
//             </ul>
//           </div>

//           <ul className={styles.menuList}>
//             <li onClick={() => {}}>Sell Phone</li>
//             <li>
//               <div
//                 onClick={() =>
//                   setOpenMobileInnerDropdown(
//                     openMobileInnerDropdown === "sellGadgets"
//                       ? null
//                       : "sellGadgets"
//                   )
//                 }
//                 className={styles.menuItemWithArrow}
//               >
//                 Sell Gadgets{" "}
//                 <span className={styles.arrow}>
//                   <img src={RightArrow} alt="" />
//                 </span>
//               </div>
//               {openMobileInnerDropdown === "sellGadgets" && (
//                 <ul className={styles.subMenu}>
//                   {/* Dynamically render categories */}
//                   {category.map((cat) => (
//                     <li key={cat._id}>
//                       <div
//                         onClick={() =>
//                           setOpenMobileCategory(
//                             openMobileCategory === cat._id ? null : cat._id
//                           )
//                         }
//                         className={styles.menuItemWithArrow}
//                       >
//                         <div>
//                           <img
//                             src={cat.categoryImageUrl}
//                             alt={cat.categoryName}
//                             className={styles.mobileCategoryIcon}
//                             style={{ width: 20, height: 20, marginRight: 8 }}
//                           />
//                           {cat.categoryName}
//                         </div>

//                         <span className={styles.arrow}>
//                           <img src={RightArrow} alt="" />
//                         </span>
//                       </div>
//                       {/* Show brands if this category is open */}
//                       {openMobileCategory === cat._id && (
//                         <ul className={styles.subMenu}>
//                           {cat.brands && cat.brands.length > 0 ? (
//                             cat.brands.slice(0, 10).map((brand) => (
//                               <li
//                                 key={brand._id}
//                                 className={styles.brandName}
//                                 onClick={() => {
//                                   setIsOpen(false);
//                                   setOpenMobileInnerDropdown(null);
//                                   setOpenMobileCategory(null);
//                                   handleBrandClick(brand._id, brand);
//                                 }}
//                               >
//                                 <img
//                                   src={brand.brandLogo}
//                                   alt={cat.categoryName}
//                                   className={styles.mobileCategoryIcon}
//                                   style={{
//                                     width: 20,
//                                     height: 20,
//                                     marginRight: 8,
//                                   }}
//                                 />
//                                 {brand.brandName}
//                               </li>
//                             ))
//                           ) : (
//                             <li style={{ color: "#888" }}>No brands</li>
//                           )}
//                         </ul>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//             <li>Buy Phone</li>
//             <li>Repair Device</li>
//             <li>Accessories</li>
//             <li>Our Store</li>
//             <li>More</li>
//           </ul>
//         </div>
//         {isOpen && (
//           <div className={styles.backdrop} onClick={toggleSidebar}></div>
//         )}
//         {loadCities && (
//           <Suspense fallback={<Loader />}>
//             <Cities />
//           </Suspense>
//         )}
//         <div className={styles.bottomNavContainer}>
//           {isVisible && (
//             <div
//               className={`${styles.bottomNav} ${!isVisible ? styles.hide : ""}`}
//             >
//               {[
//                 "Good deals",
//                 "Sell Phone",
//                 "Sell Gadget",
//                 "Buy Phone",
//                 "Repair Device",
//                 "Accessories",
//                 "Our Store",
//                 "More",
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className={styles.dropdownTrigger}
//                   onMouseEnter={() => setHoveredItem(item)}
//                 >
//                   <span>{item}</span>
//                   <img src={dropdownIcon} alt="Dropdown" />

//                   {item === "Sell Gadget" && hoveredItem === "Sell Gadget" && (
//                     <div className={styles.dropdownMenu} ref={dropdownRef}>
//                       <div className={styles.categories}>
//                         {category?.map((cat) => (
//                           <div
//                             key={cat._id}
//                             className={`${styles.categoryItem} ${
//                               activeCategory === cat.categoryName
//                                 ? styles.active
//                                 : ""
//                             }`}
//                             onMouseEnter={() => handleCategoryHover(cat)}
//                           >
//                             <img src={cat?.categoryImageUrl} alt="" />
//                             {cat?.categoryName}
//                             <span className={styles.arrow}>
//                               <img src={RightArrow} alt="" />
//                             </span>
//                           </div>
//                         ))}
//                       </div>

//                       {activeCategory && (
//                         <div className={styles.subMenu}>
//                           <h4>Brands</h4>
//                           <div className={styles.brandList}>
//                             {category.map(
//                               (brand) =>
//                                 activeCategory === brand.categoryName && (
//                                   <div
//                                     key={brand._id}
//                                     className={styles.brandItems}
//                                   >
//                                     {brand?.brands
//                                       ?.slice(0, 10)
//                                       .map((brandTwo) => (
//                                         <span
//                                           key={brandTwo._id}
//                                           className={styles.brandName}
//                                           onMouseEnter={() =>
//                                             setHoveredBrand(brandTwo)
//                                           }
//                                           onClick={() =>
//                                             handleBrandClick(
//                                               brandTwo._id,
//                                               brandTwo
//                                             )
//                                           }
//                                         >
//                                           {brandTwo?.brandName}
//                                           <br />
//                                         </span>
//                                       ))}
//                                     {brand?.brands?.length > 4 && (
//                                       <button className={styles.viewMoreButton}>
//                                         View More
//                                       </button>
//                                     )}
//                                   </div>
//                                 )
//                             )}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {item === "Sell Phone" && hoveredItem === "Sell Phone" && (
//                     <div className={styles.dropdownMenu} ref={dropdownRef}>
//                       <div className={styles.categories}>
//                         {brandsWithProducts?.slice(0, 3)?.map((brand) => (
//                           <div
//                             key={brand._id}
//                             className={`${styles.categoryItem}
//                             ${
//                               activeBrand === brand.brandName
//                                 ? styles.active
//                                 : ""
//                             }
//                             `}
//                             onMouseEnter={() => handleBrandHover(brand)}
//                           >
//                             <img src={brand?.brandLogo} alt="" />
//                             {brand?.brandName}
//                             <span className={styles.arrow}>
//                               <img src={RightArrow} alt="" />
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                       {hoveredBrand && (
//                         <div className={styles.subMenu}>
//                           <h4>Top Selling Phones</h4>
//                           <div className={styles.brandList}>
//                             {activeProducts?.slice(0, 5)?.map((prod) => (
//                               <div key={prod._id} className={styles.brandItems}>
//                                 <span
//                                   className={styles.brandName}
//                                   onClick={() =>
//                                     handleProductClick(prod._id, prod)
//                                   }
//                                 >
//                                   {prod?.deviceName}
//                                   <br />
//                                 </span>
//                               </div>
//                             ))}
//                             {activeProducts.length > 4 && (
//                               <button
//                                 onClick={() =>
//                                   handleProductnavigation(hoveredBrand._id)
//                                 }
//                                 className={styles.viewMoreButton}
//                               >
//                                 View More
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;

import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useRef,
  Suspense,
} from "react";
import styles from "./Header.module.css";
import HeaderLogo from "../../assets/newicons/logo.svg";
import sellIcon from "../../assets/newicons/sell.svg";
import buyIcon from "../../assets/newicons/buy.svg";
import repairIcon from "../../assets/newicons/repair.svg";
import locationIcon from "../../assets/newicons/location.svg";
import dropdownIcon from "../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";
import usericon from "../../assets/newicons/user.svg";
import CartIcon from "../../assets/newicons/cart.svg";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { BiCart, BiMenu, BiSearch, BiShoppingBag } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RightArrow from "../../assets/icons/RightArrow.svg";
import { UserContext } from "../../Context/contextAPI";
import debounce from "lodash.debounce";
import api from "../../Utils/api";
import {
  FaAngleRight,
  FaShoppingBag,
  FaSignOutAlt,
  FaTags,
  FaUserCircle,
} from "react-icons/fa";
import Loader from "../../Common/Loader/Loader";

// ----------------------newicons-------------------------

import NewSearchIcon from "../../assets/QuickSellNewIcons/Search.svg";
import NewCartIcon from "../../assets/QuickSellNewIcons/Cart.svg";
import NewMenuBar from "../../assets/QuickSellNewIcons/MenuBar.svg";
import NewCloseIcon from "../../assets/QuickSellNewIcons/Cross.svg";
import NewLocationIcon from "../../assets/QuickSellNewIcons/Location.svg";
import NewOrderIcon from "../../assets/QuickSellNewIcons/OrderBox.svg";
import NewProfileIcon from "../../assets/QuickSellNewIcons/Profile.svg";
import NewOfferIcon from "../../assets/QuickSellNewIcons/Profile.svg";
import NewBackArrow from "../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";
import MobileFullScreenModal from "./FullScreenModal";
import recycleIcon from "../../assets/QuickSellNewIcons/recycle.png";

// import MenuBar from  "../../assets/QuickSellNewIcons/MenuBar.svg"

const SignUp = React.lazy(() => import("../../ProfileModule/Signup/Signup"));
const Login = React.lazy(() => import("../../ProfileModule/Login/Login"));
const SetupProfile = React.lazy(() =>
  import("../../ProfileModule/SetupProfile/SetupProfile")
);
const Cities = React.lazy(() => import("./Cities"));

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMobileCategory, setOpenMobileCategory] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const [isProfileDropDown, setIsProfileDropDown] = useState(false);
  const [home, setHome] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState({
    ActiveBrands: { buy: [], repair: [], sell: [] },
    ActiveProducts: { buy: [], repair: [], sell: [] },
  });
  const searchRef = useRef(null);
  const [category, setCategories] = useState([]);
  const dropdownRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [hoveredBrand, setHoveredBrand] = useState(null);
  const [openMobileInnerDropdown, setOpenMobileInnerDropdown] = useState(null);
  const [isMobileSearchDrop, setIsMobileSearchDrop] = useState(false);
  const [brandsWithProducts, setBrandsWithProducts] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);
  const [activeBrand, setActiveBrand] = useState(null);

  const [slugs, setSlugs] = useState({
    sell: "",
    buy: "",
    repair: "",
  });

  const {
    userSelection,
    user,
    toggleModal,
    isLoginModalOpen,
    setIsLoginModalOpen,
    loadCities,
  } = useContext(UserContext);

  const handlemobiledropdown = (menu) => {
    setOpenMobileInnerDropdown(openMobileInnerDropdown === menu ? null : menu);
  };
  useEffect(() => {
    if (isMobileSearchDrop) {
      document.body.style.overflow = "hidden"; // stop background scroll
    } else {
      document.body.style.overflow = "auto"; // restore scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [isMobileSearchDrop]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/common-module/categoryHasActiveBrands");
        // const res = await api.get(
        //   "/common-module/category?option=Sell&all=true"
        // );

        setCategories(res.data?.data || []);
        //console.log("FETCHED CATTTTTTT",res?.data || []);
        // setCategories(allCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false); // Close the dropdown
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isBrandModalOpen, setBrandModalOpen] = useState(false);

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
    setIsOpen(false);
  };

  const handleloginclose = () => {
    setIsLoginModalOpen(!true);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      let lastScrollY = window.scrollY;
      let ticking = false;

      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            // Add a buffer of 20px to prevent flicker
            if (currentScrollY <= 180) {
              setIsVisible(true);
            } else if (currentScrollY > 220) {
              setIsVisible(false);
            }
            lastScrollY = currentScrollY;
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsVisible(true);
    }
  }, [location.pathname]);

  const handlehomeButton = () => {
    navigate("/");
  };

  useEffect(() => {
    if (home) {
      navigate("/");
      setHome(false);
    }
  }, [home]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const SidebarCityModal = () => {
    setIsOpen(false);
    toggleModal();
  };

  const debouncedSearchMain = useMemo(
    () =>
      debounce((value) => {
        handleMainSearch(value);
      }, 300),
    []
  );

  const handleMainSearch = async (search = "") => {
    try {
      const resp = await api.get(
        `/sell-module/user/SearchUniversal?search=${search}`
      );

     // console.log("reps", resp);

      if (resp.data == null) {
        setShowDropdown(false);
      }
      setResults(resp?.data[0]);
      setShowDropdown(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMainSearchChange = (e) => {
    const value = e.target.value.trimStart();
    setSearchTerm(value);
    debouncedSearchMain(value);
  };

  useEffect(() => {
    return () => {
      debouncedSearchMain.cancel();
    };
  }, [debouncedSearchMain]);

  const handleBrandClick = (id, brand) => {
    setIsVisible(false);
    //console.log("Previous slug",location.pathname);
    if (brand?.subCategorySlug) {
      navigate(`/${brand.subCategorySlug}/${brand.slugSell}`);
    } else if (brand?.categorySlug && brand?.slugSell) {
      navigate(`/${brand.categorySlug}/${brand.slugSell}`);
    }
    setShowDropdown(false);
    setSearchTerm("");
  };

  const handleProductClick = (id, prod) => {
    setHoveredItem(null);
    setIsVisible(false);
    if (prod?.subCategorySlug) {
      console.log(
        "Navigating to subcategory slug",
        `/${prod?.subCategorySlug}/${prod.slugSell}`
      );
      navigate(`/${prod?.subCategorySlug}/${prod.slugSell}`);
    } else if (prod?.categorySlug && prod?.slugSell) {
      console.log(
        "Navigating to category slug",
        `/${prod.categorySlug}/${prod.slugSell}`
      );
      navigate(`/${prod.categorySlug}/${prod.slugSell}`);
      setShowDropdown(false);
      setSearchTerm("");
    }
  };

  const handleCategoryClick = (cat) => {
    setIsVisible(false);
    navigate(`/${cat.slug.sell}`);
    setShowDropdown(false);
    setSearchTerm("");
  };

  const handleCategoryHover = (cat) => {
    setActiveCategory(cat.categoryName);
  };
  const handleBrandHover = (brand) => {
    setHoveredBrand(brand);
    setActiveBrand(brand.brandName);
    setActiveProducts(brand.products || []);
  };

  const handleProductnavigation = (id) => {
    setIsVisible(false);
    setHoveredItem(null);
    navigate(`/view-all-products/${id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false); // Close the dropdown
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHoveredItem(null); // Hide the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchBrandsAndProducts = async () => {
    try {
      const response = await api.get("/common-module/getBrandsAndProducts");
      setBrandsWithProducts(response.data?.BrandsWithProducts || []);
    } catch (error) {
      console.error("Error fetching brands and products:", error);
    }
  };
  useEffect(() => {
    fetchBrandsAndProducts();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable body scroll
    } else {
      document.body.style.overflow = ""; // Re-enable body scroll
    }

    return () => {
      // Cleanup on component unmount
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    // const fetchCategories = async () => {
    //   try {
    //     // const res = await api.get("/common-module/categoryHasActiveBrands");
    //     const res = await api.get(
    //       "/common-module/category?option=Sell&all=true"
    //     );
    //     console.log("Other api response for categories:", res);
    //     setCategories(res.data?.categories || []);
    //   } catch (err) {
    //     console.error("Error fetching categories:", err);
    //   }
    // };

    const fetchFirstCategory = async () => {
      try {
        const res = await api.get("/common-module/first-category");
        // console.log("First Category fetched:", res.data);
        if (res.data?.success) {
          setSlugs(res.data.slugs); // { sell: "slug1", buy: "slug2", repair: "slug3" }
        }
      } catch (err) {
        console.error("Error fetching first category:", err);
      }
    };

    // fetchCategories();
    fetchFirstCategory();
  }, []);

  const navIcons = {
    recycle: recycleIcon, // 👈 add recycle
    repair: repairIcon,   // keep repair if needed
  };

  const navDisplayNames = {
    recycle: "Recycle",
    repair: "Repair", // keep only what you want
  };

  // const navItems = Object.keys(slugs).map((type) => ({
  //   icon: navIcons[type],
  //   text: navDisplayNames[type],
  //   path: `/${slugs[type]}`,
  // }));\
  const navItems = Object.keys(navDisplayNames).map((type) => ({
    icon: navIcons[type],
    text: navDisplayNames[type],
    path: `/${slugs[type]}`, // slugs must also contain recycle & repair
  }));

  const hiddenRoutes = [
  "/my-profile",
  "/my-profile-orders",
  "/Address",
  "/my-profile-payments",
  "/offers",
  "/edit-my-profile"
];

const shouldShowNavbar =
  (location.pathname === "/" || /^\/[a-zA-Z0-9\-]+$/.test(location.pathname)) &&
  !hiddenRoutes.includes(location.pathname);

  // const shouldShowNavbar =
  //   location.pathname === "/" || /^\/[a-zA-Z0-9\-]+$/.test(location.pathname);

  const searchInputRef = useRef(null);
  useEffect(() => {
    if (isMobileSearchDrop && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isMobileSearchDrop]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <img
            src={HeaderLogo}
            alt="Logo"
            className={styles.logo}
            onClick={handlehomeButton}
          />

          <div className={styles.navLinks}>
            <div className={styles.navLinks}>
              {navItems.map((item, index) => (
                <Link
                  to={item.path}
                  state={{ from: "/" }}
                  key={index}
                  className={styles.navItem}
                >
                  <img src={item.icon} alt={item.text} className="nav-icons" />
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>

            <div className={styles.becomePartner}>Become Partner</div>
          </div>
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
              <img src={NewSearchIcon} alt="" className={styles.headerSearchIcon} />

              {showDropdown && (
                <div className={styles.dropdown} ref={dropdownRef}>
                  {["sell", "buy", "repair"].map((contextType) => {
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
                            {results.ActiveProducts[contextType].map((product) => (
                              <div
                                key={product._id}
                                className={styles.resultItem}
                                onClick={() => handleProductClick(product._id, product)}
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
                                    in {contextType} {product?.categoryData?.categoryName}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            <div className={styles.citySelector} onClick={toggleModal}>
              <img
                src={NewLocationIcon}
                alt="Location"
                className={styles.locationicon}
              />
              <div className={styles.cityNameContainer}>
                <span>{userSelection?.cityName || "Select City"}</span>
              </div>
              <img src={dropdownIcon} alt="" className={styles.arrowImg} />
            </div>
            <div className={styles.user}>
              {user?.phone ? (
                <div className={styles.dropdownContainer}>
                  <span className={styles.loginUserHover}>
                    <img src={usericon} alt="" className={styles.usericon} />
                    {user.name ? user.name : user.phone} {/* 👈 Show name if exists, otherwise phone */}
                    <img
                      src={dropdownIcon}
                      alt="dropdown"
                      className={styles.dropdownArrow}
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
                  <img src={usericon} alt="" className={styles.usericon} />
                  <span>Login</span>
                  <img src={dropdownIcon} alt="" className={styles.arrowImg} />
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
            {/* <img src={NewCartIcon} alt="Bag" className={styles.bagIcon} /> */}
          </div>
        </div>
        {isLoginModalOpen && (
          <div className={styles.loginmodalBackdrop}>
            <div
              className={styles.modal}
              onClick={(e) => e.stopPropagation()} // prevent backdrop close when clicking inside modal
            >
              <Suspense fallback={<Loader />}>
                {authType === "login" && (
                  <Login onSwitchToSignup={handleSignupClick} />
                )}

                {authType === "setup" && <SetupProfile />}
              </Suspense>
            </div>
          </div>
        )}

        {shouldShowNavbar && (
          <div className={styles.mobileContainer}>
            <div className={styles.mobilerow}>
              <div className={styles.mobileMenuIconMain}>
                <img src={NewMenuBar} onClick={toggleSidebar} alt="" />

                <img
                  src={HeaderLogo}
                  alt="Logo"
                  className={styles.MobileLogo}
                  onClick={handlehomeButton}
                />
              </div>

              <div className={styles.mobileHeaderRightRow}>
                <div
                  className={styles.mobileMenuIcon}
                  onClick={() => setIsMobileSearchDrop(true)}
                >
                  <img src={NewSearchIcon} alt="" />
                </div>
                {isMobileSearchDrop && (
                  <div
                    className={styles.mobileSearchOverlay}
                    onClick={() => {
                      if (searchInputRef.current) {
                        searchInputRef.current.blur(); // hides keyboard if user taps outside
                      }
                    }}
                  >
                    <div className={styles.topFixBox} onClick={(e) => e.stopPropagation()}>
                      <div className={styles.mobileSearchHeader}>
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={handleMainSearchChange}
                          className={styles.mobileSearchInput}
                          ref={searchInputRef}
                        />
                        <img src={NewSearchIcon} alt="" className={styles.searchIcon} />
                        <img
                          src={NewBackArrow}
                          alt=""
                          className={styles.backArrow}
                          onClick={() => setIsMobileSearchDrop(false)}
                        />
                      </div>
                    </div>
                    <div
                      className={styles.mobileSearchResults}
                      onTouchStart={() => {
                        if (searchInputRef.current) {
                          searchInputRef.current.blur(); // hides keyboard on scroll/touch
                        }
                      }}
                    >
                      {["sell", "buy", "repair"].map((contextType) => {
                        const hasProducts = results.ActiveProducts?.[contextType]?.length > 0;
                        if (!hasProducts) return null;

                        return (
                          <div key={contextType} className={styles.contextBlock}>
                            {results.ActiveProducts[contextType].map((products) => (
                              <div
                                key={products._id}
                                className={styles.resultItem}
                                onClick={() => handleProductClick(products._id, products)}
                              >
                                <img
                                  src={products.devicePic}
                                  alt=""
                                  className={styles.resultImage}
                                />
                                <div>
                                  <div>{products.deviceName}</div>
                                  <span className={styles.resultTag}>In {contextType}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>

                  </div>
                )}

                {/* 
                <div className={styles.mobileMenuIcon} onClick={toggleSidebar}>
                  <img src={NewCartIcon} alt="Bag" className={styles.bagIcon} />
                </div> */}
              </div>
            </div>
          </div>
        )}
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
          <div>
            <div className={styles.citySelector} onClick={SidebarCityModal}>
              <img
                src={NewLocationIcon}
                alt="Location"
                className={styles.locationicon}
              />
              <div className={styles.cityNameBox}>
                <p>your city </p>
                {userSelection?.cityName || "Select City"}
              </div>
              <img src={dropdownIcon} alt="" className={styles.dropDownArrow} />
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              <img src={NewCloseIcon} alt="" />
            </button>
          </div>
          {!user?.name && !user?.phone ? (   // 👈 If neither name nor phone → show login box
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
                  {/* 👆 Show name if available, otherwise phone */}
                </p>
                <p className={styles.prompt}>Welcome back</p>
              </div>
              <button
                className={styles.loginButton}
                onClick={() => {
                  setIsOpen(false);
                  navigate("/my-profile-orders");
                }}
              >
                Logout
              </button>
            </div>
          )}

          {/* Profile section visible if user has name OR phone */}
          {user && (user.name || user.phone) && (
            <div className={styles.profileBoxes}>
              <ul>
                <Link
                  to="/my-profile"
                  onClick={() => setIsOpen(false)}
                >
                  <li>
                    <img src={NewProfileIcon} alt="" />
                    <span>Profile</span>
                  </li>
                </Link>

                <Link
                  to="/my-profile-orders"
                  onClick={() => setIsOpen(false)}
                >
                  <li>
                    <img src={NewOrderIcon} alt="" />
                    <span>Orders</span>
                  </li>
                </Link>

                <Link
                  to="/my-profile-orders"
                  onClick={() => setIsOpen(false)}
                >
                  <li>
                    <img src={NewOrderIcon} alt="" />
                    <span>Offers</span>
                  </li>
                </Link>
              </ul>
            </div>
          )}

          <ul className={styles.menuList}>
            <li onClick={() => setBrandModalOpen(true)}>
              Sell Phone{" "}
              <span className={styles.arrow}>
                <img src={NewBackArrow} alt="" />
              </span>
            </li>

            <li>
              <div
                onClick={() => setCategoryModalOpen(true)} // ✅ Open Modal
                className={styles.menuItemWithArrow}
              >
                Sell Gadgets{" "}
                <span className={styles.arrow}>
                  <img src={NewBackArrow} alt="" />
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
                          <img src={RightArrow} alt="" />
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
            <li>Repair Device</li>
            <li>Accessories</li>
            <li>Our Store</li>
            <li>More</li>
            <li className={styles.bottomButtons}>
              <button className={styles.partnerButton}>Become Partner</button>
              <button className={styles.partnerButton}> <img src={recycleIcon} alt="" />Recycle</button>

            </li>


          </ul>
        </div>
        {isCategoryModalOpen && (
          <MobileFullScreenModal
            title="Sell Gadgets"
            onClose={() => setCategoryModalOpen(false)}
          >
            <button
              className={styles.closeBtn}
              onClick={() => {
                setCategoryModalOpen(false); // ✅ Close modal
                setOpenMobileInnerDropdown(null);
                setOpenMobileCategory(null);
                setIsOpen(false);
              }}
            >
              <img src={NewCloseIcon} alt="" />
            </button>

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
                {openMobileCategory && (
                  <ul className={styles.mobileModalUl}>
                    <h2>Select Brands</h2>
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
                            <img src={brand.brandLogo} alt={brand.brandName} />
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
        {isBrandModalOpen && (
          <MobileFullScreenModal
            title="Sell Phone"
            onClose={() => setBrandModalOpen(false)}
          >
            <button
              className={styles.closeBtn}
              onClick={() => {
                setBrandModalOpen(false);
                setOpenMobileInnerDropdown(null);
                setOpenMobileCategory(null);
                setIsOpen(false);
              }}
            >
              <img src={NewCloseIcon} alt="" />
            </button>

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
              <div className={styles.rightBrandBox}>
                {openMobileCategory && (
                  <ul className={styles.mobileModalUl}>
                    <h2>Select Model</h2>
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
                            <img src={prod.devicePic} alt={prod.deviceName} />
                            {prod.deviceName}
                          </li>
                        ))
                    ) : (
                      <li>No models</li>
                    )}
                  </ul>
                )}
              </div>
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
                "Repair Device",
                "Accessories",
                "Our Store",
                "More",
              ].map((item, index) => (
                <div
                  key={index}
                  className={styles.dropdownTrigger}
                  onMouseEnter={() => setHoveredItem(item)}
                >
                  <span>{item}</span>
                  <img src={dropdownIcon} alt="Dropdown" />

                  {item === "Sell Gadget" && hoveredItem === "Sell Gadget" && (
                    <div className={styles.dropdownMenu} ref={dropdownRef}>
                      <div className={styles.categories}>
                        {category?.map((cat) => (
                          <div
                            key={cat._id}
                            className={`${styles.categoryItem} ${activeCategory === cat.categoryName
                              ? styles.active
                              : ""
                              }`}
                            onMouseEnter={() => handleCategoryHover(cat)}
                          >
                            <img src={cat?.categoryImageUrl} alt={cat?.categoryName} />
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
                    <div className={styles.dropdownMenu} ref={dropdownRef}>
                      <div className={styles.categories}>
                        {brandsWithProducts?.slice(0, 3)?.map((brand) => (
                          <div
                            key={brand._id}
                            className={`${styles.categoryItem} 
                            ${activeBrand === brand.brandName
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
