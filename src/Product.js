import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
 import { addToCart } from "./cartStorag";
const API_BASE_URL = "https://dummyjson.com/products";
 
//currence change   doller 
 export const formatPrice = (value) => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value);
  
function Product() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');

const categoriesList  = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting"
];
  

 

 
useEffect(() => {
  setLoading(true);
  setError(null);

  const url =
    category === "all"  
      ? "https://dummyjson.com/products?limit=12"
      : `https://dummyjson.com/products/category/${category}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Network error");
      return res.json();
    })
    .then((data) => {
      setItems(data.products);
       console.log(data.products);
    })
    .catch(() => setError("Something went wrong"))
    .finally(() => setLoading(false));

}, [category]);

 if (loading) return <div className="container py-4"><div className="alert alert-info">Loading products...</div></div>;
  if (error) return <div className="container py-4"><div className="alert alert-danger">Error: {error}</div></div>;
  
  if (items.length === 0) {
    return <div className="container py-4 "><div className="alert alert-warning text-danger">No products found in this category.</div></div>;
  }

  if (!Array.isArray(items)) {
    return <div className="container py-4"><div className="alert alert-danger text-danger">Error: Invalid data format received.</div></div>;
  } 
  // console.log(items);

  if (!items || items.length === 0) {
    return <div className="container py-4"><div className="alert alert-warning text-danger">No products available.</div></div>;
  } 

 
 
  
//  useEffect(() => {
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${API_BASE_URL}/product?limit=18`);
//       const data = await res.json();
//       setItems(data.products);
//     } catch (error) {
//       console.log(error);
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);

    // console.log(items)
  // if (loading) return <div className="container py-4"><div className="alert alert-info">Loading products...</div></div>;
  // if (error) return <div className="container py-4"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
<section className="product-page py-2 py-md-3 fs-6 fs-lg-5">
  <div className="container">
    {/* HEADER (XXL ONLY) */}
    <div className="col-xxl-9 col-12 d-flex flex-wrap justify-content-center gap-2 offset-xxl-3">
      <div className="col-lg-6 m-auto">
        <h1 className="fs-3 fw-bold">Categories of The Month</h1>
        <p className="small">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>

    <div className="row  ">
      {/* CATEGORY SIDEBAR */}
      <section className=" col-xxl-3 xxl-fixed-scroll xxl-fixed-scroll pt-3 pt-xxl-0 mb-3">
        <div className="category-sec mb-2 ">
          <div className="card border-0  ">
            <h5 className="card-title py-2 mt-2 mx-3 fs-5 fw-bold bg-success text-white rounded shadow text-center">
              Category
            </h5>

            <div className="card-body d-flex   p-1   my-2 flex-wrap text-capitalize text-center justify-content-center ">  
              {[
                ["all", "All"],
                ["smartphones", "New smartphones"],
                ["laptops", "laptops"],
                ["fragrances", "fragrances"],
                ["groceries", "groceries"],
                ["home-decoration", "home decoration"],
                ["furniture", "furniture"],
                ["womens-dresses", "womens dresses"],
                ["womens-shoes", "womens shoes"],
                ["mens-shirts", "mens shirts"],
                ["mens-shoes", "mens shoes"],
                ["mens-watches", "mens watches"],
              
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`col-xxl-8 btn btn-sm   card px-3 px-xxl-0 py-1 py-xxl-2 m-1   m-xxl-2 ${
                    category === key ? "text-white bg-success shadow  border-success" : " "
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
<section className="col-xxl-9 col-12 d-flex flex-wrap justify-content-center gap-2  ">
  {items.map(item => (
    <div
      key={item.id}
      className="
        card-product-card
        mt-2
        col-8 col-sm-7 col-md-5 col-lg-3
        m-1
        fs-7 fs-md-6 fs-lg-5
      "
    >
      <span className="badge small">New</span>

      <div className="card-product-image text-center">
        <Link
          to={`/datiles/${item.id}`}
          aria-label={`Open details for ${item.title}`}
        >
          <img
            src={item.thumbnail}
            alt={item.title || 'Product image'}
            className="
              card-img-top
              w-50 w-sm-50 w-md-100
              mx-auto
            "
          />
        </Link>
      </div>

      <div className="card-product-info">
        <h5 className="text-center mt-1 fs-10 fw-normal text-dark">
          {item.title}
        </h5>
      </div>

      <p className="price text-center fs-7 mb-1">
        {formatPrice(item.price || 0)}
      </p>

      <p className="text-center mb-3 +">
        <Link
          className="add_to_cart_btn btn btn-sm btn-success px-2 py-1 mb-2 fs-7"
          onClick={() => addToCart(item)}
        >
          <span className="me-1">🛒</span>
          Buy Now
        </Link>
      </p>
    </div>
  ))}
</section>




    </div>
  </div>
</section>

   
  );
}

export default Product;


 
  // <li>
  //                     <i className="text-warning fa fa-star" />
  //                     <i className="text-warning fa fa-star" />
  //                     <i className="text-warning fa fa-star" />
  //                     <i className="text-muted fa fa-star" />
  //                     <i className="text-muted fa fa-star" />
  //                   </li>