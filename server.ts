import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  const PORT = 3000;

  // In-memory storage (volatile)
  let messages: any[] = [];

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Send initial state
    socket.emit("init_messages", messages);

    // Handle chat messages
    socket.on("send_message", (msg) => {
      const newMessage = {
        ...msg,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      messages.push(newMessage);
      // Keep only last 50 messages
      if (messages.length > 50) messages.shift();
      io.emit("new_message", newMessage);
      // Also stop typing when message is sent
      socket.broadcast.emit("stop_typing", { userName: msg.userName });
    });

    // Handle typing indicator
    socket.on("typing", (data) => {
      socket.broadcast.emit("typing", data);
    });

    socket.on("stop_typing", (data) => {
      socket.broadcast.emit("stop_typing", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  startServer();
}

export default startServer;
