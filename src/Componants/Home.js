import React from "react";
import "./Home.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="homeDiv">
      <div className="ad1">
        <button className="shopnowBtn" onClick={() => navigate("./toys")}>
          <KeyboardDoubleArrowRightIcon /> Shop Now{" "}
          <KeyboardDoubleArrowLeftIcon />
        </button>
      </div>

      <div className="shopByCategory">
        <h1>Hot Deals</h1>
        <div className="cardList">
          <div className="card1" onClick={() => navigate("/toys")}>
            <img
              src="https://d2s7hpbx4rtiif.cloudfront.net/catalog/category/Building_Construction.jpg"
              alt=""
              height={"100%"}
              width="100%"
            />
            <h1>Building &amp; Construction</h1>
          </div>

          <div className="card1" onClick={() => navigate("./toys")}>
            <img
              src="https://d2s7hpbx4rtiif.cloudfront.net/catalog/category/Toy_Guns_Bullets.jpg"
              alt=""
              height={"100%"}
              width="100%"
            />
            <h1>Toys, Guns &amp; Bullets</h1>
          </div>

          <div className="card1" onClick={() => navigate("./toys")}>
            <img
              src="https://d2s7hpbx4rtiif.cloudfront.net/catalog/category/Action_Figures-2.jpg"
              alt=""
              height={"100%"}
              width="100%"
            />
            <h1>Action Figures</h1>
          </div>
        </div>
      </div>

      <div className="ytFrame">
        <iframe
          width="100%"
          height="330"
          src="https://www.youtube.com/embed/l1gmTOPxKGc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="ad2">
        <img
          src="https://d2s7hpbx4rtiif.cloudfront.net/wysiwyg/Lego_mobile_2_1-min.jpg"
          alt=""
          width={"43%"}
          height="100%"
        />
        <img
          src="https://d2s7hpbx4rtiif.cloudfront.net/wysiwyg/2000x1000-Dreamland.jpg"
          alt=""
          width={"43%"}
          height="100%"
        />
      </div>

      <div className="aboutUsDiv" id="about">
        
          <div className="first">
        <h1>ABOUT US</h1>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </div>
          <div className="second">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbF9G0-k9PDgLa_mvug7QGxdGQnKNJ5tB8ZdhNeJbgOyP8-kJ_YKi2xpzSUP-Mdhpm7wA&usqp=CAU" alt="" width={"100%"} />
          </div>
        
      </div>
    </div>
  );
};

export default Home;
