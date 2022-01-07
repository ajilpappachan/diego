const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	priority: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("bucketitem", schema);
