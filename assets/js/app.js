alert("APP JS LOADED");

const btn = document.getElementById("loginBtn");

btn.onclick = async () => {

  const password = document.getElementById("password").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      password: password
    })
  });

  const data = await res.json();

  if(data.success){

    localStorage.setItem("admin","1");

    location.href="/ms-admin/dashboard.html";

  }else{

    document.getElementById("msg").innerText=data.message;

  }

};
