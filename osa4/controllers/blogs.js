const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { tokenExtractor, userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.post(
  "/",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const { title, url, author, likes } = request.body;
    const user = request.user;

    if (!title || !url) {
      return response.status(400).json({
        error: "title or url is missing",
      });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    const populatedBlog = await savedBlog.populate("user", {
      username: 1,
      name: 1,
    });

    response.status(201).json(populatedBlog);
  }
);

blogsRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({
        error: "blog not found",
      });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(403).json({
        error: "unauthorized: you can only delete your own blogs",
      });
    }

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
);

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      title,
      author,
      url,
      likes,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
