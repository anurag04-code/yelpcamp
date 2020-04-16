var express = require("express")
var router = express.Router()
var Campaground = require("../models/campagrounds")
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");


router.get('/' , function(req,res){
	Campaground.find({} ,function(err , cam){
		if(err)
			{
				console.log("Something got wrong");
			}else {
				res.render("pages" , {k:cam});
			}
	});
});

router.post('/' ,middleware.isLoggedIn,function(req,res){
	var name  = req.body.name ;
	var image = req.body.image;
	var no = req.body.no;
	var price = req.body.price ;
	var description = req.body.description;
	var author = {
        id: req.user._id,
        username: req.user.username
    };
	Campaground.create({
	name:name,
	image:image ,
	no : no ,	
	price : price ,
	description:description,
	loc:req.body.loc ,
	bw:req.body.bw,
	ac:req.body.ac ,	
	am:req.body.am ,	
	author:author
	});	
	res.redirect('/campagrounds');

})

router.get('/new' ,middleware.isLoggedIn, function(req,res){
	res.render("newpages");
});
	
router.get('/about' ,function(req,res){
	res.render("about")
})

router.get('/:id', function(req,res){			Campaground.findById(req.params.id).populate("comments").exec(function(err,cpg){
		if(err || !cpg){
			req.flash("error" , "Campground not found");
			res.redirect("back");
		}else{
			res.render("show" , {Campaground:cpg});
		}
});	
});

router.get('/:id/edit',middleware.CheckcampagroundOwnership,function(req,res){
	Campaground.findById(req.params.id , function(err,campagrounds){
		if(err){
			res.redirect('/campagrounds')
		}else{
			res.render("edit" , {campagrounds:campagrounds})		
		}
	})
})

router.put("/:id", middleware.CheckcampagroundOwnership,function (req, res) {
    Campaground.findByIdAndUpdate(req.params.id,{name:req.body.name, price:req.body.price , image:req.body.image , description:req.body.description}, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campagrounds")
        } else {
            res.redirect("/campagrounds/" + req.params.id);
        }
    });
});

router.delete("/:id" , middleware.CheckcampagroundOwnership,function(req,res){
	Campaground.findByIdAndDelete(req.params.id , function(err,qp){
		if(err){
			res.redirect('/campagrounds')
		}else{
			res.redirect('/campagrounds')
		}
	})
})


module.exports = router ;