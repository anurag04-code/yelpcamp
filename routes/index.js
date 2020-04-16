var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get('/' , function(req,res){
	res.render("landing");
});

router.get('/register' , function(req,res){
	res.render("register")
})

router.post('/register' , function(req,res){
	var newUser = new User({username:req.body.username})
	User.register(newUser,req.body.password,function(err,User){
		if(err){
			req.flash("error" , err.message);
			return res.render('register');
		}else{
			passport.authenticate("local")(req,res,function(){
				req.flash("success" , "Welcome to yelpcamp.." + User.username)
				res.redirect('/campagrounds')
			})
		}
	} )
})

router.get('/login' , function(req,res){
	res.render("login" )
})

router.post('/login', passport.authenticate("local" , {
	successRedirect : '/campagrounds' ,
	failureRedirect : '/login'
}),function(req,res){
})

router.get('/logout' ,function(req,res){
	req.logout()
	req.flash("success" , "Logged you out..")
	res.redirect('/campagrounds')
})

module.exports = router;