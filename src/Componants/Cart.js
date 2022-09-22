import React, { useContext, useState } from 'react'
import './Cart.css';
import products from '../Products.json';
import { Context } from '../App';
import { Link } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const Cart = () => {
  const user = useContext(Context);

   // states
   let [snack, setSnack] = useState({
    open: false,
    html: "",
    severity: "info",
  });

  // <-------Function to increase the quantity of the product------->
  const increment = (e) => {
    let click = e.target.closest(".cartCard").id;
    user.cart.forEach((item) => {
      if (item.id == click) {
        item.cart += 1;
        user.setCartQuan(++user.cartQuan);
      }
    });
  };

  // <-------Function to decrease the quantity of the product------->
  const decrement = (e) => {
    let click = e.target.closest(".cartCard").id;
    products.forEach((item) => {
      if (item.id == click) {
        if (item.cart !== 1) {
          item.cart -= 1;
          user.setCartQuan(--user.cartQuan);
        } else return;
      }
    });
  };

  // <-------Function to remove product from the cart------->
  const removeFromCart = (e) => {
    let click = e.target.closest(".cartCard").id;
    let i;
    products.find((item) => {
      if (item.id == click)
      item.cart = 0;
        user.cart.find((val, inx) => {
          if(val.id == click)
          i = inx;
        });
      return item.id === +click;
    }).cart = 0;
    if(window.confirm("Dou you want to remove the product from cart?")){

      user.cart.splice(i, 1);
      user.setCartQuan(--user.cartQuan);
      setSnack({
        open: true,
        html: "Product removed from cart",
        severity: "error",
      });
    }
    else return
  };

  // <-------Function to empty the cart------->
  const emptyCart = () => {
    if (window.confirm("Are you sure you want to empty the cart?")) {
      products.forEach((val) => {
        val.cart = 0;
      });
      user.setCart([]);
      user.setCartQuan(0);
    } else {
      return;
    }
  };
  return (
    <>
      <div className="top-cart-container">
        <div className="topDiv-cart">
          <h1>Your Cart</h1>
          <button className="emptyCartBtn" onClick={emptyCart}>
            Empty Cart
          </button>
        </div>
        <div className="cartCon">
          <div className="cartDiv" style={{width: user.cartQuan<1? "100%":"75%" }}>
            {user.cartQuan < 1 ? (
              <>
                <div className="errorCartPage">
                  <Link to="/toys">
                    <button className="errorGoBackBtnCart">
                      Continue Shoping
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              user.cart.map((item) => {
                return (
                  <div
                    className="cartCard"
                    key={item.id.toString()}
                    id={item.id}
                  >
                    <div style={{ width: "35%" }}>
                      <img
                        className="cartCardImg"
                        src={item.img}
                        alt=""
                        width="80%"
                        height="125vh"
                      />
                    </div>

                    <div className="cartCardContent">
                      <span className="cartCardHead">
                        <h3>{item.name}</h3>

                        <span>
                          <h2>Rs. {(item.totalPrice).toFixed(2)}</h2>
                          <s>
                            <h4>Rs. {(item.price).toFixed(2)}</h4>
                          </s>
                        </span>
                      </span>
                      <h3>Discount: {item.discount}%</h3>

                      <br />
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <button className="decreBtn" onClick={decrement}>
                            -
                          </button>
                          <span>{item.cart}</span>
                          <button className="increBtn" onClick={increment}>
                            +
                          </button>
                        </div>
                        <div>
                          <button
                            className="removeItem"
                            onClick={removeFromCart}
                          >
                            REMOVE ITEM
                          </button>
                        </div>
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="billDiv" style={{display: user.cartQuan<1?"none":'block'}}>
            <h2>PRICE DETAILS ({user.cartQuan} {user.cartQuan<2?"item":"items"}):</h2>

            <div style={{ borderBottom: "1px solid" }}>
              <p>
                <b>Amount before tax: </b> Rs.{" "}
                {user.cart
                  .reduce((total, item) => {
                    return (+(item.discountedPrice * item.cart) + total );
                  }, 0)
                  .toFixed(2)}
              </p>
              <p>
                <b>Total amount incl. tax:</b> Rs.{" "}
                {user.cart
                  .reduce((total, item) => {
                    return (+(item.discountedPrice * item.cart) + total ) + 50;
                  }, 0)
                  .toFixed(2)}
              </p>

              <p>
                <b>Shipping charge:</b> Rs. {user.cart.length===0 ? "00.00" : "15.00"}
              </p>
            </div>
            <h3>
              <b>Amount Payable:</b> Rs.{" "}
              {user.cart
                .reduce((total, item) => {
                  return (+(item.discountedPrice * item.cart) + total ) + 50 + 15;
                }, 0)
                .toFixed(2)}
            </h3>

            <Link to={'/checkout'}><button className="checkoutBtn">Continue to pay <ArrowRightAltIcon /></button></Link>
          </div>
        </div>
      </div>

      {/* SNACKBAR */}
      <Snackbar
        open={snack.open}
        autoHideDuration={1000}
        onClose={() => {
          setSnack({ open: false, html: "", severity: "info" });
        }}
      >
        <Alert
          severity={snack.severity}
          variant="filled"
          onClose={() => {
            setSnack({ open: false, html: "", severity: "info" });
          }}
        >
          {snack.html}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Cart