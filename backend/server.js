const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

/** Luôn cho phép Next dev local gọi API trên Render (kèm origin từ CORS_ORIGIN). */
const LOCAL_DEV_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
];

const corsOrigins = process.env.CORS_ORIGIN?.split(",").map((s) => s.trim()).filter(Boolean);

function isHttpsVercelApp(origin) {
  try {
    const u = new URL(origin);
    return u.protocol === "https:" && u.hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (LOCAL_DEV_ORIGINS.includes(origin)) return callback(null, true);
      if (corsOrigins.includes(origin)) return callback(null, true);
      if (isHttpsVercelApp(origin)) return callback(null, true);
      if (corsOrigins.length === 0) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/uploads", express.static("uploads"))

app.get("/", (req, res) => {
  res.send("API Running...");
});

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => console.log("Server running on port " + port));