const app = {
    name: "TRENZYCH VPN",
    platform: "Android",
    version: "v1.0.0",
    description: "Official TRENZYCH VPN application. Fast, secure and stable VPN with multi-protocol support.",
    icon: "assets/images/app-icon.png",
    url: "https://telegram.me/trenzych/975"
};

const container = document.getElementById("androidApps");

if (container) {
    container.innerHTML = `
        <h2 class="platform-title">Android</h2>

        <div class="app-card">

            <img src="${app.icon}" class="app-icon" alt="${app.name}">

            <span class="platform">${app.platform}</span>

            <h2>${app.name}</h2>

            <div class="version">${app.version}</div>

            <p>${app.description}</p>

            <ul class="feature-list">
                <li>⚡ Fast Connection</li>
                <li>🛡 Secure VPN</li>
                <li>🌍 Multi-Protocol</li>
                <li>🔄 Auto Server Update</li>
            </ul>

            <a href="${app.url}" class="download-btn" target="_blank">
                📥 Download APK
            </a>

        </div>
    `;
}

["iosApps", "windowsApps", "linuxApps"].forEach(id => {
    const section = document.getElementById(id);
    if (section) {
        section.innerHTML = "";
    }
});
