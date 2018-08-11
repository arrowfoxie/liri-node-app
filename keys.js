console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.weather = {
  APPID: process.env.OPEN_WEATHER_KEY,
  units: "imperial"
}