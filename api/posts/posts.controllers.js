const Post = require("../../models/Post");
const AuthorSchema = require("../../models/Author");
const Tag = require("../../models/Tag");
const tagsRoutes = require("../tags/tags.routes");
exports.fetchPost = async (postId, next) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    next(error);
  }
};

exports.postsCreate = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const postData = {
        ...req.body,
        author: authorId
    }
    const newPost = await Post.create(postData);
    const author = await AuthorSchema.findByIdAndUpdate(authorId, {
      $push: { posts: newPost._id},
    });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.postsDelete = async (req, res) => {
  try {
    await Post.findByIdAndRemove({ _id: req.post.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsUpdate = async (req, res) => {
  try {
    const {postId} = req.params;
    
    // update the tags to include the postID
    const updatedTags = await Tag.updateMany({_id: req.body.tags}, {
      $push: {posts: postId}
    });

    // update the post to include the tagsIDs
    const updatedPost = await Post.findByIdAndUpdate(postId, {
        $push: {tags: {$each: req.body.tags}}
    })
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsGet = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "-posts");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};
