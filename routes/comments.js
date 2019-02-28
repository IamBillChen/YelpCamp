var express = require("express"),
	Comment = require("../models/comment"),
	middleware = require("../middleware");

var route = express.Router({mergeParams: true});

route.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("comment/new", {id: req.params.id});
})

route.post("/", middleware.isLoggedIn, function(req, res){
	newcomment = {
		author: {
			id: req.user._id,
			username: req.user.username
		},
		content: req.body.comment.content
	};

	console.log(newcomment);
	Comment.create(newcomment, function(err, one){
		if(err){
			console.log(err);
		} else{
			Camp.findById(req.params.id, function(err, data){
				if(err){
					console.log(err);
				} else{
					data.comments.push(one.id);
					data.save();
				}
			});
		}
	});

	res.redirect("/ground/" + req.params.id);
})

route.get("/:comment_id", middleware.comment_auth, (req, res) => {
	Comment.findById(req.params.comment_id, (err, findedcomment) => {
		if(err){
			res.redirect("back");
		} else{
			res.render("comment/edit", {com: findedcomment, gid: req.params.id});
		}
	})
})

route.put("/:comment_id", middleware.comment_auth, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.com, (err, newcom) => {
		if(err) {
			res.redirect("/");
		} else{
			res.redirect("/ground/" + req.params.id);
		}
	})
})

route.delete("/:comment_id", middleware.comment_auth, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err, findedcomment) => {
		if(err){
			res.redirect("back");
		} else{
			res.redirect("/ground/" + req.params.id);
		}
	})
})

// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated())
// 		return next();
// 	res.redirect("/login");
// }

// function authorization(req, res, next){
// 	if(req.isAuthenticated()){
// 		Comment.findById(req.params.comment_id, (err, findedcomment) => {
// 			if(err){
// 				res.redirect("back");
// 			} else{
// 				if(findedcomment.author.id.equals(req.user.id)) {
// 					next();
// 				} else{
// 					res.redirect("back");
// 				}
// 			}
			
// 		})
// 	} else{
// 		res.redirect("/login");
// 	}
// }

module.exports = route;