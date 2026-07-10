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
