// // SelectBrand.js
// import { forwardRef, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./AllCategory.module.css";
// import api from "../../Utils/api";

// const AllCategory = forwardRef((props, ref) => {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [ selectedCategory, setSelectedCategory ] = useState(null);

//   const fetchCategories = async () => {
//     try {
//       const response = await api.get(
//         "/common-module/category?option=Sell&all=true"
//       );
//       setCategories(response?.data?.categories);
//     } catch (error) {
//       console.log("Error fetching Categories ", error);
//     }
//   };

//   const handleNavigate = async (selectedCategory) => {

//     try {
//       const resp = await api.get(`/common-module/CheckHavesubcategory/${selectedCategory}`);
//       if (resp.data.data) {
//         navigate(`/${selectedCategory?.slug?.sell}`);
//       } else {
//         GotoSearchBrands(selectedCategory);
//       }
//     } catch (error) {
//       console.log("Error fetching sub category", error);
//     }
//   };

//   const GotoSearchBrands = async (id) => {
//     try {
//       const brandResp = await api.get(
//         `/common-module/FetchbrandByCatSelection?option=Sell&categoryId=${id}`
//       );
//       setBrands(brandResp.data?.data);
//     } catch (innerError) {
//       console.log("Error fetching brands:", innerError);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if(selectedCategory) {
//       handleNavigate(selectedCategory);
//     }
//   },[selectedCategory]);

//   const handleCataClick = (categoryId) => {
//     setSelectedCategory(categoryId);
//   }
//   const handleBrandClick = (brandId) => {
//     navigate(`/select-series/${brandId}`);
//   }

//   return (
//     <section ref={ref} className="default-padding-section scrollbar-hidden">
//       <div className="wrapper">
//         <div className={styles.selectBrandWrapper}>
//           <div className={styles.headingFlex}>
//             <h2 className={styles.sectionHeading}>All Category</h2>
//           </div>

//           <div className={`${styles.brandImageBox} scrollbar-hidden`}>
//             {categories?.map((cat, index) => (
//               <div
//                 key={index}
//                 className={`${styles.brandSingleBox} cursor-pointer`}
//                 onClick={() => handleCataClick(cat._id)}              >
//                 <div className={styles.imgIndividual}>
//                   <img src={cat?.categoryImageUrl} alt={cat?.categoryName} />
//                 </div>
//                 <span>{cat?.categoryName}</span>
//               </div>
//             ))}
//           </div>

//             {brands?.length > 0 && (
//               <h2 className={styles.sectionHeading}>All Brands</h2>
//             )}
//           <div className={`${styles.brandImageBox} scrollbar-hidden`}>

//             {brands?.map((brand, index) => (
//               <div
//                 key={index}
//                 className={`${styles.brandSingleBox} cursor-pointer`}
//                 onClick={() => handleBrandClick(brand._id)}>
//                 <div className={styles.imgIndividual}>
//                   <img src={brand?.brandLogo} alt={brand?.brandName} />
//                 </div>
//                 <span>{brand?.brandName}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// });

// export default AllCategory;

// SelectBrand.js
import { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllCategory.module.css";
import api from "../../Utils/api";

const AllCategory = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [brands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await api.get(
        "/common-module/category?option=Sell&all=true"
      );
      setCategories(response?.data?.categories);
    } catch (error) {
      console.log("Error fetching Categories ", error);
    }
  };

  const handleNavigate = async (selectedCategory) => {
    // console.log('Selected Category:', selectedCategory);

    navigate(`/${selectedCategory?.slug?.sell}`);

    // try {
    //   const resp = await api.get(`/common-module/CheckHavesubcategory/${selectedCategory._id}`);
    //   if (resp.data.data) {
    //     navigate(`/${selectedCategory?.slug?.sell}`);
    //   } else {
    //     GotoSearchBrands(selectedCategory);
    //   }
    // } catch (error) {
    //   console.log("Error fetching sub category", error);
    // }
  };

  // const GotoSearchBrands = async (id) => {
  //   try {
  //     const brandResp = await api.get(
  //       `/common-module/FetchbrandByCatSelection?option=Sell&categoryId=${id}`
  //     );
  //     setBrands(brandResp.data?.data);
  //   } catch (innerError) {
  //     console.log("Error fetching brands:", innerError);
  //   }
  // };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      handleNavigate(selectedCategory);
    }
  }, [handleNavigate, selectedCategory]);

  const handleCataClick = (category) => {
    setSelectedCategory(category);
  };
  const handleBrandClick = (brandId) => {
    navigate(`/select-series/${brandId}`);
  };

  return (
    <section ref={ref} className="default-padding-section scrollbar-hidden">
      <div className="wrapper">
        <div className={styles.selectBrandWrapper}>
          <div className={styles.headingFlex}>
            <h2 className={styles.sectionHeading}>Selling Services</h2>
          </div>

          <div className={`${styles.brandImageBox} scrollbar-hidden`}>
            {categories?.map((cat, index) => (
              <div
                key={index}
                className={`${styles.brandSingleBox} cursor-pointer`}
                onClick={() => handleCataClick(cat)}
              >
                <div className={styles.imgIndividual}>
                  <img src={cat?.categoryImageUrl} alt={cat?.categoryName} />
                </div>
                <span>{cat?.categoryName}</span>
              </div>
            ))}
          </div>

          {brands?.length > 0 && (
            <h2 className={styles.sectionHeading}>All Brands</h2>
          )}
          <div className={`${styles.brandImageBox} scrollbar-hidden`}>
            {brands?.map((brand, index) => (
              <div
                key={index}
                className={`${styles.brandSingleBox} cursor-pointer`}
                onClick={() => handleBrandClick(brand._id)}
              >
                <div className={styles.imgIndividual}>
                  <img src={brand?.brandLogo} alt={brand?.brandName} />
                </div>
                <span>{brand?.brandName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default AllCategory;
