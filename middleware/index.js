var Campaground = require("../models/campagrounds");
var Comment = require("../models/comments");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.CheckcampagroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campaground.findById(req.params.id, function (err, foundCampground) {
            if (err || !foundCampground) {
				req.flash("error" , "Campaground not found..")
                res.redirect("back");
            } else {
				
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
					req.flash("error" , "You don't have permission to do that..")
                    res.redirect("back");
                }
            }
        });
    } else {
		req.flash("error" , "You need to be Logged In to do that..")
        res.redirect("back");
    }
}


middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next()
	}else{
		req.flash("error" , "You need to be Logged In to do that..")
		res.redirect('/login')
	}
}

 middlewareObj.CheckcommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campaground.findById(req.params.id, function (err, foundComment) {
            if (err || !foundComment) {
				req.flash("error" , "Comment not found");
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
					req.flash("error" , "You don't permission to do that..")
                    res.redirect("back");
                }
            }
        });
    } else {
		req.flash("error" , "You need to be Logged In to do that..")
        res.redirect("back");
    }
}


module.exports = middlewareObj;