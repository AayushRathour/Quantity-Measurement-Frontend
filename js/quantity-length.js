document.addEventListener("DOMContentLoaded", () => {

    const BASE_URL = "http://localhost:8080/api/v1/quantities";

    const unitMap = {
        feet: "FEET",
        inch: "INCHES",
        yard: "YARDS",
        cm: "CENTIMETERS"
    };

    const weightUnitMap = {
        milligram: "MILLIGRAM",
        gram: "GRAM",
        kilogram: "KILOGRAM",
        pound: "POUND",
        ton: "TONNE"
    };

    const volumeUnitMap = {
        liter: "LITRE",
        milliliter: "MILLILITER",
        gallon: "GALLON"
    };

    const temperatureUnitMap = {
        celsius: "CELSIUS",
        fahrenheit: "FAHRENHEIT"
    };

    const val1 = document.querySelectorAll(".values input")[0];
    const val2 = document.querySelectorAll(".values input")[1];

    const unit1 = document.getElementById("unit1");
    const unit2 = document.getElementById("unit2");
    const resultUnit = document.getElementById("resultUnit");

    const resultValue = document.getElementById("resultValue");

    const selectedOp = document.getElementById("selectedOp");
    const operatorSection = document.getElementById("operatorSection");

    const arithBtn = document.getElementById("arithBtn");
    const compBtn = document.getElementById("comparisonBtn");
    const convBtn = document.getElementById("conversionBtn");

    let currentAction = "arithmetic";

    function getCurrentType() {
        return document.querySelector(".type.active").dataset.type;
    }

    function getUnitMap() {
        const type = getCurrentType();

        if (type === "weight") return weightUnitMap;
        if (type === "volume") return volumeUnitMap;
        if (type === "temperature") return temperatureUnitMap;

        return unitMap; // length
    }

    function getMeasurementType() {
        const type = getCurrentType();

        if (type === "weight") return "WeightUnit";
        if (type === "volume") return "VolumeUnit";
        if (type === "temperature") return "TemperatureUnit";

        return "LengthUnit";
    }

    function setActive(btn) {
        document.querySelector(".actions .active")?.classList.remove("active");
        btn.classList.add("active");
    }

    arithBtn.onclick = () => {
        setActive(arithBtn);
        operatorSection.style.display = "block";
        currentAction = "arithmetic";
        executeOperation();
    };

    compBtn.onclick = () => {
        setActive(compBtn);
        operatorSection.style.display = "none";
        currentAction = "comparison";
        executeOperation();
    };

    convBtn.onclick = () => {
        setActive(convBtn);
        operatorSection.style.display = "none";
        currentAction = "conversion";
        executeOperation();
    };

    // OPERATOR
    document.querySelectorAll(".operators button").forEach(btn => {
        btn.onclick = () => {
            selectedOp.innerText = btn.dataset.op;
            executeOperation();
        };
    });

    // BUILD PAYLOAD 
    function buildPayload(v1, u1, v2, u2, targetUnit = null) {
        const currentMap = getUnitMap();
        const measurementType = getMeasurementType();

        return {
            thisQuantityDTO: {
                value: parseFloat(v1),
                unit: currentMap[u1],
                measurementType: measurementType
            },
            thatQuantityDTO: {
                value: parseFloat(v2),
                unit: currentMap[u2],
                measurementType: measurementType
            },
            targetQuantityDTO: targetUnit ? {
                value: 0,
                unit: currentMap[targetUnit],
                measurementType: measurementType
            }
            : null
        };
    }

    async function callAPI(endpoint, payload) {
        try {
            const res = await fetch(`${BASE_URL}/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) throw new Error("data.errorMessage" || "Error");

            return data;

        } 
        catch (err) {
            alert(err.message);
        }
    }


    async function executeOperation() {

        const v1 = val1.value;
        const v2 = val2.value;

        if (!v1 || !v2) return;

        const u1 = unit1.value;
        const u2 = unit2.value;
        const target = resultUnit.value;

        let endpoint = "";
        let payload;

        if (currentAction === "arithmetic") {
            const op = selectedOp.innerText;

            if (op === "+") endpoint = "add-with-target-unit";
            else if (op === "-") endpoint = "subtract-with-target-unit";
            else if (op === "*") endpoint = "add";
            else if (op === "/") {
                endpoint = "divide";
                payload = buildPayload(v1, u1, v2, u2);
            }

            if (!payload) {
                payload = buildPayload(v1, u1, v2, u2, target || u1);
            }
        }

        else if (currentAction === "comparison") {
            endpoint = "compare";
            payload = buildPayload(v1, u1, v2, u2);
        }

        else if (currentAction === "conversion") {
            endpoint = "convert";
            payload = buildPayload(v1, u1, v2, u2, target);
        }

        const res = await callAPI(endpoint, payload);

        if (res) {

            if (currentAction === "comparison") {
                resultValue.innerText = res.resultString === "true"
                    ? "Equal"
                    : "Not Equal";

                resultUnit.value = "";
            }

            else {
                resultValue.innerText = res.resultValue;

                if (res.resultUnit) {
                    resultUnit.value = res.resultUnit.toLowerCase();
                }
            }
        }
    }

    val1.addEventListener("input", executeOperation);
    val2.addEventListener("input", executeOperation);

    unit1.addEventListener("change", executeOperation);
    unit2.addEventListener("change", executeOperation);

    resultUnit.addEventListener("change", executeOperation);

});