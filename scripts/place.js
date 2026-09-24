
const temperature = 29;
const windSpeed = 10;


function calculateWindChill(temperature, windSpeed) {
    return 13.12 + (0.6215 * temperature) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * temperature * Math.pow(windSpeed, 0.16));
}

if (temperature <= 10 && windSpeed > 4.8) {
    document.querySelector("#wind-chill").textContent =
        `${calculateWindChill(temperature, windSpeed).toFixed(1)} °C`;
} else {
    document.querySelector("#wind-chill").textContent = "N/A";
}



const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;


document.querySelector("#lastModified").textContent = document.lastModified;