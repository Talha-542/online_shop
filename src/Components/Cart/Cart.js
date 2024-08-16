import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, clearCart, increment, decrement } from "../../Redux/cartSlice";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const incrementHandler = (id) => {
    dispatch(increment({ id }));
  };

  const decrementHandler = (id) => {
    dispatch(decrement({ id }));
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="container mt-5">
          <h3 className="text-center" style={{ fontSize: "45px", color: "black", fontFamily: "Poppins" }}>
            Your Cart is Empty
          </h3>
        </div>
      ) : (
        <>
          <div className="container my-5">
            <h3 className="text-center" style={{ fontSize: "45px", color: "black", fontFamily: "Poppins" }}>
              Shopping Cart
            </h3>
          </div>
          <div className="container" style={{ display: "flex", justifyContent: "center", fontFamily: "Poppins" }}>
            <table style={{ width: "100%", color: "black" }}>
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>Product</th>
                  <th style={{ textAlign: "end", width: "20%" }}>Price</th>
                  <th style={{ textAlign: "end", width: "20%" }}>Quantity</th>
                  <th style={{ textAlign: "end", width: "20%" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td style={{ width: "40%" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          style={{ width: "5rem", height: "5rem", marginRight: "20px" }}
                        />
                        <div>
                          <h5>{item.title}</h5>
                          <p>{item.category}</p>
                          <h6
                            className="text-danger"
                            style={{ marginBottom: "0", cursor: "pointer" }}
                            onClick={() => removeFromCartHandler(item.id)}
                          >
                            Remove
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td style={{ width: "20%", textAlign: "end" }}>${item.price}</td>
                    <td style={{ textAlign: "center" }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          border: "1px solid grey",
                          borderRadius: "5px",
                          padding: "5px 10px",
                        }}
                      >
                        <button
                          onClick={() => decrementHandler(item.id)}
                          style={{ border: "none", outline: "none", backgroundColor: "transparent" }}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          style={{ border: "none", outline: "none", width: "50px", textAlign: "center" }}
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          onClick={() => incrementHandler(item.id)}
                          style={{ border: "none", outline: "none", backgroundColor: "transparent" }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td style={{ width: "20%", textAlign: "end" }}>${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr className="container" style={{ color: "black", width: "100%" }} />
          <div className="container mt-5" style={{ display: "flex", justifyContent: "space-between", color: "black", fontFamily: "Poppins" }}>
            <div>
              <button
                style={{ border: "1px solid grey", borderRadius: "5px", backgroundColor: "transparent", padding: "10px", color: "grey" }}
                onClick={clearCartHandler}
              >
                Clear Cart
              </button>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ fontWeight: 500 }}>Subtotal</h4>
                <h4 style={{ fontWeight: 700 }}>
                  ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                </h4>
              </div>
              <p>Taxes and Shipping calculated at checkout</p>
              <button className="bg-primary text-white" style={{ border: "none", borderRadius: "5px", width: "100%", padding: "10px 80px" }}>
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
    </>
  );
}
