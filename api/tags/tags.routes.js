const express = require("express");
const tagsRoutes = express.Router();
const {createTag} = require("./tags.controllers");

tagsRoutes.post("/", createTag)

module.exports = tagsRoutes;
