const PAYMENT_URL = "https://robandigit.com/canva-pro-a-vie/checkout";
const WHATSAPP_MESSAGE = "Bonjour R-Digital Innov, je souhaite obtenir des informations sur votre offre Canva Pro à 1 000 FCFA.";
document.documentElement.classList.add("js");

document.querySelectorAll(".btn-buy-trigger").forEach(button => {
  button.href = PAYMENT_URL;
});

document.querySelectorAll(".whatsapp-link[data-phone]").forEach(link => {
  const phone = link.dataset.phone;
  link.href = `https://wa.me/${phone}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  const closeMenu = () => {
    mainNav.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    mainNav.classList.toggle("open", isOpen);
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

document.querySelectorAll(".faq-item").forEach(item => {
  const button = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  if (!button || !answer) return;

  button.addEventListener("click", () => {
    const shouldOpen = button.getAttribute("aria-expanded") !== "true";

    document.querySelectorAll(".faq-item").forEach(otherItem => {
      const otherButton = otherItem.querySelector(".faq-question");
      const otherAnswer = otherItem.querySelector(".faq-answer");
      otherItem.classList.remove("active");
      if (otherButton) otherButton.setAttribute("aria-expanded", "false");
      if (otherAnswer) {
        otherAnswer.style.maxHeight = "";
        otherAnswer.setAttribute("aria-hidden", "true");
      }
    });

    if (shouldOpen) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
      answer.setAttribute("aria-hidden", "false");
    }
  });
});

const posterImage = document.querySelector(".poster-img");
if (posterImage) {
  posterImage.addEventListener("error", () => {
    posterImage.closest(".poster-section")?.setAttribute("hidden", "");
  }, { once: true });
  if (posterImage.complete && posterImage.naturalWidth === 0) {
    posterImage.closest(".poster-section")?.setAttribute("hidden", "");
  }
}

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
