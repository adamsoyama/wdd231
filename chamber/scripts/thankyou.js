document.addEventListener("DOMContentLoaded", () => {
  const queryParams = new URLSearchParams(window.location.search);

  document.getElementById("first-name").textContent = queryParams.get("firstname") || "N/A";
  document.getElementById("last-name").textContent = queryParams.get("lastname") || "N/A";
  document.getElementById("email").textContent = queryParams.get("email") || "N/A";
  document.getElementById("phone").textContent = queryParams.get("phone") || "N/A";
  document.getElementById("orgname").textContent = queryParams.get("orgname") || "N/A";
  document.getElementById("timestamp").textContent = queryParams.get("timestamp") || "N/A";

  // Footer Year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
