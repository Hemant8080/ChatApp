import { Server as SocketIoServer } from "socket.io";
import Message from "./model/MessagesModel.js";

const setUpSocket = (server) => {
  const io = new SocketIoServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client disconnect : ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    console.log(message)
    const sendSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);
    console.log("recipientSocketId ",recipientSocketId)
    const createMessage = await Message.create(message);
    const messageData = await Message.findById(createMessage._id)
      .populate("sender", "id email firsName lastName image color")
      .populate("recipient", "id email firsName lastName image color");
      console.log("data", messageData)

      if(recipientSocketId){
        io.to(recipientSocketId).emit("recieveMessage",messageData)
      }
      if(sendSocketId){
        io.to(sendSocketId).emit("recieveMessage",messageData)
      }

  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected : ${userId} with sockt id : ${socket.id}`);
    } else {
      console.log(`User id not provided during connection`);
    }
    socket.on("sendMessage", sendMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setUpSocket;
