import React from "react";
import "../assets/styles/navbar.css";
import reactLight from "../assets/images/logo/react-light.svg";
import reactDark from "../assets/images/logo/react-dark.svg";
import { Link } from "react-router-dom";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="navbar">
      <div className="logo">
        <Link to={"/"}>
          <img
            src={theme === "light" ? reactDark : reactLight}
            className="logo react"
            alt="React logo"
          />
        </Link>
      </div>
      <div className="theme-mode">
        <button className="theme-mode-btn" onClick={toggleTheme}>
          {theme === "light" ? (
            <MdDarkMode style={{ fontSize: "30px", color: "#121212" }} />
          ) : (
            <MdLightMode style={{ fontSize: "30px" }} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
