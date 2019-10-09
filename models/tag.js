const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let tagSchema = new Schema({
	body: String
});

let Tag = mongoose.model("Note", tagSchema);

module.exports = Tag;