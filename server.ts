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
  let leaderboard: any[] = [];

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Send initial state
    socket.emit("init_messages", messages);
    socket.emit("init_leaderboard", leaderboard);

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
    });

    // Handle leaderboard updates
    socket.on("save_result", (entry) => {
      const newEntry = {
        ...entry,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      leaderboard.push(newEntry);
      // Sort and keep top 50
      leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
      leaderboard = leaderboard.slice(0, 50);
      io.emit("update_leaderboard", leaderboard);
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

startServer();
