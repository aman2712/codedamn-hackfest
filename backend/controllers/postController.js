import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

/**
 * @desc    Create a post
 * @route   POST /api/posts/create
 * @access  Private
 */

const createPost = asyncHandler(async (req, res) => {
  const { content, image, githubLink, liveDemoLink } = req.body;

  const post = await Post.create({
    content,
    image: image ? image : null,
    githubLink: githubLink ? githubLink : null,
    liveDemoLink: liveDemoLink ? liveDemoLink : null,
    likes: [],
    userId: req.user.id,
  });

  if (post) {
    res.status(201).json({ message: "Post created successfully" });
  } else {
    res.status(500);
    throw new Error("Internal server error");
  }
});

/**
 * @desc    Create a post
 * @route   POST /api/posts/:id
 * @access  Public
 */

const getPost = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const post = await Post.findById(id);

  if (post) {
    res.status(201).json(post);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @desc    Get all posts
 * @route   GET /api/posts
 * @access  Public
 */

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort("-createdAt").populate({
    path: "userId",
    select: "-password",
  });

  res.status(200).json(posts);
});

/**
 * @desc    Update a post
 * @route   PUT /api/posts/update/:id
 * @access  Private
 */

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    if (post.userId.toString() === req.user.id) {
      Post.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => {
          return res.status(200).json({ message: "Post updated" });
        })
        .catch((err) => {
          return res.status(404).json({ message: "Post not found" });
        });
    } else {
      res.status(400);
      throw new Error("Not authorized to edit the post");
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @desc    Delete a post
 * @route   DELETE /api/posts/delete/:id
 * @access  Private
 */

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    if (post.userId === req.user.id) {
      await product.remove();
      res.json({ message: "Post deleted" });
    } else {
      res.status(400);
      throw new Error("Not authorized to edit the post");
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @desc    Like a post
 * @route   PUT /api/posts/like/:id
 * @access  Private
 */

const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter((userId) => userId !== req.user.id);
      await post.save();
      res.status(200).json({ likes: post.likes, userLiked: false });
    } else {
      post.likes = [...post.likes, req.user.id];
      await post.save();
      res.status(200).json({ likes: post.likes, userLiked: true });
    }
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

export { createPost, getAllPosts, updatePost, deletePost, likePost, getPost };
