import React, { useContext, useState } from 'react'
import './WishList.css';
import { Alert, Snackbar, Tooltip } from "@mui/material";
import products from "../Products.json";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Context } from "../App";
import { Link } from "react-router-dom";

const Wishlist = () => {

  let pro = useContext(Context);
  let [ snack, setSnack ] = useState({
    open: false,
    html: "",
    severity:'info'
  })

  // <-------Function to products to wishlist------->
  const liked = (event) => {
    let click = event.target.closest(".productCard-wishlist").id;
    products.forEach((item) => {
      if (item.id == click) {
        if (item.wish === false) {
          item.wish = true;
          pro.setWishList(++pro.wishList);
        } else {
          item.wish = false;
          pro.setWishList(--pro.wishList);
          setSnack({
            open: true,
            html: "Product removed from your wishlist",
            severity:'error'
          })
        }
      }
    });
  };

  // Function to move the item into the cart
  const moveToCart = (e) => {
    let product =  e.target.closest('.productCard-wishlist').id;
    
    products.find((item)=> {
      if(item.id == +product){
        item.wish = false;
        pro.setWishList(--pro.wishList);

        if(pro.cart.length !== 0) {
          pro.cart.forEach((val, i)=> {
            if(val.id == +product){
              val.cart +=1;
              pro.setCartQuan(++pro.cartQuan);
            }
            
          })
        }else{
          item.cart += 1;
          item.discountedPrice = (
            item.price -
            (item.discount * item.price) / 100
          ).toFixed(2);
          item.totalPrice = +item.discountedPrice * +item.cart;
          pro.setCartQuan(++pro.cartQuan);
          pro.setCart([...pro.cart, item]);
        }
        
        
            
            
          
        setSnack({
          open: true,
          html: "Product added to cart",
          severity: "success",
        });
        return item.id === +product
      }
      
    })
  }
  return (
    <div className="wishListDiv">
      {pro.wishList < 1 ? (
        <>
        <div className="errorPage">
          <Link to='/toys'><button className="errorGoBackBtn">Continue Shoping</button></Link>
        </div>
        </>
      ) : (
        products.map((val) => {
          if (val.wish === true)
            return (
              <div
                className="productCard-wishlist"
                key={val.id.toString()}
                id={val.id.toString()}
              >
                <div className="prod-img">
                  <img
                    className="prodImg"
                    src={val.img}
                    alt=""
                    width={"100%"}
                    height="100%"
                  />
                  <div className="rating">
                    {val.rate} <StarIcon />
                  </div>
                  <div className="wishList" onClick={liked}>
                    {val.wish ? (
                      <Tooltip title="liked" arrow>
                        <FavoriteIcon id="like" sx={{ color: "red" }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="like" arrow>
                        <FavoriteBorderIcon />
                      </Tooltip>
                    )}
                  </div>
                  <div className="discountDiv">{val.discount}% OFF</div>
                </div>
                <div className="prod-content">
                  <span className="prod-name">{val.name}</span>
                  <div className="prod-content-div">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        Rs.
                        {(val.price - (val.discount * val.price) / 100).toFixed(
                          2
                        )}{" "}
                        <s>{val.price.toFixed(2)}</s>
                      </p>
                      <p className="categoryDiv">{val.category}</p>
                    </div>

                    <div className="Prod-btnSet">
                      <button className="addBtn" onClick={moveToCart}>Move To Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            );
        })
      )}

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
    </div>
  )
}

export default Wishlist