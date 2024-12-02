let day = document.querySelector("#day-input");
let month = document.querySelector("#month-input");
let year = document.querySelector("#year-input");
let dayValid = false;
let monthValid = false;
let yearValid = false;
let allInputsValid = false;
let error;
let circleArrow = document.querySelector(".circle");


let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth() + 1;
let currentDay = date.getDate();


function calculateAge() {

    let ageYears = currentYear - year.value;
    let ageMonths = currentMonth - month.value;
    let ageDays = currentDay - day.value;

    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
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


function generateErrorMessage(element, message) {

    if (element === day) {
        error = document.querySelector("#day-error");
    } else if (element === month) {
        error = document.querySelector("#month-error");
    } else if (element === year) {
        error = document.querySelector("#year-error");
    }

    error.innerText = message;
    element.classList.add("invalid");
    element.parentElement.classList.add("error");
}

function removeErrorMessage(element) {
    if (element === day) {
        error = document.querySelector("#day-error");
    } else if (element === month) {
        error = document.querySelector("#month-error");
    } else if (element === year) {
        error = document.querySelector("#year-error");
    }

    error.innerText = "";

    if (element.parentElement.classList.contains("error")) {
        element.parentElement.classList.remove("error");
    }

    if (element.classList.contains("invalid")) {
        element.classList.remove("invalid");

    }

}

function validateDay() {
    if (parseInt(day.value) > 31 || parseInt(day.value) < 1) {
        dayValid = false;
        generateErrorMessage(day, "Must be a valid day");
    } else if (day.value.length === 0) {
        dayValid = false;
        generateErrorMessage(day, "This field is required");
    } else {
        dayValid = true;
        removeErrorMessage(day);
        dayValid = true;
    }

}

function validateMonth() {
    if (parseInt(month.value) > 12 || parseInt(month.value) < 1) {
        monthValid = false;
        generateErrorMessage(month, "Must be a valid month");
    } else if (month.value.length === 0) {
        monthValid = false;
        generateErrorMessage(month, "This field is required");
    } else {
        monthValid = true;
        removeErrorMessage(month);
    }

}

function validateYear() {
    if (parseInt(year.value) > currentYear || parseInt(year.value) < 1) {
        yearValid = false;
        generateErrorMessage(year, "Must be in the past");
    } else if (year.value.length === 0) {
        yearValid = false;
        generateErrorMessage(year, "This field is required");
    } else {
        yearValid = true;
        removeErrorMessage(year);
    }

}

circleArrow.addEventListener("click", function (e) {
    e.preventDefault();
    validateDay();
    validateMonth();
    validateYear();

    if (dayValid && monthValid && yearValid) {
        allInputsValid = true;
    } else {
        allInputsValid = false;
    }
    if (allInputsValid) {
        calculateAge();
    }

});