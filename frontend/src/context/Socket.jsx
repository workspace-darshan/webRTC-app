import { createContext, useContext, useEffect, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () =>
      io("http://localhost:8001", {
        // autoConnect: false,
        transports: ["websocket"],
      }),
    []
  ); // ✅ Return io instance

  useEffect(() => {
    console.log("✅ Socket initialized:", socket.id);

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from WebSocket");
    });

    return () => {
      socket.disconnect();
      console.log("🔌 Socket disconnected on unmount");
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
