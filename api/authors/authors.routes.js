const express = require("express");
const authorsRoutes = express();
const { getAllAuthors , createAuthor } = require("./authors.controllers");

authorsRoutes.post("/", createAuthor);
authorsRoutes.get("/", getAllAuthors);

module.exports = authorsRoutes;