let day = document.querySelector("#day-input");
let month = document.querySelector("#month-input");
let year = document.querySelector("#year-input");
let form = document.querySelector("form");
let dayError = document.querySelector("#day-error");

let circleArrow = document.querySelector(".circle");

function calculateAge() {
    let date = new Date();
    let currentYear = date.getFullYear();
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

function isDateValid(dateStr) {
    return !isNaN(new Date(dateStr));

}


form.addEventListener("input", function (e) {
    e.preventDefault();

    if (day.length > 2) {
        day.classList.add("invalid");
        dayError.innerText = "Must be a valid date";
    } else {
        day.classList.remove("invalid");
        dayError.innerText = "";
    }

});


circleArrow.addEventListener("click", function (e) {

    calculateAge();
});