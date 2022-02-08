var searchBtnEl = document.getElementById("searchBtn");
var cityNameEl = document.querySelector("#searchText");

var getWeather = function() {
    var cityName = cityNameEl.value;
    var APIKey = "fddfd31365b535165b81caa3c50f62c5"
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    fetch(requestURL)
      .then(function(response) {
         return response.json();
         })
        .then(function(data) {
            console.log(data);
                console.log(data.name);
                console.log(data.main.temp);
                console.log(data.main.humidity);        
        });
}

searchBtnEl.addEventListener("click", getWeather);


      