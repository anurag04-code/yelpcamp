var mongoose = require("mongoose");
var Campaground = require("./models/campagrounds");
var Comment = require("./models/comments");

var data =[
	{
		name : "Friends" ,image:"https://storage.googleapis.com/ehimages/2018/2/27/img_83d20076baa36e69c756b51cd07f3b79_1519722980972_processed_original.jpg" , price:"9.34", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." ,loc:"near Manali, India",bw:"june-october" ,ac:"tent,Farm House",am:"Bonfire,Mobile Charger",author:{username:"Anurag" , id:'5e8ec8c86e6b5006c1169bfb'}
	},
	{
		name:"Nice camps" , image:"https://cdn.hiconsumption.com/wp-content/uploads/2019/07/Best-Affordable-Camping-Gear-000-Hero.jpg" , price:"8.96", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",loc:"near California, USA", bw:"february-march",ac:"Boat-House,cycling",am:"Food Pantry,Swimming Pool", author:{username:"Anurag" , id:'5e8ec8c86e6b5006c1169bfb' }
	},
	{
		name:"Quil camps" , image:"https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto" , price:"9.03",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." , loc:"near Sydeny, Australia", bw:"june-july",ac:"Farm-House,Car",am:"Wi-fi,Towel",author:{username:"Anurag" , id:'5e8ec8c86e6b5006c1169bfb'}
	}
]

function seedDB(){
	Campaground.remove({} , function(err){
		if(err)
		{
			console.log(err)
		}
		data.forEach(function(seed){
			Campaground.create(seed , function(err,campaground){
				if(err){
					console.log(err)
				}else{
					Comment.create({
			text:"hey dude....NIce click.." , author:{username:"Anurag" , id:'5e8ec8c86e6b5006c1169bfb'}
		} , function(err,comment){
			if(err){
				console.log(err)
			}else{
				campaground.comments.push(comment)
				campaground.save()
			}
		})
				}
			})
		})
	})
}

module.exports = seedDB