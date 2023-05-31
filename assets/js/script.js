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

  // Loop
function setForecast(forecast) {
    for (var i = 0; i < forecast.length; i += 8) {
      console.log(forecast[i]);
      setForecastDay(forecast[i], i / 8 + 1);
    }
  }
  
  // Function 5 day forecast
  function setForecastDay(weather, dayNumber) {


    // image icons
    var iconParagraph = document.createElement("p");
    var iconParagraphId = weather.weather[0].icon;
    var iconLink =
      "https://openweathermap.org/img/wn/" + iconParagraphId + ".png";
    console.log(iconLink);
    var iconHTML = '<img src="' + iconLink + '">';
    console.log(iconHTML);
    
    
    // convert millisecs
    var forecastParagraph = document.createElement("p");
    var forecastDate = weather.dt;
    console.log(forecastDate);
    var convertTimeMilli = forecastDate * 1000;
    var dateTime = new Date(convertTimeMilli);
    var newDate = dateTime.toLocaleDateString("en-US", { dateStyle: "short" });
    console.log(newDate);
   
   
    // Attached to page
    var day = document.getElementById("day-" + dayNumber);
    var dayList = [];
    var titleParagraph = document.createElement("p");
    console.log(iconHTML);
    titleParagraph.innerHTML = newDate + iconHTML;
    dayList.push(titleParagraph);
    
    // Humidity
    var humidityParagraph = document.createElement("p");
    humidityParagraph.textContent = "Humidity: " + weather.main.humidity + " %";
    dayList.push(humidityParagraph);
    day.replaceChildren(...dayList);
    
    // Wind
    var windParagraph = document.createElement("p");
    windParagraph.textContent = "Wind: " + weather.wind.speed + " MPH";
    dayList.push(windParagraph);
    day.replaceChildren(...dayList);

    // Temp
    var tempParagraph = document.createElement("p");
    tempParagraph.textContent = "Temp: " + weather.main.temp + " \xB0F";
    dayList.push(tempParagraph);
    day.replaceChildren(...dayList);
    
  }
  
  // Submit Eventlist
  var searchForm = document.getElementById("search-form");
  var city = document.getElementById("city");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var searchCity = city.value.trim();
   
    //Local Storage for searched cities
    executeSearch(searchCity);
   
    // Button for recently searched city
    addRecentSearch(searchCity);
  });
  
  
  function addRecentSearch(city) {
    
    var recentButton = document.createElement("button");
    recentButton.textContent = city;
    recentButton.addEventListener("click", function () {
      executeSearch(city);
    });
    searchHistory.appendChild(recentButton);
  }
  
  // Local Storage
  function executeSearch(searchCity) {
    recentSearches.push(searchCity);
    localStorage.setItem("searches", JSON.stringify(recentSearches));
    getWeather(searchCity);
  }