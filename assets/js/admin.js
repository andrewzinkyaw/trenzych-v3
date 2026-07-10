// ===== Login Check =====

const token = localStorage.getItem("admin_token");

if (!token || token.trim() === "") {
    localStorage.removeItem("admin_token");
    location.replace("/login.html");
}

// Prevent browser cache
window.history.pushState(null, "", window.location.href);

window.onpopstate = function () {
    window.history.pushState(null, "", window.location.href);
};

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
            
loadVPNList();
            
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

// ===== Upload VPN =====

const form = document.getElementById("vpnForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const data = {
            title: document.getElementById("title").value.trim(),
            country: document.getElementById("country").value,
            type: document.getElementById("type").value,
            config: document.getElementById("config").value.trim(),
            is_premium: Number(document.getElementById("premium").value)
        };

        try {

            const res = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            alert(result.message);

            if (result.success) {

                form.reset();

                loadDashboard();

            }

        } catch (err) {

            alert(err.message);

        }

    });

}
async function loadVPNList(){

    const box = document.getElementById("vpnTable");
    if(!box) return;

    const res = await fetch("/api/list");
    const vpn = await res.json();

    box.innerHTML = "";

    vpn.forEach(item=>{

        box.innerHTML += `
        <div class="vpn-card">

            <div class="card-top">
                <h3>${item.title}</h3>

                <span class="badge ${item.is_premium ? "premium":"free"}">
                    ${item.is_premium ? "Premium":"Free"}
                </span>
            </div>

            <p>🌍 ${item.country}</p>
            <p>📡 ${item.type}</p>

            <div class="admin-buttons">

                <button
                    class="edit-btn"
                    onclick="editVPN(${item.id})">

                    ✏ Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteVPN(${item.id})">

                    🗑 Delete

                </button>

            </div>

        </div>
        `;

    });

}
