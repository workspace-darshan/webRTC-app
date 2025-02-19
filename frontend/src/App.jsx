import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { SocketProvider } from "./context/Socket";
import { ThemeProvider } from "./context/ThemeContext";
import { PeerProvider } from "./context/Peer";
import { Auth0Provider } from "@auth0/auth0-react";
const CommonLayout = lazy(() => import("./layout"));
const HomePage = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const RoomPage = lazy(() => import("./pages/Room"));

const App = () => {
  return (
    <Auth0Provider
      domain="practice-darshan.us.auth0.com"
      clientId="pMRO5lzKLf2hp36n4Wy9eJIZlUtKyMDy"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ThemeProvider>
        <SocketProvider>
          <PeerProvider>
            <Routes>
              <Route path="*" element={<CommonLayout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<Login />} />
                <Route path="room/:roomId" element={<RoomPage />} />
              </Route>
            </Routes>
          </PeerProvider>
        </SocketProvider>
      </ThemeProvider>
    </Auth0Provider>
  );
};

export default App;
