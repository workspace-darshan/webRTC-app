import React, { useCallback, useEffect } from "react";
import "../assets/styles/room.css";
import { useSocket } from "../context/Socket";
import { usePeer } from "../context/Peer";

const RoomPage = () => {
  const { socket } = useSocket();
  const { peer, createOffer } = usePeer();

  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log("New User joined", emailId);
      const offer = await createOffer();
      socket.emit("call-user", { emailId, offer });
    },
    [socket, createOffer]
  );

  const handleIncomingCall = useCallback((data) => {
    console.log("📞 Incoming Call Event Received:", data);
  }, []);

  useEffect(() => {
    console.log("🔗 Setting up socket listeners");

    socket.on("user-joined", handleNewUserJoined);
    socket.on("incoming-call", handleIncomingCall);

    console.log(
      "🔍 Current listeners after adding:",
      socket.listeners("incoming-call")
    );

    return () => {
      console.log("❌ Removing socket listeners");
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incoming-call", handleIncomingCall);
    };
  }, [socket, handleNewUserJoined, handleIncomingCall]);

  return (
    <div className="room-container">
      <h3 id="room-heading">This is Heading</h3>
      <div
        className="room-box"
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gap: ".5rem",
        }}
      >
        <div className="remote-screen-box media_player"></div>
        <div className="user-screen-box">
          <div className="current-user-screen"></div>
          <div className="current-user-screen"></div>
          <div className="current-user-screen"></div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
