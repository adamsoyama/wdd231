document.addEventListener("DOMContentLoaded", () => {
    const allEventsContainer = document.querySelector(".event-grid");
    const categoryFilter = document.getElementById("categoryFilter");
    const dateFilter = document.getElementById("dateFilter");
    const countdown = document.getElementById("countdown");

    let allEvents = [];

    fetch("data/events.json")
        .then(response => response.json())
        .then(data => {
            allEvents = data;
            renderAllEvents(data);
            startCountdown(data[0].date); // Optional: change this if you want a specific event
        });

    function renderAllEvents(events) {
        allEventsContainer.innerHTML = "";
        events.forEach(event => {
            allEventsContainer.innerHTML += createEventCard(event);
        });
    }

    function createEventCard(event) {
        return `
        <div class="event-card">
          <img src="${event.image}" alt="${event.title}" loading="lazy">
          <div class="event-content">
            <h3>${event.title}</h3>
            <p class="event-date">${new Date(event.date).toLocaleDateString()}</p>
            <p>${event.description}</p>
          </div>
        </div>
      `;
    }

    function filterEvents() {
        const category = categoryFilter.value;
        const date = dateFilter.value;

        let filtered = [...allEvents];

        if (category !== "all") {
            filtered = filtered.filter(ev => (ev.category || "").toLowerCase() === category.toLowerCase());
        }

        if (date) {
            filtered = filtered.filter(ev => ev.date === date);
        }

        renderAllEvents(filtered);
    }

    categoryFilter.addEventListener("change", filterEvents);
    dateFilter.addEventListener("change", filterEvents);

    function startCountdown(targetDate) {
        const eventDate = new Date(targetDate).getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = eventDate - now;

            if (distance < 0) {
                countdown.innerHTML = "<p>The carnival has started!</p>";
                clearInterval(timer);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdown.innerHTML = `
          <div class="countdown-item"><span>${days}</span> Days</div>
          <div class="countdown-item"><span>${hours}</span> Hours</div>
          <div class="countdown-item"><span>${minutes}</span> Minutes</div>
          <div class="countdown-item"><span>${seconds}</span> Seconds</div>
        `;
        };

        const timer = setInterval(updateTimer, 1000);
        updateTimer();
    }
});


const toggleButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

toggleButton.addEventListener('click', () => {
    nav.classList.toggle('active');
    toggleButton.classList.toggle('open');

    const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', !expanded);
});