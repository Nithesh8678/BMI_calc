function calculateBMI() {
    const weight = parseFloat(document.getElementById("weight").value);
    const weightUnit = getSelectedUnit("weight");
    const height = parseFloat(document.getElementById("height").value);
    const heightUnit = getSelectedUnit("height");
    const resultElement = document.getElementById("result");
    const bmiValueElement = document.getElementById("bmiValue");
    const visualBMI = document.getElementById("visualBMI");

    if (!isNaN(weight) && !isNaN(height)) {
        
        if (weightUnit === "lbs") {
            weight *= 0.453592; 
        }
        if (heightUnit === "in") {
            height *= 2.54; 
        }

        const bmi = weight / ((height / 100) ** 2);

        bmiValueElement.textContent = bmi.toFixed(2);

        // Visual representation (color-coded scale)
        const healthBar = document.getElementById("healthBar");
        healthBar.style.width = bmi + "%";

        resultElement.style.display = "block";
    } else {
        resultElement.style.display = none;
        alert("Please enter valid weight and height values.");
    }
}

function resetFields() {
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";
    document.getElementById("result").style.display = "none";

    // Clear unit selection buttons
    clearUnitSelection("weight");
    clearUnitSelection("height");
}

function getSelectedUnit(inputId) {
    const buttons = document.querySelectorAll(`button[data-unit="${inputId}"]`);
    for (const button of buttons) {
        if (button.classList.contains("selected-unit")) {
            return button.getAttribute("data-unit-value");
        }
    }
}

function selectUnit(inputId, unit) {
    clearUnitSelection(inputId); // Clear previous selection
    const buttons = document.querySelectorAll(`button[data-unit="${inputId}"]`);
    for (const button of buttons) {
        if (button.getAttribute("data-unit-value") === unit) {
            button.classList.add("selected-unit");
        }
    }
}

function clearUnitSelection(inputId) {
    const buttons = document.querySelectorAll(`button[data-unit="${inputId}"]`);
    for (const button of buttons) {
        button.classList.remove("selected-unit");
    }
}

// Add event listeners for unit selection buttons
document.getElementById("kgButton").addEventListener("click", function () {
    selectUnit("weight", "kg");
});

document.getElementById("lbsButton").addEventListener("click", function () {
    selectUnit("weight", "lbs");
});

document.getElementById("cmButton").addEventListener("click", function () {
    selectUnit("height", "cm");
});

document.getElementById("inButton").addEventListener("click", function () {
    selectUnit("height", "in");
});
