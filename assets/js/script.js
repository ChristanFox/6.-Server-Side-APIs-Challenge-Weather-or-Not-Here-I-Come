var searchBtnEl = document.getElementById("searchBtn");
var cityNameEl = document.querySelector("#searchText");

var getWeather = function() {
    var cityName = cityNameEl.value;
    var APIKey = "fddfd31365b535165b81caa3c50f62c5"
    var cities = JSON.parse(localStorage.getItem("cities")) || [];
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;

                                 /*********************************/
                                /*----CURRENT WEATHER SECTION----*/
                               /*********************************/

    fetch(requestURL)
      .then(function(response) {
         return response.json();
         })
        .then(function(data) {
            var location = data.name;
            var time = data.dt;
            var dailyTemp = data.main.temp;
            var dailyWind = data.wind.speed;
            var dailyHumidity = data.main.humidity;

                document.getElementById("currentLocation").innerHTML = location + " - " + time;
                document.getElementById("currentTemp").innerHTML = "Temp - " + dailyTemp + "\xB0F";
                document.getElementById("currentWind").innerHTML = "Wind Speed - " + dailyWind + "MPH";
                document.getElementById("currentHumidity").innerHTML = "Humidity - " + dailyHumidity + "%";
            
            // Store the post data to a variable    
            post = data;

            // Fetch another API for the UV Index 
            return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=hourly,daily&appid=" + APIKey)
                .then(function(response) {
                    return response.json();
                })       
                .then(function(UVdata) {
                    var UVindex = UVdata.current.uvi;
                    document.getElementById("currentUVI").innerHTML = "UV Index - " + UVindex;
                })
        });

    function saveHistory() {
        var location = {
            city: cityName
        };
        cities.push(location);
        cities.splice(8, 1);    
    
        localStorage.setItem("cities", JSON.stringify(cities));
    
        console.log(cities);
    }
        saveHistory();
}



searchBtnEl.addEventListener("click", getWeather);



      