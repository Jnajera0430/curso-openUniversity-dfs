const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/loggers");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blog");

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
app.use("/api/blogs", blogsRouter);

//handler errors
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
