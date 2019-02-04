// Set up the map
var gps = L.map('gps').setView([51.505, -0.99], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaHRvYm9ubSIsImEiOiJjanJwcjY3ZXkwbjVnM3lxZXA1eGh3NGdoIn0.lmm-RjBEnCLjDHyQXR_1WQ'
}).addTo(gps);
