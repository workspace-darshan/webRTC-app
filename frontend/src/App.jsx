import { lazy } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { SocketProvider } from "./context/Socket";
import { ThemeProvider } from "./context/ThemeContext";
import { PeerProvider } from "./context/Peer";
const HomePage = lazy(() => import("./pages/Home"));
const RoomPage = lazy(() => import("./pages/Room"));
const Header = lazy(() => import("./components/Header"));

const App = () => {
  return (
    <ThemeProvider>
      <SocketProvider>
        <PeerProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
          </Routes>
        </PeerProvider>
      </SocketProvider>
    </ThemeProvider>
  );
};

export default App;
