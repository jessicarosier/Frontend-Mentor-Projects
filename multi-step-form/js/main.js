const form = document.getElementById("multi-step-form");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const confirmBtn = document.querySelector(".confirm");
const steps = form.querySelectorAll(".step");
const numberCircles = document.querySelectorAll(".number-circle");
let currentStep = 0;
const planCosts = {
    monthly: {
        arcade: 9,
        advanced: 12,
        pro: 15
    },
    yearly: {
        arcade: 50,
        advanced: 120,
        pro: 150
    }
};

const addOnCosts = {
    monthly: {
        onlineService: 1,
        largerStorage: 2,
        customizableProfile: 2
    },
    yearly: {
        onlineService: 10,
        largerStorage: 20,
        customizableProfile: 20
    }
};

const nameRegex = /^[a-zA-Z]+$/;
const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
const phoneRegex = /^[0-9]{10}$/;




class MultiStepForm {
    constructor() {
        this.form = document.getElementById("multi-step-form");
        this.name = this.form.querySelector("#name").value;
        this.email = this.form.querySelector("#email").value;
        this.phone = this.form.querySelector("#phone-number").value;
        this.plan = this.form.querySelector("#selected-plan").value;
        this.switch = getSwitchValue();
        this.addOns = getAddOns();
    }

}

function getSwitchValue() {
    const switchInput = document.getElementById("monthly-yearly-switch");
    const switchInputValue = switchInput.value;
    if (switchInput.checked) {
        return "Yearly";
    } else {
        return "Monthly";
    }
}

function listenForSwitchChange() {
    const switchInput = document.getElementById("monthly-yearly-switch");

    switchInput.addEventListener("change", (e) => {
        e.preventDefault();
        updatePlanSelectionUI(e);
        updateAddOnSelectionUI(e);
    });
}

function updatePlanSelectionUI(event) {
    let planArray = ["arcade", "advanced", "pro"];
    planArray.forEach(plan => {
        if (event.target.checked) {
            document.getElementById(`${plan}-cost`).innerText = `$${planCosts.yearly[plan]}/yr`;
        } else {
            document.getElementById(`${plan}-cost`).innerText = `$${planCosts.monthly[plan]}/mo`;
        }
    });
}

function updateAddOnSelectionUI(event) {
    let addOnArr = ["onlineService", "largerStorage", "customizableProfile"];
    addOnArr.forEach(addOn => {
        if (event.target.checked) {
            document.getElementById(`${addOn}-cost`).innerText = `+$${addOnCosts.yearly[addOn]}/yr`;
        } else {
            document.getElementById(`${addOn}-cost`).innerText = `+$${addOnCosts.monthly[addOn]}/mo`;
        }
    });
}

function collectFormData() {
    /***
     @description This function collects the form data and returns an object containing the form data.
     ***/
    let formData = new MultiStepForm();
    let totalCostObj = getTotalCost(formData);
    console.log(totalCostObj);
    updateStep5Html(totalCostObj);
    return formData;
}

function updateStep5Html(totalCost) {
    const planTypeDiv = document.querySelector(".plan-type-div");
    planTypeDiv.innerHTML = `
    <div>${totalCost.plan} (${totalCost.switch})</div>
    <a class="change-btn" href="#">Change</a>
`;


    const planTypeCost = document.querySelector(".plan-type-cost");
    planTypeCost.innerText = `$${totalCost.planCost}/${totalCost.switch === "Yearly" ? "year" : "mo"}`;

    const addOnsDiv = document.querySelector(".add-ons-div");
    addOnsDiv.innerHTML = "";
    totalCost.addOns.onlineService ? addOnsDiv.innerHTML += `
      <div class="d-flex justify-content-between mb-5">
        <p>Online service</p>
        <p>+$1/mo</p>
        </div>` : null;
    totalCost.addOns.largerStorage ? addOnsDiv.innerHTML += `
      <div class="d-flex justify-content-between mb-5">
        <p>Larger storage</p>
        <p>+$2/mo</p>
      </div>` : null;
    totalCost.addOns.customizableProfile ? addOnsDiv.innerHTML += `<div class="d-flex justify-content-between mb-5">
        <p>Customizable Profile</p>
        <p>+$2/mo</p>
      </div>` : null;

    const totalCostDiv = document.querySelector(".total-cost-div");
    totalCostDiv.innerHTML = `
        <div class="total-cost">Total${totalCost.switch === "Yearly" ? "(per year)" : "(per month)"}</div>
        <div class="total-cost">+$${totalCost.planCost + (totalCost.addOns.onlineService || 0) + (totalCost.addOns.largerStorage || 0) + (totalCost.addOns.customizableProfile || 0)}/${totalCost.switch === "Yearly" ? "yr" : "mo"}</div>
    </
   
    `;


}

function getTotalCost(formData) {

    let costObj = {
        plan: formData.plan,
        planCost: formData.switch === "Yearly" ? planCosts.yearly[formData.plan.toLowerCase()] : planCosts.monthly[formData.plan.toLowerCase()],
        switch: formData.switch,
        addOns: {
            onlineService: formData.addOns.includes("online-service"),
            largerStorage: formData.addOns.includes("larger-storage"),
            customizableProfile: formData.addOns.includes("customizable-profile"),
        }
    };
    return costObj;
}


function setNumberCircleActiveState(currentStep) {
    numberCircles.forEach((circle, index) => {
        if (circle.getAttribute("data-num") === currentStep.toString() && !circle.classList.contains("active")) {
            circle.classList.add("active");
        } else {
            circle.classList.remove("active");
        }
        if (currentStep === 4) {
            circle.classList.add("active");
        }
    });

}

function listenForNextBtn() {
    nextBtn.addEventListener("click", e => {
        e.preventDefault();
        if (!validateSteps(currentStep)) {
            return;
        }
        steps[currentStep].classList.add("d-none");
        steps[currentStep + 1].classList.remove("d-none");
        currentStep++;
        setNumberCircleActiveState(currentStep);
        toggleBtnVisibility(currentStep);
    });
};

function toggleBtnVisibility(currentStep) {
    console.log(currentStep);
    switch (currentStep) {
        case 0:
            prevBtn.classList.add("d-none");
            nextBtn.classList.remove("d-none");
            break;
        case 1:
            prevBtn.classList.remove("d-none");
            nextBtn.classList.remove("d-none");
            confirmBtn.classList.add("d-none");
            break;
        case 2:
            prevBtn.classList.remove("d-none");
            nextBtn.classList.remove("d-none");
            confirmBtn.classList.add("d-none");
            break;
        case 3:
            nextBtn.classList.add("d-none");
            confirmBtn.classList.remove("d-none");
            collectFormData();
            break;
        case 4:
            nextBtn.classList.add("d-none");
            prevBtn.classList.add("d-none");
            confirmBtn.classList.add("d-none");
            break;
        default:
            break;
    }
}

function listenForPrevBtn() {
    prevBtn.addEventListener("click", e => {
        e.preventDefault();
        steps[currentStep].classList.add("d-none");
        steps[currentStep - 1].classList.remove("d-none");
        currentStep--;
        setNumberCircleActiveState(currentStep);
        toggleBtnVisibility(currentStep);
    });
}

function listenForConfirmBtn() {
    confirmBtn.addEventListener("click", e => {
        e.preventDefault();
        steps[currentStep].classList.add("d-none");
        steps[currentStep + 1].classList.remove("d-none");
        currentStep++;
        setNumberCircleActiveState(currentStep);
        toggleBtnVisibility(currentStep);
    });
}

function listenForPlanSelection() {
    const planCards = document.querySelectorAll(".plan-card");
    const selectedPlan = document.getElementById("selected-plan");
    planCards.forEach(card => {
        card.addEventListener("click", e => {
            e.preventDefault();
            planCards.forEach(card => {
                card.classList.remove("selected");
            });
            card.classList.add("selected");

            if (card.classList.contains("selected")) {
                console.log(card.getAttribute("data-plan"));
                selectedPlan.value = card.getAttribute("data-plan");
            }
        });
    });
}

function listenForAddOnSelection() {
    const addOns = document.querySelectorAll(".add-on-card");
    addOns.forEach(addOn => {
        addOn.addEventListener("click", e => {
            // allow multiple selections
            e.preventDefault();
            let addOnName = addOn.getAttribute("data-add-on");
            let input = document.getElementById(`${addOnName}-check`);
            addOn.classList.toggle("selected");
            input.checked = !input.checked;
        });
    });
}


function getAddOns() {
    const addOns = document.querySelectorAll(".add-on");
    let selectedAddOns = [];
    addOns.forEach(addOn => {
        if (addOn.checked) {
            selectedAddOns.push(addOn.value);
        }
    });
    return selectedAddOns;
}


function validateSteps(currentStep) {
    /***
     @param {number} currentStep - The current step of the form
     @description This function ensures the current section form inputs are valid.
      If any input is invalid, it adds the is-invalid class to the input field and returns false.
      Otherwise, it removes the is-invalid class from the input field and returns true.
     ***/
    const form = document.getElementById("multi-step-form");
    const steps = form.querySelectorAll(".step");
    const inputs = steps[currentStep].querySelectorAll("input");

    let isValid = true;

    inputs.forEach(input => {
        if (!input.value) {
            input.classList.add("is-invalid");
            isValid = false;
        } else {
            input.classList.remove("is-invalid");
        }
    });
    return isValid;
}


export {
    MultiStepForm,
    getSwitchValue,
    collectFormData,
    setNumberCircleActiveState,
    listenForNextBtn,
    toggleBtnVisibility,
    listenForPrevBtn,
    listenForConfirmBtn,
    listenForPlanSelection,
    listenForAddOnSelection,
    getAddOns,
    validateSteps,
    listenForSwitchChange,
};