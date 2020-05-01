# Komma Animation Library

This is the Komma Animation Library or for short: **KAL**.

This will add a *little sugar* that your new site mat need.
By defining the right data properties and some additional custom css properties, it brings some additional awesomeness.

This package has the trigger mechanism for toggling classes for animation.
Also some default animations have been defined that can be use out of the box.

You could also write your own animations and use those, or overwrite some predefined values.
As long as you use the same syntax/states selector for the animation. 

## Demo

Are you curious to what our animation library can do?
Take a look around our own basic website; http://kommabasic.nl/

## Installation

Untill we have a version 1 release we use the direct git link.
This will use the master branch.

```bash
# With npm 
npm install --save https://github.com/KommaGit/kal.git
```

## Usage

First embed the scss file of the kal into your application scss.
In our projects we usually use an ITCSS structure. 
We recommend using a Library layer to embed this file into.
The default variables should go before the @import.
So for example;

```script
$kal-animation-duration: 1200ms !default;
@import "~@komma/kal/kal";
```

Import the library into your app.js.
And just run the init function.

```script
import {KAL} from '@komma/kal';
KAL.init();
```

Then all you need to do is define the elements you want to animate.


### Examples

Here are some examples:

```html
<h1 data-kal="fade">
   Just an example
</h1>

<h2 data-kal="slide-up" style="--kal-duration: 2s; ">
   Another example
</h2>

<h3 data-kal="slide-up" data-kal-once="false">
   And another one
</h3>
```

### Optional settings

If needed you can override some options like so:

```script
KAL.options.rootMargin = '0px 0px -100px 0px';
KAL.options.threshold = 0.2;
KAL.init();
```


## License

MIT
