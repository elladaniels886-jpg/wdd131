// Get the current year

const currentYear = new Date().getFullYear();


// Insert the current year into the footer

document.getElementById("currentyear").textContent = currentYear;


// Display when the document was last modified

document.getElementById("lastModified").textContent =
    `Last Modified: ${document.lastModified}`;