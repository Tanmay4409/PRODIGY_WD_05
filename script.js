async function getCoordinates(location) {
    const apiKey = '779ac8e2e27b4f6e8e562f43a15035a5';
    const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`;

    try {
        const response = await fetch(geocodingUrl);
        const data = await response.json();
        console.log('Geocoding Response:', data);

        if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            return { lat, lon: lng };
        } else {
            throw new Error('Location not found');
        }
    } catch (error) {
        console.error('Geocoding Error:', error);
        throw new Error('Error fetching geocoding data');
    }
}

async function getWeather() {
    const location = document.getElementById('locationInput').value;

    try {
        const { lat, lon } = await getCoordinates(location);
        const apiKey = 'f8cd2127309b431dab3acf3de7224306	';
        const weatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`;

        const response = await fetch(weatherUrl);
        const data = await response.json();
        console.log('Weather Response:', data);

        if (data.data && data.data.length > 0) {
            const weatherData = data.data[0];
            document.getElementById('weatherInfo').innerHTML = `
                <h2>${location}</h2>
                <p>Temperature: ${weatherData.temp} °C</p>
                <p>Weather: ${weatherData.weather.description}</p>
                <p>Humidity: ${weatherData.rh}%</p>
                <p>Wind Speed: ${weatherData.wind_spd} m/s</p>
            `;
        } else {
            document.getElementById('weatherInfo').innerHTML = `<p>Weather data not found. Please try again.</p>`;
        }
    } catch (error) {
        console.error('Weather Data Error:', error);
        document.getElementById('weatherInfo').innerHTML = `<p>${error.message}. Please try again later.</p>`;
    }
}
