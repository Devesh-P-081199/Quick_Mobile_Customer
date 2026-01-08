import { useState, useRef, useMemo, useCallback, useContext, useEffect } from "react";
import debounce from "lodash.debounce";
import api from "../../../../../Utils/api";
import { UserContext } from "../../../../../Context/contextAPI";

/**
 * Default empty search results structure
 */
const EMPTY_RESULTS = {
  ActiveBrands: [],
  ActiveProducts: [],
};

/**
 * Custom hook for SellBanner data management
 * Handles categories, brands, and search functionality
 */
export function useSellBannerData(slug1) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingBrands, setIsLoadingBrands] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [catName, setCatName] = useState("");
  const [results, setResults] = useState(EMPTY_RESULTS);
  const [mobileResults, setMobileResults] = useState(EMPTY_RESULTS);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(null);

  const categoryRef = useRef(null);
  const { setSelectedCategory } = useContext(UserContext);

  /**
   * Fetch all categories and select the appropriate one based on URL slug
   */
  const fetchCategories = useCallback(async () => {
    setIsLoadingCategories(true);
    try {
      const response = await api.get(
        "/common-module/category?option=Sell&all=true"
      );
      const allCategories = response?.data?.categories || [];
      setCategories(allCategories);

      // If URL has a slug, match category using slug
      let selectedCat = allCategories.find((cat) => cat?.slug?.sell === slug1);

      // If no match, fallback to first
      if (!selectedCat && allCategories.length > 0) {
        selectedCat = allCategories[0];
      }

      if (selectedCat) {
        setSelectedCategory(selectedCat._id);
        setSelectedCategoryId(selectedCat._id);
        setCatName(selectedCat.categoryName);
        categoryRef.current = selectedCat._id;

        await fetchBrandsByCategory(selectedCat._id);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setError({ type: 'categories', message: 'Failed to load categories' });
    } finally {
      setIsLoadingCategories(false);
    }
  }, [slug1, setSelectedCategory]);

  /**
   * Fetch brands for a specific category
   */
  const fetchBrandsByCategory = useCallback(async (categoryId) => {
    setIsLoadingBrands(true);
    try {
      const brandResp = await api.get(
        `/common-module/FetchbrandByCatSelection?option=Sell&categoryId=${categoryId}`
      );
      setBrands(brandResp.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch brands:", err);
      setError({ type: 'brands', message: 'Failed to load brands' });
    } finally {
      setIsLoadingBrands(false);
    }
  }, []);

  /**
   * Perform main search for brands and products
   */
  const handleMainSearch = useCallback(async (search = "", isMobile = false) => {
    const catId = categoryRef.current;
    if (!catId) return;

    try {
      const resp = await api.get(
        `/sell-module/user/main-Search?search=${search}&catId=${catId}`
      );
      const data = resp.data?.[0];

      if (!data) {
        if (isMobile) {
          setMobileResults(EMPTY_RESULTS);
        } else {
          setResults(EMPTY_RESULTS);
          setShowDropdown(false);
        }
        return;
      }

      if (isMobile) {
        setMobileResults(data);
      } else {
        setResults(data);
        setShowDropdown(true);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setError({ type: 'search', message: 'Search failed' });
    }
  }, []);

  /**
   * Debounced search function
   */
  const debouncedSearch = useMemo(
    () =>
      debounce((value, isMobile) => {
        handleMainSearch(value, isMobile);
      }, 300),
    [handleMainSearch]
  );

  /**
   * Handle category selection and navigation
   */
  const selectCategory = useCallback(
    async (id, categoryName) => {
      setCatName(categoryName);
      setSelectedCategory(id);
      setSelectedCategoryId(id);
      categoryRef.current = id;
      setShowDropdown(false);

      await fetchBrandsByCategory(id);
    },
    [fetchBrandsByCategory, setSelectedCategory]
  );

  /**
   * Clear search results
   */
  const clearResults = useCallback((isMobile = false) => {
    if (isMobile) {
      setMobileResults(EMPTY_RESULTS);
    } else {
      setShowDropdown(false);
    }
  }, []);

  /**
   * Close dropdown
   */
  const closeDropdown = useCallback(() => {
    setShowDropdown(false);
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);



  // Cancel debounced search on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return {
    // Data
    categories,
    brands,
    catName,
    selectedCategoryId,
    results,
    mobileResults,
    showDropdown,
    error,
    
    // Loading states
    isLoadingCategories,
    isLoadingBrands,
    
    // Actions
    fetchCategories,
    fetchBrandsByCategory,
    selectCategory,
    debouncedSearch,
    clearResults,
    closeDropdown,
    clearError,
  };
}

export default useSellBannerData;
