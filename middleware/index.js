var Comment = require("../models/comment"),
	Camp = require("../models/campground"),
	User = require("../models/user");

middleware = {};

middleware.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated())
		return next();
	req.flash("error", "You must login");
	res.redirect("/login");
}

middleware.comment_auth = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, (err, findedcomment) => {
			if(err){
				res.redirect("back");
			} else{
				if(findedcomment.author.id.equals(req.user.id)) {
					next();
				} else{
					res.redirect("back");
				}
			}
			
		})
	} else{
		res.redirect("/login");
	}
}

middleware.camp_auth = function(req, res, next){
	if(req.isAuthenticated()){
		Camp.findById(req.params.id, (err, findedcamp) => {
			if(err){
				res.redirect("/gorund");
			} else{
				if(findedcamp.author.id.equals(req.user.id)){  //one is mongoose object, one is string
					next();
				} else{
					res.redirect("back");
				}
			}
		})
	} else{
		res.redirect("back");
	}
}



module.exports = middleware