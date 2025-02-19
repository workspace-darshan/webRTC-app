import React from "react";
import "../assets/styles/footer.css";
import reactLight from "../assets/images/logo/react-light.svg";
import reactDark from "../assets/images/logo/react-dark.svg";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-logo">
          <img
            className="logo react"
            src={theme === "light" ? reactDark : reactLight}
            alt={"logo"}
          />
          <div className="footer-logo-text">
            <h4>Video Chat</h4>
            <h4>App</h4>
          </div>
        </div>
        <p>© 2025 - Video Chat App</p>
      </div>
    </div>
  );
};

export default Footer;
