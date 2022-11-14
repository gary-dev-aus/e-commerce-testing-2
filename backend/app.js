const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();
require("dotenv").config();

const PORT = 3000;

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err));

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/carts", require("./routes/carts"));
// 404 catch all
app.use("*", (req, res) => {
  res.status(404).json({ errors: [{ message: "Path not found" }] });
  console.log("\x1b[31m" + "404: Path not found");
});
