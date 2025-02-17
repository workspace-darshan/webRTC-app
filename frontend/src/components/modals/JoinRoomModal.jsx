import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import "../../assets/styles/modal.css";
import { useSocket } from "../../context/Socket";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  roomId: Yup.string().required("Room ID is required"),
});

const JoinRoomModal = ({ open, onClose }) => {
  const { socket } = useSocket();
  const navigate = useNavigate();

  const handleModalClose = () => {
    formik.resetForm();
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      roomId: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      onClose();
      resetForm();
      socket.emit("join-room", {
        emailId: values.email,
        roomId: values.roomId,
      });
    },
  });

  const handleRoomJoined = ({ roomId }) => {
    console.log("RoomJoined==>", roomId);
    navigate(`/room/${roomId}`);
  };

  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);
    // return socket.off("joined-room", handleRoomJoined);
  }, [socket]);

  return (
    <Dialog
      open={open}
      onClose={handleModalClose}
      className="global-class-for-modal"
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle className="global-class-modal-title">
          <b>Join Room</b>
        </DialogTitle>
        <DialogContent className="global-class-modal-content">
          <Typography color="default">
            Enter room code to join the call.
          </Typography>
          <Box mt={2}>
            <TextField
              required
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              required
              margin="dense"
              id="roomId"
              name="roomId"
              label="Room Id"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.roomId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.roomId && Boolean(formik.errors.roomId)}
              helperText={formik.touched.roomId && formik.errors.roomId}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button variant="contained" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Join Room
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default JoinRoomModal;
