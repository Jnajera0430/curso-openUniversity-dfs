const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const middleware = require("../utils/middleware");
const User = require("../models/user");

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (username === undefined || password === undefined) {
    return response.status(400).json({ error: "username or password missing" });
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: "Password is shorter than the minimum allowed length (3). ",
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.status(201).json(savedUser);
});

userRouter.get(
  "/",
  [middleware.tokenExtractor, middleware.userExtractor],
  async (request, response) => {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
    });
    return response.json(users);
  }
);

module.exports = userRouter;
