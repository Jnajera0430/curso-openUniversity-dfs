const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

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

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("notes", {
    content: 1,
    important: 1,
  });
  return response.json(users);
});

module.exports = userRouter;
