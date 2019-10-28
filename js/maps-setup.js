/* global L:false document:false */
//////////////////////////
// Globally Scoped Vars //
//////////////////////////

// In order to access map data, we need some of these variables to
// be defined in global scope. In some cases we can assign values here;
// in others we'll wait till we run the initialization function
// we do this here to make sure we can access them
// whenever we need to -- they have 'global scope'

// map initialization variables
let projectMap, // this will hold the map
    myCenter = [41.8986, -90.4768], // *latitude*, then longitude
    myZoom = 4; // set your preferred zoom here


// I'm complicating things a bit with this next set of variables, which will help us
// to make multi-colored markers
// other color options are green, orange, yellow, violet, grey, black
const blueURL = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
      redURL = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png';

// create new icon classes
const myIconClass = L.Icon.extend({
    options: {
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }});
// create the new icon types -- cf. https://leafletjs.com/examples/custom-icons/ and
// also https://leafletjs.com/reference-1.5.0.html#icon
const blueIcon = new myIconClass({iconUrl: blueURL}),
      redIcon = new myIconClass({iconUrl: redURL});


///////////////////////////////////////////////////////////////////////
// CHANGE THESE VARIABLE NAMES AND THEIR VALUES TO SUIT YOUR PROJECT //
///////////////////////////////////////////////////////////////////////


//////////////////////////////////
// MAP DATA PART 1: MARKER INFO //
//////////////////////////////////

// 'L' is the Leaflet object.
let blueMarkers = L.layerGroup([], {description: 'Blue Markers', defaultIcon: blueIcon}),
    redMarkers  = L.layerGroup([], {description: 'Red Markers', defaultIcon: redIcon}),
    allMarkers = L.layerGroup([]);


    ///////////////////////////////
    // YOU NEED TO CHANGE THESE! //
    ///////////////////////////////

// This is a placeholder array; we use it to generate other JS variables
// that will be more useful to us later on
// but writing it this way keeps the code as D.R.Y. as possible
let redMarkerInfo =
    [
        {position: [41.8986,12.4768],
         icon: redIcon, // this sets the image that represents the marker in the map
         title: "third Marker",
         description: '<img title="Picture of Quote. Src: someone, some year"  src="https://s-media-cache-ak0.pinimg.com/736x/6d/e2/25/6de2251b8b4be709dcc936ae4f0caaaf.jpg"/>' +
         '<blockquote>quote quote quote quote</blockquote>'
        }
    ],
    blueMarkerInfo =
    [{position: [41.9000,12.5000],
      icon: blueIcon, // this sets the image that represents the marker in the map to the one
      // located at the URL which is given by the variable blueURL, see above
      title: "first Marker",
      description: "<p> and this would be the extended description</p>"
     },
     {position: [41.8902,12.4923],
      icon: blueIcon, // this sets the image that represents the marker in the map
      title: "second Marker",
      description: "<p> and <a href='http://something'>this would</a> be the extended description</p>"
     }];

// associate the marker info with the right layers
// KEEP THIS VARIABLE NAME, but change the property values
// to match your variable name hcoices above
let markerAssociations = [
    {layer: blueMarkers, info: blueMarkerInfo},
    {layer: redMarkers, info: redMarkerInfo}];


//////////////////////////////
// MAP DATA PART 2: GEOJSON //
//////////////////////////////

// With this powerful feature you can add arbitrary
// data layers to your map.  It's cool. Learn more at:
// https://leafletjs.com/examples/geojson/
// but essentially: we can add all kinds of features here, including polygons and other shapes
// you can create geoJSON layers here: http://geojson.io/
// and learn more about the format here: https://en.wikipedia.org/wiki/GeoJSON
// to set the line and fill color, you will need to set the `myColor` property as below. 
const myGeoJSON= {
    "type":"FeatureCollection",
    "features":
    [{"type":"Feature",
      "properties":{"title": 'Red Polygon',myColor: 'red'},
      "geometry":{"type":"Polygon",
                  "coordinates":[[[-85.60546875,49.03786794532644],[-96.6796875,40.713955826286046],
                                  [-79.62890625,37.71859032558816],[-81.2109375,49.26780455063753],
                                  [-85.60546875,49.03786794532644]]]},
     },
     {"type":"Feature",
      "properties":{"title": 'Green Polygon', myColor: 'green'},
      "geometry":{"type":"Polygon",
                  "coordinates":[[[-113.203125,58.35563036280967],[-114.78515624999999,51.944264879028765],
                                  [-101.6015625,51.944264879028765],[-112.32421875,58.263287052486035],
                                  [-113.203125,58.35563036280967]]]
                 },
      }]};

 
////////////////////////////////////////////////////////
// MAP DATA PART 3: DIRECT CREATION OF SHAPE OVERLAYS //
////////////////////////////////////////////////////////
 
// create a rectangle and a circle
// for more info on shapes you can draw, look at the
// API docs: https://leafletjs.com/reference-1.5.0.html#polygon
//  (keep scrolling for docs on rectangles and circles)
let romeRectangle = L.rectangle([
    [41.920, 12.501],
    [41.900, 12.485]
], {
    color: 'maroon',
    opacity: 0.8,
    weight: 2,
    fillColor: 'saddlebrown',
    fillOpacity: 0.35,
    infoHTML: 'ROMAN RECTANGLE',
    windowContent: `<h3>ROMAN RECTANGLE</h3><p>I'm a rectangle</p3>`
});
romeRectangle.bindPopup(romeRectangle.options.windowContent)
romeRectangle.bindTooltip(romeRectangle.options.infoHTML );  

let romeCircle = L.circle([41.8900, 12.4900], {
    color: 'darkgreen',
    opacity: 0.8,
    weight: 2,
    fillColor: 'forestgreen',
    fillOpacity: 0.35,
    radius: 1000,
    infoHTML: 'ROMAN CIRCLE',
    windowContent: `<h3>ROMAN CIRCLE</h3><p>I am a circle.</p>`
});
romeCircle.bindPopup(romeCircle.options.windowContent)
romeCircle.bindTooltip(romeCircle.options.infoHTML );  


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////
// FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS //
/////////////////////////////////////////////


/**
 * create a Leaflet map inside an element, add base layer and return the map as a return value
 * @param {HTMLElement|string} element: can be either a full HTMLElement or the ID attribute
 * of a DOM node
 * @returns {Object} a Leaflet map object 
 */
function createMap (element) {
    const map = L.map(element).setView(myCenter, myZoom);
    // now we add the base layer
    // you can change this if you want!
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoidGl0YW5pdW1ib25lcyIsImEiOiJjazF0bTdlNXQwM3gxM2hwbXY0bWtiamM3In0.FFPm7UIuj_b15xnd7wOQig'
    })
        .addTo(map);
    return map
}


function populateMarkerLayer (markers, layerGroup) {
    // we use the global vars defined at top of
    // this file -- we will need to access them later
    // you may wantto change these names later

    // iterate over the marker array, adding to the main marker layer but
    // *also* to another layer if the icon property is set. 
    for (const m of markers) {
        console.log(m);
        // define a Leaflet marker object for each marker
        // we pas two parameters: a position (2-value array of lat & lng vals)
        // and an object containing marker properties
        let marker =  L.marker (m.position, {
            // We set the icon 
            icon: m.icon || layerGroup.options.defaulIcon || L.Icon.Default,
            title: m.title,
            // This is what we'll use to build the description below
            // you may wantto modify this
            infoHTML: '<h3>' + m.title + '</h3>'
        })
            // now we add the popup window html
            .bindPopup('<h1>' + m.title + '</h1>' + m.description);
        layerGroup.addLayer(marker);
    }
    layerGroup.addTo(projectMap);
    return layerGroup
}

function addLayerToLegendHTML (layerGroup, querySelector) {
    console.log(layerGroup);
    let el = document.querySelector(querySelector),
        output = `<div class='legend-content-group-wrapper'><h2>${layerGroup.options.description}</h2>`;
    for (let l in layerGroup._layers) {
        // this is hideously ugly! very roundabout way
        // to access anonymous marker from outside the map
        let current = layerGroup._layers[l];
        let info = current.options.infoHTML ? layerGroup._layers[l].options.infoHTML :
            current.options.title || 'no title';
        output +=  `
<div class="pointer" onclick="locateMarker(projectMap._layers[${layerGroup._leaflet_id}]._layers[${l}])"> 
    ${info} 
</div>`;
    }
    output += '</div>'
    el.innerHTML += output;
    return el.innerHTML
}

/* a function that will run when the page loads.  It creates the map
   and the initial marker.  If you want to create more markers, do it here. */
function initializeMap() {

    // this one line creates the actual map
    // it calls a simple 2-line function defined above
    projectMap = createMap('map_canvas');
    // set the legend location
    let legendSelector = '#map_legend';

    // add markers to map and to legend
    for (let l of markerAssociations) {
        console.log(l);
        populateMarkerLayer(l.info, l.layer);
        addLayerToLegendHTML(l.layer, legendSelector)
    }

    
    // also add some geoJSON
    // if you're not using this, comment it out
    // here we use the myColor attributes of the geoJSON objects from above
    // to actually set the color of the jeogson features
    mapJSON = L.geoJSON(myGeoJSON, {
        // the 'style' option is a *function* that modifies some
        // feature properties.  
        // cf https://leafletjs.com/reference-1.5.0.html#geojson-style
        style: function(feature) {
            let c = feature.properties.myColor;
            return {color: c, weight: 3, fillColor: c, fillOpacity: 0.5};
        },
        onEachFeature: function (feature, layer) {
            console.log(feature);
            if (feature.properties && feature.properties.title) {
	        layer.bindPopup(feature.properties.title);
                layer.options.title = feature.properties.title}
        },
        description: 'geoJSON Objects'
    }).addTo(projectMap);

    addLayerToLegendHTML(mapJSON, legendSelector);
    
    // add shapes layer as well
    let shapes = L.layerGroup([romeRectangle, romeCircle], {description: 'Some Random Shapes'}).addTo(projectMap);
    addLayerToLegendHTML(shapes, legendSelector);

    // add a layers control to the map
    // you will want to change this to reflect your own layers
    //  in this strange object, the property names are strings
    // that will be displayed in the map layer control,
    // while the values are actual Leaflet Layer Objects
    let layerListObject = {"Blue Markers": blueMarkers,
                     "Red Markers": redMarkers,
                     "GeoJSON": mapJSON,
                     "Shapes": shapes};
    L.control.layers(null, layerListObject).addTo(projectMap);
}


// probably always want to use this toggle function instead!!
function toggleLayer (layer, layerHidden) {
    if (layerHidden) {
        projectMap.addLayer(layer);
        console.log("hidden true")
    } else {
        projectMap.removeLayer(layer);
        console.log("hidden false")
    }
    layerHidden = !layerHidden;
}

function toggleLayers (layers) {
    for (l of layers ) {
        toggleLayer (l.main, l.hidden);
    }
}
//global variable to track state of markers
let blueMarkersHidden = false,
    redMarkersHidden = false,
    jsonHidden = false,
    shapesHidden = false,
    markerLayers = [{main: blueMarkers, hidden: blueMarkersHidden},
                    {main: redMarkers, hidden: redMarkersHidden}]


// I added this for fun.  It allows you to trigger the infowindow
// from outside the map.  
function locateMarker (marker) {
    marker.getLatLng ? projectMap.panTo(marker.getLatLng()).setZoom(13) : projectMap.fitBounds(marker.getBounds()); 
    marker.openPopup();
}

