document.addEventListener("DOMContentLoaded", () => {
    const tripCards = document.querySelectorAll(".trip-card");
  
    const observerOptions = {
      threshold: 0.2,
    };
  
    const observer = new IntersectionObserver((entries, observerRef) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observerRef.unobserve(entry.target); // Only animate once
        }
      });
    }, observerOptions);
  
    tripCards.forEach((card) => observer.observe(card));
  });
  