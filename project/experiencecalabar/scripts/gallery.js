document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll(".gallery-item img");
  
    // Create lightbox overlay
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox-overlay");
    const lightboxImg = document.createElement("img");
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);
  
    galleryItems.forEach((img) => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.add("active");
      });
    });
  
    // Click anywhere to close lightbox
    lightbox.addEventListener("click", () => {
      lightbox.classList.remove("active");
      lightboxImg.src = "";
    });
  });
  

const toggleButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

toggleButton.addEventListener('click', () => {
  nav.classList.toggle('active');
  toggleButton.classList.toggle('open');

  const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
  toggleButton.setAttribute('aria-expanded', !expanded);
});