Spatial History with Google Maps
================================

Google Maps and Spatial History
-------------------------------

Today in class we discussed *spatial history*, that is, history which focusses very strongly on the cultural history of space and place. There is nothing *intrinsically digital* about spatial history, nor is it necessarily qunatitative in nature; but the incredible development of Geographical Information Systems (GIS) in the last 15 years has made the use of interactive digital maps an attractive target for historians.

Sophisticated works such as the [Spatial History Project](http://web.stanford.edu/group/spatialhistory/cgi-bin/site/pub.php?id=29) and Ben Schmidt's [Whaling Maps Project](http://sappingattention.blogspot.co.uk/2012/10/data-narratives-and-structural.html) take substantial technical effort to achieve their effects; in general, lengthy training in the use of specialized GIS software is required. We have our own example in the [DECIMA Project](http://decima.chass.utoronto.ca/) run by Prof. Terpstra in our department.

Our approach will be decidedly more lightweight. In class today, we will build a very simple "Geographical Information System" around a Google Map. Google Maps are, in fact, highly sophisticated GIS's, with powerful tools for accessing various layers of information; but in order to work with them, we will need to use a very small amount of Javascript.

Today's exercise is also something of a test. We will be working in the *[markdown](https://help.github.com/articles/markdown-basics/)* syntax ([github flavour](https://help.github.com/articles/github-flavored-markdown/)), and you will also be able to choose between working in the [JSBin Online Editor](http://sbin.com/jusena/edit?html,js,output), which we saw briefly in the first class, and [a copy you can download and work with on your own](https://github.com/titaniumbones/maps-with-markdown). The latter version also serves as an introduction to the [Github code-sharing platform](https://github.com/). If you continue working with code-based academic projects, you will eventually want to learn more about git, which is an enormously powerful resource. Our next assignment will also be made available on Github, so this is a chance to get a head start.

What is a GIS?
--------------

GIS is just a name for any system that tries to capture, manipulate, and represent geographical data. There are many GIS tools; the history department uses [ArcGIS](http://www.arcgis.com/features/), which is expensive and something of an industry standard, while many independent scholars use [QGIS](http://www.qgis.org/en/site/), which is free, open source, and not quite as powerful as Arc.

The data in a GIS is all [geotagged](https://en.wikipedia.org/wiki/Geotagging), that is, assigned a set of geographical co-ordinates. This sounds simple but it is actually quite complex, since any co-ordinate system is a *simplified projection* of real, disordered, 3-dimensional space. Many of the frustrations of working with GIS comes from the difficulty of rendering (say) historical map images *commensurate* with modern, satellite-derived maps.

Within a GIS, information is generally accessed as a set of **layers**. Data of specific types is *stratified* in layers, in much the same way that one creates image layers in photoshop. This image gives a typical example. Note that the creation of layers is itself an intellectual decision, relying on judgments about the relationships between individual bits of data. <http://iolandarch.com/wp-content/uploads/2014/09/overlay-analysis.jpg>

Controlling Google Maps
-----------------------

For our exercise today, we are really only interested in two layers: the "basemap", that is, the street or satellite map most of us use on an almost-daily basis; and the *marker layer*, in which all of the little pins on a map are stored. We access these layers, and create those markers, with Javascript, by making *calls* to the *Google Maps API*.

An **API** is an "Application Programming Interface": a communications channel that lets programs talk to each other. By "loading" the Google Maps API, our web pages can communicate directly with Google's servers to modify the map that Google is presenting to us. In fact, most of the interesting stuff happening on the web these days happens via these machine-to-machine communication channels.

You don't have to understand the Google Maps API very thoroughly to be able to do this assignment. The code comes pre-written; all you have to do is hack at it till it does what you want it to.

Using Markdown
--------------

It was useful to learn HTML but it is a pain to generate it by hand. You do have to do some hand-coding of HTML for this exercise, because some of the work actually happens in Javascript; but the rest of it can be done in markdown, which I find much easier to write than HTML.

``` markdown
# one or more '#' marks indicates a headline

### this one is "level 3"

*a single asterisk is emphasis, or italics*

**two are strong, or bold**

An empty line separates paragraphs.

> blockquotes are made with angle brackets
> like this

```

You can also mix HTML in with markdown and it will generally render perfectly well. This is important for us because we have to create some `<div>` elements, which markdown can't do for us.

The Exercise
------------

Today you will create a web page containing a Google Map. The Google Map will contain 1-3 markers related to one of the themes we wrote on the blackboard in our last class. It will also contain a VERY brief essay that discusses the historical significance of the events represented by those markers, all the while paying homage to the project of spatial history: foregrounding the spatial elements of the historical narrative at hand. You're not handing in your work, so don't fret too much. Try to enjoy yourself; but also work hard, as this is good preparation for our next assignment, which wil lbe handed out in class on Thursday.

The code
--------

### Javascript

I have made the Javascript as simple as I can. There are more efficient and interesting ways to do this, but they are a little more complex. To make your markers -- and to re-centre your map -- you will need to modify the Javascript directly.

### HTML

I *think* the only modifications you will need to make to the HTML are within the special "textarea" block containing the markdown syntax. The rest you can probably safely ignore, though you might learn something from looking at it.

### CSS

The CSS for this exercise is deceptively simple. We make only a few small changes tothe defaults, *but* we are cheating here. The [strapdown](http://strapdownjs.com/) javascript library which enables us to magically write using markdown, *also* magically loads the incredible [bootstrap](http://getbootstrap.com/) web development framework, which includes some sophisticated CSS. Try changing the first `textarea`'s `theme=united` to one of the other supported "swatches" -- I'm a fan of "cyborg" and "slate", myself.
