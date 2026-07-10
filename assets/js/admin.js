// ==============================
// TRENZYCH VPN Panel v3
// admin.js
// ==============================

// Mobile Sidebar

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");

if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("show");
    });
    // Sidebar အပြင်ကိုနှိပ်ရင် ပိတ်မယ်

document.addEventListener("click", (e) => {

    if (
        window.innerWidth <= 768 &&
        sidebar.classList.contains("show") &&
        !sidebar.contains(e.target) &&
        !menuToggle.contains(e.target)
    ) {
        sidebar.classList.remove("show");
    }

});
    document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 768) {
            sidebar.classList.remove("show");
        }

    });

});
}

// Logout

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {

        if (confirm("Logout now?")) {

            localStorage.removeItem("admin_token");
            location.href = "/login.html";

        }

    });
}

// Dashboard Stats

async function loadDashboard() {

    try {

        const res = await fetch("/api/list");
        const vpn = await res.json();

        document.getElementById("totalKeys").textContent = vpn.length;

        document.getElementById("freeKeys").textContent =
            vpn.filter(v => !v.is_premium).length;

        document.getElementById("premiumKeys").textContent =
            vpn.filter(v => v.is_premium).length;

    } catch (err) {

        console.error(err);

    }

}

loadDashboard();

// ===== SPA Navigation =====

const pages = {
    dashboard: document.getElementById("dashboardPage"),
    addvpn: document.getElementById("addvpnPage"),
    vpnlist: document.getElementById("vpnlistPage"),
    settings: document.getElementById("settingsPage")
};

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        // Active Menu
        document.querySelectorAll(".nav-link").forEach(a=>{
            a.classList.remove("active");
        });

        link.classList.add("active");

        // Hide All Pages
        Object.values(pages).forEach(page=>{
            page.style.display = "none";
        });

        // Show Selected Page
        if(link.textContent.includes("Dashboard")){
            pages.dashboard.style.display = "block";
        }

        if(link.textContent.includes("Add VPN")){
            pages.addvpn.style.display = "block";
        }

        if(link.textContent.includes("VPN List")){
            pages.vpnlist.style.display = "block";
        }

        if(link.textContent.includes("Settings")){
            pages.settings.style.display = "block";
        }

        // Mobile Auto Close
        if(window.innerWidth <= 768){
            sidebar.classList.remove("show");
        }

    });

});
