const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"], // ✅ Allow WebSocket upgrades
        credentials: true // 
    },
    allowEIO3: true,
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

        console.log(`📞 Received call request from ${fromEmail} to ${emailId}`);
        console.log(`✅ Emitting "incoming-call" to ${emailId} (${socketId})`);

        if (socketId) {
            socket.to(socketId).emit("incoming-call", { from: fromEmail, offer })
        }
    })


    socket.on("disconnect", () => {
        console.log("❌ A user disconnected:", socket.id);
        const email = socketToEmailMapping.get(socket.id);
        emailToSocketMapping.delete(email);
        socketToEmailMapping.delete(socket.id);
    });
});


// node port
const PORT = 8000;
app.listen(PORT, () => console.log(`🚀 API Server running on PORT ${PORT}`));

// socket port
const SOCKET_PORT = 8001;
server.listen(SOCKET_PORT, () => console.log(`📡 WebSocket Server running on PORT ${SOCKET_PORT}`));