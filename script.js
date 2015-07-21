// initialize the variables we need
// we do this here to make sure we can access them 
// whenever we need to -- they have 'global scope'
var my_map; // this will hold the map
var my_map_options; // this will hold the options we'll use to create the map 
var my_center = new google.maps.LatLng(43.653963,-79.389954); // center of map
var my_markers = []; // we use this in the main loop below to hold the markers
// this one is strange.  In google maps, there is usually only one
// infowindow -- its content and position change when you click on a 
// marker
var infowindow = new google.maps.InfoWindow({content: ""}); 

var my_first_marker; // we'll use this to create one marker by hand.  

/* a function that will run when the page loads.  It creates the map
  and grabs the marker data fom the spreadsheet */
function initialize() {
  my_map_options = {
    center:  my_center, // to change this value, change my_center above
          zoom: 13,  // higher is closer-up
          mapTypeId: google.maps.MapTypeId.HYBRID // you can also use TERRAIN, STREETMAP, SATELLITE
        };
  
  // this one line creates the actual map
  my_map = new google.maps.Map(document.getElementById("map_canvas"),
                               my_map_options);
  
  // This is our first, hand-crafted map marker  
  // Modify all its attributes to replace it with a new marker
  // copy and rename it to create a second marker
  my_first_marker = new google.maps.Marker({
    position: my_center,
    map: my_map,
    title: "First Marker",
    window_content:"<h1>This is the title</h1><p> and this would be the extended description</p>"
  }); 
  my_markers.push({marker:my_first_marker, listener: my_first_listener}); 
  
  // this "listener" checks for mouse clicks and opens the info window
  // you will have to copy, rename, and lighlty modify it if you create a 
  // second marker
  var my_first_listener = google.maps.event.addListener(my_first_marker, 'click', function() {
      infowindow.setContent (this.window_content);
      infowindow.open(my_map, this); 
    });
  
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
