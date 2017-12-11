// define a new function that pauses media when required



// everything in this file happens inside the window.on(load) function
// it runs when the rest of the window has been loaded
//$(window).on('load', function() {
var loadPopcorn = function () {
  // Create a popcporn instance by calling Popcorn("#id-of-the-media-element")
  // the "pop" object has the full power of the popcorn framework
  var pop = Popcorn("#media", {pauseOnLinkClicked: true});


  // popcorn events are accomplished with plugins.
  // "footnote" is a somewhat misleading name. It actually just
  // pops up some text, starting at 30 seconds
  pop.footnote({
    start: 30,
    end: 50,
    text: "The Verrazano-Narrows bridge looks cool!",
    target: "popcorn-container"
  });
  pop.footnote({
    start: 50,
    end: 90,
    text: "Second Footnote!",
    target: "popcorn-container"
  });
  

  // this event, which is the first one you see, is a little more complicated,
  // because it is running a complex plugin: google maps.
  pop.googlemap({     // run the googlemap plugin; note the open paren followed by open bracket
    "start":0,   // what time, IN SECONDS, to start showing this information 
    "end":30,     // what time to stop
    "target":"popcorn-container", // where to display -- don't forget this!
    type: "HYBRID", //HYBRID (default), ROADMAP, SATELLITE, TERRAIN, STREETVIEW,
    //lat: 43.665429,
    //lng: -79.403323,
    location: "Verrazano-Narrows bridge", //  The location we want our map to display at
    zoom: 15 // Setting the zoom that we would like 
  });  // don't forget to close your brackets

  // this uses the Wikipedia plugin
  pop.wikipedia({
    src:"https://en.wikipedia.org/wiki/Verrazano%E2%80%93Narrows_Bridge",
    start: 50,
    end: 90,
    text: "Verrazano Narrows Bridge",
    target: "popcorn-container"
  });
  pop.footnote({
    src:"https://en.wikipedia.org/wiki/Verrazano%E2%80%93Narrows_Bridge",
    start: 50,
    end: 90,
    text: "Verrazano Narrows Bridge",
    target: "popcorn-container"
  });

  // and, obviously, the image plugin
  pop.image({
    start: 121,
    end: 180,
    src:"http://www.theblaze.com/wp-content/uploads/2013/03/steel-worker-2-620x432.jpg",
    text: "resting",
    target: "popcorn-container"
  });
  
  pop.footnote({
    start: 121,
    end: 600,
    id: "yafn",
    text: "And yet another footnote",
    target: "popcorn-container"
  });

  // Change the above events to your satisfaction, and then add your own events here, before
  // the final brackets.
  // full documentation of all the Popcorn plugins is here:
  // http://popcornjs.org/popcorn-docs/plugins/
  //});
};
