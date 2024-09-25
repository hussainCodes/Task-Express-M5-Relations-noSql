const express = require("express");
const postsRoutes = express.Router();
const {
  fetchPost,
  postsGet,
  postsUpdate,
  postsDelete,
  postsCreate,
} = require("./posts.controllers");

postsRoutes.param("postId", async (req, res, next, postId) => {
  const post = await fetchPost(postId, next);
  if (post) {
    req.post = post;
    next();
  } else {
    const err = new Error("Post Not Found");
    err.status = 404;
    next(err);
  }
});

postsRoutes.get("/", postsGet);
postsRoutes.post("/:authorId", postsCreate);
postsRoutes.delete("/:postId", postsDelete);
postsRoutes.put("/:postId", postsUpdate);

module.exports = postsRoutes;
