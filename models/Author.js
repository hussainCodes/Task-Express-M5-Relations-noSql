const { Schema, model } = require("mongoose");

const AuthorSchema = new Schema({
  name: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});
module.exports = model("Author", AuthorSchema);
