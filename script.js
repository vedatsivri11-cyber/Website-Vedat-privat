const state = {
  language: localStorage.getItem("sivora-language") || "tr"
};

const header = document.getElementById("siteHeader");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");
const langButtons = document.querySelectorAll(".lang-btn");

function translatePage(language) {
  state.language = language;
  localStorage.setItem("sivora-language", language);

  document.documentElement.lang = language;

  // All text elements use data-tr / data-de.
  document.querySelectorAll("[data-tr][data-de]").forEach((element) => {
    element.innerHTML = element.dataset[language];
  });

  // Form placeholders use separate data attributes.
  document.querySelectorAll("[data-placeholder-tr][data-placeholder-de]").forEach((element) => {
    element.placeholder = element.dataset[`placeholder-${language}`];
  });

  // Active language button.
  langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.language === language);
  });

  // Keep mobile menu closed after changing language.
  mobileNav.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    translatePage(button.dataset.language);
  });
});

mobileMenuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
  document.body.classList.toggle("no-scroll");
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    document.body.classList.remove("no-scroll");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

const slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

setInterval(() => {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}, 4500);

// Contact form: opens the visitor's mail application.
// Replace this address with the real Sivora email.
document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(
    state.language === "de"
      ? "Neue Projektanfrage – Sivora Web & Digital"
      : "Yeni Proje Talebi – Sivora Web & Digital"
  );

  const body = encodeURIComponent(
    `${state.language === "de" ? "Name" : "Ad"}: ${name}\n` +
    `E-Mail: ${email}\n\n` +
    `${state.language === "de" ? "Nachricht" : "Mesaj"}:\n${message}`
  );

  window.location.href =
    `mailto:info@sivora.com?subject=${subject}&body=${body}`;
});

// Initial language.
translatePage(state.language);
