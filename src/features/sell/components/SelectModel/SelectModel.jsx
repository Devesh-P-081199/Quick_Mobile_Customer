import React, { useEffect, useState } from "react";
import styles from "./SelectModel.module.css";
import { NavLink, useParams } from "react-router-dom";
import api from "../../../../Utils/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SelectModel() {
  const { seriesId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await api.get(
        `/sell-module/user/model-by-series-id/${seriesId}?option=Sell`
      );
      setProducts(response.data?.products || []);
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="default-padding-section">
      <div className="wrapper">
        <div className={styles.topSellingWrapper}>
          <div className={styles.headingFlex}>
            <h2 className={styles.sectionHeading}>Select Model</h2>
          </div>

          <div className={`${styles.brandImageBox} scrollbar-hidden`}>
            {loading ? (
              Array(6)
                .fill()
                .map((_, i) => (
                  <div key={i} className={styles.brandSingleBox}>
                    <Skeleton height={80} width={80} circle />
                    <Skeleton width={80} style={{ marginTop: 8 }} />
                  </div>
                ))
            ) : products.length > 0 ? (
              products.map((prod, index) => (
                <NavLink
                  to={`/select-varient/${prod._id}`}
                  key={index}
                  className={styles.brandSingleBox}
                >
                  <div className={styles.imgIndividual}>
                    <img
                      src={prod?.devicePic || prod.icon}
                      alt={prod.deviceName}
                      title={prod.deviceName}
                      loading="lazy"
                    />
                  </div>
                  <span>{prod?.deviceName}</span>
                </NavLink>
              ))
            ) : (
              <div className="text-gray-500 mt-2">No models available</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SelectModel;
