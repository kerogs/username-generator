console.log("main.ts -> OK");

const versionShowJS = document.querySelectorAll(".versionShowJS");
const version = "v1.4"

versionShowJS.forEach(e => {
    e.innerHTML = version;
});




// theme
document.addEventListener("DOMContentLoaded", () => {
    const themeSelect = document.querySelector<HTMLSelectElement>(".themes select");

    if (themeSelect) {
        const savedTheme = localStorage.getItem("selectedTheme") || "classic-dark";
        themeSelect.value = savedTheme;
        applyTheme(savedTheme);

        themeSelect.addEventListener("change", () => {
            const selectedTheme = themeSelect.value;
            localStorage.setItem("selectedTheme", selectedTheme);
            applyTheme(selectedTheme);
        });
    }
});

function applyTheme(theme: string) {
    const cssFilePath = theme === "classic-dark" 
        ? "./src/css/style.css" 
        : `./src/css/${theme}.style.css`;

    loadCSS(cssFilePath, theme);
}

function loadCSS(href: string, themeId: string) {
    // Retire le lien CSS précédent si existant
    const existingLink = document.querySelector(`link[data-theme-id]`);
    if (existingLink) existingLink.remove();

    // Crée un nouvel élément link avec un data-theme-id spécifique
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${href}?v=${new Date().getTime()}`;  // Ajoute un timestamp pour forcer le rechargement
    link.setAttribute("data-theme-id", themeId);
    document.head.appendChild(link);
}
