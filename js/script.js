$(document).ready(function() {

var icon = document.getElementById("weatherIcon");
var locationDisplay = document.getElementById("locDisplay");
var currentTempDisplay = document.getElementById("tempDisplay");
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};


// functions for geolocation
function success(pos) {
  var crd = pos.coords;
  var lat = pos.coords.latitude;
  var long = pos.coords.longitude;
  var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;

  $.getJSON(api, function(data) {

    console.dir(data);
    locationDisplay.textContent = data.name + ", " + data.sys.country;
    currentTempDisplay.textContent = Math.floor(data.main.temp) + " ";
    icon.classList.add("owf-" + data.weather[0].id);

  });
  // console.log('Your current position is:');
  // console.log(`Latitude : ${crd.latitude}`);
  // console.log(`Longitude: ${crd.longitude}`);
  // console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
    console.warn('ERROR(${err.code}): ${err.message}');
}

navigator.geolocation.getCurrentPosition(success, error, options);


});