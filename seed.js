var mongoose = require("mongoose"),
	campground = require("./models/campground"),
	comment = require("./models/comment");

var camps = [
	{
	host: "Wagen Rostara",
	img: "http://www.sapminature.com/wp-content/uploads/2018/01/SapmiNatureCamp-3.jpg",
	description: "Bacon ipsum dolor amet drumstick ball tip prosciutto corned beef tri-tip, tenderloin ribeye jowl. Jowl andouille ball tip bresaola beef, picanha corned beef shankle pork meatloaf venison rump. Shank jowl corned beef biltong brisket ribeye pancetta. Picanha flank meatball bresaola, pork chop sausage swine meatloaf. Alcatra leberkas t-bone, kielbasa boudin buffalo jowl bresaola pork belly filet mignon ham hock pastrami meatball."
	},
	{
	host: "Rushel Bunata",
	img: "https://www.camptevya.org/wp/wp-content/uploads/2013/10/Camp_Tevya_2016_3377-2.jpg",
	description: "Bacon ipsum dolor amet drumstick ball tip prosciutto corned beef tri-tip, tenderloin ribeye jowl. Jowl andouille ball tip bresaola beef, picanha corned beef shankle pork meatloaf venison rump. Shank jowl corned beef biltong brisket ribeye pancetta. Picanha flank meatball bresaola, pork chop sausage swine meatloaf. Alcatra leberkas t-bone, kielbasa boudin buffalo jowl bresaola pork belly filet mignon ham hock pastrami meatball."
	},
	{
	host: "Hajudule Edwatem",
	img: "https://cdn.movieweb.com/img.news.tops/NEizmjjEh6Nvlm_1_b/Friday-13th-Camp-Overnight-Camping-Experience-Jason.jpg",
	description: "Bacon ipsum dolor amet drumstick ball tip prosciutto corned beef tri-tip, tenderloin ribeye jowl. Jowl andouille ball tip bresaola beef, picanha corned beef shankle pork meatloaf venison rump. Shank jowl corned beef biltong brisket ribeye pancetta. Picanha flank meatball bresaola, pork chop sausage swine meatloaf. Alcatra leberkas t-bone, kielbasa boudin buffalo jowl bresaola pork belly filet mignon ham hock pastrami meatball."
	}

];


function seed(){
	campground.remove({}, function(err){
		if(err){
			console.log(err);
		} else{
			console.log("All cleared");
			// camps.forEach(function(camp){
			// 	campground.create(camp, function(err, data){
			// 		if(err){
			// 			console.log(err);
			// 		} 
			// 		else{
			// 			console.log("Added");
			// 			comment.create({
			// 				author: "Mary",
			// 				content: "Great"
			// 				}, 
			// 				function(err, com){
			// 					data.comments.push(com.id);
			// 					data.save();
			// 					console.log("commented");
			// 			});
			// 		}

			// 	})

			// });
		}
	});
}

module.exports = seed;



