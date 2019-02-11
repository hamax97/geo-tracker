// Set up the map
var gps = L.map('gps').setView([51.505, -0.99], 13);

// Add labels (strees, cities, ...)
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaHRvYm9ubSIsImEiOiJjanJwcjY3ZXkwbjVnM3lxZXA1eGh3NGdoIn0.lmm-RjBEnCLjDHyQXR_1WQ'
}).addTo(gps);

// AUTOLOCATION

// Comment/Uncomment to make the marker move by itself
var pos;

var userLocationMarker = L.marker([0,0]).addTo(gps);
userLocationMarker.bindPopup("<b>You are here!</b>");

// - Events in case of success or error getting the location
function onLocationFound(e){
    userLocationMarker.setLatLng(e.latlng);
    // Comment/Uncomment to make the marker move by itself
    pos = e.latlng;
}

function onLocationError(e){
    alert(e.message);
}

gps.on('locationfound', onLocationFound);
gps.on('locationerror', onLocationError);

// Comment/Uncomment to no automovement
//gps.locate({setView: true, watch: true});

// AUTOMOVEMENT
// Comment/Uncomment to make the marker move by itself
gps.locate({setView: true});
var automoveInterval;
var movement = 0.00001;
var temp = movement;
function automove(){
    userLocationMarker.setLatLng([pos.lat + (temp += movement), pos.lng + (temp+=movement)]);
    gps.setView(userLocationMarker.getLatLng(), 20);
}
automoveInterval = setInterval(automove, 2000);

function disableAutomovement(){
    clearInterval(automoveInterval);
}

function enableAutomovement(){
    automoveInterval = setInterval(automove, 2000);
}

// TRACK ROUTE
var interval, route, routeStarted = false, routeFinished = false;

function addLine(route){
    route.addLatLng(userLocationMarker.getLatLng());
}

function traceRoute(){
    if(!routeStarted){
        var userPos = userLocationMarker.getLatLng();

        // Add starting marker
        var startingRouteMarker = L.marker(userPos).addTo(gps);
        startingRouteMarker.bindPopup("<b>Route starts here!</b>");

        route = L.polyline([userPos], {color: 'green', weight: 10}).addTo(gps);
        interval = setInterval(addLine, 1000, route);
        routeStarted = true;
        routeFinished = false;
    }
}

function getRoutes(username){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            var routes = this.responseText;
            var routes_array = routes.split(';');

            routes_array.forEach(function (route){
            // interpret those points and use them to print the polyline
            });
            
        }
    }
    xhttp.open("GET", "/gps/db/route/" + username);
    xhttp.send();
}

function saveRoute(points, username){
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/gps/db/route/" + username);

    var jsonRoute = [];
    points.forEach(function(point){
        
        jsonRoute.push([point.lat, point.lng]);

    });
    xhttp.send(jsonRoute.toString());
}

function finishRoute(username){

    if(!routeFinished){
        //Add ending marker
        var userPos = userLocationMarker.getLatLng();
        var endingRouteMarker = L.marker(userPos).addTo(gps);
        endingRouteMarker.bindPopup("<b>Route ends here!</b>");
    
        //Stop drawing the route
        clearInterval(interval);

        //Store the route
        saveRoute(route.getLatLngs(), username);
        routeFinished = true;
        routeStarted = false;
    }
}