import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { formatPrice } from "./Product";
 import { addToCart , getCart } from "./cartStorag";
 
function Home() {
  
   
  const [items, setitems] = useState([]);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
     const fetchproduct = async () =>{
    const res=   await fetch (`https://dummyjson.com/products?limit=6&skip=${skip}`)
  const data  = await res.json();
 setitems(data.products);
     }
     fetchproduct();
  }, [skip]);

  // Handle search form submit
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.q.value.trim();
    if (query) {
      // Add search logic here (e.g., filter products or navigate)
      console.log("Search query:", query);
    }
  };



  return (
    <main>
      {/* Search Modal */}
      <div
        className="modal fade bg-white"
        id="templatemo_search"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="w-100 pt-1 mb-5 text-right">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <form
            method="get"
            className="modal-content modal-body border-0 p-0"
            onSubmit={handleSearch}
          >
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                id="inputModalSearch"
                name="q"
                placeholder="Search ..."
              />
              <button
                type="submit"
                className="input-group-text bg-success text-light"
              >
                <i className="fa fa-fw fa-search text-white" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Banner Carousel */}
      <div
        id="template-mo-zay-hero-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to={0}
            className="active"
          />
          <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to={1} />
          <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to={2} />
        </ol>
        <div className="carousel-inner">
          {["banner_img_01.jpg","banner_img_02.jpg","banner_img_03.jpg"].map(
            (img, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="container">
                  <div className="row p-5">
                    <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                      <img
                        className="img-fluid"
                        src={`./assets/img/${img}`}
                        alt={`Banner ${index + 1}`}
                      />
                    </div>
                    <div className="col-lg-6 mb-0 d-flex align-items-center">
                      <div className="text-align-left align-self-center">
                        <h1 className="h1 text-success">
                          <b>Zay</b> eCommerce
                        </h1>
                        <h3 className="h2">Tiny and Perfect eCommerce Template</h3>
                        <p>
                          Zay Shop is an eCommerce HTML5 CSS template with latest
                          version of Bootstrap 5. Image credits go to Freepik, Unsplash,
                          and Icons 8.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <a
          className="carousel-control-prev text-decoration-none w-auto ps-3"
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="prev"
        >
          <i className="fas fa-chevron-left" />
        </a>
        <a
          className="carousel-control-next text-decoration-none w-auto pe-3"
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="next"
        >
          <i className="fas fa-chevron-right" />
        </a>
      </div>

      {/* Categories of the Month */}
      <section className="container py-5">
        <div className="row text-center pt-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Categories of The Month</h1>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="row ">
          <div className=" col-12 flex-wrap d-flex justify-content-evenly">

          
          {items.map((item) => (
            <div className="card-product-card gap-5   mt-4 col-10 m-1 col-md-5 col-lg-3  " key={item.id}>
              <span className="badge">New</span>
              <div className="card-product-image">
                      <Link to={`/datiles/${item.id}`} aria-label={`Open details for ${item.title}`}>
                                  <img src={item.thumbnail} className="card-img-top" alt={item.title || 'Product image'} />  
                                 
                              </Link>  
              </div>
            
              <div className="card-product-info"><h5 className="text-center mt-3 fs-4 " style={{   color:'black',height: 40, objectFit: "cover" }}>{item.title}</h5></div>
                     
                    <p className="price ">{formatPrice(item.price || 0)}</p>
              <p className="text-center">
                <Link className="add_to_cart_btn " onClick={ ()=> addToCart(item)}  >  
  <span class="icon ">🛒</span>
  <span class="text">Buy Now</span>
 

                  </Link>
              </p>
            </div>
          ))}
        </div>

<div className="container d-flex  py-5 gap-3 justify-content-center product-skip">
  <button className="btn btn-outline-success   "  onClick={()=>  setSkip(0)}>
            1
          </button>
          
          <button className="btn btn-outline-success   " onClick={()=>  setSkip(6)}>
            2
          </button>
          
          <button className="btn btn-outline-success   " onClick={()=>  setSkip(12)}>
            3
          </button>
          <button className="btn btn-outline-success    " onClick={()=>  setSkip(18)}>
            4
          </button>
          <button className="btn btn-outline-success  " onClick={()=>  setSkip(24)}>
            5
          </button>
         
          


</div>
         
        </div>
      </section>

      {/* Featured Products */}
   <section class="home-featured">
  <div class="home-featured-container">

    <div class="home-featured-image">
      <img
        src="/feature-banner1.png"
        alt="Featured Product"
      />
    </div>

    <div class="home-featured-content">
      <span class="home-featured-tag">Featured Product</span>

      <h2 class="home-featured-title">Nike Sports One</h2>

      <div class="home-featured-rating">
        ★★★★★ <span>( Most Reviews)</span>
      </div>

      <p class="home-featured-description">
        A refreshing, clean fragrance designed for everyday confidence.
        Light, modern, and timeless.
      </p>

      <ul class="home-featured-benefits">
        <li>✔ Preimum Brands</li>
        <li>✔ Elegant modern design</li>
        <li>✔ Perfect for daily wear</li>
      </ul>

       
    </div>

  </div>
</section>

    </main>
  );
}

export default Home;
