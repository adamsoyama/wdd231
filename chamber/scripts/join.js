document.addEventListener("DOMContentLoaded", () => {
  // Set timestamp
 // Set timestamp in a clean format: "April 11, 2025 00:10:15"
const timestampField = document.getElementById("timestamp");
if (timestampField) {
  const now = new Date();
  const formatted = now.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  timestampField.value = formatted;
}


  // Modal setup using <dialog>
  const links = document.querySelectorAll(".info-link");
  links.forEach(link => {
    const modalId = link.dataset.modal;
    const dialog = document.getElementById(modalId);

    if (dialog && dialog.showModal) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.showModal();
      });

      const closeBtn = dialog.querySelector(".close");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          dialog.close();
        });
      }
    }
  });

  // Footer Dynamic Content
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const modifiedSpan = document.getElementById("last-modified");
  if (modifiedSpan) {
    modifiedSpan.textContent = document.lastModified;
  }
});
