const form = document.getElementById("loginForm");

const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    msg.textContent = "";

    const data = {

        username: document.getElementById("username").value.trim(),

        password: document.getElementById("password").value

    };

    try {

        const res = await fetch("/api/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(data)

        });

        const result = await res.json();

        if (result.success) {

            localStorage.setItem("admin_token", result.token);

            location.href = "/admin.html";

        } else {

            msg.textContent = result.message;

        }

    } catch (err) {

        msg.textContent = "Unable to connect to server.";

    }

});
