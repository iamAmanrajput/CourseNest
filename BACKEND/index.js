const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

// Database Connection
const dbConnect = require("./config/database");
dbConnect();

// Middleware
app.use(express.json());

//defining routes
app.use("/api/v1/course", require("./routes/course"));

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is Running On Port: ${PORT}`);
});

// Error Handling
process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error:", err);
  process.exit(1);
});
