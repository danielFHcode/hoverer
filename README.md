# Hoverer

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](https://github.com/probot/template/blob/master/LICENSE)
[![NPM](https://img.shields.io/badge/npm-v2.0.0-blue.svg)](https://www.npmjs.com/package/hoverer/v/2.0.0-beta.1)
[![Gitter](https://img.shields.io/badge/chat-on%20gitter-brightgreen)](https://gitter.im/hoverer-js/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## About

Hoverer is a library for creating a text box which displays additional information that appears upon hovering on top of an HTML element.

![An example image](readmeFiles/example.png)

## installation

To install you can either use npm:

```console
npm i hoverer@2.0.0-beta.0
```

Or just download the one file from github.

Either way to include the file in your project simply link it in your HTML:

```html
<body>
  <script src="node_modules/hoverer/hoverer.js" defer></script>
</body>
```

## Usage

To apply the hoverer effect to an element you can use one of 2 methods:

1.  Through js using the `applyHoverer` function:

    ```js
    applyHoverer(myElement, "some text");

    // Results in a text box saying 'some text' that shows up when the mouse hovers over `myElement`.
    ```

    With this function you can set a specific piece of text that will show up on hover.

1.  Through html with a data attribute. When doing it this way, you can choose between 2 different data attributes:

    1.  `data-hoverer-text`:

        ```html
        <p data-hoverer-text="some text">piece of text</p>

        <!-- Results in a text box saying 'some text' that shows up when the mouse hovers over the p element. -->
        ```

        With this attribute you can set a specific piece of text that will show up on hover.

    1.  `data-hoverer-infer`:

        ```html
        <img src="someImage.png" alt="an image" data-hoverer-infer="alt" />

        <!-- Results in a text box which displays the content of the 'alt' property of the img element ('an image') and shows up when the mouse hovers over the img element. -->
        ```

        With this attribute you can make hoverer display a piece of text that is based on one of the element's properties that will show up on hover.

        You can also set the attribute to 'auto' and make hoverer decide which property to infer:

        ```html
        <a href="someImage.png" data-hoverer-infer="auto">a link</a>

        <!-- Results in a text box which displays the content of the 'href' property of the `a` element ('an image') and shows up when the mouse hovers over the img element. -->
        ```

        To customize the looks and behavior of hoverer you can use the **new** `hoverer options` API.

        To set the hoverer options of an element when using the `applyHoverer` javaScript function, you can simply pass in an options object:

        ```js
        applyHoverer(element, "piece of text", {
          /*options object*/
        });
        ```

        To set the hoverer options in HTML you can use the `data-hoverer-options` data attribute and pass a JSON options object:

        ```html
        <p
          data-hoverer-options='{"_comment": "options object"}'
          data-hoverer-text="piece of text"
        ></p>
        ```

        The options you can pass are:

        - _size_ - The size of the text box.

        - _delay_ - The amount of secondes between when the mouse hovers over the element and when the text box appears.

        - _transition_ - The time it take to transition between it's visible and invisible states.

        - _style_ - A string containing css styles that will be applied to the text box.

        You can also set the hoverer option globally:

        - with javaScript:

          ```js
          setHovererGlobalOptions({
            /*options*/
          });
          ```

        - with HTML:

          ```html
          <body
            data-hoverer-global-options='{"_comment": "options object"}'
          ></body>
          ```

## What's New In version `2.x beta`?

In this release we have finally started to introduce some customization options!

To customize you can use (as usual) either data attributes:

```html
<p data-hoverer-options="..." data-hoverer-text="piece of text"></p>

<!-- or -->

<body data-hoverer-global-options="..."></body>
```

Or js:

```js
applyHoverer(element, "piece of text", {
  /*options*/
});

// or

setHovererGlobalOptions({
  /*options*/
});
```

For more details you can check out the [Usage](#usage) section.

We do understand that some people may prefer to use older versions without the customization options to reduce unneeded bundle size, and because of that we want to make it clear that we will still be updating versions `1.x`.

In addition we also wan't you to know that although version `2.0.0` is going to be a big release, all `2.x` releases are planed to be backwards compatible with all previous and upcoming `1.x` versions.
