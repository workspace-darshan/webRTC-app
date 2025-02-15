import React, { useEffect, useState } from "react";
import "../assets/styles/home.css";
import { useSocket } from "../context/Socket";
import { useNavigate } from "react-router-dom";
import { FaKeyboard } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";
import JoinRoomModal from "../components/modals/JoinRoomModal";
import CreateRoomModal from "../components/modals/CreateRoomModal";
import { useTheme } from "../context/ThemeContext";

const HomePage = () => {
  const { theme } = useTheme();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [createRoomModal, setCreateRoomModal] = useState(false);
  const [joinRoomModal, setJoinRoomModal] = useState(false);
  const [values, setValues] = useState({
    email: "",
    roomId: "",
  });

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

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoomJoined = ({ roomId }) => {
    console.log("RoomJoined==>", roomId);
    navigate(`/room/${roomId}`);
    setValues({
      email: "",
      roomId: "",
    });
  };

  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);
  }, [socket]);

  const handleSubmit = () => {
    socket.emit("join-room", {
      emailId: values.email,
      roomId: values.roomId,
    });
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

      {/* <p className="read-the-docs">
        For conneting to room.. enter your email & room Id
      </p>
      <div className="input-box">
        <input
          type="text"
          className="input-email"
          placeholder="enter your email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <input
          name="roomId"
          type="text"
          className="input-roomId"
          placeholder="enter room id"
          value={values.roomId}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div> */}

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
