var fs = require('fs');
var request = require('request');
var SpotifyWebApi = require('spotify-web-api-node');
var Twitter = require('twitter');

var keys = require('./key.js');

// Takes in all of the command line arguments
	var inputString = process.argv;


	var cmdinstr = inputString[2];
	var num1 = inputString[3];	
	var num2 = inputString[4];


	// my-tweets
		var tweets = ""
		var username ="dsapkota"
   //songs//
		var artist = ""
		var songname = ""
		var link = ""
		var album = ""

		var title = ""
		var year = 0
		var imdbRating = 0
		var country = ""
		var language = ""
		var plot = ""
		var actors = ""
		var rottenRating = ""
		var rotUrl = ""

	// do-what-it-says


function spotify() {

		console.log("SPOTIFY-test")
		var spotifyApi = new SpotifyWebApi();


		spotifyApi.searchTracks('Love', function(err, data) {
		  if (err) {
		    console.error('Something went wrong', err.message);
		    return;
		  }

		  // Print some information about the results
		  console.log('I got ' + data.body.tracks.total + ' results!');

		  // Go through the first page of results
		  var firstPage = data.body.tracks.items;
		  console.log('The tracks in the first page are.. (popularity in parentheses)');

		  firstPage.forEach(function(track, index) {
		    console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
		  });
		});
		 
}

// Determines the cmdinstr selected...
if (cmdinstr == "my-tweets") {

 
			var client = new Twitter(keys.twitterKeys);
 
			var params = {screen_name: 'RamblinRoyce'};

			// client.get('favorites/list', function(error, tweets, response){
			client.get('favorites/list', params, function(error, tweets, response){
			  if(error) throw error;
			});

			client.get('statuses/user_timeline', params, function(error, tweets, response){
			  if (!error) {
			    // console.log(tweets);
			    console.log(JSON.parse(response.body));
			    
			  } else {
			  	console.log("error");
			  }
			});


	// append command and results to log.txt 
		fs.writeFile("log.txt", cmdinstr, function(err) {
	
		    if(err) {
		        // return console.log(err);
		    }
		}); 
		

} else if (cmdinstr == "spotify-this-song") {
	
	spotify();

	

	// append command and results to log.txt 
		fs.writeFile("log.txt", cmdinstr, function(err) {
	    // fs.appendFileSync("log.txt", cmdinstr, function(err) {
			// If the code experiences any errors it will log the error to the console. 
		    if(err) {
		        // return console.log(err);
		    }
		
		}); 
		

} else if (cmdinstr == "movie-this") {

	var nodeArgs = process.argv;

	// Create an empty variable for holding the movie name
	var movieName = "";

	for (var i=3; i<nodeArgs.length; i++){
		if (i>3 && i< nodeArgs.length){
			movieName = movieName + "+" + nodeArgs[i];
		}
		else {
			movieName = movieName + nodeArgs[i];
		}
	}

	
	if (movieName !== "") {
		var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json&tomatoes=true';
		request(queryUrl, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				// function parseMovie () {
				console.log("Title: " + JSON.parse(body)["Title"])
				console.log("Release Year: " + JSON.parse(body)["Year"])
				console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"])
				console.log("Country: " + JSON.parse(body)["Country"])
				console.log("Language: " + JSON.parse(body)["Language"])
				console.log("Plot: " + JSON.parse(body)["Plot"])
				console.log("Actors: " + JSON.parse(body)["Actors"])
				console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"])
				console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"])
				// }	
				// parseMovie();
			}
		});
	}
	else {
		movieName = "Mr. Nobody";
		var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json&tomatoes=true';
		request(queryUrl, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				// function parseMovie () {
				console.log("Title: " + JSON.parse(body)["Title"])
				console.log("Release Year: " + JSON.parse(body)["Year"])
				console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"])
				console.log("Country: " + JSON.parse(body)["Country"])
				console.log("Language: " + JSON.parse(body)["Language"])
				console.log("Plot: " + JSON.parse(body)["Plot"])
				console.log("Actors: " + JSON.parse(body)["Actors"])
				console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"])
				console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"])
				// }	
				// parseMovie();
			}
		});
	}

		fs.writeFile("log.txt", cmdinstr, function(err) {
	  
		    if(err) {
		        // return console.log(err);
		    }
		   
		}); 
		

} else if (cmdinstr == "do-what-it-says") {
	
	fs.readFile("random.txt", "utf8", function(error, data) {

		// We will then print the contents of data
		console.log(data);

		// Then split it by commas (to make it more readable)
		var dataArr = data.split(',');

		cmdinstr = dataArr[0];
		// console.log(cmdinstr)

		if (cmdinstr == "my-tweets") {
			// tweets();	// call function tweets
			console.log("TWEETS")
		}
		else if (cmdinstr == "spotify-this-song") {
			// spotify();	// call function spotify
			console.log("SPOTIFY")
		}
		else if (cmdinstr == "movie-this") {
			// movie();	// call function movie
			console.log("MOVIE")
		}
		else if (cmdinstr == "do-what-it-says") {
			console.log("--------------------------");
			console.log("random.txt file contains 'do-what-it-says' which will create an infinite loop.  \nPlease remove 'do-what-it-says from the random.txt file.");
		}
		else {
			console.log("--------------------------");
			console.log("Command in random.txt not recognized.\nPlease enter one of the following commands in random.txt:\n  my-tweets\n  spotify-this-song,'song name'\n  movie-this,'movie name'");
		}

	});

		// append command and results to log.txt 
		fs.writeFile("log.txt", cmdinstr, function(err) {
	
		    if(err) {
		        // return console.log(err);
		    }
		  
		}); 
		
} 
else {
	
	console.log("--------------------------");
	console.log("Command not recognized.\nPlease enter one of the following commands:\n  my-tweets\n  spotify-this-song 'song name'\n  movie-this 'movie name'\n  do-what-it-says");

	// append command and results to log.txt 
		fs.writeFile("log.txt", cmdinstr, function(err) {
	 
		    if(err) {
		        // return console.log(err);
		    }
		 
		}); 
}