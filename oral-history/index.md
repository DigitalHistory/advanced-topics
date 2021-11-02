# Part 2: Unions and union Busting

It's not possible in markdown to write a javascript-style href property, so to use this cool trick  we need to write aout a full HTML tag,<a href="javascript:seek(75)"> like this one which seeks to 1:15</a>.


# Your Title should go in the appropriate place in `index.html`, not here! Title is itself set only in the `<head>` element

## Use headings only if you want to have subsections in your essay



Add your content here, including _markup_ of **various kinds**. Now you can just write! But you should be aware of a couple of advanced features of markdown:
- you can embed HTML directly n a markdown file. This is great if you want to add complex attributes like **classes**, e.g. to your `img` tags so that they display properly (though you can also use the `{.css-selector}` method ddescribed in the main readme.
  - a particular use of embedded HTML is for funky javascript function links. I've written a simple function that will seek to a particular time code in seconds.  You can call it like this: `<a href="javascript:seek(75)">seek to 1:15</a>`, but `[seek to 1:15](javascript:seek(75))` won't render properly, so you have to type the whole link in, as seen here: <a href="javascript:seek(75)"> seek to 1:15</a>.
  - also, markdown-it supports pandoc-style footnotes, which can be helpful sometimes. Here are some examples of footnotes at work:

    Footnote 1 link[^first].

    Footnote 2 link[^second].

    Inline footnote^[Text of inline footnote] definition.

    Duplicated footnote reference[^second].


[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

and remember tables, if you want them: 

| heading | Heading |
| ------| ----- |
| content | content |
| content | content |
| content | content |
{.striped}
