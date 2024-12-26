import {MAPBOX_KEY} from "./keys.js";


mapboxgl.accessToken = MAPBOX_KEY;


const loadMap = async (lat, lng) => {
    mapboxgl.accessToken = MAPBOX_KEY;
    let map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v9",
        projection: "globe",
        zoom: 10,
        center: [lat, lng]
    });
    // Add a marker to the map
    new mapboxgl.Marker()
        .setLngLat([lat, lng])
        .addTo(map);
};


export {loadMap};