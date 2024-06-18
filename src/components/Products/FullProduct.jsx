import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import "../../assets/styles/scss/_all.scss";
import { translate } from "../../translations/TranslationUtils";

function FullProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const [language] = useState(
    localStorage.getItem("language") || "en"
  ); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://65f17541034bdbecc762acf0.mockapi.io/items/${id}`
        );
        setProduct(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Виникла помилка при завантаженні продукту</div>;
  if (!product) return <div>Продукт не знайдено</div>;

  return (
    <div className="container">
      <div className="product-details product-page">
        <img
          className="product-image product-page"
          src={product.image}
          alt={product.title}
        />
        <div className="product-info">
          <h2 className="product-title product-page">{product.title}</h2>
          <p className="product-description product-page">{product.text}</p>
        </div>
      </div>
      <h1>{translate(language, "review")}</h1>
      {isAuthenticated && <ReviewForm id_product={id} />}
      <Review id_product={id} />
    </div>
  );
}

export default FullProduct;
