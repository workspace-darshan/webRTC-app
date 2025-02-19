import React, { useEffect, useState } from "react";
import "../assets/styles/navbar.css";
import reactLight from "../assets/images/logo/react-light.svg";
import reactDark from "../assets/images/logo/react-dark.svg";
import { Link } from "react-router-dom";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import { useAuth0 } from "@auth0/auth0-react";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";

const Header = () => {
  const isSmallScreen = useMediaQuery("(max-width: 500px)");
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth0();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    logout({ returnTo: window.location.origin + "/login" });
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  useEffect(() => {
    if (!isSmallScreen && open) {
      setOpen(false);
    }
  }, [isSmallScreen, open]);

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
      <div className="header-right">
        {isSmallScreen ? (
          <button className="header-menu-btn" onClick={toggleDrawer(true)}>
            <HiMenuAlt3 style={{ color: theme === "light" ? "#121212" : "" }} />
          </button>
        ) : (
          <div className="header-profile">
            <div>
              <h4>{user?.name}</h4>
              <p>{user?.email}</p>
            </div>
            <img src={user?.picture} alt="profile" />
          </div>
        )}
        {isSmallScreen ? null : (
          <div className="theme-mode">
            <button className="theme-mode-btn" onClick={toggleTheme}>
              {theme === "light" ? (
                <MdDarkMode style={{ color: "#121212" }} />
              ) : (
                <MdLightMode />
              )}
            </button>
          </div>
        )}
      </div>

      {/* drawer */}
      <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: "auto" }}
          role="presentation"
          className="header-drawer"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <div className="header-drawer-container">
            <div className="header-drawer-profile">
              <img src={user?.picture} alt="profile" />
              <div>
                <h4>{user?.name}</h4>
                <p>{user?.email}</p>
              </div>
            </div>
            <div className="header-drawer-action">
              <button className="header-logout" onClick={handleLogout}>
                <RiLogoutCircleRLine
                  style={{ color: theme === "light" ? "#121212" : "" }}
                />
              </button>
              <button className="theme-mode-btn" onClick={toggleTheme}>
                {theme === "light" ? (
                  <MdDarkMode style={{ color: "#121212" }} />
                ) : (
                  <MdLightMode />
                )}
              </button>
            </div>
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default Header;
