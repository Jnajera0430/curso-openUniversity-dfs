const bcrypt = require("bcrypt");
const { after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const User = require("../models/user");

const api = supertest(app);

describe("When there is initially some users saved", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const listUser = helper.initialUser.map(async (item) => {
      const { name, password, username } = item;
      const passwordHash = await bcrypt.hash(password, 10);

      return new User({
        name,
        username,
        passwordHash,
      });
    });

    await User.insertMany(await Promise.all(listUser));
  });

  describe("addition of a new user", () => {
    test("a valid user can be added", async () => {
      const newuser = {
        username: "root",
        name: "Superuser",
        password: "salainen",
      };

      await api
        .post("/api/users")
        .send(newuser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const users = await helper.userInDb();
      assert.strictEqual(users.length, helper.initialUser.length + 1);
    });

    test("a valid user can't be added without the username property and will have a value of 0", async () => {
      const newuser = {
        name: "Superuser",
        password: "salainen",
      };

      await api
        .post("/api/users")
        .send(newuser)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });

    test("a valid user can't be added without the password property and will have a value of 0", async () => {
      const newuser = {
        username: "root",
        name: "Superuser",
      };

      await api
        .post("/api/users")
        .send(newuser)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });
  });

  after(async () => {
    await mongoose.disconnect();
  });
});
