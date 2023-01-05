require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const colors = require("colors");
const path = require("path");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const logoRoutes = require("./routes/logo");
const orderRoutes = require("./routes/order");

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED".cyan.underline);
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", logoRoutes);
app.use("/api", orderRoutes);

var __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
