const form = document.getElementById("vpnForm");

const vpnTable = document.getElementById("vpnTable");

let editingId = null;

let vpnData = [];

async function loadVPN() {

    const res = await fetch("/api/list");

    vpnData = await res.json();

    render();

}

function render() {

    vpnTable.innerHTML = "";

    vpnData.forEach(vpn => {

        vpnTable.innerHTML += `

<div class="vpn-card">

<h3>${vpn.title}</h3>

<p><b>Country :</b> ${vpn.country}</p>

<p><b>Protocol :</b> ${vpn.type}</p>

<p>

<b>Status :</b>

${vpn.is_premium ? "💎 Premium" : "🟢 Free"}

</p>

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

    const api =

    editingId

    ?

    "/api/edit"

    :

    "/api/upload";

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

        editingId=null;

        loadVPN();

    }

});
