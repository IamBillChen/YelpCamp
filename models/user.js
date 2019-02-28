var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");


UserSchema = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);