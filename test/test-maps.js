'use strict';

// require modules
const gitCommits = require('git-commits'), fs=require('fs'), hwc=require('html-word-count'),
      gitConfig = require('git-config'),  gitState = require('git-state'), jsonLint = require('jsonlint'), path=require('path');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// try to get jsdom to fetch and execute scripts properly
jsdom.defaultDocumentFeatures = {
  FetchExternalResources: ["script"],
  ProcessExternalResources: true
};


var repoPath = path.resolve(process.env.REPO || (__dirname + '/../.git'));
var ignoreCommitEmails = "matt.price@utoronto.ca";
const matchesProfEmail = function (email, profEmails) {
return (profEmails.indexOf(email) > -1);
};

var studentCommits = 0,
minCommits = 5;
var chai=require('chai'),
expect=chai.expect;
chai.use(require('chai-fs'));

var name,email,githubid;

var indexFile = 'spatial-history/index.html',
    mdFile = 'spatial-histoyr/index.md';

var window, jq;
gitConfig(function (err, config) {
  if (err) return done(err);
  if (config.user.name) {name = config.user.name;}
  if (config.user.email) {email = config.user.email;}
  if (config.github.user) {githubid = config.github.user;}
  
});

// sleeping
function sleep ( ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/////////////////////////////
///
///  tests start here
///
////////////////////////////
var name,email,githubid;

// describe('Git Checks', function() {
//   var  gitCheck;
//   before(function(done) {
//     gitCommits(repoPath)
//       .on('data', function (commit) {
//         if (!matchesProfEmail(commit.author.email, ignoreCommitEmails))
//         {
//           studentCommits++;
//         }
//       })
//       .on('end', function () {
//       })
//     ;

//     gitCheck  = gitState.checkSync('./', function(r,e) {
//       //return [r, e];
//     });
//     done();
//   });

//   it('You should have made at least ' + minCommits + " git commits ", function() {
//     expect(studentCommits).to.be.at.least(minCommits);
//   });

//   it('Git should be configured with username and email information', function() {
//     expect(name, "your Git user name has not been set").not.to.be.undefined;
//     expect(email, "your Git email has not been set").not.to.be.undefined;
//     expect(githubid, "your Github user name has not been set").not.to.be.undefined;
//   });

//   it('All files in current directory should be committed to Git (OK for this to fail while you are still working)', function() {
//     expect(gitCheck.dirty, "looks like you have changed some files and not committed the changes yet").to.equal(0);
//   });

//   it('All changes in current directory should be committed to Git (OK for this to fail while you are still working)', function() {
//     expect(gitCheck.untracked, "looks like you have some files in the directory which have not been added to the repository. \n      Make sure your answers do not rely on them, or tests will fail on the server.").to.equal(0);

//   });
// });


// describe('Check markdown file)', function() {
//   let r = `spatial-history/index.md`;
//   it('index.md  should exist', function() {
//     expect(r, `I can't find the file ${r}`).to.be.a.file();
//   });
//   it('The total word count for your reflection should be at least 275', function() {
//     let content=fs.readFileSync(r, 'utf-8');
//     expect(hwc(content), "").to.be.at.least(275);
//   });
// });

var dom;

// describe('Part 2: Rendered Page', function() {
//   let indexHtml = fs.readFileSync(indexFile, "utf-8");
//     describe('Unit Tests', function() {

//       beforeEach (function (done) {
//         JSDOM.fromFile(indexFile, {runScripts: "dangerously",
//                                    resources: "usable"
// }).then(dom => {
//           var x = dom.window.document.getElementById("contentdiv").innerHTML;
//           setTimeout(10000);
//                     console.log(dom.window.document.getElementById("contentdiv").innerHTML);
//           console.log("DOM is :" + dom.serialize);
//           //dom.window.initializePage();

//         });
//         window = dom.window;
//       //   // jq = q(window);
//       //   global.window = window;
//       //   global.document = window.document;
//       //   setTimeout(2000);
//       // console.log("window is: !!!!!!: " + dom.serialize());
//       done();
//     });
    
//     it('function addLink(node, "Some Name", "https://en.Wikipedia.org/wiki/Some Name") should return the original node with a new <a> tag inside', function() {
//       let td = jq('td')[0],
//           t  = "Some Name",
//           u  = "https://en.wikipedia.org/wiki/" + t;
//       lm.addLink(td,t,u);
//       expect(td,
//              'element has contains no a tag with href ' + u)
//         .to.have.descendant('a').with.attr('href').equal(u);
//       expect(td,
//              'element has no a tag with text ' + t)
//         .to.have.descendant('a').with.text(t);
//       expect(td.textcontent).to.be.undefined;
//       // console.log(td.outerHTML);
//       // assert.equal(lm.addLink(td,t,u).outerHTML,
//       //              jq('<td class="PM"><a href="https://en.wikipedia.org/wiki/Some Name">Some Name</a></td>')[0].outerHTML );
//           });
//     it('function wikify("Elijah Harper") should return "https://en.wikipedia.org/wiki/Elijah_Harper" (Elijah Harper & Elijah_Harper both accepted)',
//        function() {
//       expect((lm.wikify("Elijah Harper" ) == "https://en.wikipedia.org/wiki/Elijah Harper" ||
//                    lm.wikify("Elijah Harper" ) == "https://en.wikipedia.org/wiki/Elijah_Harper"),
//                   "wikify should turn 'Elijah Harper' into either https://en.wikipedia.org/wiki/Elijah Harper" +
//                     " or https://en.wikipedia.org/wiki/Elijah_Harper").to.be.true;
//     });
//     it('function linkifyClass should linkify all elements of a given class', function() {
//       lm.linkifyClass("PM");
//       for(var i = 0; i < jq('td.PM').length; i++) {
//         let el = jq('td.PM')[i]; 
//         expect(el,
//                'this test will fail if a td element does not have a child "a" node')
//           .to.contain('a');
//         expect(el.textcontent,
//                'this test will fail if the td element contains text outside of its child node')
//           .to.be.undefined;
//       }
//       for(var i = 0; i < jq('td.PM a').length; i++) {
//         let el = jq('td.PM a')[i];
//         expect(el,
//                'this test will fail if an <a> element \in the table does not have a Wikipedia href')
//           .to.have.attr('href').with.string("https://en.wikipedia.org/wiki/");
//       }
//     });

//   });

  
//   // describe('Integration tests: does the page load as expected?', function() {
//   //   let indexHtml = fs.readFileSync("spatial-history/index.html", "utf-8");
//   //   beforeEach (function (done) {
//   //     window = new JSDOM(indexHtml).window;
//   //     jq = q(window);
//   //     global.window = window;
//   //     global.document = window.document;
//   //     done();
//   //   });

//   //   it('Check to see whether index.html is still set up correctly. Running updatePage() in index.html should perform the correct updates.', function() {
//   //     lm.updatePage();
//   //     for(var i = 0; i < jq('td.PM').length; i++) {
//   //       let el = jq('td.PM')[i]; 
//   //       expect(el,
//   //              'this test will fail if a td element does not have a child "a" node')
//   //         .to.contain('a');
//   //       expect(el.textcontent,
//   //              'this test will fail if the td element contains text outside of its child node')
//   //         .to.be.undefined;
//   //     }
//   //     for(var i = 0; i < jq('td.PM a').length; i++) {
//   //       let el = jq('td.PM a')[i];
//   //       expect(el,
//   //              'this test will fail if an <a> element \in the table does not have a Wikipedia href')
//   //         .to.have.attr('href').with.string("https://en.wikipedia.org/wiki/");
//   //     }
//   //   });

//   // });

  
// });

var options, dom, parsedMD,mdFile, document,window;
var Remarkable = require('remarkable');
var md = new Remarkable({
  html: true,
  linkify: true}),
    renderedcontent = ""
    // origContent = $("#contentdiv").html();

md.block.ruler.enable([
  'footnote',
  'deflist'
]);
md.inline.ruler.enable([
  'footnote_inline',
  'ins',
  'mark',
  'sub',
  'sup'
]);

var fixture = `  <body>

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Title Here | by Your Name</a> <!-- should be descriptive -->
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>


    <!-- these next 2 divs place the main content inside a box with margins from the screen edge -->
    
    <div class="container">
      <div class = "row">

        <div id="contentdiv">
          <!-- Please don't add content to this div manually unless you're abolutely sure you want to. the contents of index.md will be rendered here, and you can include raw HTML in that file, too, if you wish.   -->
<div class="markers">
  <!-- these buttons hide/show all the markers  -->
  <!-- to hide/show blue or red markers instead, change my_markers below to blue_markers
       to red_markers.  If you have defined your own color (or other) arrays, use those instead -->
  <button onclick="toggleMarkers(my_markers, my_map)" class="rounded" id="hide">Toggle markers</button>
  <button onclick="showMarkers(my_markers, my_map)" id="show"> show markers</button>
</div>
  <div id="mapcontainer">
    <div id="map_canvas"></div>
  </div>
  <div id="map_legend"></div>
</div>

        </div>
      </div>
    </div>
</body>
`
describe('Test if map divs are contained in markdown file', function() {
  before(function() {
    // set up dom with google maps and jquery
    // parse index.md
    mdFile=fs.readFileSync("spatial-history/index.md", "utf-8");
    parsedMD = md.render(mdFile);
    //console.log(parsedMD);
    dom = new JSDOM(parsedMD);
    window=dom.window;
    document=window.document;
    console.log(dom.window.document.querySelector('div#mapcontainer'))
  });
  
  it('should contain mapcontainer element with map_canvas and map_legend', function() {
    expect(document.querySelector('div#mapcontainer'), "no div with id mapcontainer").to.exist;
    expect(document.querySelector('div#mapcontainer div#map_canvas'), "no div with id map_canvas inside mapcontainer").to.exist;
    //expect(document.querySelector('div#mapcontainer div#map_legend'), "no div with id map_legend inside mapcontainer").to.exist;
  });
});



// var setupfile = fs.readFileSync("js/maps-setup.js", "utf-8");
// const { Script } = require("vm");
// var setupscript = new Script(setupfile);
// //var setupscript = new Script(`console.warn("oh noooooo")`);
// describe('check if map renders with unmodified html', function() {
//   before(function() {
//     dom = new JSDOM(fixture, {
//       runScripts: "dangerously",
//       resources: "usable"
//     });
//     window=dom.window;
//     document=window.document;
//     var jqel = document.createElement("script");
//     jqel.src = "http://code.jquery.com/jquery-2.1.4.js";
//     document.body.appendChild(jqel);

//     var mapsel = document.createElement("script");
//     mapsel.src = "http://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyCVtRhi_zYbrx6XcR6c5Wu_VKmXWvnYz5E";
//     document.body.appendChild(mapsel);

//     var setupel = document.createElement("script");
//     setupel.type = "text/javascript";
//     setupel.innerHTML = setupfile;
//     document.body.appendChild(setupel);
//     //var wait = ms => new Promise((r, j)=>setTimeout(r, ms));
//     //wait(15000)
//     setTimeout(dom.runVMScript(setupscript), 20000);
//     //window.eval(`initializeMap();`)
//     //console.log(dom.serialize());

//   });

//   it('map should exist', function() {
//     expect(0).to.equal(1);
//   });
// });










