// initialize the variables we need
// we do this here to make sure we can access them 
// whenever we need to -- they have 'global scope'
var my_map; // this will hold the map
var my_map_options; // this will hold the options we'll use to create the map 
var my_center = new google.maps.LatLng(43.653963,-79.389954); // center of map
var my_markers = []; // we use this in the main loop belowa to hold the markers
// this one is strange.  In google maps, there is usually only one
// infowindow -- its content and position change when you click on a 
// marker
var infowindow = new google.maps.InfoWindow({content: ""});



/* a function that will run when the page loads.  It creates the map
 and the initial marker.  If you want to create more markers, do it here. */
function initialize() {
    my_map_options = {
        center:  my_center, // to change this value, change my_center above
        zoom: 13,  // higher is closer-up
        mapTypeId: google.maps.MapTypeId.HYBRID // you can also use TERRAIN, STREETMAP, SATELLITE
    };
    
    // this one line creates the actual map
    my_map = new google.maps.Map(document.getElementById("map_canvas"),
                                 my_map_options);
    // this is an *array* that holds all the marker info
    var all_my_markers =
            [{position: new google.maps.LatLng(43.653963,-79.389954),
              map: my_map,
              title: "first Marker",
              window_content: "<h1>Marker1</h1><p> and this would be the extended description</p>"
             },
             {position: new google.maps.LatLng(43.652843,-79.399952),
              map: my_map,
              title: "second Marker",
              window_content: "<h1>Marker2</h1><p> and this would be the extended description</p>"
             }];

    for (j = 0; j < all_my_markers.length; j++) {
        var this_marker =  new google.maps.Marker({
            position: all_my_markers[j].position,
            map: my_map,
            title: all_my_markers[j].title,
            window_content: all_my_markers[j].window_content});
        var this_listener = google.maps.event.addListener(this_marker, 'click', function() {
            infowindow.setContent (this_marker.window_content);
            infowindow.open(my_map, this_marker); 
        });
        my_markers.push({marker:this_marker, listener: this_listener});
    };

}

// this hides all markers in the array
// passed to it, by attaching them to 
// an empty object (instead of a real map)
function hideMarkers (marker_array) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(null);
    }
}
// by contrast, this attaches all the markers to 
// a real map object, so they reappear
function showMarkers (marker_array, map) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(map);
    }
}
