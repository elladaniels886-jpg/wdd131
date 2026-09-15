

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("show");

    if (navigation.classList.contains("show")) {
        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-label", "Close navigation menu");
    } else {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }

});




const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;




document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;