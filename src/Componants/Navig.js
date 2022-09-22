import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Navig.css";
import {
  Alert,
  Badge,
  Box,
  Button,
  Modal,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import userData from "../User.json";
import { Context } from "../App";
import NavigationOutlinedIcon from "@mui/icons-material/NavigationOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

const Navig = () => {
    const navigate = useNavigate();
  const user = useContext(Context);
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    html: "",
    severity: "info",
  });

  // UseEffect Section
  useEffect(() => {
    const scrollOnPx = 800;
    const backToTopBtn = document.querySelector(".back-to-top-btn");

    document.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > scrollOnPx) {
        backToTopBtn.style.cssText = "display:block";
      } else {
        backToTopBtn.style.cssText = "display:none";
      }
    });
  });
  //function for submit of LOGIN forms
  const submitLogin = () => {
    let mail = document.getElementById("email").value;
    let pswd = document.getElementById("password").value;
    if (mail === userData[0].email && pswd === userData[0].password) {
      setOpen(false);
      document.getElementById("signUpLoginBtn").style.display = "none";
      document.getElementById("user").innerHTML = userData[0].name;
      document.getElementById("username").style.display = "block";
      document.getElementById("logoutBtn").style.display = "block";
      user.setLogin(true);
      setSnack({
        open: true,
        html: "Sucessfully Logged In",
        severity: "success",
      });
      //   setOpen1(false);
    } else if (mail === "" && pswd === "") {
      setSnack({
        open: true,
        html: "Please Enter your email and password",
        severity: "error",
      });
      user.setLogin(false);
    } else {
      setSnack({
        open: true,
        html: "Wrong Credentials, Please enter again!",
        severity: "error",
      });
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      user.setLogin(false);
    }
  };

  //Function for LogOut
  const logout = () => {
    document.getElementById("signUpLoginBtn").style = {
      display: "flex",
      width: "8vw",
      justifyContent: "space-between",
    };

    document.getElementById("user").innerHTML = "";
    document.getElementById("username").style.display = "none";
    document.getElementById("logoutBtn").style.display = "none";
    user.setLogin(true);
    setSnack({
      open: true,
      html: "Logged Out!",
      severity: "info",
    });
    user.setLogin(false);
    navigate("/");
  };
  return (
    <>
      <div className="navigDiv">
        <div className="navigationBar">
          <div className="logo">
            <img
              src="https://d2s7hpbx4rtiif.cloudfront.net/logo/stores/1/logo_new.png"
              alt="logo"
            />
          </div>

          <ul className="navContent">
            <NavLink
              to={"/"}
              exact="true"
              style={linkStyle}
              activeclasslist={"active"}
            >
              <li>HOME</li>
            </NavLink>

            <NavLink
              to={"/toys"}
              style={linkStyle}
              exact={"true"}
              activeclasslist={"active"}
            >
              <li>TOYS</li>
            </NavLink>

            <a href='#contactlinks' style={{ textDecoration:'none'}}><li>CONTACT</li></a>
            <a href='#about' style={{ textDecoration:'none'}}><li>ABOUT US</li></a>

            <NavLink
              to={"/wishlist"}
              style={linkStyle}
              exact={"true"}
              activeclasslist={"active"}
            >
              <Badge badgeContent={user.wishList} color="error" max={6}>
                <Tooltip title="Wish List" arrow>
                  <FavoriteIcon />
                </Tooltip>
              </Badge>
            </NavLink>

            <NavLink
              to={"/cart"}
              exact="true"
              style={linkStyle}
              activeclasslist={"active"}
            >
              <Badge badgeContent={user.cart.length} color="error" max={6}>
                <Tooltip title="Your Cart" arrow>
                  <ShoppingCartCheckoutIcon />
                </Tooltip>
              </Badge>
            </NavLink>

            <span id="signUpLoginBtn">
            <li>
              <button className="logInBtn"  onClick={() => setOpen(true)}>Log In</button>
            </li>
            </span>
          </ul>

          <span
              id="username"
              style={{
                display: "flex",
                alignItems: "center",
                
                margin: "0 3vw"
              }}
            >
              <span id="user"></span>
            </span>

            <span id="logoutBtn">
              <Tooltip title="Logout" arrow>
                <LogoutIcon onClick={logout} />
              </Tooltip>
            </span>
        </div>

        
      </div>
      <Outlet />

      {/* USER LOGIN MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Log In
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
              type={"email"}
              placeholder="E-mail"
              className="signUpform"
              id="email"
              autoFocus
              autoComplete="yes"
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
              type={"password"}
              placeholder="Password"
              className="signUpform"
              id="password"
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button variant="contained" id="submitLogin" onClick={submitLogin}>
              Submit
            </Button>
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: "2vh",
              color: "#5d5d5d",
              fontSize: "small",
            }}
          >
            <em>**Sample User Id: user451@gmail.com**</em>
            <em>**Sample Password: 125451**</em>
          </Typography>
        </Box>
      </Modal>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => {
          setSnack({ open: false, html: "", severity: "info" });
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snack.severity}
          variant={"filled"}
          onClose={() => {
            setSnack({ open: false, html: "", severity: "info" });
          }}
        >
          {snack.html}
        </Alert>
      </Snackbar>

      {/* BACK TO TOP BUTTON */}
      <Tooltip title="Back to Top" arrow>
        <div
          className="back-to-top-btn"
          onClick={() => {
            document.documentElement.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <NavigationOutlinedIcon
            sx={{ color: user.theme ? "black" : "white" }}
          />
        </div>
      </Tooltip>

    </>
  );
};

export default Navig;

const linkStyle = {
  color: "var(--navlinks)",
  textDecoration: "none",
};

// Style for Login In Modal
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  backgroundColor: "white",
  color: "black",
  textAlign: "center",
  border: "none",
};
