var searchFormEl = document.querySelector('#search-form');
var APIKey = "b934080f8bc9b135e4a6aea8ae865c1b";
var humidityEl = document.querySelector("#humid");
var windEl = document.querySelector('#wind');
var tempEl = document.querySelector('#temp');
var cityNameEl = document.querySelector('#cityName');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.error('You need to enter a city!');
        return;
    }
    localStorage.setItem('search-input', searchInputVal);
    // Construct the weather API URL with latitude and longitude
    var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=' + searchInputVal + '&appid=' + APIKey;
    console.log(weatherApiUrl);

    // Make the API request
    fetch(weatherApiUrl)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Unable to fetch weather data.');
            }
            return response.json();
        })
        .then(function (data) {
            // Process the retrieved weather data
            console.log(data);
            getParams(data);
            displayForecast(data);
            // Display or use the weather data as needed
        })
        .catch(function (error) {
            console.error('Error:', error.message);
        });
}

//five day forecast
function displayForecast(weatherData) {
    var forecastData = [];
    for (var i = 8; i <= 40; i += 8) {
        forecastData.push(weatherData.list[i]);
    }

    var forecastContainer = document.getElementById('forecastContainer');

    for (var j = 0; j < forecastData.length; j++) {
        var dayData = forecastData[j];

        var forecastDate = dayData.dt_txt;
        var [apiDate, apiTime] = forecastDate.split(" ");
        var [year, month, day] = apiDate.split('-');
        var formattedDate2 = "(" + month + "/" + day + "/" + year + ")";

        var date2 = formattedDate2;
        var temperature2 = dayData.main.temp;
        var humidity2 = dayData.main.humidity;
        var wind2 = dayData.wind.speed;

        var card = document.createElement('div');
        card.classList.add('card');

        var date2El = document.createElement('h4');
        date2El.textContent = date2;

        var temperature2El = document.createElement('p');
        temperature2El.textContent = 'Temperature: ' + temperature2 + 'F';

        var humidity2El = document.createElement('p');
        humidity2El.textContent = 'Humidity: ' + humidity2 + '%';

        var wind2El = document.createElement('p');
        wind2El.textContent = 'Wind: ' + wind2 + 'MPH';

        card.appendChild(date2El);
        card.appendChild(temperature2El);
        card.appendChild(humidity2El);
        card.appendChild(wind2El);

        forecastContainer.appendChild(card);
    }
}

function getParams(weatherData) {
    //Display city, date, & icon
    var cityName = weatherData.city.name;

    var currentDate = weatherData.list[0].dt_txt;
    var [apiDate, apiTime] = currentDate.split(" ");
    var [year, month, day] = apiDate.split('-');
    var formattedDate = "(" + month + "/" + day + "/" + year + ")";


    var currentIcon = weatherData.list[0].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + currentIcon + ".png";
    var inconEl = document.createElement("img")
    inconEl.src = iconUrl;
    var containerEl = document.getElementById("icon");
    containerEl.appendChild(inconEl);
    cityNameEl.textContent = cityName + ' ' + formattedDate + " ";

    //Display temp, humidity, and wind
    var temp = weatherData.list[0].main.temp;
    tempEl.textContent = 'Temp: ' + temp + 'F';
    var humidity = weatherData.list[0].main.humidity;
    humidityEl.textContent = 'Humidity: ' + humidity + "%";
    var wind = weatherData.list[0].wind.speed;
    windEl.textContent = 'Wind: ' + wind + " MPH";

}



//displays the most recent search on the page
var searches = localStorage.getItem('search-input');
var searchesEl = document.getElementById('searches');
searchesEl.textContent = searches;

searchFormEl.addEventListener('submit', handleSearchFormSubmit);