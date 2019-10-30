// use this file to set constant elements that don't change
// across individual pages

let menuEntries = [
  {text: "Home",
   link: 'index.html'},
  {text: 'Oral History',
   link: 'oral-history/index.html'},
  {text: 'Mapping',
   link: 'spatial-history/index.html'},
  {text: 'Proposal',
   link: 'project-proposal/index.html'}
];


let authorName='YOUR NAME HERE',
    footerHtml=`HTML projects by ${authorName}, originally written for <a href="https://digitalhistory.github.io/dh-website/">HIS393: Digital History</a>`;


function makeMenu (items= menuEntries) {
  let prefix = '',
      html = '',
      basedir = window.location.pathname.split(/\//g).splice(-2)[0]; // check which dir we're in
    // console.log("checking location");
    // console.log(basedir);
    // console.log(window.location.pathname)
    if (! (basedir === 'advanced-topics' || basedir === "")) {
    prefix = '../';
  }
  for (let i of items) {
    html += `<a href="${prefix}${i.link}">${i.text}</a>`;
  }
  html = '<div class="nav-right">' + html + "</div>";
  $('header.nav').append(html);
}
 
function makeFooter (html) {
  $('footer#page-footer').html(`<main>${html}</main>`);
}

makeMenu (menuEntries);
makeFooter (footerHtml);



