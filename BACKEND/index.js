const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

// Database Connection
const dbConnect = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
dbConnect();
cloudinaryConnect();

// Middleware
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

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
