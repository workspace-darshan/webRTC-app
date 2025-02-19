import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SiteLoader from "../components/SiteLoader";

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  return <SiteLoader />;
};

export default Login;
