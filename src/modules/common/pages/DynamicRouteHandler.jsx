// BREADCRUM TESTING

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, Suspense, lazy, useRef } from "react";
import api from "../../../Utils/api";
import Loader from "../components/layout/Loader/Loader";
import GetUpto from "../../sell/components/GetUpto/GetUpto";
import SEO from "../../../Utils/SEO";
import BreadCrumb from "../components/layout/BreadCrumb/BreadCrumb";
import { UserContext } from "../../../Context/contextAPI";
import { useContext } from "react";

const SellHome = lazy(() => import("../../sell/pages/SellHome"));
const SelectSubCata = lazy(
  () => import("../../sell/components/SelectSubCategories/SelectSubCata"),
);
const SelectSeries = lazy(
  () => import("../../sell/components/SelectSeries/SelectSeries"),
);
const SelectVarient = lazy(() => import("../../sell/pages/SelectVarient"));

const DynamicRouteHandler = () => {
  const [seoData, setSeoData] = useState(null);

  const { slug1, slug2 } = useParams();
  const navigate = useNavigate();

  const { setUserSelection, userSelection } = useContext(UserContext);

  const [ComponentToRender, setComponentToRender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [breadcrumbItems, setBreadcrumbItems] = useState(["Home"]); // 👈 breadcrumb state

  const resolvedSlugCache = useRef({});

  const resolveRouting = async () => {
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
        setBreadcrumbItems(["Home", slug1]); // 👈 add category

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
            setBreadcrumbItems(["Home", slug1, res2.data?.name || slug2]); // 👈 add brand
            setComponentToRender(() => SelectSeries);
            return;
          }
          if (type2 === "product") {
            setBreadcrumbItems(["Home", slug1, res2.data?.name || slug2]); // 👈 add product
            setComponentToRender(() => SelectVarient);
            return;
          }
          if (type2 === "variant") {
            setBreadcrumbItems(["Home", slug1, res2.data?.name || slug2]); // 👈 add variant

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
        setBreadcrumbItems(["Home", slug1]); // 👈 add subcategory

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
          setBreadcrumbItems(["Home", slug1, res2.data?.name || slug2]);
          setComponentToRender(() => SelectSeries);
          return;
        }
        if (type2 === "product") {
          setBreadcrumbItems(["Home", slug1, res2.data?.name || slug2]);
          setComponentToRender(() => SelectVarient);
          return;
        }
        if (type2 === "variant") {
          setBreadcrumbItems(["Home", slug1, res2.data?.name || slug2]);

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
      navigate("/404");
    } catch (err) {
      console.error("Routing Error:", err.message);
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resolveRouting();
  }, [slug1, slug2]);

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
