import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CART_KEY = "cart_products";
const TAX_RATE = 0.1;
const VALID_COUPON = "RUSHABH1290";
const DISCOUNT_RATE = 0.1;

export default function Cart() {
  /* =======================
     STATE
  ======================= */
  const [cart, setCart] = useState([]);
  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate()

  /* =======================
     LOAD CART
  ======================= */
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    setCart(savedCart);
  }, []);

  /* =======================
     PERSIST CART
  ======================= */
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  /* =======================
     CART ACTIONS
  ======================= */
  const increaseQty = id => {
    setCart(cart =>
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = id => {
    setCart(cart =>
      cart.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = id => {
    setCart(cart => cart.filter(item => item.id !== id));
    showToast("Item removed");
  };

  /* =======================
     COUPON
  ======================= */
  const applyCoupon = () => {
    if (couponInput === VALID_COUPON) {
      setCouponApplied(true);
      showToast("Coupon applied successfully");
    } else {
      setCouponApplied(false);
      showToast("Invalid coupon code", "error");
    }
  };

  /* =======================
     PRICE CALCULATIONS
  ======================= */
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = +(subtotal * TAX_RATE).toFixed(2);

  const discount = couponApplied
    ? +(subtotal * DISCOUNT_RATE).toFixed(2)
    : 0;

  const total = +(subtotal + tax - discount).toFixed(2);

  /* =======================
     TOAST
  ======================= */
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* =======================
     RENDER
  ======================= */
  return (
 <div className="cart-page bg fs-6 fs-lg-5">
      <div className="container py-3 py-md-4">
        <h1 className="fw-bold mb-3 mb-md-4 green fs-4 fs-md-3">
          Shopping Cart
        </h1>

        <div className="row g-3 g-md-4">
          {/* CART ITEMS */}
          <div className="col-lg-8">
            <AnimatePresence>
              {cart.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="card mb-2 mb-md-3"
                >
                  <div className="card-body d-flex gap-2 gap-md-3 align-items-center py-2 py-md-3">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="cart-img"
                      style={{ width: "60px" }}
                    />

                    <div className="flex-grow-1">
                      <h6 className="mb-1 fs-6">{item.title}</h6>
                      <small className="green fw-normal">
                        ${item.price}
                      </small>

                      <strong className="d-block d-md-none mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </strong>

                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="qty-control">
                          <button
                            className="btn btn-sm bg-success text-success bg-opacity-10 px-2"
                            onClick={() => decreaseQty(item.id)}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            className="btn btn-sm bg-success text-white px-2"
                            onClick={() => increaseQty(item.id)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="btn btn-sm text-danger bg-danger bg-opacity-10 px-2"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <strong className="d-none d-md-block">
                      ${(item.price * item.quantity).toFixed(2)}
                    </strong>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ORDER SUMMARY */}
          <div className="col-lg-4">
            <div className="card fs-6 fs-lg-5">
              <div className="card-body py-3">
                <h5 className="green mb-3">Order Summary</h5>

                <div className="d-flex justify-content-between small">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between small">
                  <span>Tax (10%)</span>
                  <span>${tax}</span>
                </div>

                {couponApplied && (
                  <div className="d-flex justify-content-between text-success small">
                    <span>Discount</span>
                    <span>- ${discount}</span>
                  </div>
                )}

                <hr />

                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>

                <div className="input-group mt-2 mt-md-3">
                  <input
                    className="form-control form-control-sm"
                    placeholder="Coupon code"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                  />
                  <button
                    className="btn btn-warning text-white btn-sm"
                    onClick={applyCoupon}
                  >
                    Apply
                  </button>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="btn btn-success text-white w-100 mt-3 btn-sm"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`toast-msg ${toast.type}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
