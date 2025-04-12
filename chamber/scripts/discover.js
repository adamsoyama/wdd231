const cardsContainer = document.querySelector(".cards");

fetch("data/discover.json")
  .then((response) => response.json())
  .then((items) => {
    items.forEach((item, index) => {
      const card = document.createElement("section");
      card.classList.add("card");

      // Optional: give each card a grid-area name for large layout
      card.style.gridArea = `card${index + 1}`;

      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="${item.image}" alt="${item.name} photo" loading="lazy" width="300" height="200">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button class="learn-more">Learn More</button>
      `;

      cardsContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Error loading discover.json:", error));

// Visitor Message Handling
const sidebar = document.getElementById("visitor-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

let message = "Welcome! Let us know if you have any questions.";

if (lastVisit) {
  const msSinceLastVisit = now - Number(lastVisit);
  const days = Math.floor(msSinceLastVisit / (1000 * 60 * 60 * 24));

  if (days < 1) {
    message = "Back so soon! Awesome!";
  } else if (days === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `You last visited ${days} days ago.`;
  }
}

// Save the current visit time
localStorage.setItem("lastVisit", now);

// Show message
if (sidebar) {
  sidebar.textContent = message;
}

// Footer Dynamic Content
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const modifiedSpan = document.getElementById("last-modified");
if (modifiedSpan) {
  modifiedSpan.textContent = document.lastModified;
}

