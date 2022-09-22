import React, { createContext, useState } from "react";
import "./App.css";
import Navig from "./Componants/Navig";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Componants/Home";
import Toys from "./Componants/Toys";
import Wishlist from "./Componants/Wishlist";
import Cart from "./Componants/Cart";
import Footer from "./Componants/Footer";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export const Context = createContext();

function App() {
  const [login, setLogin] = useState(false);
  let [wishList, setWishList] = useState(0);
  let [cartQuan, setCartQuan] = useState(0);
  let [theme, setTheme] = useState(false);
  let [cart, setCart] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Context.Provider
          value={{
            login,
            setLogin,
            wishList,
            setWishList,
            cartQuan,
            setCartQuan,
            theme,
            setTheme,
            cart,
            setCart,
          }}
        >
          <Routes>
            <Route path="/" element={<Navig />}>
              <Route index element={<Home />} />
              <Route path="/toys" element={<Toys />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </Context.Provider>

        <div
          className="themeBtn"
          onClick={() => document.body.classList.toggle("dark-mode")}
        >
          <span onClick={() => setTheme(!theme)}>
            {theme ? (
              <DarkModeIcon id="darkBtn" />
            ) : (
              <LightModeIcon id="lightMode" />
            )}
          </span>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;


// https://www.funcorp.in/