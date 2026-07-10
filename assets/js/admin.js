const form = document.getElementById("vpnForm");

const vpnTable = document.getElementById("vpnTable");

let editingId = null;

let vpnData = [];

async function loadVPN(){

    try{

        const res = await fetch("/api/list");

        vpnData = await res.json();

        renderVPN();

    }catch(err){

        alert(err.message);

    }

}

function renderVPN(){

    vpnTable.innerHTML = "";

    if(vpnData.length===0){

        vpnTable.innerHTML=`

        <div class="vpn-card">

        <h3>No VPN Keys</h3>

        </div>

        `;

        return;

    }

    vpnData.forEach(vpn=>{

        vpnTable.innerHTML+=`

<div class="vpn-card">

<div class="card-top">

<h3>${vpn.title}</h3>

<span class="badge ${vpn.is_premium ? "premium":"free"}">

${vpn.is_premium ? "💎 Premium":"🟢 Free"}

</span>

</div>

<p>

🌍 ${vpn.country}

</p>

<p>

📡 ${vpn.type}

</p>

<div class="config-preview">

${vpn.config}

</div>

<div class="admin-buttons">

<button
class="edit-btn"
onclick="editVPN(${vpn.id})">

✏ Edit

</button>

<button
class="delete-btn"
onclick="deleteVPN(${vpn.id})">

🗑 Delete

</button>

</div>

</div>

`;

    });
document.getElementById("totalKeys").textContent =
    vpnData.length;

document.getElementById("freeKeys").textContent =
    vpnData.filter(v => !v.is_premium).length;

document.getElementById("premiumKeys").textContent =
    vpnData.filter(v => v.is_premium).length;
}
form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const data={

        id:editingId,

        title:document.getElementById("title").value,

        country:document.getElementById("country").value,

        type:document.getElementById("type").value,

        config:document.getElementById("config").value,

        is_premium:Number(document.getElementById("premium").value)

    };

    const api = editingId

        ? "/api/edit"

        : "/api/upload";

    try{

        const res = await fetch(api,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(data)

        });

        const result = await res.json();

        alert(result.message);

        if(result.success){

            form.reset();

            editingId = null;

            loadVPN();

        }

    }catch(err){

        alert(err.message);

    }

});

function editVPN(id){

    const vpn = vpnData.find(v=>v.id===id);

    if(!vpn) return;

    editingId = vpn.id;

    document.getElementById("title").value = vpn.title;

    document.getElementById("country").value = vpn.country;

    document.getElementById("type").value = vpn.type;

    document.getElementById("config").value = vpn.config;

    document.getElementById("premium").value = vpn.is_premium;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

async function deleteVPN(id){

    if(!confirm("Delete this VPN?")) return;

    try{

        const res = await fetch("/api/delete",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                id:id

            })

        });

        const result = await res.json();

        alert(result.message);

        if(result.success){

            loadVPN();

        }

    }catch(err){

        alert(err.message);

    }

}

window.editVPN = editVPN;

window.deleteVPN = deleteVPN;

loadVPN();

setInterval(loadVPN,30000);
const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.onclick = () => {

        if(confirm("Logout now?")){

            localStorage.removeItem("admin_token");

            location.href="/login.html";

        }

    };

}

// ===== Mobile Sidebar =====

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");

if(menuToggle && sidebar){

    menuToggle.onclick = () => {

        sidebar.classList.toggle("show");

    };

}
console.log("Menu JS Loaded");
alert("admin.js loaded");
