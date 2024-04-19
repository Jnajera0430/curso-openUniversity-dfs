const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;
  if (!title || !url) {
    return response.status(400).json({ error: "content missing" });
  }
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
  });

  const savedBlog = await blog.save();

  return response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
