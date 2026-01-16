require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
app.use(cors());
const allowedOrigins = [
  "http://localhost:5173",
  "https://watch.streamhubmedia.com",
];
app.use(express.json());

const userRoute = require("./routers/user.routers.js");
const heroRoute = require("./routers/hero.routers.js");
const { connectDB } = require("./lib/db_connection/db_connection.js");

app.use("/api/user", userRoute);
app.use("/api/hero", heroRoute);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
})();

app.get("/", (req, res) => {
  const message = "Leanding Banner Works!";
  const version = "NodeJs" + process.versions.node;
  const response = [message, version].join("\n");
  res.setHeader("Content-Type", "text/plain");
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
