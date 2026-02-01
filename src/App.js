import "./css/App.css";
import "./css/header.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Header from "./Header";
import Footer from "./Footer";
import Shopsection from "./Shop";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import Details from "./Datiles";
import Product from "./Product";
 
import Cart from "./Cart";
import UserDashboard from "./UserDashboard";
import Addres from "./Addres";
import Checkout from "./Checkout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
    
         <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shopsection />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/datiles/:id" element={<Details />} />
        
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<UserDashboard />}></Route>
          <Route path="/addres" element={<Addres />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
