let pingData = {};
const vpnList = document.getElementById("vpnList");
const search = document.getElementById("search");
const country = document.getElementById("country");

let vpnData = [];

async function loadVPN() {

    const res = await fetch("/api/list");
    vpnData = await res.json();

    
fetch("/api/ping?t=" + Date.now())
    .then(res => res.json())
    .then(data => {
        pingData = data;
        render(vpnData);
    })
    .catch(() => {
        pingData = {};
        render(vpnData);
    });
}

function render(data) {

    vpnList.innerHTML = "";

    data.forEach(vpn => {

        vpnList.innerHTML += `

<div class="vpn-card">

<div class="top">

    <span class="badge ${vpn.is_premium ? 'premium' : 'free'}">
        ${vpn.is_premium ? "💎 PREMIUM" : "FREE"}
    </span>

    <span class="online">
        <span class="status-dot"></span>
        ONLINE
    </span>

</div>

<div class="country-row">

    <span>${getFlag(vpn.country)} ${vpn.country}</span>

<span class="ping">
    ⚡ ${pingData[vpn.country] || "--"} ms
</span>

</div>

<h2>

${vpn.title}

</h2>

<div class="protocol">

${vpn.type}

</div>

<div class="vpn-active">

<span class="status-dot"></span>

Active

</div>

<div class="config">

${vpn.config}

</div>

<button
class="copy-btn"
data-config="${encodeURIComponent(vpn.config)}"
onclick="copyConfig(this)">

⎙ COPY CONFIG

</button>

</div>

`;

    });
document.querySelectorAll(".vpn-card h2").forEach(title => {
    if (title.textContent.trim().length > 18) {
        title.classList.add("long-title");
    }
});
}

function copyConfig(btn){

    const text = decodeURIComponent(btn.dataset.config);

    navigator.clipboard.writeText(text);

    const oldHTML = btn.innerHTML;

    btn.innerHTML = "☑ COPIED";

    btn.classList.add("copied");

    setTimeout(() => {
        btn.innerHTML = oldHTML;
        btn.classList.remove("copied");
    }, 1800);

}

search.oninput = filterVPN;

country.onchange = filterVPN;

function filterVPN(){

    const keyword = search.value.toLowerCase();

    const type = country.value;

    const result = vpnData.filter(v=>{

        const a =

            v.title.toLowerCase().includes(keyword);

        const b =

            type=="all" ||

            v.country==type;

        return a && b;

    });

    render(result);

}

function getFlag(country){

    const flags = {

        "Singapore":"https://hatscripts.github.io/circle-flags/flags/sg.svg",

        "Japan":"https://hatscripts.github.io/circle-flags/flags/jp.svg",

        "USA":"https://hatscripts.github.io/circle-flags/flags/us.svg",

        "Germany":"https://hatscripts.github.io/circle-flags/flags/de.svg",

        "United Kingdom":"https://hatscripts.github.io/circle-flags/flags/gb.svg",

        "Myanmar":"https://hatscripts.github.io/circle-flags/flags/mm.svg"
};

    const flag = flags[country] || "https://hatscripts.github.io/circle-flags/flags/un.svg";

    return `<img src="${flag}" class="flag">`;

}

loadVPN();
