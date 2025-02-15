import { lazy } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { SocketProvider } from "./context/Socket";
import { ThemeProvider } from "./context/ThemeContext";
const HomePage = lazy(() => import("./pages/Home"));
const RoomPage = lazy(() => import("./pages/Room"));
const Header = lazy(() => import("./components/Header"));

const App = () => {
  return (
    <ThemeProvider>
      <SocketProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
        </Routes>
      </SocketProvider>
    </ThemeProvider>
  );
};

export default App;
