import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import "../../assets/styles/modal.css";

const JoinRoomModal = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="global-class-for-modal"
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            onClose();
          },
        },
      }}
    >
      <DialogTitle className="global-class-modal-title">Join</DialogTitle>
      <DialogContent className="global-class-modal-content">
        <Typography>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </Typography>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default JoinRoomModal;
