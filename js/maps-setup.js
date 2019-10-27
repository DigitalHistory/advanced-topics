// initialize the variables we need
// we do this here to make sure we can access them
// whenever we need to -- they have 'global scope'
let my_map, // this will hold the map
    my_map_options, // this will hold the options we'll use to create the map
    myCenter = [41.8986, -90.4768], // *latitude*, then longitude
    myZoom = 4,
    // my_markers = [], // we use this in the main loop below to hold the markers
    // // this one is strange.  In google maps, there is usually only one
    // // infowindow object -- its content and position change when you click on a
    // // marker.  This is counterintuitive, but we need to live with it.  
    // infowindow = new google.maps.InfoWindow({content: ""}),
    legendHTML = "",
    myJSON,
    blueMarkers,
    redMarkers,
    allMarkers;



// I'm complicating things a bit with this next set of variables, which will help us
// to make multi-colored markers
const blueURL = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      redURL = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

// create new icon classes
const myIconClass = L.Icon.extend({
    options: {
        //iconSize:     [38, 95],
	//shadowSize:   [50, 64],
	//iconAnchor:   [22, 94],
	//shadowAnchor: [4, 62],
	//popupAnchor:  [-3, -76]
    }});
// create the new icon types -- cf. https://leafletjs.com/examples/custom-icons/ and
// also https://leafletjs.com/reference-1.5.0.html#icon
const blueIcon = new myIconClass({iconUrl: blueURL}),
      redIcon = new myIconClass({iconUrl: redURL});


// this is for fun, if you want it.  With this powerful feature you can add arbitrary
// data layers to your map.  It's cool. Learn more at:
// https://developers.google.com/maps/documentation/javascript/datalayer#load_geojson
// but essentially: we can add all kinds of features here, including polygons and other shapes
// you can create geoJSON layers here: http://geojson.io/
// and learn more about the format here: https://en.wikipedia.org/wiki/GeoJSON
// to get a fill color, you will need to set the `myColor` property as below. 
const myGeoJSON= {
    "type":"FeatureCollection",
    "features":
    [{"type":"Feature",
      "properties":{myColor: 'red'},
      "geometry":{"type":"Polygon",
                  "coordinates":[[[-85.60546875,49.03786794532644],[-96.6796875,40.713955826286046],
                                  [-79.62890625,37.71859032558816],[-81.2109375,49.26780455063753],
                                  [-85.60546875,49.03786794532644]]]}},
     {"type":"Feature",
      "properties":{myColor: 'green'},
      "geometry":{"type":"Polygon",
                  "coordinates":[[[-113.203125,58.35563036280967],[-114.78515624999999,51.944264879028765],
                                  [-101.6015625,51.944264879028765],[-112.32421875,58.263287052486035],
                                  [-113.203125,58.35563036280967]]]
                 }}]};


/* a function that will run when the page loads.  It creates the map
   and the initial marker.  If you want to create more markers, do it here. */
function initializeMap() {
    // my_map_options = {
    //   center:  my_center, // to change this value, change my_center above
    //   zoom: 13,  // higher is closer-up
    //   mapTypeId: google.maps.MapTypeId.HYBRID // you can also use TERRAIN, STREETMAP, SATELLITE
    // };

    // this one line creates the actual map
    my_map = L.map('map_canvas').setView(myCenter, myZoom);
    // now we add the base layer
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoidGl0YW5pdW1ib25lcyIsImEiOiJjazF0bTdlNXQwM3gxM2hwbXY0bWtiamM3In0.FFPm7UIuj_b15xnd7wOQig'
    })
        .addTo(my_map);



    // and marker layers -- for now, red and blue
    blueMarkers = L.layerGroup([]).addTo(my_map);
    redMarkers = L.layerGroup([]).addTo(my_map);
    allMarkers = L.layerGroup([]).addTo(my_map);
    // my_map = new google.maps.Map(document.getElementById("map_canvas"),
    //                              my_map_options);
    // this is an *array* that holds all the marker info
    ///////////////////////////////
    // YOU NEED TO CHANGE THESE! //
    ///////////////////////////////

    let all_my_markers =
        [{position: [41.9000,12.5000],
          icon: blueIcon, // this sets the image that represents the marker in the map to the one
          // located at the URL which is given by the variable blueURL, see above
          title: "first Marker",
          window_content: "<h1>Marker1</h1><p> and this would be the extended description</p>"
         },
         {position: [41.8902,12.4923],
          icon: blueIcon, // this sets the image that represents the marker in the map
          title: "second Marker",
          window_content: "<h1>Marker2</h1><p> and <a href='http://something'>this would</a> be the extended description</p>"
         },
         {position: [41.8986,12.4768],
          icon: redIcon, // this sets the image that represents the marker in the map
          title: "third Marker",
          window_content: '<h1>Marker3</h1><img title="Picture of Quote. Src: someone, some year"  src="https://s-media-cache-ak0.pinimg.com/736x/6d/e2/25/6de2251b8b4be709dcc936ae4f0caaaf.jpg"/>' +
          '<blockquote>quote quote quote quote</blockquote>'
         }
        ];

    // iterate over the marker array, adding to the main marker layer but
    // *also* to another layer if the icon property is set. 
    for (const m of all_my_markers) {
        let marker =  L.marker (m.position, {
            icon: m.icon,
            title: m.title})
            .bindPopup(m.window_content);
        switch (m.icon) {
        case (blueIcon): {blueMarkers.addLayer(marker)}
        case (redIcon): {redMarkers.addLayer(marker)}
        //default: {marker.addTo(my_map)}
        }
        allMarkers.addLayer(marker);
   
        
    //     // these next lines are ugly, and you could change it to be prettier.
    //     // be careful not to introduce syntax errors though.  
    //     legendHTML +=
    //         "<div class=\"pointer\" onclick=\"locateMarker(my_markers[" + j + "])\"> " +
    //         marker.window_content + "</div>";
    //     marker.info = new google.maps.InfoWindow({content: marker.window_content});
    //     let listener = google.maps.event.addListener(marker, 'click', function() {
    //         // if you want to allow multiple info windows, uncomment the next line
    //         // and comment out the two lines that follow it
            
    //         //this.info.open(this.map, this);
    //         infowindow.setContent (this.window_content);
    //         infowindow.open(my_map, this);
    //     });
    //     my_markers.push({marker:marker, listener:listener});
    //     if (all_my_markers[j].icon === blueURL ) {
    //         blue_markers.push({marker:marker, listener:listener});
    //     } else if (all_my_markers[j].icon === redURL ) {
    //         red_markers.push({marker:marker, listener:listener});
    //     }
        
    // }
    // // actually set the legend HTML
    // $('#map_legend').html(legendHTML);

    // for fun, add some geoJSON from above
    // here we use the myColor attributes of the geoJSON objects from above
    // to actually set the color of the jeogson features
    // strokeWeight "5" is awfully thick and probalby not what you want!
    mapJSON = L.geoJSON(myGeoJSON, {
        style: function(feature) {
            let c = feature.properties.myColor;
            return {color: c, weight: 3, fillColor: c, fillOpacity: 0.5}
        }
    }).addTo(my_map);

    
    // create a rectangle and a circle
    // for more info on shapes you can draw, look at the
    // API docs: https://developers.google.com/maps/documentation/javascript/examples/polygon-simple
    // https://developers.google.com/maps/documentation/javascript/examples/rectangle-simple
    // etc. 
    let romeRectangle = L.rectangle([
        [41.920, 12.501],
        [41.900, 12.485]
    ], {
        color: 'maroon',
        opacity: 0.8,
        weight: 2,
        fillColor: 'saddlebrown',
        fillOpacity: 0.35
    });

    let romeCircle = L.circle([41.8900, 12.4900], {
        color: 'darkgreen',
        opacity: 0.8,
        weight: 2,
        fillColor: 'forestgreen',
        fillOpacity: 0.35,
        radius: 1000
    });  

    let shapes = L.layerGroup([romeRectangle, romeCircle]).addTo(my_map);

    let layerList = {"Blue Markers": blueMarkers,
                     "Red Markers": redMarkers,
                     "GeoJSON": mapJSON,
                     "Shapes": shapes};
    L.control.layers(null, layerList).addTo(my_map);
}


// probably always want to use this toggle function instead!!
function toggleLayer (layer, layerHidden) {
    if (layerHidden) {
        my_map.addLayer(layer);
        console.log("hidden true")
    } else {
        my_map.removeLayer(layer);
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
                    {}]


// I added this for fun.  It allows you to trigger the infowindow
// from outside the map.  
function locateMarker (marker) {
    console.log(marker);
    my_map.panTo(marker.marker.position);
    google.maps.event.trigger(marker.marker, 'click');
}
