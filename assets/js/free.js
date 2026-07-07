const vpnData = [
{
    country: "Singapore",
    name: "🇸🇬 Singapore #1",
    protocol: "VLESS",
    ping: "18 ms",
    network: "WS + TLS",
    speed: "1 Gbps",
    config: "vless://YOUR_CONFIG_1"
},
    {
    country:"USA",
    name:"🇺🇸 USA #1",
    protocol:"VLESS",
    ping:"145 ms",
    network:"WS + TLS",
    speed:"1 Gbps",
    config:"vless://USA"
},

{
    country:"Japan",
    name:"🇯🇵 Japan #1",
    protocol:"VLESS",
    ping:"32 ms",
    network:"WS + TLS",
    speed:"1 Gbps",
    config:"vless://JP"
},

{
    country:"Singapore",
    name:"🇸🇬 Singapore #2",
    protocol:"VLESS",
    ping:"20 ms",
    network:"WS + TLS",
    speed:"1 Gbps",
    config:"vless://SG2"
},
{
    country: "Japan",
    name: "🇯🇵 Japan #1",
    protocol: "VLESS",
    ping: "24 ms",
    network: "WS + TLS",
    speed: "1 Gbps",
    config: "vless://YOUR_CONFIG_2"
}
];

const vpnList = document.getElementById("vpnList");

function loadVPN(list){

    vpnList.innerHTML = "";

    list.forEach(vpn=>{

        vpnList.innerHTML += `
        <div class="server-card">

            <div class="server-top">
                <div class="server-name">${vpn.name}</div>
                <span class="online">ONLINE</span>
            </div>

            <div class="server-info">

                <div class="info-box">
                    <div class="info-title">Protocol</div>
                    <div class="info-value">${vpn.protocol}</div>
                </div>

                <div class="info-box">
                    <div class="info-title">Ping</div>
                    <div class="info-value">${vpn.ping}</div>
                </div>

                <div class="info-box">
                    <div class="info-title">Network</div>
                    <div class="info-value">${vpn.network}</div>
                </div>

                <div class="info-box">
                    <div class="info-title">Speed</div>
                    <div class="info-value">${vpn.speed}</div>
                </div>

            </div>

            <button class="copy-btn" onclick="copyConfig('${vpn.config}')">
                📋 Copy Config
            </button>

        </div>
        `;
    });

}

function copyConfig(config){

    navigator.clipboard.writeText(config);

    alert("VPN Config Copied!");

}

loadVPN(vpnData);
const search = document.getElementById("search");
const country = document.getElementById("country");

function filterVPN(){

    const keyword = search.value.toLowerCase();
    const selected = country.value;

    const result = vpnData.filter(vpn=>{

        const matchName =
            vpn.name.toLowerCase().includes(keyword);

        const matchCountry =
            selected==="all" || vpn.country===selected;

        return matchName && matchCountry;

    });

    loadVPN(result);

}

search.addEventListener("input", filterVPN);

country.addEventListener("change", filterVPN);
