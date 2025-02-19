import React, { useState } from "react";
import "../assets/styles/home.css";
import { FaKeyboard } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";
import JoinRoomModal from "../components/modals/JoinRoomModal";
import CreateRoomModal from "../components/modals/CreateRoomModal";
import Login from "./Login";

const HomePage = () => {
  const [createRoomModal, setCreateRoomModal] = useState(false);
  const [joinRoomModal, setJoinRoomModal] = useState(false);

  const handleModal = (type) => {
    if (type === "create") {
      setCreateRoomModal(true);
    } else {
      setJoinRoomModal(true);
    }
  };
  const handleClose = (type) => {
    if (type === "create") {
      setCreateRoomModal(false);
    } else {
      setJoinRoomModal(false);
    }
  };

  return (
    <>
      <div className="homepage homepage-global">
        <div className="homepage-sub-box">
          <div
            className="create-call-box callBox"
            onClick={() => handleModal("create")}
          >
            <IoVideocam className="callBox-icon" />
            <p>Create Room</p>
          </div>
          <div
            className="join-call-box callBox"
            onClick={() => handleModal("join")}
          >
            <FaKeyboard className="callBox-icon" />
            <p>Join Room</p>
          </div>
        </div>
      </div>
      {/* create room modal */}
      <CreateRoomModal
        open={createRoomModal}
        onClose={() => handleClose("create")}
      />
      {/* Join room modal */}
      <JoinRoomModal open={joinRoomModal} onClose={() => handleClose("join")} />
    </>
  );
};

export default HomePage;
