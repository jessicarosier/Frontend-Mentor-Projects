let day = document.querySelector("#day-input");
let month = document.querySelector("#month-input");
let year = document.querySelector("#year-input");
let currentYear;
let errorMessage = "";


let circleArrow = document.querySelector(".circle");


function calculateAge() {
    let date = new Date();
    currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    let currentDay = date.getDate();
    let ageYears = currentYear - year.value;
    let ageMonths = currentMonth - month.value;
    let ageDays = currentDay - day.value;

    if (ageMonths < 0 || (ageMonths == 0 && ageDays < 0)) {
        ageYears--;
        ageMonths += 12;
    }
    if (ageDays < 0) {
        ageDays += 30;
    }
    let years = document.querySelector("#years");
    let months = document.querySelector("#months");
    let days = document.querySelector("#days");


    years.innerText = ageYears;
    months.innerText = ageMonths;
    days.innerText = ageDays;
}

let error;
function generateErrorMessage(element, message) {
    if (element.parentElement.querySelector(".error")) {
        element.parentElement.querySelector(".error").remove();
    }

    if (element.classList.contains("invalid")) {
        element.classList.remove("invalid");
    }
    error = document.createElement("p");
    error.innerText = message;
    error.classList.add("error");
    element.parentElement.appendChild(error);
}

function validateInput() {
    let dayValid = false;
    let monthValid = false;
    let yearValid = false;
    let allInputsValid = false;

    if (parseInt(day.value) > 31 || parseInt(day.value) < 1) {
        dayValid = false;
        generateErrorMessage(day, "Must be a valid day");
    } else if (day.value.length === 0) {
        dayValid = false;
        generateErrorMessage(day, "This field is required");
    } else {
        dayValid = true;
        error.remove();
    }

    if (parseInt(month.value) > 12 || parseInt(month.value) < 1) {
        monthValid = false;
        generateErrorMessage(month, "Must be a valid month");
    } else if (month.value.length === 0) {
        monthValid = false;
        generateErrorMessage(month, "This field is required");
    } else {
        monthValid = true;
        error.remove();
    }
    if (parseInt(year.value) > currentYear || parseInt(year.value) < 1) {
        yearValid = false;
        generateErrorMessage(year, "Must be in the past");
    } else if (year.value.length === 0) {
        yearValid = false;
        generateErrorMessage(year, "This field is required");
    } else {
        yearValid = true;
        error.remove();
    }

    if (!dayValid) {
        day.classList.add("invalid")
    } else {
        day.classList.remove("invalid")
    }

    if (!monthValid) {
        month.classList.add("invalid")
    } else {
        month.classList.remove("invalid")
    }

    if (!yearValid) {
        year.classList.add("invalid")
    } else {
        year.classList.remove("invalid")
    }

    if (dayValid && monthValid && yearValid) {
        allInputsValid = true;
    }

    if (allInputsValid) {

        calculateAge();
    }
}


circleArrow.addEventListener("click", function (e) {
    e.preventDefault();
    validateInput();

});