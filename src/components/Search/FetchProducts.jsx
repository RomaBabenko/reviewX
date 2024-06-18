// src/hooks/useFetchProducts.js
import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import { useSelector } from "react-redux";
import { selectSearchFilter } from "../../components/redux/slices/searchFilterSlice";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const searchFilter = useSelector(selectSearchFilter);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        
        if (response && response.data) {
          let filteredProducts = response.data;
          if (searchFilter.searchValue) {
            filteredProducts = response.data.filter((product) =>
              product.title
                .toLowerCase()
                .includes(searchFilter.searchValue.toLowerCase())
            );
          }

          if (filteredProducts.length === 0) {
            throw new Error("No products found");
          }
          
          setProducts(filteredProducts);
          setError(false);
        } else {
          throw new Error("No data");
        }
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchFilter]);

  return { products, loading, error };
};

export default useFetchProducts;
