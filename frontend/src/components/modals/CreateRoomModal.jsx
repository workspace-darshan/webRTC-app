import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Divider,
} from "@mui/material";
import { FaCopy } from "react-icons/fa";
import "../../assets/styles/modal.css";

const CreateRoomModal = ({ open, onClose, roomCode = "esf-htjd-ukj" }) => {
  const [copied, setCopied] = useState(false);

  // Function to copy the room code
  const handleCopy = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset copy status after 1.5s
  };
  return (
    <Dialog open={open} onClose={onClose} className="global-class-for-modal">
      <DialogTitle className="global-class-modal-title">
        <b>Room Created</b>
      </DialogTitle>
      <DialogContent className="global-class-modal-content">
        <Typography>
          Share this room code with your friends to join the call.
        </Typography>
        {/* Room Code Display */}
        <div className="room-code-container">
          <div className="room-code-field">{roomCode}</div>
          <button onClick={handleCopy} className="copy-btn">
            <FaCopy /> {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomModal;
