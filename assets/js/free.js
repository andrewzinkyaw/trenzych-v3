const vpnList = document.getElementById("vpnList");
const search = document.getElementById("search");
const country = document.getElementById("country");

let vpnData = [];

async function loadVPN() {

    const res = await fetch("/api/list");
    vpnData = await res.json();

    render(vpnData);

}

function render(data) {

    vpnList.innerHTML = "";

    data.forEach(vpn => {

        vpnList.innerHTML += `

<div class="vpn-card">

<div class="top">

<div class="left">

<span class="badge ${vpn.is_premium ? "premium" : "free"}">

${vpn.is_premium ? "💎 PREMIUM" : "FREE"}

</span>

</div>

<div class="right">

<span class="online">

<span class="status-dot"></span>

ONLINE

</span>

</div>

</div>

<div class="country-row">

<span>

${vpn.country}

</span>

<span>

⚡ 5 ms

</span>

</div>

<h2>

${vpn.title}

</h2>

<div class="protocol">

${vpn.type}

</div>

<div class="active">

<span class="status-dot"></span>

Active

</div>

<div class="config">

${vpn.config}

</div>

<button
class="copy-btn"
onclick="copyConfig(\`${vpn.config}\`)">

📋 COPY CONFIG

</button>

</div>

`;

    });

}

function copyConfig(text){

    navigator.clipboard.writeText(text);

    alert("Copied!");

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

loadVPN();
