document.addEventListener('DOMContentLoaded', () => {
    displayWeather();
    displayForecast();
    displayEvents();
    displaySpotlights();
});

async function displayWeather() {
    const apiKey = 'e48c654b35fed95c19c7d2c727934cce'; 
    const city = 'Calabar';
    const countryCode = 'NG';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();

        document.getElementById('temp').textContent = data.main.temp.toFixed(1);
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('high').textContent = data.main.temp_max.toFixed(1);
        document.getElementById('low').textContent = data.main.temp_min.toFixed(1);
        document.getElementById('humidity').textContent = data.main.humidity;

        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById('sunrise').textContent = sunrise;
        document.getElementById('sunset').textContent = sunset;
    } catch (error) {
        console.error('Error fetching current weather:', error);
        document.getElementById('weather').innerHTML = '<p>Unable to load weather data at this time.</p>';
    }
}

async function displayForecast() {
    const apiKey = 'e48c654b35fed95c19c7d2c727934cce'; 
    const city = 'Calabar';
    const countryCode = 'NG';
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(forecastUrl);
        const data = await response.json();
        const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

        document.getElementById('day1').textContent = `${forecast[0].main.temp.toFixed(1)}°C`;
        document.getElementById('day2').textContent = `${forecast[1].main.temp.toFixed(1)}°C`;
        document.getElementById('day3').textContent = `${forecast[2].main.temp.toFixed(1)}°C`;
    } catch (error) {
        console.error('Error fetching forecast:', error);
        document.getElementById('forecast').innerHTML = '<p>Unable to load forecast data.</p>';
    }
}

function displayEvents() {
    const events = [
        "🌟 April 10: Business Networking Mixer at Marina Resort",
        "🎤 April 15: Digital Marketing Workshop",
        "🏢 April 22: Local Business Expo"
    ];

    const container = document.getElementById('events');
    container.innerHTML = `<h2>Events</h2><ul>${events.map(event => `<li>${event}</li>`).join('')}</ul>`;
}

async function displaySpotlights() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();

        const silverGold = data.filter(member => member.level === 3 || member.level === 2);
        const shuffled = silverGold.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        const container = document.getElementById('spotlights');
        container.innerHTML = '';
        selected.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('spotlight', 'card');

            const membershipLabel = member.level === 3 ? 'Gold' : 'Silver';

            card.innerHTML = `
                <img src="${member.logo}" alt="${member.name} logo" loading="lazy">
                <h3>${member.name}</h3>
                <p class="tagline">"${member.tagline}"</p>
                <p><strong>Membership:</strong> ${membershipLabel}</p>
                <p>${member.phone}</p>
                <p><a href="${member.url}" target="_blank">Visit Website</a></p>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading spotlights:', error);
        document.getElementById('spotlights').innerHTML = '<p>Unable to load spotlight data at this time.</p>';
    }
}

// ==== Footer Dynamic Content ====

document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Set last modified date
    const modifiedSpan = document.getElementById('last-modified');
    if (modifiedSpan) {
        modifiedSpan.textContent = document.lastModified;
    }
});
