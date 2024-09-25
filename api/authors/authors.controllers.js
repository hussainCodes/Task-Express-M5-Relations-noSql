const AuthorSchema = require("../../models/Author");

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await AuthorSchema.find().populate("posts", "-author");
    return res.status(200).json({ data: authors });
  } catch (error) {
    next(error);
  }
};

const createAuthor = async (req, res, next) => {
  try {
    const newAuthor = AuthorSchema.create(req.body);
    return res.status(201).json({ data: newAuthor });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllAuthors, createAuthor };
