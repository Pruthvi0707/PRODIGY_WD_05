document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_API_KEY'; // Replace this with your actual API key
    const fetchWeatherButton = document.getElementById('fetchWeather');
    const weatherInfo = document.getElementById('weatherInfo');
    
    // Function to display weather details
    const displayWeather = (data) => {
        const { name, main, weather } = data;
        const temperature = (main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius
        const description = weather[0].description;
        
        weatherInfo.innerHTML = `
            <h2>Weather in ${name}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Condition: ${description}</p>
        `;
    };

    // Function to fetch weather data from the API
    const fetchWeatherData = async (location) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
            const response = await fetch(url);
            
            // Check for location not found (404) and other errors
            if (response.status === 404) {
                throw new Error('Location not found');
            } else if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            // Display appropriate error message in case of failure
            weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    };
    
    // Event listener for button click
    fetchWeatherButton.addEventListener('click', () => {
        const location = document.getElementById('location').value.trim();
        
        if (location) {
            fetchWeatherData(location);
        } else {
            weatherInfo.innerHTML = '<p>Please enter a location.</p>';
        }
    });
});
