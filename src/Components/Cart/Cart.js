import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { incrementQuantity, decrementQuantity, removeFromCart, clearCart } from '../../Redux/cartSlice';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    alert('Proceeding to Checkout...');
    dispatch(clearCart());
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center" style={{ fontSize: "45px", color: "black", fontFamily: "Poppins" }}>Shopping Cart</h3>

      {cartItems.length === 0 ? (
        <h4 className="text-center mt-5">Your Cart is Empty</h4>
      ) : (
        <>
          <table className="table mt-5">
            <thead>
              <tr>
                <th>Product</th>
                <th style={{ textAlign: "end" }}>Price</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "end" }}>Total</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td style={{ display: "flex", alignItems: "center" }}>
                    <img src={item.image} alt={item.title} style={{ width: "50px", marginRight: "20px" }} />
                    <div>
                      <h5>{item.title}</h5>
                      <p>{item.category}</p>
                    </div>
                  </td>
                  <td style={{ textAlign: "end" }}>${item.price}</td>
                  <td style={{ textAlign: "center", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <button onClick={() => dispatch(decrementQuantity(item.id))} style={quantityButtonStyle}>-</button>
                      <input type="text" value={item.quantity} readOnly style={{ width: "40px", textAlign: "center", margin: "0 10px" }} />
                      <button onClick={() => dispatch(incrementQuantity(item.id))} style={quantityButtonStyle}>+</button>
                    </div>
                  </td>
                  <td style={{ textAlign: "end" }}>${(item.price * item.quantity).toFixed(2)}</td>
                  <td style={{ textAlign: "center" }}>
                    <button onClick={() => dispatch(removeFromCart(item.id))} style={{ color: "red", border: "none", background: "none" }}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr />

          <div className="container mt-5" style={{ display: "flex", justifyContent: "space-between", color: "black", fontFamily: "Poppins" }}>
            <div>
              <button
                style={{
                  border: "1px solid grey",
                  borderRadius: "5px",
                  backgroundColor: "transparent",
                  padding: "10px",
                  color: "grey",
                }}
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ fontWeight: 500 }}>Subtotal</h4>
                <h4 style={{ fontWeight: 700 }}>
                  ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </h4>
              </div>
              <p>Taxes and Shipping calculated at checkout</p>
              <button
                className="bg-primary text-white"
                style={{ border: "none", borderRadius: "5px", width: "100%", padding: "10px 80px" }}
                onClick={handleCheckout}
              >
                Checkout
              </button>
              <br />
              <Link to="/products">
                <button className="mt-3" style={{ backgroundColor: "transparent", border: "none" }}>
                  <i className="fa-solid fa-arrow-left me-2"></i>Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const quantityButtonStyle = {
  border: "1px solid grey",
  backgroundColor: "transparent",
  padding: "5px 10px",
  cursor: "pointer",
  borderRadius: "5px",
};
