import express from "express";
import cors from "cors";
import { PORT } from "./config/serverConfig.js";
import connectDB from "./config/dbConfig.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import web3Routes from "./routes/solRoutes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import chatRoutes from "./routes/chatRoute.js";
import agentRoutes from "./routes/agentRoutes.js"
// import { Server } from "socket.io";
// import { createServer } from "http";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/web3", web3Routes);
app.use('/api/chat',chatRoutes)
app.use('/api/solana',agentRoutes)

// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     credentials: true,
//   },
// });

app.get("/health", (req, res) => {
  res.send("Sandbox is online");
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   console.log("id", socket.id);
//   socket.on("test ",(data)=>{
//     console.log("socket data",data);
//   })
// });

app.listen(PORT, () => {
  connectDB();
  console.log("server is running on port:3000");
});
