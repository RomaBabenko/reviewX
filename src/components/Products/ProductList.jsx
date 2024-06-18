import React from "react";
import Skeleton from "../Skeleton/Skeleton";
import { translate } from "../../translations/TranslationUtils";
import ProductCard from "./ProductCard";
import NotFound from "../pages/NotFound";
import useFetchProducts from "../Search/FetchProducts";

function ProductList() {
  const language = localStorage.getItem("language") || "en";
  const { products, loading, error } = useFetchProducts();

  const skeletons = Array.from({ length: 8 }).map((_, index) => (
    <Skeleton key={index} />
  ));

  const productList = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <>
      {error ? (
        <NotFound />
      ) : (
        <div className="container">
          <h2 className="product-list-title">
            {translate(language, "allProducts")}
          </h2>
          <div className="product-list">
            {loading ? skeletons : productList}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductList;
