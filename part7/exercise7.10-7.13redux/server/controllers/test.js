const User = require("../models/user");
const Blog = require("../models/blog");
const testRouter = require("express").Router();

testRouter.post("/reset", async (request, response) => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  return response.status(204).end();
});

module.exports = testRouter;
