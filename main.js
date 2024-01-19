let challenges = [
    {
        name: "Age Calculator",
        path: '/age-calc-app/index.html'
    }
];

function insertProjects() {
    let ul = document.querySelector("ul");
    challenges.forEach((challenge) => {
        let li = document.createElement('li');
        li.innerHTML = `<a href="${challenge.path}">${challenge.name}</a>`;

        ul.appendChild(li);
    });
}

insertProjects();