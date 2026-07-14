require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Used Medical Marketplace API" });
});

app.use("/api/users", require("./src/routes/users"));
app.use("/api/listings", require("./src/routes/listings"));
app.use("/api/categories", require("./src/routes/categories"));
app.use("/api/ratings", require("./src/routes/ratings"));
app.use("/api/reports", require("./src/routes/reports"));
app.use("/api/search-logs", require("./src/routes/searchLogs"));
app.use("/api/stats", require("./src/routes/stats"));
app.use("/api/orders", require("./src/routes/orders"));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
