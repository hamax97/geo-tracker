// Set up the map
var gps = L.map('gps').setView([51.505, -0.99], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaHRvYm9ubSIsImEiOiJjanJwcjY3ZXkwbjVnM3lxZXA1eGh3NGdoIn0.lmm-RjBEnCLjDHyQXR_1WQ'
}).addTo(gps);

// Add marker
//var selfPosition = L.marker([51.5, -0.09]).addTo(gps);
//selfPosition.bindPopup("<b>You are here!</b>").openPopup();

// Centering the map in the main marker
//var zoomLevel = 16;
//gps.setView(selfPosition.getLatLng(), zoomLevel);

// Centering the map in the current user location

var userLocationMarker, test = 0;

function onLocationFound(e){

    if(userLocationMarker){
        map.removeLayer(userLocationMarker);
        alert("marker removed");
    }
    
    userLocationMarker = L.marker(e.latlng).addTo(gps);
    userLocationMarker.bindPopup("<b>You are here!</b>").openPopup();
    test++;
    alert(test);
}

function onLocationError(e){
    alert(e.message);
}

// - Events in case of success or error getting the location
gps.on('locationfound', onLocationFound);
gps.on('locationerror', onLocationError);

function locate(){
    gps.locate({setView: true, maxZoom: 16});
}
setInterval(locate, 3000);