import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <Link className="product" to={`/items/${product.id}`} key={product.id}>
    <div className="product-image">
      <img src={product.image} alt={product.title} />
    </div>
    <div className="product-details">
      <h3 className="product-title">{product.title}</h3>
      <p className="product-description">{product.text}</p>
    </div>
  </Link>
);

export default ProductCard;
