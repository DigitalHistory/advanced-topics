let entries = [
  {text: "Home",
   link: 'index.html'},
  {text: 'Oral History',
   link: 'oral-history/'},
  {text: 'Mapping',
   link: 'spatial-history/'},
  {text: 'Proposal',
   link: 'project-proposal/'}
];

let current = location.pathname;

function makeMenu (items= entries, path =current) {
  let allPaths = [];
  let prefix = '';
  let html = '';
  for (let i of items) {
    if (i.link !== 'index.html') {
      allPaths.push(i.link);
    }
  }
  for (let p of allPaths) {
    if (path.includes(p)) {
      prefix= '../';
      break;
    }
  }
  for (let i of items) {
    html += `<li><a href="${prefix}${i.link}">${i.text}</a></li>`
  }
  html = '<ul class="nav navbar-nav navbar-right">' + html + "</ul>";
  $('#bs-example-navbar-collapse-1').before(html);
}

makeMenu (entries, current);


