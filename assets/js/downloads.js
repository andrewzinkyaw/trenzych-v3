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
    description: "Fast and lightweight V2Ray / Xray client.",
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
    name: "Streisand",
    platform: "iPhone",
    description: "Modern VPN client for iOS.",
    url: "https://apps.apple.com/"
},

{
    name: "Shadowrocket",
    platform: "iPhone",
    description: "Popular proxy client for iOS.",
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
}

];

const appList = document.getElementById("appList");
const search = document.getElementById("search");

function renderApps(keyword = ""){

    appList.innerHTML = "";

    const filtered = apps.filter(app =>
        app.name.toLowerCase().includes(keyword.toLowerCase())
    );

    filtered.forEach(app => {

        appList.innerHTML += `
        <div class="app-card">

            <span class="platform">${app.platform}</span>

            <h2>${app.name}</h2>

            <p>${app.description}</p>

            <button
                class="download-btn"
                onclick="window.open('${app.url}','_blank')">

                ⬇ Download

            </button>

        </div>
        `;

    });

}

renderApps();

search.addEventListener("input", e => {

    renderApps(e.target.value);

});
