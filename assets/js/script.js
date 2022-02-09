var searchBtnEl = document.getElementById("searchBtn");
var cityNameEl = document.querySelector("#searchText");

var getWeather = function() {
    var cityName = cityNameEl.value; 
    var APIKey = "fddfd31365b535165b81caa3c50f62c5"
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;

    fetch(requestURL)
      .then(function(response) {
         return response.json();
         })
        .then(function(data) {
            console.log(data);
                console.log(data.name, data.dt);
                document.getElementById("currentTemp").innerHTML = "Temp";
                console.log(data.main.temp);
                console.log(data.wind.speed);
                console.log(data.main.humidity);
            
            // Store the post data to a variable    
            post = data;

            // Fetch another API for the UV Index 
            return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=hourly,daily&appid=" + APIKey)
                .then(function(response) {
                    return response.json();
                })       
                .then(function(UVdata) {
                    console.log(UVdata.current.uvi);
                })
        });
}

searchBtnEl.addEventListener("click", getWeather);



      