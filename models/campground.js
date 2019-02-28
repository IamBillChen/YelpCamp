var mongoose = require("mongoose"),
	comment = require("./comment");


var campSchema = new mongoose.Schema({
	img: String,
	description: String,
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}],
	author:{
		id: mongoose.Schema.Types.ObjectId,
		username: String
	}
});

module.exports = mongoose.model("Camp", campSchema);