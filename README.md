# Komma Animation Library

Welcome at the Komma Animation Library or for short **KAL**.

Will add the *little sugar* that your new site needs.
By defining the right data properties and some additional custom css properties, it brings some additional awesomeness.

This package has the trigger mechanism for toggling the classes for animation.
Also some default animation have been defined that can be use outside of the box.

If you're really are in a lot of leftover time you could also write your own animation and use that.
As long as you use the same syntax/states selector for the animation. 

## Demo

Are your curious to what our animation library can do?
Take a look around our own basic website; http://kommabasic.nl/

## Installation

Till we have version we use the direct git link.
This will use the master branch.

```bash
# With npm 
npm install --save https://github.com/KommaGit/kal.git
```

## Usage

First embed the scss file of the kal into your application scss.
In our projects we usually use an ITCSS structure. 
We recommend using a Library layer to embed this file into.
The default variables should be above the scss.
So for example;

```script
$kal-animation-duration: 1200ms !default;
@import "~@komma/kal/kal";
```

Import the library into your app.js.
And just run the init function.

```script
import {KAL} from '@komma/kal'
KAL.init();
```

Then al you need to do is defined the elements you want to animate.


### Examples

Here are some examples:

```html
<h1 class="c-my-title"  data-kal="zoom-in">
   Just an example
</h1>

<h2 class="c-my-title"  data-kal="slide-up" style="--kal-duration: 2s; ">
   Another example
</h2>

<h3 class="c-my-title"  data-kal="slide-up" data-kal-once="false">
   And another one
</h3>
```

## License

MIT
