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

// ===== Live Stats =====

async function loadHomeStats() {

    // VPN Keys
    try {
        const res = await fetch("/api/list");
        const vpn = await res.json();

        const keyEl = document.getElementById("vpnKeys");
        if (keyEl) {
            keyEl.textContent = vpn.length;
        }
    } catch (e) {}

    // Average Ping
try {
    const res = await fetch("/api/ping");
    const ping = await res.json();

    const pingEl = document.getElementById("avgPing");

if (pingEl) {

    pingEl.textContent = ping.average + " ms";

    if (ping.average <= 80) {
        pingEl.style.color = "#00E676";
    } else if (ping.average <= 150) {
        pingEl.style.color = "#FFD54F";
    } else {
        pingEl.style.color = "#FF5252";
    }

}

} catch (e) {
    console.log(e);
}
    
}

loadHomeStats();
