import React, { useCallback, useEffect } from "react";
import "../assets/styles/room.css";
import { useSocket } from "../context/Socket";
import { usePeer } from "../context/Peer";

const RoomPage = () => {
  const { socket } = useSocket();
  const { peer, createOffer } = usePeer();

  const handleNewUserjoined = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log("New User joined", emailId);
      const offer = await createOffer();
      socket.emit("call-user", { emailId, offer });
    },
    [socket, createOffer]
  );

  const handleIncomingCall = useCallback((data) => {
    const { from, offer } = data;
    console.log("incoming call", data);
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("user-joined", handleNewUserjoined);
    socket.on("incoming-call", handleIncomingCall);

    return () => {
      socket.off("user-joined", handleNewUserjoined);
      socket.off("incoming-call", handleIncomingCall);
    };
  }, [handleNewUserjoined, socket, handleIncomingCall]);

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
