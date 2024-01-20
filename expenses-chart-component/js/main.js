const getJsonData = async () => {
    const response = await fetch("./data.json");
    const data = await response.json();
    return data;
};


function renderBarChart() {
    let chart = document.getElementById("chart");
    let color;
    getJsonData().then(data => {
        console.log(data);
        data.forEach((item) => {
            if (item.day === "wed") {
               color = "var(--cyan)";
            } else {
                color = "var(--soft-red)";
            }
            let bar = document.createElement("div");
            bar.className = "bar";
            bar.innerHTML = `
          <span id="amount-number" class="d-none" style="width: 60px">$${item.amount}</span>
          <div id="amount"></div>
          <span id="day">${item.day}</span>
        `;
            let barAmount = bar.querySelector("#amount");
            barAmount.style.height = `${item.amount * 2.5}px`;
            barAmount.style.backgroundColor = `${color}`;

            barAmount.addEventListener("mouseover", () => {
                let amountNumber = bar.querySelector("#amount-number");
                amountNumber.classList.remove("d-none");
                amountNumber.classList.add("d-block");
            });

            barAmount.addEventListener("mouseout", () => {
                let amountNumber = bar.querySelector("#amount-number");
                amountNumber.classList.remove("d-block");
                amountNumber.classList.add("d-none");
            });

            chart.appendChild(bar);
        });
    });
}

renderBarChart();

