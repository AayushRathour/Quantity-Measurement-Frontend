const types = document.querySelectorAll(".type");
const unit1 = document.getElementById("unit1");
const unit2 = document.getElementById("unit2");
const resultUnit = document.getElementById("resultUnit");

const operatorSection = document.getElementById("operatorSection");
const selectedOp = document.getElementById("selectedOp");

const arithBtn = document.getElementById("arithBtn");
const compBtn = document.getElementById("comparisonBtn");
const convBtn = document.getElementById("conversionBtn");
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.onclick = () => {
    localStorage.removeItem("token");
    window.location.href = "auth.html";
};

// UNIT MAP
const units = {
    length: ["feet", "inch", "yard", "cm"],
    weight: ["gram", "milligram", "kilogram", "pound", "ton"],
    volume: ["liter", "milliliter", "gallon"],
    temperature: ["celsius", "fahrenheit"]
};

// DEFAULT
loadUnits("length");

// TYPE SWITCH
types.forEach(type => {
    type.onclick = () => {
        document.querySelector(".type.active").classList.remove("active");
        type.classList.add("active");

        loadUnits(type.dataset.type);
    };
});

// LOAD UNITS
function loadUnits(type) {
    unit1.innerHTML = "";
    unit2.innerHTML = "";
    resultUnit.innerHTML = "";

    units[type].forEach(u => {
        unit1.add(new Option(u, u));
        unit2.add(new Option(u, u));
        resultUnit.add(new Option(u, u));
    });
}

// OPERATOR SELECT
document.querySelectorAll(".operators button").forEach(btn => {
    btn.onclick = () => {
        selectedOp.innerText = btn.dataset.op;
    };
});

// ACTION SWITCH LOGIC
function setActive(btn) {
    document.querySelector(".actions .active").classList.remove("active");
    btn.classList.add("active");
}

// ARITHMETIC
arithBtn.onclick = () => {
    setActive(arithBtn);
    operatorSection.style.display = "block";
};

// COMPARISON
compBtn.onclick = () => {
    setActive(compBtn);
    operatorSection.style.display = "none";
};

// CONVERSION
convBtn.onclick = () => {
    setActive(convBtn);
    operatorSection.style.display = "none";
};