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
            // Display or use the weather data as needed
        })
        .catch(function (error) {
            console.error('Error:', error.message);
        });
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
searchFormEl.addEventListener('submit', handleSearchFormSubmit);