document.addEventListener("DOMContentLoaded", () => {
  renderCurrentYear();
  renderLastModified();
  initWeather();
  initCountdown();
  loadFeaturedEvents();
  loadSpotlightExperiences();
});

// ==========================
// Utility Functions
// ==========================

const fetchJSON = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
};

const createEl = (tag, classNames = [], innerHTML = "") => {
  const el = document.createElement(tag);
  el.classList.add(...classNames);
  el.innerHTML = innerHTML;
  return el;
};

const getRandomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const setTextIfEl = (id, text) => {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
};

// ==========================
// Date-based Utilities
// ==========================

function renderCurrentYear() {
  setTextIfEl("year", new Date().getFullYear());
}

function renderLastModified() {
  setTextIfEl("last-modified", document.lastModified);
}

// ==========================
// Weather Widget
// ==========================

async function initWeather() {
  const apiKey = "e48c654b35fed95c19c7d2c727934cce"; // Replace with your actual key
  const city = "Calabar";
  const weatherEl = document.getElementById("weather-widget");

  try {
    const data = await fetchJSON(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const { temp, feels_like } = data.main;
    const { description, icon } = data.weather[0];
    const { humidity } = data.main;
    const { speed: wind } = data.wind;
    const { country } = data.sys;

    const weatherTip =
      temp >= 30
        ? "It's hot and festive – pack light!"
        : temp >= 20
        ? "Perfect weather for carnival vibes!"
        : "Cool breeze – bring a light jacket.";

    weatherEl.innerHTML = `
      <div class="weather-top">
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" width="50" height="50" />
        <div class="weather-info">
          <h3>Weather in ${city}, ${country}</h3>
          <p><strong>${Math.round(temp)}°C</strong> – ${description}</p>
          <p>Feels like: ${Math.round(feels_like)}°C</p>
        </div>
      </div>
      <ul class="weather-details">
        <li>💧 Humidity: ${humidity}%</li>
        <li>🌬️ Wind: ${wind} m/s</li>
        <li>🧳 Tip: ${weatherTip}</li>
      </ul>
    `;

    weatherEl.classList.add("weather-loaded");
  } catch (err) {
    weatherEl.textContent = "Weather info unavailable at the moment.";
    console.error("Weather fetch error:", err);
  }
}

// ==========================
// Countdown Timer
// ==========================

function initCountdown() {
  const countdownEl = document.getElementById("countdown");
  const targetDate = new Date("2025-12-28T12:00:00");

  const pad = (n) => (n < 10 ? "0" + n : n);

  const updateCountdown = () => {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      countdownEl.textContent = "🎭 It's Carnival Time!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent = `${pad(days)}d ${pad(hours)}h ${pad(
      minutes
    )}m ${pad(seconds)}s`;
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ==========================
// Featured Events
// ==========================

async function loadFeaturedEvents() {
  const container = document.querySelector(".event-cards");

  if (!container) return;

  try {
    const events = await fetchJSON("data/events.json");
    const topEvents = events.slice(0, 3);

    container.innerHTML = "";

    topEvents.forEach((event) => {
      const image = event.image || "assets/images/default-event.jpg";

      const card = createEl("div", ["event-card"], `
        <img src="${image}" alt="${event.title}" loading="lazy" />
        <h3>${event.title}</h3>
        <p>${event.date}</p>
        <p>${event.description}</p>
      `);

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p>Unable to load events at the moment.</p>";
    console.error("Events fetch error:", err);
  }
}

// ==========================
// Spotlight Experiences
// ==========================

async function loadSpotlightExperiences() {
  const spotlightContainer = document.querySelector(".spotlight-cards");

  if (!spotlightContainer) return;

  try {
    const spots = await fetchJSON("data/spotlights.json");
    const selected = getRandomItems(spots, 3);

    spotlightContainer.innerHTML = "";

    selected.forEach((spot) => {
      const card = createEl("div", ["spotlight-card"], `
        <img src="${spot.image}" alt="${spot.name}" loading="lazy" />
        <div class="spotlight-info">
          <h3>${spot.name}</h3>
          <p>${spot.address}</p>
        </div>
      `);

      spotlightContainer.appendChild(card);
    });

    const galleryLink = createEl("div", ["view-gallery"], `
      <a href="gallery.html" class="cta-button">🎉 View Full Gallery</a>
    `);
    spotlightContainer.appendChild(galleryLink);
  } catch (err) {
    spotlightContainer.innerHTML =
      "<p>Unable to load spotlight experiences.</p>";
    console.error("Spotlight fetch error:", err);
  }
}
