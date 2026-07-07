// Login Check
if (localStorage.getItem("admin") !== "1") {
    location.href = "index.html";
}

// Get ID
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
    document.getElementById("config").value = key.config;
    document.getElementById("plan").value = key.is_premium;
}

async function saveKey() {

    const title = document.getElementById("title").value.trim();
    const country = document.getElementById("country").value.trim();
    const type = document.getElementById("type").value;
    const config = document.getElementById("config").value.trim();
    const is_premium = Number(document.getElementById("plan").value);

    const res = await fetch("/api/edit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            title,
            country,
            type,
            config,
            is_premium
        })
    });

    const data = await res.json();

    alert(data.message);

    if (data.success) {
        location.href = "keys.html";
    }
}

loadKey();
