// =========================
// MOBILE NAVIGATION
// =========================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// Close mobile menu when a link is clicked

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


// =========================
// CURRENT YEAR
// =========================

const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();


// =========================
// NAVBAR SCROLL EFFECT
// =========================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(13, 13, 13, 0.97)";

    } else {

        header.style.background = "rgba(13, 13, 13, 0.9)";

    }

});


// =========================
// PROJECT CARD REVEAL
// =========================

const projectCards = document.querySelectorAll(".project-card");

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },

    {
        threshold: 0.15
    }

);


projectCards.forEach((card) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";
    card.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(card);

});