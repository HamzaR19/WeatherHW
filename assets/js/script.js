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


// K to F function
function convertToFahrenheit(kelvin) {
    var kTemp = kelvin;
    var kToFar = (kTemp - 273.15) * 1.8 + 32;
    var message = kToFar + " \xB0F";
    return message;
  }
  console.log(convertToFahrenheit(279.45));
  
  function setCurrentWeather(weather) {
    
    
    // Function to convert time
    var forecastDate = weather.dt;
    console.log(forecastDate);
    var convertTimeMilli = forecastDate * 1000;
    var dateTime = new Date(convertTimeMilli);
    var newDate = dateTime.toLocaleDateString("en-US", { dateStyle: "short" });
    console.log(newDate);
    var currentDate = document.getElementById("current-date");
    currentDate.innerHTML = newDate;
    
    
    // Set Icon
    var iconParagraphId = weather.weather[0].icon;
    var iconLink =
      "https://openweathermap.org/img/wn/" + iconParagraphId + ".png";
    console.log(iconLink);
    var iconHTML = '<img src="' + iconLink + '">';
    console.log(iconHTML);
    var currentIcon = document.getElementById("current-icon");
    currentIcon.innerHTML = iconHTML;
    
    
    // Curremt temp
    console.log(weather.main.temp);
    var currentTemperature = document.getElementById("current-temperature");
    var convert = convertToFahrenheit(weather.main.temp);
    console.log(convert);
    currentTemperature.textContent =
      "Temperature: " + weather.main.temp + " \xB0F";
    
    // Current Humidity
    var currentHumidity = document.getElementById("current-humidity");
    currentHumidity.textContent = "Humidity: " + weather.main.humidity + " %";

    // Current Wind
    var currentWind = document.getElementById("current-wind");
    currentWind.textContent = "Wind: " + weather.wind.speed + " MPH";
  }