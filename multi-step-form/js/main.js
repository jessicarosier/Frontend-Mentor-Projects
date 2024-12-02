const form = document.getElementById("multi-step-form");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const confirmBtn = document.querySelector(".confirm");
const steps = form.querySelectorAll(".step");
const numberCircles = document.querySelectorAll(".number-circle");
let currentStep = 0;


(async () => {
    console.log(numberCircles);
    listenForNextBtn();
    listenForPrevBtn();
    listenForConfirmBtn();
})();

function collectFormData() {
    /***
     @description This function collects the form data and returns an object containing the form data.
     ***/
    const form = document.getElementById("multi-step-form");
    const steps = form.querySelectorAll(".step");
    const inputs = form.querySelectorAll("input");
    let formData = new FormData(form);
    console.log(form)


    console.log(formData);
    return formData;

}


function setNumberCircleActiveState(currentStep) {
    numberCircles.forEach((circle, index) => {
        if (circle.getAttribute("data-num") === currentStep.toString() && !circle.classList.contains("active")) {
            circle.classList.add("active");
        } else {
            circle.classList.remove("active");
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
        console.log(currentStep);
        setNumberCircleActiveState(currentStep);
        /* If current step is greater than 0, show the previous button, otherwise hide it */
        if (currentStep >= 1) {
            prevBtn.classList.remove("d-none");
        }
        if (currentStep === 3) {
            nextBtn.classList.add("d-none");
            confirmBtn.classList.remove("d-none");
        } else {
            prevBtn.classList.add("d-none");
        }
    });
};

function listenForPrevBtn() {
    prevBtn.addEventListener("click", e => {
        e.preventDefault();
        steps[currentStep].classList.add("d-none");
        steps[currentStep - 1].classList.remove("d-none");
        currentStep--;
        setNumberCircleActiveState(currentStep);
        /* If current step is greater than 0, show the previous button, otherwise hide it */
        if (currentStep >= 1) {
            prevBtn.classList.remove("d-none");
        } else {
            prevBtn.classList.add("d-none");
        }
    });
}

function listenForConfirmBtn() {
    confirmBtn.addEventListener("click", e => {
        e.preventDefault();
        collectFormData();
    });
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