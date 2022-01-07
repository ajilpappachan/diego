const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	owner: {
		type: String,
		required: true,
	},
	deadline: {
		type: Date,
		required: false,
	},
	completed: {
		type: Boolean,
		required: true,
	},
});

module.exports = mongoose.model("projectitem", schema);
