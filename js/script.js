$(document).ready(function () {

  var icon = document.getElementById("owfIcon");
  var city = document.getElementById("cityDisplay");
  var country = document.getElementById("countryDisplay");
  var highs = document.getElementById("highs");
  var lows = document.getElementById("lows");
  var currentTempDisplay = document.getElementById("tempDisplay");
  var fButton = document.getElementById("fahrBtn");
  var cButton = document.getElementById("celsBtn");

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  navigator.geolocation.getCurrentPosition(success, error, options);

  // functions for geolocation
  function success(pos) {
    var crd = pos.coords;
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;

    $.ajax({
      dataType: "json",
      url: api,
      //data: {},
      success: function (data) {

        var rawJson = JSON.stringify(data);
        data = JSON.parse(rawJson);

        console.dir(data);

        city.textContent = data.name;
        country.textContent = data.sys.country;
        initTempUnit();
        // icon.classList.add("owf-" + data.weather[0].id);

        function initTempUnit() {
          if (data.sys.country === "US") {
            toFahr();
          } else {
            toCels();
          }
        }

        fButton.addEventListener("click", function () {
          toFahr();
        });

        function toFahr() {
          currentTempDisplay.textContent = Math.floor((data.main.temp * 1.8) + 32);
          highs.textContent = Math.floor((data.main.temp_max * 1.8) + 32);
          lows.textContent = Math.floor((data.main.temp_min * 1.8) + 32);
          cButton.classList.remove("active");
          fButton.classList.add("active");
        }

        cButton.addEventListener("click", function () {
          toCels();
        });

        function toCels() {
          currentTempDisplay.textContent = Math.floor(data.main.temp);
          highs.textContent = Math.floor(data.main.temp_max);
          lows.textContent = Math.floor(data.main.temp_min);
          fButton.classList.remove("active");
          cButton.classList.add("active");
        }
      }
    });
  }

  function error(err) {
    console.warn('ERROR(${err.code}): ${err.message}');
    city.textContent = "reload, please";
  }



});