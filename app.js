var express = require("express"),
	bodyparser = require("body-parser"),
	User = require("./models/user"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	flash    = require("connect-flash"),
	LocalStrategy = require("passport-local"),
	Camp = require("./models/campground"),
	Comment = require("./models/comment"),
	methodOverride = require("method-override"),
	seed = require("./seed");

var campgroundRoute = require("./routes/campgrounds"),
	commentRoute = require("./routes/comments"),
	indexRoute = require("./routes/index");

// mongoose.connect("mongodb://localhost:27017/yelp_camp_v6", {useNewUrlParser:true});
mongoose.connect("mongodb://bombbooyy:tp6m4bp6@ds115592.mlab.com:15592/bombbooyy", {useNewUrlParser:true});

app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seed();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "OOXX whisper to you",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));  //tell browser to use the User from Userplugin

//reading session from UserSchema.plugin
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) =>{
	res.locals.user = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	res.locals.identify = req.flash("identify");
	next();
})

app.use(campgroundRoute);
app.use("/ground/:id/comment", commentRoute);
app.use(indexRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
