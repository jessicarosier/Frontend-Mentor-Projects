const API_ENDPOINT = "https://restcountries.com/v3.1/all";

const LOCAL_ENDPOINT = "data.json";


const getCountries = async () => {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    console.log(data);
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
                console.log(country);
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
    const backBtnWrapper = document.getElementById("back-btn-wrapper");
    backBtnWrapper.innerHTML = "";
    backBtnWrapper.appendChild(backButton);
    const singleCountryCard = buildSingleCountryCard(country);
    countryContainer.appendChild(singleCountryCard);
};

const renderBackButton = () => {
    const backButtonWrapper = document.getElementById("back-btn-wrapper");
    const backButton = document.createElement("button");
    backButton.classList.add("btn", "btn-outline-white", "btn-back");
    backButton.innerHTML = `<i class="fas fa-arrow-left"></i> Back`;
    backButton.addEventListener("click", async () => {
        backButtonWrapper.innerHTML = searchFilterHtml;
        const countryContainer = document.getElementById("countries-container");
        countryContainer.innerHTML = "";
        await renderCountries();
    });
    return backButton;
};

const searchFilterHtml = `
  <div class="col-md-6 input-container">
          <input type="text" class="form-control" id="search" placeholder="Search for a country...">
          <i class="fas fa-search"></i>
        </div>
        <div class="col-md-3">
          <select class="form-select" id="region">
            <option disabled selected>Filter by Region</option>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>`;

const buildSingleCountryCard = (country) => {
    const singleCountryCard = document.createElement("div");
    singleCountryCard.classList.add("container-fluid");

    const buttonWrapper = document.createElement("div");
    if (country.borders) {
        let borderButtons = country.borders.map((border) => {
            let button = document.createElement("button");
            button.classList.add("btn", "btn-outline-white", "btn-border");
            button.innerHTML = border;
            button.addEventListener("click", async () => {
                console.log("clicked");
                console.log(border);
                const countries = await getCountries();
                let selectedCountry = countries.find((country) => country.cca3 === border);
                renderSingleCountry(selectedCountry);
            });
            buttonWrapper.appendChild(button);
        });

    }


    const singleCountryCardHTML = `
    <div class="d-flex flex-column flex-lg-row justify-content-evenly align-items-center">
        <img src="${country.flags.png}" alt="${country.name.common}" class="single-card-img">
        <div class="card-info">
            <div class="col-md-8">
                <h2>${country.name.common}</h2>
                <div class="d-flex justify-content-between">
                <ul class="list-unstyled">
                    <li><strong>Native Name:</strong> ${country.name.nativeName[Object.keys(country.name.nativeName)[0]].official}</li>
                    <li><strong>Population:</strong> ${country.population}</li>
                    <li><strong>Region:</strong> ${country.region}</li>
                    <li><strong>Sub Region:</strong> ${country.subregion}</li>
                    <li><strong>Capitol:</strong> ${country.capital}</li>
                </ul>
                
                 <ul class="list-unstyled">
                    <li><strong>Top Level Domain:</strong> ${country.tld}</li>
                    <li><strong>Currencies:</strong> ${Object.values(country.currencies)[0].name}</li>
                    <li><strong>Languages:</strong> ${Object.values(country.languages)[0]}</li>
                </ul>
                    </div>
                   ${buttonWrapper.outerHTML}
             </div>
        </div>
    </div>
    `;
    singleCountryCard.innerHTML = singleCountryCardHTML;
    return singleCountryCard;
};



const buildCountryCard = (country) => {
    const countryCard = document.createElement("div");
    const countryCardHTML = `
    <div class="card mb-3">
        <img src="${country.flags.png}" alt="${country.name.common}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${country.name.common}</h5>
            <p class="card-text">
            <ul class="list-unstyled">
                <li><strong>Population:</strong> ${country.population}</li>
                <li><strong>Region:</strong> ${country.region}</li>
                <li><strong>Capitol:</strong> ${country.capital}</li>
            </ul>
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
    await filerByRegion();
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


const filerByRegion = async () => {
    const regionSelect = document.getElementById("region");
    regionSelect.addEventListener("change", async (e) => {
        const regionValue = e.target.value;
        const countries = await getCountries();
        if (regionValue === "All") {
            const countryContainer = document.getElementById("countries-container");
            countryContainer.innerHTML = "";
            countries.forEach((country) => {
                const countryCard = buildCountryCard(country);
                countryContainer.appendChild(countryCard);
                countryCard.addEventListener("click", () => {
                    renderSingleCountry(country);
                });
            });
            return;
        }
        const filteredCountries = countries.filter((country) => country.region === regionValue);
        console.log(filteredCountries);
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

