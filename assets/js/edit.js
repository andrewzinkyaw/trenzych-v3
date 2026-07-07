// Login Check
if (localStorage.getItem("admin") !== "1") {
    location.href = "index.html";
}

const id = new URLSearchParams(location.search).get("id");

async function loadKey() {

    const res = await fetch("/api/list");
    const data = await res.json();

    const key = data.find(k => k.id == id);

    if (!key) {
        alert("Key not found");
        location.href = "keys.html";
        return;
    }

    document.getElementById("title").value = key.title;
    document.getElementById("country").value = key.country;
    document.getElementById("type").value = key.type;
    document.getElementById("premium").value = key.is_premium;
    document.getElementById("config").value = key.config;

}

async function save() {

    const res = await fetch("/api/edit", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            id,

            title: document.getElementById("title").value,

            country: document.getElementById("country").value,

            type: document.getElementById("type").value,

            is_premium: document.getElementById("premium").value,

            config: document.getElementById("config").value

        })

    });

    const data = await res.json();

    alert(data.message);

    if (data.success) {
        location.href = "keys.html";
    }

}

loadKey();
