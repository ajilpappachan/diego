const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	priority: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("watchitem", schema);
