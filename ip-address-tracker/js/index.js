import {setInitialMapLocation, updateMapLocation} from "./ipifyFunctions.js";


const listenForSearch = () => {
    const searchBtn = document.querySelector("#search-btn");
    const searchBar = document.querySelector("#ip");

    searchBtn.addEventListener("click", async () => {
        let newIP = searchBar.value;
        await updateMapLocation(newIP);
    });
};

// async iife
(async () => {

    await setInitialMapLocation();
    listenForSearch();

})();