import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, getCart } from "./cartStorag";
import { AuthContext } from "./AuthContext";
import { formatPrice } from "./Product";

function Header() {
  const [isopen, setopen] = useState(false);
  const { login, logout } = useContext(AuthContext);
  const [hidden, setshow] = useState(false);
  const searchRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // console.log(login)
  const navget = useNavigate();
  const hendallogout = () => {
    logout(false);
    navget("/");
  };

  useEffect(() => {
    const searchtoggle = (e) => {
      if (searchRef.current && searchRef.current.contains(e.target)) {
        return; // ✅ click inside search → do nothing
      }
      setshow(false);
    };

    document.addEventListener("click", searchtoggle);
    return () => document.removeEventListener("click", searchtoggle);
  }, []);

  const navopen = () => {
    setopen(!isopen);
    setshow(false);
  };

  const [items, setitems] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=194")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    const timer = setTimeout(() => {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      localStorage.setItem("product-length", JSON.stringify(products.length));
      setSearchResults(filtered);
      setIsSearching(false);
    }, 300); // ⏳ Lazy loading delay

    return () => clearTimeout(timer);
  }, [searchQuery, products]);

  // console.log(searchResults)
  // Handle search form submit
  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   const query = e.target.q.value.trim();
  //   if (query) {
  //     // Add search logic here (e.g., filter products or navigate)
  //     console.log("Search query:", query);
  //   }
  // };

  /* Total items count */
  function getTotalItems() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }
  // console.log(getTotalItems())

  return (
    <main >
      <nav className=" navbar navbar-expand-lg navbar-light shadow">
        <div className="container d-flex justify-content-between align-items-start mt-2 ">
          <a className="nav-link  green h1    fs-2">Zay</a>
          <button
            ref={searchRef}
            className="navbar-toggler border-2  navbar-btn align-item-center  "
            type="button"
            onClick={navopen}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-center ${
              isopen ? `show  toggle-menu-marring` : ""
            }`}
          >
            <div className="flex-fill">
              <ul className="nav navbar-nav d-flex gap-4 justify-content-end  ml mx-lg-auto">
                <li className="nav-item">
                  <Link className="nav-link  fw-semibold fs-5" to={"/"}>
                    Home
                  </Link>
                </li>
                <li className="nav-item  fw-semibold fs-5">
                  <Link className="nav-link" to={"product"}>
                    product
                  </Link>
                </li>
                <li className="nav-item  fw-semibold fs-5">
                  <Link className="nav-link" to={"shop"}>
                    Shop
                  </Link>
                </li>
                <li className="nav-item fw-semibold fs-5">
                  <Link className="nav-link " to={"contact"}>
                    Contact
                  </Link>
                </li>
                <section className=" d-flex d-block d-lg-none header-search-toggle-sec  row col-12 mx-auto   ">
                  <div className="header-search  col-12 d-flex mx-auto col-md-10 p-1 d-flex align-items-center   ">
                    <input
                      className=" border-0  col "
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="search-btn   ">Search</button>
                  </div>
                  <div className="d-flex col mt-4 justify-content-between align-items-center">
                    <Link
                      to={"/cart"}
                      className=" d-block  d-lg-none nav-icon d-flex    col-6 text-decoration-none"
                    >
                      <i className="bi bi-cart3  text-dark me-2 fs-3" />
                      <span className="  translate-middle   rounded-pill bg-light text-dark">
                        {getTotalItems()}
                      </span>
                    </Link>
                    <div>
                      {login ? (
                        <div className="  d-block d-lg-none  col-6      me-5 me-md-2">
                          <div className="  d-flex  justify-content-center text-center     d-flex align-items-center     m-2  user-logo   ">
                            <Link to={"/user"} className="nav-icon    ">
                              <i className="bi bi-person green   fs-3 text-center " />
                            </Link>
                          </div>
                        </div>
                      ) : (
                        // <Link onClick={hendallogout} className="btn btn-primary " to='login'>Logout</Link>

                        <>
                          <div className="d-flex ">
                            <Link
                              className="d-block d-lg-none btn btn-primary "
                              to="login"
                            >
                              Login
                            </Link>
                            <Link
                              className="d-block d-lg-none btn btn-success mx-3"
                              to="register"
                            >
                              Register
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </section>
              </ul>
            </div>
            <div className="navbar align-self-center  justify-content-center  d-flex">
              <div className="d-lg-none flex-sm-fill  col-7 col-sm-auto  "></div>
              <div className="d-flex justify-content-center ms-1 ms-md-5 ">
                {/* Desktop Search */}
                <a className=" d-lg-block d-none">
                  <i
                    onClick={(e) => {
                      e.stopPropagation();
                      setshow(true);
                    }}
                    className="bi bi-search text-dark mx-3 fs-4"
                  />
                </a>
              </div>
            </div>
            {/* Cart */}
            <Link
              to={"/cart"}
              className="  d-none d-lg-block nav-icon  position-relative mx-3 text-decoration-none"
            >
              <i className="    bi bi-cart3 text-dark me-2 fs-3" />
              <span className="position-absolute  translate-middle badge rounded-pill bg-light text-dark">
                {getTotalItems()}
              </span>
            </Link>

            {/* User */}
            <div>
              {login ? (
                <div className="d-none d-lg-block  me-5 me-md-2">
                  <div className="  d-flex  justify-content-center text-center     d-flex align-items-center     m-2  user-logo   ">
                    <Link to={"/user"} className="nav-icon    ">
                      <i className="bi bi-person green   fs-3 text-center " />
                    </Link>
                  </div>
                </div>
              ) : (
                // <Link onClick={hendallogout} className="btn btn-primary " to='login'>Logout</Link>

                <>
                  <div className="d-flex ">
                    <Link
                      className="d-none d-lg-block btn btn-primary "
                      to="login"
                    >
                      Login
                    </Link>
                    <Link
                      className="d-none d-lg-block btn btn-success mx-3"
                      to="register"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {hidden && (
        <section
          ref={searchRef}
          className="  header-search-sec  col-8 mx-auto "
        >
          <form
            id="search-box"
            className="header-search   d-flex align-items-center col-10  "
          >
            <input
              id="search-input"
              className="search-input "
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button id="search-btn" className="search-btn">
              Search
            </button>
          </form>
        </section>
      )}
      <section className="container   ">
        <div className="row text-center">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">{searchQuery ? "Search Results" : ""}</h1>
            <p>{searchQuery ? `Showing results for "${searchQuery}"` : ""}</p>
          </div>
        </div>

        {products.length === 0 && (
          <p className="text-center fs-5 mt-5">No products found</p>
        )}

        <div className="row">
          <div className="col-12  flex-wrap d-flex justify-content-evenly">
            {searchResults.map((item) => (
              <div
                key={item.id}
                className="card-product-card gap-5 mt-4 col-10 m-1 col-md-5 col-lg-3"
              >
                <span className="badge">New</span>

                <div className="card-product-image">
                  <Link
                    to={`/datiles/${item.id}`}
                    aria-label={`Open details for ${item.title}`}
                  >
                    <img
                      src={item.thumbnail}
                      className="card-img-top"
                      alt={item.title}
                    />
                  </Link>
                </div>

                <div className="card-product-info">
                  <h5
                    className="text-center mt-3 fs-4"
                    style={{ color: "black", height: 40 }}
                  >
                    {item.title}
                  </h5>
                </div>

                <p className="price">{formatPrice(item.price || 0)}</p>

                <p className="text-center">
                  <Link
                    className="add_to_cart_btn"
                    onClick={() => addToCart(item)}
                  >
                    <span className="icon">🛒</span>
                    <span className="text">Buy Now</span>
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
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
             </div>
           </section> */}
    </main>
  );
}

export default Header;
