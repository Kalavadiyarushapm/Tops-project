const CART_KEY = "cart_products";
const TAX_RATE = 0.1;        // 10% tax
const VALID_COUPON = "SAVE10";
const DISCOUNT_RATE = 0.1;  // 10% discount
/* Get cart */
export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}


/* Save cart */
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* Add product */
export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1
    });
  }

  saveCart(cart);
}

/* Increase quantity */
// export function increaseQty(id) {
//   const cart = getCart();
//   const item = cart.find(p => p.id === id);
//   if (item) item.quantity += 1;
//   saveCart(cart);
// }

/* Decrease quantity */
// export function decreaseQty(id) {
//   const cart = getCart();
//   const item = cart.find(p => p.id === id);
//   if (item && item.quantity > 1) item.quantity -= 1;
//   saveCart(cart);
// }

/* Remove product */
// export function removeFromCart(id) {
//   const cart = getCart().filter(item => item.id !== id);
//   saveCart(cart);
// }

/* Clear cart */
// export function clearCart() {
//   localStorage.removeItem(CART_KEY);
// }

/* Get all cart items */
// export function getCartItems() {
//    return getCart();
//  }



// /* Subtotal (price × quantity) */
// export function getSubTotal() {
//   const cart = getCart();
//   return cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
// }

// /* Tax amount */
// export function getTaxAmount() {
//   const subtotal = getSubTotal();
//   return +(subtotal * TAX_RATE).toFixed(2);
// }

// /* Discount amount */
// export function getDiscountAmount(coupon) {
//   if (coupon === VALID_COUPON) {
//     return +(getSubTotal() * DISCOUNT_RATE).toFixed(2);
//   }
//   return 0;
// }

// /* Final total price */
// export function getTotalPrice(coupon) {
//   const subtotal = getSubTotal();
//   const tax = getTaxAmount();
//   const discount = getDiscountAmount(coupon);

//   return +(subtotal + tax - discount).toFixed(2);
// }

// /* Apply coupon */
// export function applyCoupon(coupon) {
//   return coupon === VALID_COUPON;
// }