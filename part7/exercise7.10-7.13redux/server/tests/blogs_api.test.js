const { after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const User = require("../models/user");

const api = supertest(app);

describe("When there is initially some blogs saved", () => {
  let token = "";
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const { name, password, username } = helper.initialUser[0];

    const responseUser = await api
      .post("/api/users")
      .send({ name, username, password });
    const listBlogs = helper.initialBlogs.map((blog) => ({
      ...blog,
      user: responseUser.body.id,
    }));
    await Blog.insertMany(listBlogs);
    const response = await api.post("/api/login").send({ username, password });
    token = response.body.token;
  });

  test("Blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("return all blogs", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("return id as property", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body[0]).toHaveProperty("id");
  });

  describe("addition of a new blog", () => {
    test("a valid blog can be added", async () => {
      const newBlog = {
        title: "String",
        author: "String",
        url: "String",
        likes: 9,
      };
      console.log({ token });
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api
        .get("/api/blogs")
        .set("Authorization", `Bearer ${token}`);
      const authors = response.body.map((r) => r.author);
      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
      assert(authors.includes("String"));
    });

    test("a valid blog can be added without the likes property and will have a value of 0", async () => {
      const newBlog = {
        title: "String",
        author: "String",
        url: "String",
      };

      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
      const body = response.body;
      expect(body).toHaveProperty("likes");
      expect(body.likes).toBe(0);
    });

    test("a valid blog can't be added without the propertie title and will have to return a status 400", async () => {
      const newBlog = {
        title: "",
        author: "String",
        url: "String",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });

    test("a valid blog can't be added without the propertie url and will have to return a status 400", async () => {
      const newBlog = {
        title: "String",
        author: "String",
        url: "",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogAtStart = await helper.blogsInDB();
      const blogToDelete = blogAtStart[0];
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDB();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

      const authors = blogsAtEnd.map((blog) => blog.author);
      assert(!authors.includes(blogToDelete.author));
    });
  });

  describe("edition of a blog", () => {
    test("succeeds with status code 200 if id is valid", async () => {
      const blogAtStart = await helper.blogsInDB();
      const blogToUpdate = blogAtStart[0];
      blogToUpdate.likes += 1;
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(blogToUpdate)
        .expect(200);

      const blogsAtEnd = await helper.blogsInDB();
      const updatedBlog = blogsAtEnd[0];

      assert.deepStrictEqual(blogToUpdate, updatedBlog);
    });
  });

  after(async () => {
    await mongoose.disconnect();
  });
});
