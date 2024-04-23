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

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  return response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
  });

  return response.json(updatedBlog);
});

module.exports = blogsRouter;
