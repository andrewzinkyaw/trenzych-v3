const apps = [
    {
        name: "TRENZYCH VPN",
        platform: "Android",
        description: "Official TRENZYCH VPN application. Fast, secure and stable VPN with multi-protocol support.",
        url: "https://telegram.me/trenzych/975",
        icon: "assets/images/app-icon.png"
    }
];

const sections = {
    Android: document.getElementById("androidApps"),
    iPhone: document.getElementById("iosApps"),
    Windows: document.getElementById("windowsApps"),
    Linux: document.getElementById("linuxApps")
};

function renderApps() {

    Object.values(sections).forEach(section => {
        if (section) section.innerHTML = "";
    });

    ["Android", "iPhone", "Windows", "Linux"].forEach(platform => {

        const list = apps.filter(app => app.platform === platform);

        if (list.length === 0 || !sections[platform]) return;

        sections[platform].innerHTML += `
            <h2 class="platform-title">${platform}</h2>
        `;

        list.forEach(app => {

            sections[platform].innerHTML += `
                <div class="app-card">

                    <img src="${app.icon}"
                         alt="${app.name}"
                         class="app-icon">

                    <span class="platform">${app.platform}</span>

                    <h2>${app.name}</h2>

                    <p>${app.description}</p>

                    <button class="download-btn"
                        onclick="window.open('${app.url}','_blank')">
                        📥 Download APK
                    </button>

                </div>
            `;
        });

    });

}

renderApps();
