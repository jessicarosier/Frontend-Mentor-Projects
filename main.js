let challenges = [
    {
        name: "Age Calculator",
        url: "https://age-calculator.jessicarosier.com/"
    }
];

function insertProjects() {
    let ul = document.querySelector("ul");
    challenges.forEach((challenge) => {
        let li = document.createElement("li");
        li.innerHTML = `<a href="${challenge.url}">${challenge.name}</a>`;

        ul.appendChild(li);
    });
}

insertProjects();