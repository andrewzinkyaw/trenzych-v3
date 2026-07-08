const sections = {
    Android: document.getElementById("androidApps"),
    iPhone: document.getElementById("iosApps"),
    Windows: document.getElementById("windowsApps"),
    Linux: document.getElementById("linuxApps")
};

function renderApps(keyword = ""){

    Object.values(sections).forEach(section => section.innerHTML = "");

    ["Android","iPhone","Windows","Linux"].forEach(platform =>{

        const list = apps.filter(app =>
            app.platform === platform &&
            app.name.toLowerCase().includes(keyword.toLowerCase())
        );

        if(list.length === 0) return;

        sections[platform].innerHTML += `
            <h2 class="platform-title">
                ${platform}
            </h2>
        `;

        list.forEach(app=>{

            sections[platform].innerHTML += `
                <div class="app-card">

                    <span class="platform">${app.platform}</span>

                    <h2>${app.name}</h2>

                    <p>${app.description}</p>

                    <button
                        class="download-btn"
                        onclick="window.open('${app.url}','_blank')">

                        ⬇ Download

                    </button>

                </div>
            `;

        });

    });

}

renderApps();

search.addEventListener("input",e=>{

    renderApps(e.target.value);

});
