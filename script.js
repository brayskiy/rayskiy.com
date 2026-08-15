// ===== Current year in footer =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Theme toggle (persists in localStorage) =====
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

function currentTheme() {
  return root.getAttribute("data-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}
function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (themeToggle) themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

const saved = localStorage.getItem("theme");
if (saved) applyTheme(saved);
else if (themeToggle) themeToggle.textContent = currentTheme() === "dark" ? "☀️" : "🌙";

themeToggle?.addEventListener("click", () => {
  applyTheme(currentTheme() === "dark" ? "light" : "dark");
});

// ===== Mobile nav toggle =====
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

// Close mobile menu when a link is clicked
navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});
