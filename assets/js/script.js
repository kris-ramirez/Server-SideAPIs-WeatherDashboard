var searchFormEl = document.querySelector('#search-form');





function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.error('You need to enter a city!');
        return;
    }
    localStorage.setItem('search-input', searchInputVal);

// Construct the geocoding API URL
var geocodingUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + encodeURIComponent(searchInputVal) + '&key=8363ff74233a9241814b580d1b9a21c5';

// Make the geocoding API request
fetch(geocodingUrl)
    .then(function (response) {
        if (!response.ok) {
            throw new Error('Unable to fetch geocoding data.');
        }
        return response.json();
    })
    .then(function (data) {
        // Extract latitude and longitude from the geocoding response
        var latitude = data.results[0].geometry.lat;
        var longitude = data.results[0].geometry.lng;

        // Construct the weather API URL with latitude and longitude
        var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=8363ff74233a9241814b580d1b9a21c5';

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
                // Display or use the weather data as needed
            })
            .catch(function (error) {
                console.error('Error:', error.message);
            });
    })
    .catch(function (error) {
        console.error('Error:', error.message);
    });

}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);