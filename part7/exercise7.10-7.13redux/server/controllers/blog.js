const blogsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const Blog = require("../models/blog");

blogsRouter.get(
  "/",
  [middleware.tokenExtractor, middleware.userExtractor],
  async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    return response.json(blogs);
  }
);

blogsRouter.post(
  "/",
  [middleware.tokenExtractor, middleware.userExtractor],
  async (request, response) => {
    const { title, author, url, likes } = request.body;
    const user = request.user;
    if (!title || !url) {
      return response.status(400).json({ error: "content missing" });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user.id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    user.save();
    return response.status(201).json(savedBlog);
  }
);

blogsRouter.delete(
  "/:id",
  [middleware.tokenExtractor, middleware.userExtractor],
  async (request, response) => {
    const id = request.params.id;
    const user = request.user;

    const blogToDelete = await Blog.findById(id);

    if (blogToDelete.user.toString() !== user.id) {
      return response
        .status(400)
        .json({ error: "You are not allowed to delete that note." });
    }

    await Blog.findByIdAndDelete(blogToDelete.id);
    return response.status(204).end();
  }
);

blogsRouter.put(
  "/:id",
  [middleware.tokenExtractor, middleware.userExtractor],
  async (request, response) => {
    const id = request.params.id;
    const body = request.body;

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
      new: true,
    }).populate("user", {
      username: 1,
      name: 1,
    });

    return response.json(updatedBlog);
  }
);

module.exports = blogsRouter;
