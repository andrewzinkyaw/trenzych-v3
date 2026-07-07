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
