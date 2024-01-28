const apiUrl = "https://api.adviceslip.com/advice";

const getAdvice = async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

getAdvice().then((data) => console.log(data));

async function renderAdviceCard() {
    const advice = await getAdvice();

    const adviceCard = document.createElement("div");
    adviceCard.classList.add("advice-card");

    adviceCard.innerHTML = `
    <div class="d-flex flex-column justify-content-center align-items-center">
      <p class="advice-id">Advice # ${advice.slip.id}</p>
      <p class="advice-text text-center p-3">"${advice.slip.advice}"</p>
      <img src="./images/pattern-divider-desktop.svg" alt="divider">
      <div class="dice-button">
      <img src="./images/icon-dice.svg" class="mb-0" alt="dice">
      </div>
    </div>
    `

    const diceButton = adviceCard.querySelector(".dice-button");
    diceButton.addEventListener("click", async () => {
        adviceCard.remove();
       await renderAdviceCard();
    })

    const adviceWrapper = document.querySelector("#advice-wrapper");
    adviceWrapper.appendChild(adviceCard);
}

window.addEventListener("load", async () => {
    await renderAdviceCard();
})






