// ==========================
// TRENZYCH VPN v3
// app.js
// ==========================

// Mobile Menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});

// Close Menu When Click Link
document.querySelectorAll("#mobileMenu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});

// Close Menu When Click Outside
document.addEventListener("click", (e) => {

    if (
        !mobileMenu.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {

        mobileMenu.classList.remove("active");

    }

});

// Navbar Shadow On Scroll
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {

        navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.35)";

    } else {

        navbar.style.boxShadow = "none";

    }

});

// Smooth Fade In
window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});
