// BREADCRUM TESTING

import { useParams, useNavigate } from "react-router-dom";
import {
  useEffect,
  useState,
  Suspense,
  lazy,
  useRef,
  useCallback,
} from "react";
import api from "../../../../Utils/api";
import Loader from "../../components/layout/Loader/Loader";
import GetUpto from "../../../sell/components/GetUpto/GetUpto";
import SEO from "../../../../Utils/SEO";
import BreadCrumb from "../../components/layout/BreadCrumb/BreadCrumb";
import { UserContext } from "../../../../Context/contextAPI";
import { useContext } from "react";

const SellHome = lazy(() => import("../../../sell/pages/SellHome"));
const SelectSubCata = lazy(
  () => import("../../../sell/components/SelectSubCategories/SelectSubCata"),
);
const SelectSeries = lazy(
  () => import("../../../sell/components/SelectSeries/SelectSeries"),
);
const SelectVarient = lazy(() => import("../../../sell/pages/SelectVarient"));

const DynamicRouteHandler = () => {
  const [seoData, setSeoData] = useState(null);

  const { slug1, slug2 } = useParams();
  const navigate = useNavigate();

  const { setUserSelection } = useContext(UserContext);

  const [ComponentToRender, setComponentToRender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { label: "Home", path: "/" },
  ]); // 👈 breadcrumb state

  const resolvedSlugCache = useRef({});

  const resolveRouting = useCallback(async () => {
    setLoading(true);

    try {
      let slug1Type, categoryHasSub;

      if (!slug2 && resolvedSlugCache.current[slug1]) {
        ({ slug1Type, categoryHasSub } = resolvedSlugCache.current[slug1]);
      } else {
        const slug1Res = await api.get(
          `/sell-module/user/resolve-category-or-subcategory/${slug1}`,
        );
        slug1Type = slug1Res.data?.type;
        categoryHasSub = slug1Res.data?.hasSubcategories;
        setSeoData(slug1Res.data?.seoData?.Sell);

        if (!slug2) {
          resolvedSlugCache.current[slug1] = { slug1Type, categoryHasSub };
        }
      }

      // 🔹 CATEGORY FLOW
      if (slug1Type === "category") {
        setBreadcrumbItems([
          { label: "Home", path: "/" },
          { label: slug1, path: `/${slug1}` },
        ]); // 👈 add category

        if (!slug2 && !categoryHasSub) {
          setComponentToRender(() => SellHome);
          return;
        }

        if (!slug2 && categoryHasSub) {
          setComponentToRender(() => SelectSubCata);
          return;
        }

        if (slug2) {
          const res2 = await api.get(
            `/sell-module/user/resolve-brand-or-product/${slug2}`,
          );
          const type2 = res2.data?.type;

          setSeoData(res2.data?.seoData?.Sell);

          if (type2 === "brand") {
            setBreadcrumbItems([
              { label: "Home", path: "/" },
              { label: slug1, path: `/${slug1}` },
              { label: res2.data?.name || slug2, path: `/${slug1}/${slug2}` },
            ]); // 👈 add brand
            setComponentToRender(() => SelectSeries);
            return;
          }
          if (type2 === "product") {
            // Build breadcrumb with brand lookup
            const breadcrumb = [
              { label: "Home", path: "/" },
              { label: slug1, path: `/${slug1}` },
            ];

            // Check if product has deviceBrand ID - fetch brand details
            console.log("🔍 Product data:", res2.data);
            if (res2.data?.data?.product?.deviceBrand) {
              console.log(
                "🔍 Product has deviceBrand ID:",
                res2.data.data.product.deviceBrand,
              );
              try {
                const brandsRes = await api.get(
                  "/common-module/getBrandsAndProducts",
                );
                const brands = brandsRes.data?.BrandsWithProducts || [];
                console.log("🔍 Total brands fetched:", brands.length);
                const brand = brands.find(
                  (b) => b._id === res2.data.data.product.deviceBrand,
                );
                console.log("🔍 Brand found:", brand);

                if (brand && brand.slugSell) {
                  breadcrumb.push({
                    label: brand.slugSell,
                    path: `/${slug1}/${brand.slugSell}`,
                  });
                  console.log("✅ Brand added to breadcrumb:", brand.slugSell);
                }
              } catch (err) {
                console.error("Error fetching brand for breadcrumb:", err);
              }
            } else {
              console.log("⚠️ No deviceBrand found in res2.data.data.product");
              console.log(
                "⚠️ res2.data structure:",
                JSON.stringify(res2.data, null, 2),
              );
            }

            breadcrumb.push({
              label: res2.data?.name || slug2,
              path: `/${slug1}/${slug2}`,
            });
            setBreadcrumbItems(breadcrumb);
            setComponentToRender(() => SelectVarient);
            return;
          }
          if (type2 === "variant") {
            // Build breadcrumb with brand lookup
            const breadcrumb = [
              { label: "Home", path: "/" },
              { label: slug1, path: `/${slug1}` },
            ];

            // Check if variant has deviceBrand ID - fetch brand details
            if (res2.data?.data?.product?.deviceBrand) {
              try {
                const brandsRes = await api.get(
                  "/common-module/getBrandsAndProducts",
                );
                const brands = brandsRes.data?.BrandsWithProducts || [];
                const brand = brands.find(
                  (b) => b._id === res2.data.data.product.deviceBrand,
                );

                if (brand && brand.slugSell) {
                  breadcrumb.push({
                    label: brand.slugSell,
                    path: `/${slug1}/${brand.slugSell}`,
                  });
                }
              } catch (err) {
                console.error("Error fetching brand for breadcrumb:", err);
              }
            }

            breadcrumb.push({
              label: res2.data?.name || slug2,
              path: `/${slug1}/${slug2}`,
            });
            setBreadcrumbItems(breadcrumb);

            if (res2.data?.singleVariant) {
              const variant = res2.data;

              setUserSelection((prev) => ({
                ...prev,
                wholeVariantId: variant.wholeVariantId,
                variantId: variant.variantId,
                variantSlug: variant.variantSlug,
                productSlug: variant.productSlug,
                catSubcatSlug: slug1,
              }));
            }

            setComponentToRender(() => GetUpto);
            return;
          }
        }
      }

      // 🔹 SUBCATEGORY FLOW
      if (slug1Type === "subcategory") {
        setBreadcrumbItems([
          { label: "Home", path: "/" },
          { label: slug1, path: `/${slug1}` },
        ]); // 👈 add subcategory

        if (!slug2) {
          setComponentToRender(() => SelectSubCata);
          return;
        }

        const res2 = await api.get(
          `/sell-module/user/resolve-brand-or-product/${slug2}`,
        );
        const type2 = res2.data?.type;
        setSeoData(res2?.data?.seoData?.Sell);

        if (type2 === "brand") {
          setBreadcrumbItems([
            { label: "Home", path: "/" },
            { label: slug1, path: `/${slug1}` },
            { label: res2.data?.name || slug2, path: `/${slug1}/${slug2}` },
          ]);
          setComponentToRender(() => SelectSeries);
          return;
        }
        if (type2 === "product") {
          // Build breadcrumb with brand lookup
          const breadcrumb = [
            { label: "Home", path: "/" },
            { label: slug1, path: `/${slug1}` },
          ];

          // Check if product has deviceBrand ID - fetch brand details
          if (res2.data?.data?.product?.deviceBrand) {
            try {
              const brandsRes = await api.get(
                "/common-module/getBrandsAndProducts",
              );
              const brands = brandsRes.data?.BrandsWithProducts || [];
              const brand = brands.find(
                (b) => b._id === res2.data.data.product.deviceBrand,
              );

              if (brand && brand.slugSell) {
                breadcrumb.push({
                  label: brand.slugSell,
                  path: `/${slug1}/${brand.slugSell}`,
                });
              }
            } catch (err) {
              console.error("Error fetching brand for breadcrumb:", err);
            }
          }

          breadcrumb.push({
            label: res2.data?.name || slug2,
            path: `/${slug1}/${slug2}`,
          });
          setBreadcrumbItems(breadcrumb);
          setComponentToRender(() => SelectVarient);
          return;
        }
        if (type2 === "variant") {
          // Build breadcrumb with brand lookup
          const breadcrumb = [
            { label: "Home", path: "/" },
            { label: slug1, path: `/${slug1}` },
          ];

          // Check if variant has deviceBrand ID - fetch brand details
          if (res2.data?.data?.product?.deviceBrand) {
            try {
              const brandsRes = await api.get(
                "/common-module/getBrandsAndProducts",
              );
              const brands = brandsRes.data?.BrandsWithProducts || [];
              const brand = brands.find(
                (b) => b._id === res2.data.data.product.deviceBrand,
              );

              if (brand && brand.slugSell) {
                breadcrumb.push({
                  label: brand.slugSell,
                  path: `/${slug1}/${brand.slugSell}`,
                });
              }
            } catch (err) {
              console.error("Error fetching brand for breadcrumb:", err);
            }
          }

          breadcrumb.push({
            label: res2.data?.name || slug2,
            path: `/${slug1}/${slug2}`,
          });
          setBreadcrumbItems(breadcrumb);

          //   // Update cookie immediately so GetUpto sees complete data
          //   Cookies.set("userSelection", JSON.stringify(newSelection), {

          //   // Update context

          if (res2.data?.singleVariant) {
            const variant = res2.data;

            setUserSelection((prev) => ({
              ...prev,
              wholeVariantId: variant.wholeVariantId,
              variantId: variant.variantId,
              variantSlug: variant.variantSlug,
              productSlug: variant.productSlug,
              catSubcatSlug: slug1,
            }));
          }

          setComponentToRender(() => GetUpto);
          return;
        }
      }

      // ❌ Fallback
      navigate("/not-found", { replace: true });
    } catch (err) {
      console.error("Routing Error:", err.message);
      navigate("/not-found", { replace: true });
    } finally {
      setLoading(false);
    }
  }, [slug1, slug2, navigate, setUserSelection, setSeoData]);

  useEffect(() => {
    resolveRouting();
  }, [resolveRouting]);

  if (loading || !ComponentToRender) return <Loader />;

  return (
    <>
      {seoData && <SEO seoData={seoData} />}
      <BreadCrumb items={breadcrumbItems} /> {/* 👈 added breadcrumb */}
      <Suspense fallback={<Loader />}>
        <ComponentToRender />
      </Suspense>
    </>
  );
};

export default DynamicRouteHandler;
