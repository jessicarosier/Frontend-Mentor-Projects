let challenges = [
    {
        name: "Age Calculator",
        url: "https://age-calculator.jessicarosier.com/",
        thumbnail: "https://plachold.co/300x300"
    },
    {
        name: "Social Links",
        url: "https://social-links.jessicarosier.com",
        thumbnail: "https://plachold.co/300x300"
    },
    {
        name: "Job Listings",
        url: "https://elaborate-crostata-410774.netlify.app",
        thumbnail: "https://plachold.co/300x300"
    }
];

function insertProjects() {
    let ul = document.querySelector("ul");
    challenges.forEach((challenge) => {
        let li = document.createElement("li");
        li.innerHTML = `
        <img src="${challenge.thumbnail}" alt="${challenge.name}">
        <a href="${challenge.url}" target="_blank">${challenge.name}</a>
`;
        ul.appendChild(li);
    });
}


insertProjects();