// Mapping Favorite Restaurants Map

let anon = L.featureGroup();
let person = L.featureGroup();

let layers = {
    "Anonymous Respondent": anon,
    "Identifiable Respondent": person
}

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

// Survey Spreadsheet Dataset
const surveyUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3JMLOzEGJEKn7YFIig9PCzerJO5TofP09ThGtSsqt41yRbZDP9BlPrFSyLAjEKR4cmkIoR2N5MYbR/pub?output=csv"
const placesUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRkmSXxg8YWhtkeX7iiBcY-uYjHURNjBdMz9iNUGyUIekHd2Jfp1CqxVRbvwHt-uJZF0ecZWctmHCim/pub?output=csv"

// JSON for the Map Center and Zoom


function addMarker(data, target_map=1){
    if (target_map == 3){
        
        return data
    }
    else {
        L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${data.city}</h2> <h3>${data.description}</h3>`)
    }
}


// Loading in the data
function loadData(url, tgt_map){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results,tgt_map)
    })
}

// Processing the data into the map
function processData(results, tgt_map){
    results.data.forEach(data => {
        if (tgt_map ==3){
            addMarker(data, 3)

        }
        else{
            addMarker(data)
        }
        
    })
}

// this is our function call to get the data
// we will put this comment to remember to call our function later!
loadData(surveyUrl, 3)
loadData(placesUrl, 1)

// Places I've worked map

let mapOptions = {'center': [34.05486654874919, -118.26360364555003],'zoom':14}

function createButtons(lat,lng,title){
  const newButton = document.createElement("button"); // adds a new button
  newButton.id = "button"+title; // gives the button a unique id
  newButton.innerHTML = title; // gives the button a title
  newButton.setAttribute("lat",lat); // sets the latitude 
  newButton.setAttribute("lng",lng); // sets the longitude 
  newButton.addEventListener('click', function(){
      map2.flyTo([lat,lng], 16); //this is the flyTo from Leaflet
  })
  document.getElementById("buttons").appendChild(newButton); //this adds the button to our page.
}

function textPopup(feature, layer){
  layer.bindPopup(
      `<h2>${feature.properties.job_name}</h2> <h3>Job Type: ${feature.properties.job_type}</h3> <p>${feature.properties.description} </p>`
    );
  createButtons(
    feature.geometry.coordinates[1],
		feature.geometry.coordinates[0],
		feature.properties.job_name,
	);
}


// Places I've Been Map

const map = L.map('the_map').setView([48.742474, -35.568517], 2); // (1)!

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//JavaScript let variable declaration to create a marker
