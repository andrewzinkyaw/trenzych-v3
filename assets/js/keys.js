// Login Check
if (localStorage.getItem("admin") !== "1") {
    location.href = "index.html";
}

const list = document.getElementById("list");
const search = document.getElementById("search");
const filter = document.getElementById("filter");

let keys = [];

async function loadKeys() {

    const res = await fetch("/api/keys");
    const data = await res.json();

    keys = data.keys || [];

    render();
}

function render() {

    list.innerHTML = "";

    const keyword = search.value.toLowerCase();

    const plan = filter.value;

    const result = keys.filter(k => {

        const ok1 =
            k.title.toLowerCase().includes(keyword) ||
            k.country.toLowerCase().includes(keyword);

        const ok2 =
            plan === "" || k.type === plan;

        return ok1 && ok2;

    });

    if (result.length === 0) {
        list.innerHTML = "<p>No Keys Found</p>";
        return;
    }

    result.forEach(k => {

        list.innerHTML += `
        <div class="card">

            <div class="title">${k.title}</div>

            <div class="country">${k.country}</div>

            <div class="plan">${k.type}</div>

            <textarea readonly>${k.config}</textarea>

            <div class="buttons">

                <button class="copy"
                onclick="copyConfig(\`${k.config}\`)">
                Copy
                </button>

                <button class="delete"
                onclick="deleteKey(${k.id})">
                Delete
                </button>

            </div>

        </div>
        `;

    });

}

function copyConfig(text) {

    navigator.clipboard.writeText(text);

    alert("Copied!");

}

async function deleteKey(id) {

    if (!confirm("Delete this key?")) return;

    const res = await fetch("/api/delete", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id
        })

    });

    const data = await res.json();

    alert(data.message);

    loadKeys();

}

search.oninput = render;

filter.onchange = render;

loadKeys();
