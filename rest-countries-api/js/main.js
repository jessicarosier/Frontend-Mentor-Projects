const API_ENDPOINT = "https://restcountries.com/v3.1/all";

const getCountries = async () => {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return data;
};


const renderCountries = async () => {
    const countryContainer = document.getElementById("card-container");
    try {
        const countries = await getCountries();
        countries.forEach((country) => {
            const countryCard = buildCountryCard(country);
            countryContainer.appendChild(countryCard);
        });
    } catch (error) {
    }
};

(async () => {
    await renderCountries();
})();

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

