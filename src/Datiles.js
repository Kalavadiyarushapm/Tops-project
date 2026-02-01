import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart } from './cartStorag';
const API_BASE_URL = 'https://dummyjson.com';

function Details() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/product/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setItem(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setItem({});
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) return <div className="container py-4"><div className="alert alert-info">Loading...</div></div>;
  if (error) return <div className="container py-4"><div className="alert alert-danger">Error: {error}</div></div>;
  if (!item.title) return <div className="container py-4"><div className="alert alert-warning">Product not found</div></div>;

  const { title = '', rating = 0, description = '',thumbnail = '' , price = 0, productDetails = {}, longDescription = '', specifications = '' , items = item } = item;

  return (

    <div className="bg-light min-vh-100">
  <div className="container py-4">
    <div className="row justify-content-center">

      {/* Product Card */}

      <div className="col-lg-8">
        <div className="card-product-card mt-4">
          <span className="badge">New</span>

          <div className="card-product-image">
            <img
              src={thumbnail}
              alt={title}
            />
          </div>

          <h4 className="text-center mt-3">{title}</h4>
          <p className="text-muted text-center">{description}</p>

          <p className="price">${price.toFixed(2)}</p>

          <div className="text-center">
            <button
              className="add_to_cart_btn"
              onClick={() =>  addToCart(items)}
            >
              <span className="icon">🛒</span>
              <span className="text">Buy Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="col-lg-8 mt-4">
        <div className="card shadow-sm p-4">
          <h5>Product Details</h5>
          <ul className="list-unstyled">
            {productDetails.brand && <li><strong>Brand:</strong> {productDetails.brand}</li>}
            {productDetails.model && <li><strong>Model:</strong> {productDetails.model}</li>}
            {productDetails.category && <li><strong>Category:</strong> {productDetails.category}</li>}
            {productDetails.warranty && <li><strong>Warranty:</strong> {productDetails.warranty}</li>}
          </ul>

          <h5>Description</h5>
          <p className="text-muted">{longDescription || 'No description available.'}</p>
        </div>
      </div>

    </div>
  </div>
</div>

  );
}

export default Details;
