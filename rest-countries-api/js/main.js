const API_ENDPOINT = "https://restcountries.com/v3.1/all";


const getCountries = async () => {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return data;
};


const renderCountries = async () => {
    const countryContainer = document.getElementById("countries-container");
    try {
        const countries = await getCountries();
        countries.forEach((country) => {
            const countryCard = buildCountryCard(country);
            countryContainer.appendChild(countryCard);

            countryCard.addEventListener("click", () => {
                renderSingleCountry(country);
            });
        });
    } catch (error) {
    }
};

const renderSingleCountry = (country) => {
    const countryContainer = document.getElementById("countries-container");
    countryContainer.innerHTML = "";
    const backButton = renderBackButton();
    countryContainer.appendChild(backButton);
    const singleCountryCard = buildSingleCountryCard(country);
    countryContainer.appendChild(singleCountryCard);
}

const renderBackButton = () => {
    const backButton = document.createElement("button");
    backButton.classList.add("btn", "btn-outline-white");
    backButton.innerText = "Back";
    backButton.addEventListener("click", async () => {
        const countryContainer = document.getElementById("countries-container");
        countryContainer.innerHTML = "";
        await renderCountries();
    });
    return backButton;
}

const buildSingleCountryCard = (country) => {
    const singleCountryCard = document.createElement("div");

    const singleCountryCardHTML = `
    <div class="card">
        <img src="${country.flags.png}" alt="${country.name.common}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title
            ">${country.name.common}</h5>
            <p class="card-text">
                <strong>Population:</strong> ${country.population}
            </p>
            <p class="card-text">
                <strong>Region:</strong> ${country.region}
                <strong>Subregion:</strong> ${country.subregion}
            </p>
            <p class="card-text">
                <strong>Capital:</strong> ${country.capital}
            </p>
            <p class="card-text">
                <strong>Top Level Domain:</strong> ${country.tld}
            </p>
            <p class="card-text">
                <strong>Currencies:</strong> ${Object.values(country.currencies).map((currency) => currency.name)}
            </p>
            <p class="card-text">
                <strong>Languages:</strong> ${Object.values(country.languages).map((language) => language)}
            </p>
        </div>
    </div>
    `;
    singleCountryCard.innerHTML = singleCountryCardHTML;
    return singleCountryCard;

}


const buildCountryCard = (country) => {
    const countryCard = document.createElement("div");
    const countryCardHTML = `
    <div class="card">
        <img src="${country.flags.png}" alt="${country.name.common}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${country.name.common}</h5>
            <p class="card-text">
                <strong>Population:</strong> ${country.population}
            </p>
            <p class="card-text">
                <strong>Region:</strong> ${country.region}
               </p>
        </div>
    </div>
    `;
    countryCard.innerHTML = countryCardHTML;
    return countryCard;
};



(async () => {
    await renderCountries();
    toggleTheme();
    await searchCountry();
})();

const toggleTheme = () => {
    const darkModeButton = document.getElementById("theme-switcher");
    const html = document.documentElement;
    darkModeButton.addEventListener("click", () => {
        html.setAttribute("data-bs-theme", html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark");
    });
};


const searchCountry = async () => {
    const searchInput = document.getElementById("search");
 searchInput.addEventListener("input", async (e) => {
        const searchValue = e.target.value.toLowerCase();
        const countries = await getCountries();
        const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(searchValue));
        const countryContainer = document.getElementById("countries-container");
        countryContainer.innerHTML = "";
        filteredCountries.forEach((country) => {
            const countryCard = buildCountryCard(country);
            countryContainer.appendChild(countryCard);
            countryCard.addEventListener("click", () => {
                renderSingleCountry(country);
            });
        });
    });
 };

