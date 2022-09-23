import React, { useContext, useEffect, useState } from "react";
import "./Toys.css";
import products from "../Products.json";
import StarIcon from "@mui/icons-material/Star";
import { Alert, Pagination, Snackbar, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Context } from "../App";
import $ from "jquery";

const Toys = () => {
  const pro = useContext(Context);

  // <-----States------>
  const [page, setPage] = useState(1);
  const [limits, setLimits] = useState({ lower: 0, upper: 6 });
  let [proData, setProData] = useState(products);
  let [snack, setSnack] = useState({
    open: false,
    html: "",
    severity: "info",
  });
  let [filters, setFilters] = useState({
    search: "",
    price: "",
    category: "all",
  });

  // <------working of filters------>
  useEffect(() => {
    setProData([
      ...products
        .filter((val) => {
          return val.name.toLowerCase().indexOf(filters.search) > -1;
        })
        .filter((val) => {
          return (
            filters.category === "all" ||
            val.category.toLowerCase() === filters.category.toLowerCase()
          );
        })
        .sort((a, b) => {
          return filters.price !== ""
            ? filters.price === "all"
              ? a.price - b.price
              : b.price - a.price
            : "";
        }),
    ]);
    setPage(1);
    setLimits({ lower: 0, upper: 6 });
  }, [filters]);

  // <--------Search Function------->
  const searchPro = (e) => {
    let inpt = e.target.value.toLowerCase();
    setFilters({ ...filters, search: inpt });
  };

  // <------Price Filter------->
  const priceFilter = (e) => {
    let fil = e.target.value;
    setFilters({ ...filters, price: fil });
  };

  // <------Category Filter------->
  const category = (e) => {
    let cat = e.target.value;
    setFilters({ ...filters, category: cat });
  };

  // <-----Clear Filter------->
  const clrFilter = (e) => {
    setFilters({ search: "", price: "", category: "all" });
    $(e.target).parent().prev().children()[0].value = -1;
  };

  // <-------Function to add products to wishlist------->
  const liked = (event) => {
    let click = event.target.closest(".productCard").id;
    products.forEach((item) => {
      if (item.id == click) {
        if (item.wish === false) {
          item.wish = true;
          pro.setWishList(++pro.wishList);
          setSnack({
            open: true,
            html: "Product added to wishlist",
            severity: "success",
          });
        } else {
          item.wish = false;
          pro.setWishList(--pro.wishList);
          setSnack({
            open: true,
            html: "Product removed from wishlist",
            severity: "error",
          });
        }
      }
    });
  };

  // <-------Function to add products to cart------->
  const addCart = (e) => {
    let click = e.target.closest(".productCard").id;
    products.forEach((item) => {
      if (item.id == click) {
        item.cart += 1;
        item.discountedPrice = (
          item.price -
          (item.discount * item.price) / 100
        ).toFixed(2);
        item.totalPrice = +item.discountedPrice * +item.cart;
        pro.setCartQuan(++pro.cartQuan);
        pro.setCart([...pro.cart, item]);
        setSnack({
          open: true,
          html: "Product added to cart",
          severity: "success",
        });
      }
    });
  };

  // <-------Function to remove products from cart------->
  const removeCart = (e) => {
    let click = e.target.closest(".productCard").id;
    let i;
    products.find((item) => {
      if (item.id === +click)
        pro.cart.find((val, inx) => {
          i = inx;
        });
      return item.id === +click;
    }).cart = 0;
    pro.cart.splice(i, 1);
    pro.setCartQuan(--pro.cartQuan);
    setSnack({
      open: true,
      html: "Product removed from cart",
      severity: "error",
    });
  };

  // <-------Function to increase the quantity of the product------->
  const increment = (e) => {
    let click = e.target.closest(".productCard").id;
    products.forEach((item) => {
      if (item.id == click) {
        item.cart += 1;
        pro.setCartQuan(++pro.cartQuan);
      }
    });
  };

  // <-------Function to decrease the quantity of the product------->
  const decrement = (e) => {
    let click = e.target.closest(".productCard").id;
    products.forEach((item) => {
      if (item.id == click) {
        if (item.cart !== 1) {
          item.cart -= 1;
          pro.setCartQuan(--pro.cartQuan);
        } else return;
      }
    });
  };
  return (
    <>
      <div className="store-container">
        {/* <--------Filters Division---------> */}
        <div className="filters">
          {/* Category Filter */}
          <h3 style={{ textAlign: "center" }}>Filters</h3>
          <div className="filtersDiv" onChange={category}>
            <select className="priceFilter" defaultValue={-1}>
              <option value={"all"}>All Products</option>
              <option value={"Games"}>Games</option>
              <option value="Outdoor">Outdoor</option>
              <option value="RideOns">RideOns</option>
              <option value="Action">Action</option>
              <option value="SoftToys">SoftToys</option>
              <option value="Indoor">Indoor</option>
            </select>
          </div>

          {/* <div >
            <input
              type="radio"
              name="category"
              value="all"
              className="radioBtn"
            />
            <button className="all all-1">All</button>{" "}
            <input
              type="radio"
              name="category"
              value="handMade"
              className="radioBtn"
            />
            <button className="all">Hand-Made</button>{" "}
            <input
              type="radio"
              name="category"
              value="giftPack"
              className="radioBtn"
            />
            <button className="all">Gift Packs</button>{" "}
            <input
              type="radio"
              name="category"
              value="baked"
              className="radioBtn"
            />
            <button className="all">Baked</button>
          </div> */}

          {/* Price Filter */}
          <div className="filtersDiv" onChange={priceFilter}>
            <select className="priceFilter" defaultValue={-1}>
              <option value={-1} style={{ display: "none" }}>
                -Sort by Price-
              </option>
              <option value={"low-to-high"}>Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>

          {/* Clear Filter Button */}
          <div className="clrBtnDiv">
            <button className="clearBtn" onClick={clrFilter}>
              Clear Filters
            </button>
          </div>
        </div>

        {/* <-----------_PRODUCT SECTION------------> */}
        <div className="products-section">
          {/* Search Bar */}
          <div className="searchDiv">
            <input
              type={"text"}
              id="searchBar"
              name="search"
              placeholder="Search.."
              className="searchbar"
              autoFocus
              autoComplete="on"
              autoCorrect="on"
              onChange={searchPro}
            />
          </div>

          {/* products section */}
          <div className="products">
            {proData.slice(limits.lower, limits.upper).map((val) => {
              return (
                // Product Card
                <div
                  className="productCard"
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
                          {(
                            val.price -
                            (val.discount * val.price) / 100
                          ).toFixed(2)}{" "}
                          <s>{val.price.toFixed(2)}</s>
                        </p>
                        <p
                          className="categoryDiv"
                          style={{
                            display: val.category !== "" ? "block" : "none",
                          }}
                        >
                          {val.category}
                        </p>
                      </div>

                      <div className="Prod-btnSet">
                        {val.cart !== 0 && (
                          <div className="counter">
                            <button
                              style={{
                                padding: "0.1vw 0.7vw",
                                marginRight: "0.3em",
                                fontSize: "1.7vw",
                                fontWeight: "800",
                              }}
                              onClick={decrement}
                            >
                              -
                            </button>
                            <span>{val.cart}</span>
                            <button
                              style={{
                                padding: "0.1vw 0.7vw",
                                marginLeft: "0.3em",
                                fontSize: "1.7vw",
                                fontWeight: "800",
                              }}
                              onClick={increment}
                            >
                              +
                            </button>
                          </div>
                        )}
                        {val.cart === 0 ? (
                          <button className={"addBtn"} onClick={addCart}>
                            Add to Cart
                          </button>
                        ) : (
                          <button className={"removeBtn"} onClick={removeCart}>
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <Pagination
              sx={{ mt: "5vh" }}
              count={parseInt(proData.length / 6) + (proData.length % 6 && 1)}
              color="secondary"
              page={page}
              onChange={(event, value) => {
                console.log(value);
                setPage(value);
                setLimits({ lower: (value - 1) * 6, upper: value * 6 });
              }}
            />
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
  );
};

export default Toys;
