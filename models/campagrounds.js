var mongoose = require("mongoose");

 var yelSchema = mongoose.Schema({
	name : String , 
	image : String , 
	price : String , 
	description: String,
	loc : String ,
	bw : String ,
	ac : String ,
	am : String , 
	author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String 
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "comments"
      }
   ]
});

module.exports = mongoose.model("Campaground" , yelSchema);
