var express = require("express"),
	Camp = require("../models/campground"),
	middleware = require("../middleware");
var route = express.Router();


route.get("/", function(req, res){
	res.render("landing");
});

route.get("/ground", function(req, res){
	Camp.find({}, function(err, camp){
		if(err){ 
			console.log(err);
		} else{
			res.render("campground/ground", {camp:camp});
		}
	});
});

route.post("/ground", function(req, res){
	var newcamp = {
		img: req.body.image,
		description: req.body.description,
		author: {
			id: req.user._id,
			username: req.user.username}
	};
	Camp.create(newcamp,
		function(err, ground){
			if(err){
				console.log(err);
			} else{
				console.log(ground);
			}
		});
	// grounds.push({host: req.body["owner"], img: req.body["image"]});
	res.redirect("/ground");	
});

route.get("/ground/new", middleware.isLoggedIn, function(req, res){
	res.render("campground/new");
});

route.get("/ground/:id", function(req, res){
	Camp.findById({_id: req.params.id}, function(err, one){
		if(err){
			console.log(err);
		}
	}).populate("comments").exec(function(err, ground){
		res.render("campground/more", {ground:ground});
	});
})

route.get("/ground/:id/edit", middleware.camp_auth, function(req, res){
	Camp.findById(req.params.id, (err, findedcamp) => {
		if(err){
			res.redirect("/gorund");
		} else{	
			res.render("campground/edit", {ground: findedcamp});
		}
	})
})

route.put("/ground/:id", middleware.camp_auth, (req, res) => {
	console.log(req.body.ground);
	Camp.findByIdAndUpdate(req.params.id, req.body.ground, (err, editedcamp) => {
		if(err){
			res.redirect("/ground");
		} else{
			console.log(editedcamp);
			res.redirect("/ground/" + req.params.id);
		}
	})
})

route.delete("/ground/:id", middleware.camp_auth, (req, res) => {
	Camp.findByIdAndRemove(req.params.id, (err, deletion) => {
		if(err){
			console.log(err);
		} else{
			res.redirect("/ground");
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
// 		Camp.findById(req.params.id, (err, findedcamp) => {
// 			if(err){
// 				res.redirect("/gorund");
// 			} else{
// 				if(findedcamp.author.id.equals(req.user.id)){  //one is mongoose object, one is string
// 					next();
// 				} else{
// 					res.redirect("back");
// 				}
// 			}
// 		})
// 	} else{
// 		res.redirect("back");
// 	}
// }

module.exports = route;