const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/loggers");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");

//connect
mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

//middlewares
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

//Router + controllers
//routes public
app.use("/api/login", loginRouter);

//routes protected
app.use("/api/users", userRouter);
app.use("/api/blogs", blogsRouter);

//handler errors
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
