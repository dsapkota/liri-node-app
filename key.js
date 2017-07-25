// Importing Twitter API keys
var fs = require('fs');
// Request node package used for omdB function
var request = require('request');
// Twitter node package used for twitter function
var Twitter = require('twitter');
// Spotify node package used for spotify function
var Spotify = require('spotify');

var twitterKeys = {

  consumer_key: 'rx8JsjFjuY2yCx0jemVtx4dth',
  consumer_secret: 'emBy5jBDWT4PQzkop7kvF4pCuIdicsnXg5RCQLiRG5CQ5DMQnX',
  access_token_key: '184956482-YvpiXNlyLVNohwFKaKt4vcUg1CWUNzgRg7YYeIvu',
  access_token_secret: 'wBQhXAmfmvqAIwybeC4G7fLAEMIIXZBcp1fVM7PXCDvZY'
}

exports.twitterKeys = twitterKeys;


// Function that looks for and executes liri's command and search 
function liri(command, action){
	switch(command){
		case 'my-tweets': twitter(action); break;
		case 'spotify-this-song': spotify(action); break;
		case 'movie-this': omdB(action); break;
		case 'do-what-it-says': doWhatISay(); break;
		default: log("\nINSTRUCTIONS:\n Enter one of the following commands: \n\n SHOW A USERS MOST RECENT TWEETS: node liri.js my-tweets 'twitter handle'\n SONG INFORMATION: node liri.js spotify-this-song 'song name'\n LEARN MORE ABOUT A MOVIE: node liri.js movie-this 'movie name'\n RUN A COMMAND FROM A TEXT FILE: node liri.js do-what-it-says\n");
	}
}

//Twitter API Function
function twitter(handle){
	if (!handle){
		handle = 'bilal_mian';
	}
	var client = new Twitter({
	  consumer_key: twitterKeys.consumer_key,
	  consumer_secret: twitterKeys.consumer_secret,
	  access_token_key: twitterKeys.access_token_key,
	  access_token_secret: twitterKeys.access_token_secret
	});
	 
	var params = {screen_name: handle, count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error) {
	  	log("\n---------------------\n");
  		for (var i = 0; i < params.count; i++) {
  			console.log("@" + tweets[i].user.screen_name);
	      	console.log("Tweet " + "#" + (i + 1) + ": " + tweets[i].text);
	      	console.log("Created: " + tweets[i].created_at + "\n");
	      	console.log("\n---------------------\n");
	  	}
	  }
	});
}

//Spotify API Function
function spotify(song){
	if (!song) {
		song = 'Whats my age again';
	};

	var spotify = require('spotify');
	 
	spotify.search({type: 'track', query: song}, function(err, data) {
	    if (!err) {
	        for (var i = 0; i < 10; i++) {
	        	if (data.tracks.items[i] != undefined) {
	        		console.log("\n---------------------\n");
			    	console.log('Artist: ' + data.tracks.items[i].artists[0].name)//Artist name
			    	console.log('Song: ' + data.tracks.items[i].name)//Song name
			    	console.log('Album: ' + data.tracks.items[i].album.name)//Album name
			    	console.log('Preview Url: ' + data.tracks.items[i].preview_url)//Preview URL
			    	console.log("\n---------------------\n");
			    };
	        };

	    } else {
	    	log('Error occurred: ' + err);
	    
	    };
	});
};

//OMDB API movie function
function omdB(movie){
	if(!movie){
		movie = 'Mr. Nobody'
		request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {
		if(!error && response.statusCode == 200) {
			var info = JSON.parse(body)
			console.log("\n---------------------\n");
			console.log("Title: " + info.Title);
			console.log("Starring: " + info.Actors + "\n");
			console.log("Year: " + info.Year);
			console.log("IMDB Rating: " + info.imdbRating);
			console.log("Country: " + info.Country + "\n");
			console.log("Plot: " + info.Plot + "\n");	
			console.log("Tomato Score: " + info.tomatoUserMeter);
			console.log("Tomato URL: " + info.tomatoURL + "\n");
			console.log("You can catch it on Netflix!");
			console.log("\n---------------------\n");
		} else {
			log('Error occurred' + error);
		}
	});
		
	} else {
		request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {
			if(!error && response.statusCode == 200) {
				var info = JSON.parse(body)
				console.log("\n---------------------\n");
				console.log("Title: " + info.Title);
				console.log("Starring: " + info.Actors + "\n");
				console.log("Year: " + info.Year);
				console.log("IMDB Rating: " + info.imdbRating);
				console.log("Country: " + info.Country + "\n");
				console.log("Plot: " + info.Plot+ "\n");	
				console.log("Tomato Score: " + info.tomatoUserMeter);
				console.log("Tomato URL: " + info.tomatoURL);
				console.log("\n---------------------\n");
			} else {
				log('Error occurred' + error);

			}
		});
	}
}
// Executes function in random.txt file
function doWhatISay(){
	fs.readFile('./random.txt', 'utf8', function(error, data){
		if (!error) {
			doArray = data.split(',');
			liri(doArray[0], doArray[1]);
		} else {
			log('Error occurred' + error);
		}
	});
};

// Function to console.log results in Terminal and Append to Log.txt
function log(data){
	console.log(data);
	fs.appendFile('./log.txt', data, 'utf8', function(error) {
		if (error) {
			log('Error occurred' + error);
		}
	})
};

// Execution of the liri function where process.argv[2] listens for the command and process.argv[3] is a user provided search term
liri(process.argv[2], process.argv[3]);