const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const http = require("http");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Enable CORS for all routes
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, daba!");
});

// Basic error handling middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const server = http.createServer(app);

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use.`);
  } else {
    console.error("Server error:", error);
  }
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`\nHTTP Server is running on port ${PORT}\n`);
});
