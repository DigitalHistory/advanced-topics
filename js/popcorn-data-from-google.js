// declare the popcorn var in the global psace so we can access later
let pop;
//$(window).on('load', function() {
var loadPopcorn = function(){
    // Create a popcporn instance by calling Popcorn("#id-of-the-media-element")
    pop = Popcorn("#media")
        // add default apiKey option for all googlemap events
        .defaults ('googlemap', {
        apiKey: "AIzaSyAJxAlu3l5sKbilIJst2_0RFF7ATv0jTuA" // replace w/ yr own key if you have one!!
    })
        // add default apiKey option for all leaflet events
        // if you plan to make this public, you should sign up for your own key! 
        .defaults ('leaflet',
                  {apiKey: 'pk.eyJ1IjoidGl0YW5pdW1ib25lcyIsImEiOiJjazF0bTdlNXQwM3gxM2hwbXY0bWtiamM3In0.FFPm7UIuj_b15xnd7wOQig'
                  })
        // set default target for *ALL* supported plugins (there are some unsupported ones too)
        .defaults(['code', 'flickr', 'googlemap',
                   'footnote', 'markdown', 'mustache', 'text', 'subtitle',
                   'timeline', 'webpage', 'wikipedia', 'wordriver'],
                  {target: 'popcorn-container'});

    

    // Next we need to identify which Google spreadsheet we're going to want to use.  
    // You'll need to change the key to match your spreadsheet. 
    // Instructions are here: https://github.com/jsoma/tabletop#1-publishing-your-google-sheet
    // It's very important, though, to keep the same column headers as in our example spreadsheet:
    // https://docs.google.com/spreadsheets/d/1pL_Lj62_ZcW7iawTCQ_5BQsmdynCtC8y5BCNy3k2LOM/
    let public_spreadsheet_key = 'https://docs.google.com/spreadsheets/d/1pL_Lj62_ZcW7iawTCQ_5BQsmdynCtC8y5BCNy3k2LOM/pubhtml?gid=0&single=true';

    // now we are going to use the tabletop.js library, which was called in our 
    // HTML file, to grab the date from the spreadsheet and process it so that 
    // popcorn can use it.  
    let mytables = Tabletop.init( { key: public_spreadsheet_key,
                                    parseNumbers: true,
                                    postProcess: jsonifyStrings,
                                    callback: processInfo ,
                                    simpleSheet: false } );

    // if you're having problems with this, you can uncomment the next line and 
    // look in the browser's console to see if the data looks like it's supposed to.
    // console.log(mytables.data);

    // play the video right away
    // pop.play();
};


// This is our spreadsheet "callback function".  When tabletop grabs the spreadsheet data,
// it gets sent here and processed.  We take advantage of this feature of tabletop
// to have our events get automatically created.
// so, *this is where thee work really happens!*
function processInfo(sheets) {
    // console.log(sheets);
    // in this example "simpleSheet" is turned OFF, so 
    // we need to select only the data in the sheet we're 
    // looking for.  In my example the sheet containing popcorn-data is 
    // called "popcornSheet".  If you name your sheet something else this won't
    // work.  
    var data = sheets["popcorn-data"].all();

    // this loop runs once for each row in the spreadsheet. 
    for (let event of data) {
        // uncomment this for debugging
        // console.log(event);

        // first we're going to collect all the non-empty values from the row
        // in a new object
        let params = {};
        // this difficult-to-read function iterates through the properties of `event`
        // and checks if the property value is "truthy". If so, it adds that property and
        // its value to the new `params` object.
        Object.keys(event).forEach((prop) => {
            if (event[prop]) { params[prop] = event[prop]; }
        });

        // use the plugin column to create a popcorn event of type "plugin"
        // good thing `pop` is in the global namespace or we wouldn't be able to use it here!
        pop[event.plugin] (params);
        // if you want to use some of the other plugins -- like Wikipedia --
        // you will have to add the relevant columns to the spreadsheet & then add
        // some code to this function!


        // this is another debugging line -- if things aren't working right you can
        // uncomment it & see what's going wrong in the console.  
        // console.log(pop);
    }
}


/**
 * simple helper function to parse json stored in cells
 * (currently only for leaflet `fly` parameter)
 * it is called by Tabletop's `postProcess` event -- after the data is retrieved,
 * but before the callback function.
 * @param {} row
 * @returns {} 
 */
function jsonifyStrings (row) {
    if (row.fly) {
        // console.log(row.fly);
        row.fly = JSON.parse(row.fly)
    }
    return row;
}


// one more function that allows us to write start and end times in human-friendly format like 1:05:14.6
// stolen from Atul's cool instappin' project from 2011:
// https://github.com/toolness/instapoppin/blob/gh-pages/instapoppin.js
// added some comments so you can follow it. 
function getTimestampInSeconds(ts) {
    if (ts.length == 0)
    {return 0}
    var timeParts = ts.split(':'); // divides the timecode up into parts and returns an array of the parts.
    realTimeParts = [];
    timeParts.forEach(function(number) { // for each part of the array, run this function
        if (number.length == 0)
        {number = '00'}
        var floatNumber = parseFloat(number); // turn the array part into a 'float', which is a number with a decimal point
        if (isNaN(floatNumber))  // if it is not a number you're in trouble
        {throw new ParseError('unable to parse time: ' + ts)}
        realTimeParts.push(floatNumber);
    });
    switch (realTimeParts.length) {  // the 'switch/case' structure performs a different action depending on the length of the array
    case 1:
        // It's a pure seconds-based offset.
        return realTimeParts[0];
        
    case 2:
        // It's in MM:SS format.
        return realTimeParts[0] * 60 + realTimeParts[1];
        
    case 3:
        // It's in HH:MM:SS format.
        return (realTimeParts[0] * 60 + realTimeParts[1]) * 60 +
            realTimeParts[2];
        
    default:
        throw new ParseError('too many colons in time: ' + ts);
    }
}
