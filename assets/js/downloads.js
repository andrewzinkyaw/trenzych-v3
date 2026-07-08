const apps = [

{
    name: "Hiddify Next",
    platform: "Android",
    description: "Recommended multi-protocol VPN client.",
    url: "https://github.com/hiddify/hiddify-next/releases/latest"
},

{
    name: "V2RayNG",
    platform: "Android",
    description: "Fast and lightweight Xray / V2Ray client.",
    url: "https://github.com/2dust/v2rayNG/releases/latest"
},

{
    name: "NPV Tunnel",
    platform: "Android",
    description: "VPN tunneling application.",
    url: "#"
},

{
    name: "HTTP Injector",
    platform: "Android",
    description: "SSH & Proxy tunneling application.",
    url: "https://play.google.com/store/apps/details?id=com.evozi.injector"
},

{
    name: "Outline VPN",
    platform: "Android",
    description: "Official Outline Client.",
    url: "https://getoutline.org/get-started/"
},

{
    name: "Shadowrocket",
    platform: "iPhone",
    description: "Popular proxy client for iOS.",
    url: "https://apps.apple.com/"
},

{
    name: "Streisand",
    platform: "iPhone",
    description: "Modern VPN client for iOS.",
    url: "https://apps.apple.com/"
},

{
    name: "NekoRay",
    platform: "Windows",
    description: "Powerful Xray client for Windows.",
    url: "https://github.com/MatsuriDayo/nekoray/releases/latest"
},

{
    name: "Hiddify Next",
    platform: "Windows",
    description: "Official desktop version.",
    url: "https://github.com/hiddify/hiddify-next/releases/latest"
},

{
    name: "Clash Verge",
    platform: "Linux",
    description: "Modern Clash client.",
    url: "https://github.com/clash-verge-rev/clash-verge-rev/releases/latest"
}

];

const search = document.getElementById("search");

const sections = {
    Android: document.getElementById("androidApps"),
    iPhone: document.getElementById("iosApps"),
    Windows: document.getElementById("windowsApps"),
    Linux: document.getElementById("linuxApps")
};

function renderApps(keyword = "") {

    Object.values(sections).forEach(section => {
        section.innerHTML = "";
    });

    ["Android", "iPhone", "Windows", "Linux"].forEach(platform => {

        const list = apps.filter(app =>
            app.platform === platform &&
            app.name.toLowerCase().includes(keyword.toLowerCase())
        );

        if (list.length === 0) return;

        sections[platform].innerHTML += `
            <h2 class="platform-title">${platform}</h2>
        `;

        list.forEach(app => {

            sections[platform].innerHTML += `
                <div class="app-card">

                    <span class="platform">${app.platform}</span>

                    <h2>${app.name}</h2>

                    <p>${app.description}</p>

                    <button class="download-btn"
                        onclick="window.open('${app.url}','_blank')">

                        ⬇ Download

                    </button>

                </div>
            `;

        });

    });

}

renderApps();

search.addEventListener("input", function () {
    renderApps(this.value);
});
