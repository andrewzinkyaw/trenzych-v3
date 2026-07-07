const btn = document.getElementById("loginBtn");

btn.onclick = async () => {
  const password = document.getElementById("password").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password: password
    })
  });

  const data = await res.json();
alert(JSON.stringify(data));
  
  if (data.success) {
    localStorage.setItem("admin", "true");
    location.href = "/ms-admin/dashboard.html";
  } else {
    document.getElementById("msg").innerText = data.message;
  }
};
