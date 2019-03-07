# Next Section

The rest of your essay should go under the map. What I've written here is a kind of markdown refresher; maybe don't delete it right away, and/or obokmark [the markdown-it demo](https://markdown-it.github.io/) where you cna bractice markdown yourself.  

## in sections like this

Remember you can use _italics_ and __bold__ which can also be written *like this* or **like this**
etc. Be sure to [make use of links](http://digital.hackinghistory.ca) -- that's one of the reasons we write on the Web, and I've asked you to use links for all yor footnotes/references as well.


We're using [markdown-it](https://github.com/markdown-it/markdown-it) to parse markdown and render it into HTML, and you cna read about all its features in the GH repository.  We use the commonpark settings, as well as some extensions: 

- [github-style tables](https://help.github.com/en/articles/organizing-information-with-tables)
- [css-like attributes](https://github.com/arve0/markdown-it-attrs)
- [footnotes](https://github.com/markdown-it/markdown-it-footnote)


you can also add emoji like in github :pizza: :maple_leaf:, though you may need to mess around with fonts to get it to work the way you want :-). See [list of emoji](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json) for options.  

> make blockquotes with greater-than signs.  In the unlikely evne that you wnat to nest them, that is also possible.  

<section id="just-testing" class="style-me-if-you-want">

**Note:** to use markdown syntax inside of HTML tags, as has been done here, be sure [leave empty lines below the html tag and above the closing tag](https://stackoverflow.com/questions/29368902/how-can-i-wrap-my-markdown-in-an-html-div#answers-header). You may possibly want to do htis if you need to create high-level sections to use for flexbox or grid styling. 

</section>


## This Heading has a class "example" and ID "specific" {#specific .example}

add footnotes like this[^1] or like this ^[this is just some markdown text which wil lrender as a footnote link]

footnotes willl be renumbered as you go[^note2]

[^1]: note here

[^note2]: you don't have to use sequential numbers, in fact you can cal lthem whatever you want 
