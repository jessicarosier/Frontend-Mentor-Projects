import {GEO_IPIFY_KEY} from "./keys.js";
import {loadMap} from "./mapboxFunctions.js";


const apiCallString = `https://geo.ipify.org/api/v2/country,city?apiKey=${GEO_IPIFY_KEY}&ipAddress=`;

const updateDataInView = (data) => {
    console.log(data);
    const ip = document.querySelector("#ip-address");
    const location = document.querySelector("#location");
    const timezone = document.querySelector("#timezone");
    const isp = document.querySelector("#isp");

    ip.innerText = data.ip;
    location.innerText = data.location.city + ", " + data.location.region + " " + data.location.postalCode;
    timezone.innerText = "UTC " + data.location.timezone;
    isp.innerText = data.isp;
};

const getUserIp = async () => {
    const url = "https://api.ipify.org?format=json";
    const response = await fetch(url);
    const data = await response.json();
    return data.ip;
};

const getIpData = async (ipAddress) => {
    const response = await fetch(apiCallString + ipAddress);
    const data = await response.json();
    console.log(data);
    return data;
};

const setInitialMapLocation = async () => {
    const ip = await getUserIp();
    const data = await getIpData(ip);
    await loadMap(data.location.lng, data.location.lat);
    updateDataInView(data);
};

const updateMapLocation = async (ip) => {
    const newIpData = await getIpData(ip);
    console.log(newIpData);
    await loadMap(newIpData.location.lng, newIpData.location.lat);
    updateDataInView(newIpData);
};


export {setInitialMapLocation, updateMapLocation};
