var route = require("express").Router(),
	User = require("../models/user"),
	passport = require("passport");




//AUTH ROUTE

route.get("/register", (req, res) => {
	res.render("register");
})

route.post("/register", (req, res) => {
	var newUser = new User({username: req.body.username});
	//only store the username, and hash the password
	User.register(newUser, req.body.password, (err, user) => {
		if(err){
			//you can put req.flash  either before res.redirect or in res.render
			return res.render("register", {"error": err.message})}
		// run the session with serialize and log the user in
		passport.authenticate("local")(req, res, () => {
			req.flash("identify", "Welecome, ");
			res.redirect("/ground");
		});
	});
})

//LogIn

route.get("/login", (req, res) => {
	res.render("login");
})

//middleware:some code that run before final route callback
route.post("/login", passport.authenticate("local", 
	{
		failureRedirect: "/login",
		failureFlash: "Who the hell you are"
	}), (req, res) => {
		req.flash("identify", "Hello, ");
		res.redirect("/ground");
})

//Logout

route.get("/logout", (req, res) => {
	req.logout();  //from passport
	req.flash("success", "You have logged out")
	res.redirect("/ground");
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
	res.redirect("/login");
}

module.exports = route;