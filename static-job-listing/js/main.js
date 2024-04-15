const LOCAL_ENDPOINT = "data.json";

const getJobListings = async () => {
    const response = await fetch(LOCAL_ENDPOINT);
    return await response.json();
};

const populateJobListings = async () => {
    const jobListingContainer = document.querySelector(".job-listing-container");
    const jobListings = await getJobListings();

    for (let jobListing of jobListings) {
        let singleJob = createsSingleJobListing(jobListing);
        jobListingContainer.append(singleJob);
    }

};

const createsSingleJobListing = data => {
    const singleJobElement = document.createElement("div");
    let isNew = data.new === true ? "New!" : "";
    let isFeatured = data.featured === true ? "Featured" : "";
    singleJobElement.classList.add("d-flex", "flex-column", "flex-md-row", "justify-content-between", "px-5", "py-3", "mx-5", "single-job-wrapper");

    singleJobElement.innerHTML = `
       
      <div class="d-flex flex-column flex-md-row gap-3">
        <div class="d-flex flex-column">
          <img class="job-logo" src="${data.logo}" alt="logo">
        </div>
        <div class="d-flex flex-column justify-content-center">
          <div class="d-flex flex-row gap-2 new-featured">
            <p class="company-name fw-bold">${data.company}</p>
            <p class="new">${isNew}</p>
            <p class="featured">${isFeatured}</p>
          </div>
          <div class="d-flex">
            <p class="fw-bolder">${data.position}</p>
          </div>
          <div class="d-flex flex-row gap-2">
            <p>${data.postedAt}</p>
            <p>${data.contract}</p>
            <p>${data.location}</p>
          </div>
        </div>
      </div>

      <div id="languages" class="d-flex flex-column align-items-center justify-content-center">
       
      </div>
    `

    let languageWrapper = singleJobElement.querySelector("#languages");
    let languages = createLanguageList(data);
    languageWrapper.append(languages);

    return singleJobElement;
};

const createLanguageList = (data) => {
    let languages = document.createElement("ul");
    languages.classList.add("list-unstyled", "d-flex", "flex-wrap", "gap-2");
    let levelEl = document.createElement("li");
    levelEl.classList.add("language");
    levelEl.innerText = `${data.level}`;
    let roleEl = document.createElement("li");
    roleEl.classList.add("language");
    roleEl.innerText = `${data.role}`;
    languages.append(roleEl);
    languages.append(levelEl);
    for (let lang of data.languages) {
        let langItem =  document.createElement("li");
        langItem.classList.add("language");
        langItem.innerText = lang;
        languages.append(langItem);
    }

    let languageElements = languages.querySelectorAll(".language");
    languageElements.forEach((language) => filterByElement(language));

    return languages;
}

const filterByElement = (language) => {
    language.addEventListener('click', () => {
        const filterWrapper = document.getElementById("filter-wrapper");
        let filterEl = document.createElement("div");
        filterEl.classList.add("filter-element");
        filterEl.innerHTML = `
        <p>${language.innerText}</p>
        <div class="filter-remove">X</div>
        `
        let filterRemove = filterEl.querySelector(".filter-remove");
        filterRemove.addEventListener('click', () => {
            filterEl.remove();
        });

        filterWrapper.append(filterEl);
        console.log(language.innerText);
    })
}



const listenForFilterJobListings = async () => {
    const filterWrapper = document.getElementById("filter-wrapper");
    filterWrapper.addEventListener('compositionupdate', updateJobListings);
}

const updateJobListings = () => {
    console.log("change");
    const filterWrapper = document.getElementById("filter-wrapper");
    filterWrapper.childNodes.forEach((node) => {
        console.log(node);
    })
}


(async () => {
    const jobListings = await getJobListings();
    console.log(jobListings);

    await populateJobListings();

    await listenForFilterJobListings();
})();
