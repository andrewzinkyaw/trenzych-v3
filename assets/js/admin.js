const form = document.getElementById("vpnForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        title: document.getElementById("title").value,
        country: document.getElementById("country").value,
        type: document.getElementById("type").value,
        config: document.getElementById("config").value,
        is_premium: Number(document.getElementById("premium").value)
    };

    const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    alert(result.message);

    if(result.success){
        form.reset();
        location.reload();
    }

});
