import React, { Suspense, useState, useEffect } from "react";
import "../assets/styles/commonLayout.css";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SiteLoader from "../components/SiteLoader";
import { useAuth0 } from "@auth0/auth0-react";

const CommonLayout = () => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay (e.g., 2 seconds) to show the loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="layout-container">
      <div className="layout-middle-box">
        {loading ? (
          <SiteLoader />
        ) : (
          <>
            {isAuthenticated ? <Header /> : null}
            <main className="common-content">
              <Outlet />
            </main>
            {isAuthenticated ? <Footer /> : null}
          </>
        )}
      </div>
    </div>
  );
};

export default CommonLayout;
