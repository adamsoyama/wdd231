// contact.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
  
      if (!name || !email || !message) {
        alert("Please fill in all fields before submitting.");
        return;
      }
  
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
  
      alert("Thank you for contacting us! We’ll get back to you shortly.");
      form.reset();
    });
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email.toLowerCase());
    }
  
    // Animate contact sections on load
    const contactSections = document.querySelectorAll(".contact-form, .contact-info");
    contactSections.forEach((section, index) => {
      section.style.opacity = 0;
      section.style.transform = "translateY(30px)";
      setTimeout(() => {
        section.style.transition = "all 0.6s ease";
        section.style.opacity = 1;
        section.style.transform = "translateY(0)";
      }, 300 * index);
    });
  
    // Initialize Google Map
    window.initMap = () => {
      const calabar = { lat: 4.9589, lng: 8.3222 };
      const map = new google.maps.Map(document.getElementById("map"), {
        center: calabar,
        zoom: 13,
      });
  
      new google.maps.Marker({
        position: calabar,
        map: map,
        title: "Experience Calabar Office",
      });
    };
  });
  

const toggleButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

toggleButton.addEventListener('click', () => {
    nav.classList.toggle('active');
    toggleButton.classList.toggle('open');

    const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', !expanded);
});