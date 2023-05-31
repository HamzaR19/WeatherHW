// Local Storage Grab

var recentSearches = JSON.parse(localStorage.getItem("searches")) || [];
console.log(recentSearches);

// Recent Cities
var searchHistory = document.getElementById("recently-viewed");

getWeather("Nashville");

// Fetch Function
function getWeather(city) {
  var url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=011d8600955301988250a993be42df9e&units=imperial";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      
      
      //   Local Storage JSON STRINGIFY
      localStorage.setItem("city", JSON.stringify(data));
      console.log(data);
      
      
      // Get current city info
      var currentCity = document.getElementById("current-city");
      currentCity.textContent = city;
      setCurrentWeather(data.list[0]);
      setForecast(data.list);
    });
}