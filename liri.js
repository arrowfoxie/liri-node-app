// variables

require("dotenv").config();
var request = require("request");
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var defaultSong = "Ace of Base The Sign";
var defaultMovie = "Mr Nobody";
var fs = require("fs");
var OpenWeatherMapHelper = require("openweathermap-node");


// takes in everything after the command
process.argv.shift() // skip node.exe
process.argv.shift() // skip name of js file
var command = process.argv.shift();
var inputs = process.argv.join(" ");

// commands
if (command === "spotify-this-song") {
  getSpotify(inputs);
} else if (command === "movie-this") {
  getMovie(inputs);
} else if (command === "do-what-it-says") {
  whatDo(inputs);
} else if (command === "weather-me-this") {
  getWeather(inputs);
};


// spotify
function getSpotify(search) {

  // default song
  if (search === "") {
    search = defaultSong;
    console.log("~~~~~~~~~~~~~~~~~~~")
    console.log("assigned default search", search)
  };

  // spotify call
  spotify.search({
    type: 'track',
    query: search
  }, function (err, data) {
    if (err) {
      console.log('Error: ' + err);
      return;
    }

    // prints song info
    var song = data.tracks.items;
    console.log("--------------------------")
    console.log("Artist(s): " + song[0].artists[0].name);
    console.log("Song Name: " + song[0].name);
    console.log("Preview Link: " + song[0].preview_url);
    console.log("Album: " + song[0].album.name);

  });
};

// omdb
function getMovie(search) {
  // default movie
  if (search === "") {
    search = defaultMovie;
    console.log("~~~~~~~~~~~~~~~~~~~")
    console.log("assigned default search", search)
  };

  // omdb search url
  var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=40e9cece";

  request(queryUrl, function (error, response, body) {

    var parsed = JSON.parse(body);
    if (!error && response.statusCode === 200 && parsed.Response !== "False") {

      // prints movie info
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[0].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    };
  });
};
// reads random.txt
function whatDo() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (!error);
    console.log(data.toString());
    var doIt = data.toString().split(',');
    console.log(doIt);
  });
}

// openweathermap
function getWeather(search) {
  var helper = new OpenWeatherMapHelper(
    keys.weather
  );

  // gets info via city name
  helper.getCurrentWeatherByCityName(search, (err, currentWeather) => {
    if (err) {
      console.log(err);
    } else {
      //prints info
      console.log(currentWeather);
    }
  });
};