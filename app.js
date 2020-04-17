var express = require("express") ,
	app = express() ,
	bodyparser = require("body-parser") ,
	Campaground = require("./models/campagrounds.js") ,
	seedDB = require("./seed") ,
	flash  = require("connect-flash") ,
	Comment = require("./models/comments.js") ,
	passport = require("passport") ,
	UserStrategy = require("passport-local") ,
	mongoose = require("mongoose"),
	User  = require("./models/user.js") 
	methodOverride = require("method-override")

var commentsRoutes    = require("./routes/comments"),
    campagroundsRoutes = require("./routes/campagrounds"),
    indexRoutes      = require("./routes/index")

app.use(express.static(__dirname + "/public"))	
app.set("view engine" , "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride("_method"));


mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify' , false)
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });

seedDB();
app.use(flash())

app.use(require("express-session")({
	secret : "rusty is the best dog.." ,
	resave : false ,
	saveUninitialized : false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new UserStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use(function(req, res, next){
   res.locals.currentUser = req.user
   res.locals.error = req.flash("error")
   res.locals.success = req.flash("success")
   next();
});



app.use("/" ,indexRoutes);
app.use("/campagrounds" ,campagroundsRoutes);
app.use("/campagrounds/:id/comments" ,commentsRoutes);


app.listen(process.env.PORT || 4000 , process.env.IP ,function(){
	console.log("Server Started..")
})

	
