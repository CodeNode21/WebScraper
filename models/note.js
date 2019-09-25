const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let NoteSchema = new Schema({
	body: String
});

let Note = mongoose.model("Note", NoteSchema);

module.exports = Note;