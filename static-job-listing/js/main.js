const LOCAL_ENDPOINT = "data.json";

const getJobListings = async () => {
    const response = await fetch(LOCAL_ENDPOINT);
    return await response.json();
};


const populateJobListings = async (jobListings) => {
    const jobListingContainer = document.querySelector(".job-listing-container");
    jobListingContainer.innerHTML = "";


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

    singleJobElement.innerHTML = createSingleJobListingHTML(data);

    let newFeaturedWrapper = singleJobElement.querySelector(".new-featured");
    handleNewFeatured(newFeaturedWrapper, isNew, isFeatured);

    let languageWrapper = singleJobElement.querySelector("#languages");
    let languages = createLanguageList(data);
    languageWrapper.append(languages);

    return singleJobElement;
};

const handleNewFeatured = (wrapper, isNew, isFeatured) => {
    if (isNew.length > 0) {
        let newEl = document.createElement("p");
        newEl.classList.add("new");
        newEl.innerText = isNew;
        wrapper.append(newEl);
    }
    if (isFeatured.length > 0) {
        let featuredEl = document.createElement("p");
        featuredEl.classList.add("featured");
        featuredEl.innerText = isFeatured;
        wrapper.append(featuredEl);
    }
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
        let langItem = document.createElement("li");
        langItem.classList.add("language");
        langItem.innerText = lang;
        languages.append(langItem);
    }

    let languageElements = languages.querySelectorAll(".language");
    languageElements.forEach((language) => filterByElement(language));

    return languages;
};

const createSingleJobListingHTML = (data, isNew, isFeatured) => {
    return `
     <div class="d-flex flex-column flex-md-row gap-3">
        <div class="d-flex flex-column">
          <img class="job-logo" src="${data.logo}" alt="logo">
        </div>
        <div class="d-flex flex-column justify-content-center">
          <div class="d-flex flex-row gap-2 new-featured">
            <p class="company-name fw-bold">${data.company}</p>
            
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
       
      </div>`;
};

const filterByElement = async (language) => {
    language.addEventListener("click", async () => {
        const filterWrapper = document.getElementById("filter-wrapper");
        let filterEl = document.createElement("div");
        filterEl.classList.add("filter-element");
        filterEl.setAttribute("data-filter", language.innerText);
        filterEl.innerHTML = `
        <p>${language.innerText}</p>
        <div class="filter-remove">X</div>
        `;
        let filterRemove = filterEl.querySelector(".filter-remove");
        filterRemove.addEventListener("click", () => {
            filterEl.remove();
            updateJobListings();
        });

        filterWrapper.append(filterEl);
        await updateJobListings();
    });
};


const updateJobListings = async () => {
    let matchingJobs = [];
    const filterWrapper = document.getElementById("filter-wrapper");
    const jobListings = await getJobListings();
    const filterElements = filterWrapper.querySelectorAll(".filter-element");
    let filters = [];
    filterElements.forEach((filter) => filters.push(filter.getAttribute("data-filter")));
    for (let i = 0; i < jobListings.length; i++) {
        if (filters.includes(jobListings[i].role) || filters.includes(jobListings[i].level) || filters.includes(jobListings[i].languages)) {
            console.log(jobListings[i]);
            matchingJobs.push(jobListings[i]);
        }
    }

    await populateJobListings(matchingJobs);
};


(async () => {
    const jobListings = await getJobListings();
    console.log(jobListings);
    await populateJobListings(jobListings);

})();
