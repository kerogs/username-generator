console.log("main.ts -> OK");
const versionShowJS = document.querySelectorAll(".versionShowJS");
const version = "v1.2";
versionShowJS.forEach(e => {
    e.innerHTML = version;
});
