const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

const emailToSocketMapping = new Map();

const socketToEmailMapping = new Map();

io.on("connection", (socket) => {
    socket.on("join-room", (data) => {
        const { roomId, emailId } = data;
        emailToSocketMapping.set(emailId, socket.id);
        socketToEmailMapping.set(socket.id, emailId)
        socket.join(roomId);

        socket.emit("joined-room", { roomId })

        socket.broadcast.to(roomId).emit("user-joined", { emailId });
    });

    socket.on("call-user", (data) => {
        const { emailId, offer } = data;
        const fromEmail = socketToEmailMapping.get(socket.id)
        const socketId = emailToSocketMapping.get(emailId)
        socket.to(socketId).emit("incoming-call", { from: fromEmail, offer })
    }) 


    socket.on("disconnect", () => {
        console.log("❌ A user disconnected:", socket.id);
    });
});

server.listen(8000, () => console.log("Server running on PORT 8000"));
