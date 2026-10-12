
const techniques = [
    {
        id: "keyframes",
        name: "Keyframes",
        category: "Motion",
        difficulty: "Intermediate",
        description: "Control the movement, position, and scale of clips or text over time.",
        tip: "Use keyframes for smooth zooms, pans, and controlled movement."
    },
    {
        id: "transitions",
        name: "Transitions",
        category: "Motion",
        difficulty: "Beginner",
        description: "Create smoother changes between clips without distracting from the content.",
        tip: "Start with simple cuts and fades before trying dramatic transitions."
    },
    {
        id: "text-animation",
        name: "Text Animation",
        category: "Text",
        difficulty: "Beginner",
        description: "Animate text to highlight important information and add visual interest.",
        tip: "Keep animations short and make sure your text stays easy to read."
    },
    {
        id: "speed-ramping",
        name: "Speed Ramping",
        category: "Motion",
        difficulty: "Intermediate",
        description: "Change a clip's speed at different moments to create emphasis and energy.",
        tip: "Use speed changes to support the action or music instead of applying them randomly."
    },
    {
        id: "audio-sync",
        name: "Audio Sync",
        category: "Audio",
        difficulty: "Beginner",
        description: "Align cuts and visual changes with important moments in a soundtrack.",
        tip: "Listen for strong beats and use them as natural points for your cuts."
    },
    {
        id: "color-adjustment",
        name: "Color Adjustment",
        category: "Color",
        difficulty: "Beginner",
        description: "Adjust brightness, contrast, and saturation to create a consistent look.",
        tip: "Make small adjustments and aim for a consistent appearance across clips."
    }
];

const techniqueList = document.querySelector("#technique-list");
const filterButtons = document.querySelectorAll(".filter-button");
const savedCount = document.querySelector("#saved-count");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

let currentFilter = "all";
let savedTechniques = JSON.parse(localStorage.getItem("savedTechniques")) || [];

function displayTechniques(selectedTechniques) {
    if (!techniqueList) {
        return;
    }

    if (selectedTechniques.length === 0) {
        techniqueList.innerHTML = `
            <p class="empty-message">No techniques match this filter. Try another one.</p>
        `;
        return;
    }

    techniqueList.innerHTML = selectedTechniques.map((technique) => {
        const isSaved = savedTechniques.includes(technique.id);

        return `
            <article class="technique-card">
                <div class="technique-card-header">
                    <span class="technique-category">${technique.category}</span>
                    <span class="difficulty">${technique.difficulty}</span>
                </div>
                <div>
                    <h2>${technique.name}</h2>
                    <p>${technique.description}</p>
                </div>
                <p class="technique-tip"><strong>Quick tip:</strong> ${technique.tip}</p>
                <button
                    class="save-button ${isSaved ? "saved" : ""}"
                    data-technique-id="${technique.id}"
                    aria-pressed="${isSaved}"
                >
                    ${isSaved ? "✓ Saved" : "＋ Save technique"}
                </button>
            </article>
        `;
    }).join("");

    const saveButtons = techniqueList.querySelectorAll(".save-button");

    saveButtons.forEach((button) => {
        button.addEventListener("click", () => {
            toggleSavedTechnique(button.dataset.techniqueId);
        });
    });
}

function filterTechniques() {
    let filteredTechniques;

    if (currentFilter === "all") {
        filteredTechniques = techniques;
    } else if (currentFilter === "beginner") {
        filteredTechniques = techniques.filter((technique) => {
            return technique.difficulty === "Beginner";
        });
    } else {
        filteredTechniques = techniques.filter((technique) => {
            return technique.category.toLowerCase() === currentFilter;
        });
    }

    displayTechniques(filteredTechniques);
}

function updateSavedCount() {
    if (savedCount) {
        savedCount.textContent = savedTechniques.length;
    }

    localStorage.setItem("savedTechniques", JSON.stringify(savedTechniques));
}

function toggleSavedTechnique(techniqueId) {
    if (savedTechniques.includes(techniqueId)) {
        savedTechniques = savedTechniques.filter((id) => id !== techniqueId);
    } else {
        savedTechniques.push(techniqueId);
    }

    updateSavedCount();
    filterTechniques();
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        filterButtons.forEach((filterButton) => {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");
        filterTechniques();
    });
});

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isExpanded = menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute("aria-expanded", String(!isExpanded));
        navigation.classList.toggle("show");
    });
}

const yearElement = document.querySelector("#currentyear");
const modifiedElement = document.querySelector("#lastModified");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

if (modifiedElement) {
    modifiedElement.textContent = document.lastModified;
}

filterTechniques();
updateSavedCount();



/* ------------------------------
   TIPS & RESOURCES FORM
------------------------------ */

const learningForm = document.querySelector("#learning-form");
const learningResponse = document.querySelector("#learning-response");

const learningTips = [
    {
        topic: "motion",
        title: "Practice smooth movement",
        tip: "Start with a simple keyframe zoom. Add a beginning and ending position, then preview the movement and adjust it until it feels natural."
    },
    {
        topic: "text",
        title: "Make your text easy to read",
        tip: "Use a clear font, strong contrast, and short phrases. Preview your text on a phone screen to check its readability."
    },
    {
        topic: "audio",
        title: "Edit to the rhythm",
        tip: "Listen for strong beats in your soundtrack. Try placing a cut or visual change on a beat, then preview the sequence."
    },
    {
        topic: "color",
        title: "Build a consistent visual style",
        tip: "Start by adjusting brightness and contrast. Compare clips beside each other and make small changes to keep their appearance consistent."
    },
    {
        topic: "basics",
        title: "Master the editing basics",
        tip: "Import a few clips, arrange them in a clear order, trim unnecessary footage, and add music only after the sequence makes sense."
    }
];

function getLearningRecommendation(topic, experience) {
    const recommendation = learningTips.find((item) => {
        return item.topic === topic;
    });

    if (!recommendation) {
        return {
            title: "Start with the basics",
            tip: "Practice arranging, trimming, and reviewing clips before moving to advanced effects."
        };
    }

    let nextStep;

    if (experience === "new") {
        nextStep = "Begin with a short practice project and focus on one skill at a time.";
    } else if (experience === "beginner") {
        nextStep = "Apply this technique to a short video, then review the result and make one improvement.";
    } else {
        nextStep = "Challenge yourself by combining this technique with audio, timing, and a consistent visual style.";
    }

    return {
        title: recommendation.title,
        tip: recommendation.tip,
        nextStep: nextStep
    };
}

if (learningForm && learningResponse) {
    learningForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const topic = document.querySelector("#learning-topic").value;
        const experience = document.querySelector("#experience-level").value;

        if (!topic || !experience) {
            learningResponse.innerHTML = `
                <p>Please choose both a topic and your experience level.</p>
            `;
            return;
        }

        const recommendation = getLearningRecommendation(topic, experience);

        learningResponse.innerHTML = `
            <h3>${recommendation.title}</h3>
            <p>${recommendation.tip}</p>
            <p><strong>Your next step:</strong> ${recommendation.nextStep}</p>
        `;
    });
}