
// Step 1: Declare the URL for the JSON resource
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

// Step 2: Select the HTML element with id="cards"
const cards = document.querySelector('#cards');

// Step 3: Create an async function named getProphetData to fetch the data
const getProphetData = async () => {
    try {
        // Step 4: Fetch the data and store the response
        const response = await fetch(url);

        // Step 5: Convert the response to a JSON object
        const data = await response.json();

        // Step 6: Comment out the console.table() after testing
        // console.table(data.prophets); // Uncomment for testing

        // Step 7: Call displayProphets with data.prophets
        displayProphets(data.prophets);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Step 8: Define displayProphets using an arrow function
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement('section');

        let fullName = document.createElement('h2');
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        let birthdate = document.createElement('p');
        birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;

        let birthplace = document.createElement('p');
        birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;

        let portrait = document.createElement('img');
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(birthdate);
        card.appendChild(birthplace);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
};

// Step 9: Call the getProphetData function to start everything
getProphetData();

// Add an event listener for DOMContentLoaded to ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select the elements in the footer
    const currentYearElement = document.getElementById('currentyear');
    const lastModifiedElement = document.getElementById('lastModified');

    // Update the current year in the footer
    currentYearElement.textContent = new Date().getFullYear();

    // Update the last modified date in the footer
    lastModifiedElement.textContent = `Last Updated: ${document.lastModified}`;
});
