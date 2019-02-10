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

var pos;

// AUTOLOCATION
var userLocationMarker = L.marker([0,0]).addTo(gps);
userLocationMarker.bindPopup("<b>You are here!</b>");

// - Events in case of success or error getting the location
function onLocationFound(e){
    userLocationMarker.setLatLng(e.latlng);
    // Uncomment to make the marker move by itself
    pos = e.latlng;
}

function onLocationError(e){
    alert(e.message);
}

gps.on('locationfound', onLocationFound);
gps.on('locationerror', onLocationError);

//gps.locate({setView: true, watch: true});


// AUTOMOVEMENT
// Uncomment to make the marker move by itself
gps.locate({setView: true});
var movement = 0.00001;
var temp = movement;
function automove(){
    userLocationMarker.setLatLng([pos.lat + (temp += movement), pos.lng + (temp+=movement)]);
    gps.setView(userLocationMarker.getLatLng(), 20);
}
setInterval(automove, 1000);

// TRACK ROUTE
var interval, route;

function addLine(route){
    route.addLatLng(userLocationMarker.getLatLng());
}

function traceRoute(){
    var userPos = userLocationMarker.getLatLng();

    // Add starting marker
    var startingRouteMarker = L.marker(userPos).addTo(gps);
    startingRouteMarker.bindPopup("<b>Route starts here!</b>");

    route = L.polyline([userPos], {color: 'green', weight: 10}).addTo(gps);
    interval = setInterval(addLine, 1000, route);
}

function finishRoute(){

    //Add ending marker
    var userPos = userLocationMarker.getLatLng();
    var endingRouteMarker = L.marker(userPos).addTo(gps);
    endingRouteMarker.bindPopup("<b>Route ends here!</b>");
    console.log(route.getLatLngs());
    //Stop drawing the route
    clearInterval(interval);
}
// create a red polyline from an array of LatLng points
//var latlngs = [
//    [45.51, -122.68],
//    [37.77, -122.43],
//    [34.04, -118.2]
//];
//var polyline = L.polyline(latlngs, {color: 'red'}).addTo(gps);
//gps.fitBounds(polyline.getBounds());