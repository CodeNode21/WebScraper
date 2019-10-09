const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let BusinessSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: false
	},
	address: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	tag: [{
		type: Schema.Types.ObjectId,
		ref: "Tag"
	}]
});

let Business = mongoose.model("Business", BusinessSchema);

module.exports = Business;