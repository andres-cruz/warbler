require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// customs requiere
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const db = require("./models");

// settings
const PORT = 8080;
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// leave error handler here!
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});
