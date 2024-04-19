const { after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("Blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("return all blogs", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("return id as property", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0]).toHaveProperty("id");
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "String",
    author: "String",
    url: "String",
    likes: 9,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
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
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const body = response.body;
  console.log({ likes: body.likes });
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
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

after(async () => {
  await mongoose.disconnect();
});
