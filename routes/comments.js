var express = require("express");
var router  = express.Router({mergeParams:true});
var Campaground = require("../models/campagrounds");
var Comment = require("../models/comments");
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");


router.get('/new', middleware.isLoggedIn,function(req,res){
	Campaground.findById(req.params.id , function(err,camp){
		if(err || !camp){
			req.flash("error" , "Campground not found")
			res.redirect("back")
		}else{
			res.render("newcom" , {Campaground:camp})
		}
	})
})


router.post('/',middleware.isLoggedIn ,function(req, res){
   //lookup campground using ID	
   Campaground.findById(req.params.id, function(err, campaground){
       if(err){
           console.log(err);
           res.redirect("/campagrounds");
       } else {
        Comment.create({text:req.body.text ,author:req.body.author }, function(err, comment){
           if(err){
			   req.flash("error" , "Something went wrong..")
               console.log(err);
           } else {
			   comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               campaground.comments.push(comment);
               campaground.save();
			   req.flash("success" , "Successfully added comment..")
               res.redirect('/campagrounds/' + campaground._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});

router.get("/:comment_id/edit",middleware.CheckcommentOwnership ,function(req, res){
	Campaground.findById(req.params.id , function(err,fc){
		if(err || !fc){
			req.flash("error" , "Campground not found")
		}else{
			Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comedit", {campaground_id: req.params.id, comment: foundComment});
      }
   });
		}
	})
});

// COMMENT UPDATE
router.put("/:comment_id",middleware.CheckcommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id,{text:req.body.name} ,function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/campagrounds/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id",middleware.CheckcommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
		   req.flash("success" , "Comment deleted..")
           res.redirect("/campagrounds/" + req.params.id);
       }
	 });
});


module.exports = router;