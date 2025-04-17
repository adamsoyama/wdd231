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
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    return res.json();
  } catch (err) {
    console.error(`Error fetching data from ${url}:`, err);
    return [];
  }
};

const createEl = (tag, classNames = [], innerHTML = "") => {
  const el = document.createElement(tag);
  el.classList.add(...classNames);
  el.innerHTML = innerHTML;
  return el;
};

const getRandomItems = (arr, count) => [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

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
  const apiKey = "e48c654b35fed95c19c7d2c727934cce";
  const city = "Calabar";
  const weatherEl = document.getElementById("weather-widget");

  try {
    const data = await fetchJSON(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const { temp, feels_like, humidity } = data.main;
    const { description, icon } = data.weather[0];
    const { speed: wind } = data.wind;
    const { country } = data.sys;

    const weatherTip = temp >= 30 ? "It's hot and festive – pack light!" : temp >= 20 ? "Perfect weather for carnival vibes!" : "Cool breeze – bring a light jacket.";

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
        <p>💧 Humidity: ${humidity}%</p>
        <p>🌬️ Wind: ${wind} m/s</p>
        <p>🧳 Tip: ${weatherTip}</p>
      </ul>
    `;
    weatherEl.classList.add("weather-loaded");
  } catch (err) {
    weatherEl.textContent = "Weather info unavailable at the moment.";
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

    countdownEl.textContent = `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
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

    container.innerHTML = events.slice(0, 3).map(event => `
      <div class="event-card">
        <img src="${event.image || 'assets/images/default-event.jpg'}" alt="${event.title}" loading="lazy" />
        <h3>${event.title}</h3>
        <p>${event.date}</p>
        <p>${event.description}</p>
        <button class="save-event">⭐ Save Event</button>
      </div>
    `).join("");

    container.querySelectorAll(".save-event").forEach((btn, index) => {
      btn.addEventListener("click", () => saveEventToLocal(events[index], btn));
    });

  } catch (err) {
    container.innerHTML = "<p>Unable to load events at the moment.</p>";
  }
}

// ==========================
// Spotlight Experiences
// ==========================
async function loadSpotlightExperiences() {
  const container = document.querySelector(".spotlight-cards");
  if (!container) return;

  try {
    const spots = await fetchJSON("data/spotlights.json");
    const selected = getRandomItems(spots, 3);

    container.innerHTML = selected.map(spot => `
      <div class="spotlight-card">
        <img src="${spot.image}" alt="${spot.name}" loading="lazy" />
        <h3>${spot.name}</h3>
        <p>${spot.address}</p>
      </div>
    `).join("");
  } catch (err) {
    container.innerHTML = "<p>Unable to load spotlight experiences.</p>";
  }
}

// ==========================
// Save Event Functionality
// ==========================
function saveEventToLocal(event, button) {
  let savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];

  if (!savedEvents.some(e => e.title === event.title)) {
    savedEvents.push(event);
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));

    button.textContent = "✅ Saved";
    button.classList.add("saved");
    button.disabled = true;
  }
}

// ==========================
// Mobile Navigation Toggle
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }
});