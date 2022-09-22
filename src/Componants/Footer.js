import React from "react";
import './Footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  return (
    <div className="footer" id="contactlinks">
      <div className="about">
        <span className="heading">the ToyShop For INDIA</span>
      </div>
      <div className="footer-content">
        <p>
          Journeying over 30 years, we have developed a unique style in shaping
          wholesome and decadent experiences. With a wide range of mithai and
          savouries made from richly picked ingredients and with a keen eye for
          craftsmanship, we specialise as the Tastemakers of Festivity and
          Celebration.
        </p>

        <p className="content-head">STALK US ON</p>

        <div className="socialMediaLink" >
          <span>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon sx={{ fontSize: "4vw", color: "#fb3958" }} />
            </a>
          </span>
          <span>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon sx={{ fontSize: "4vw", color: "dodgerblue" }} />
            </a>
          </span>
          <span>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <TwitterIcon sx={{ fontSize: "4vw", color: "dodgerblue" }} />
            </a>
          </span>
          <span>
            <a
              href="https://www.whatsapp.com/"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon sx={{ fontSize: "4vw", color: "#25D366" }} />
            </a>
          </span>
        </div>
      </div>

      

      <div className="finalFooter">
        <span>
          e-mail us{" "}
          <span style={{ textDecoration: "underline" }}>
            @consumerSupport@funcorpIndia.in
          </span>
        </span>
        <span>©FUN CORP 2019. All Rights Reserved</span>
      </div>
    </div>
  );
};

export default Footer;
