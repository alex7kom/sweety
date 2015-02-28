# Sweety.js

Small and simple DOM manipulation library. It is only a ~1.5KB when minimized and gzipped!

All modern browsers are supported. IE8 and earlier versions of IE are not supported.

__Note__ that it is __not__ a drop-in replacement for jQuery or any other library.

# Installation

Download [the latest version](https://github.com/Alex7Kom/sweety/releases/latest) from Github or use Bower:

```
bower install sweety
```

Then just include `sweety.js` or `sweety.min.js` in your html.

# Use

## Init

Run Sweety to place the Sweety function into a variable of your choice.

```js
var $ = Sweety();
```

## Select

Use this Sweety function to select DOM elements:

```js
$('#id');

$('.class');

$('tag');
```

Sweety supports only simple single queries (for the sake of simplicity).

You can also create DOM elements from HTML code (your HTML must start with `<`):

```js
$('<div></div>');
```

Or you can wrap an existing DOM element:

```js
$(document.getElementById('id'));
```

Find child or parent elements (only by tag or class):

```js
$('.class').findChild('.child-class');
$('.class').findParent('.parent-class');
```

Just return a parent:

```js
$('.class').parent();
```

You can chain all methods that return Sweety object:

```js
$('#id').toggleClass('my-class').setAttr('my-attr', 'my-value');
```

## Manipulate

### Attributes

Get, set and remove attributes:

```js
$('#id').getAttr('my-attr');
$('#id').setAttr('my-attr', 'my value');
$('#id').setAttr({
  'my-attr': 'my value',
  'my-attr-2': 'my value 2'
});
$('#id').removeAttr('my-attr');
$('#id').removeAttr(['my-attr', 'my-attr-2']);
```

Check if the attribute exists (returns `true` or `false`):

```js
$('#id').hasAttr('my-attr');
```

There are jQuery-like shortcuts:

```js
$('#id').attr('my-attr'); // get attribute
$('#id').attr('my-attr', 'my value'); // set attribute
$('#id').val(); // get value
$('#id').val('my value'); // set value
```

### Classes

Add classes one by one, or from a string or an array:

```js
$('#id').addClass('class-3');
$('#id').addClass('class-3 class-4');
$('#id').addClass(['class-3', 'class-4']);
```

Remove classes the same way using `.removeClass` method.

Check if element has a particular class (returns `true` or `false`):

```js
$('#id').hasClass('class-3');
```

Or toggle class:

```js
$('#id').toggleClass('class-3');
```

### Styles

Add CSS style rules to elements:

```js
$('#id').addStyle('text-align', 'right');
$('#id').addStyle({
  'text-align': 'right',
  'text-decoration': 'none'
});
```

There is also `.css` alias method for `.addStyle` method.

Remove CSS style rules from elements (only affects inline CSS style rules):

```js
$('#id').removeStyle('color');
$('#id').removeStyle(['color', 'text-align']);
```

### Append

Append elements to other elements:

```js
$('#id').append(document.getElementById('other_id'));
$('#id').append($('#other_id'));
$('#id').append($('<div id="sweety_test_child"></div>'));
```

### Remove

Remove elements:

```js
$('#id').remove();
```

### HTML

Get inner HTML from the element:

```js
$('#id').html();
```

Set inner HTML:

```js
$('#id').html('<div></div>');
```

Or empty it using a shorthand method:

```js
$('#id').empty();
```

### Events

Bind and unbind events using `.on` and `.off` methods:

```js
$('#id').on('click', myFunc);
$('#id').off('click', myFunc);
```

### Utility

Sweety allows to get just a raw array of selected elements:

```js
$('.class').toArray();
```

### Extensions

You can easily extend Sweety prototype by passing an object with your new methods on initialization:

```js
var $ = Sweety({
  testFunc: function () {
    return this.elements.length;
  }
});
```

# Tests

Install Bower and run `bower install` to install Mocha and should.js. Then open `tests/test.html' in your browser.

# License

The MIT License (MIT)

Copyright (c) 2015 Alexey Komarov <alex7kom@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.