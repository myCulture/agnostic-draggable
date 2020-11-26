# agnostic-draggable

Most of UI developers that worked with web apps from 2008 to 2014 certainly used or at least searched for a library implementing Drag & Drop support. From all the libraries that were available within that period, [jQuery UI](https://jqueryui.com/) was certainly one of the best choices.

Years later, most of the web applications are tied to frameworks or rendering libraries like Angular, Vue and React and keeping jQuery and jQuery UI as a dependency to these projects can be a headache. In fact, moving away from jQuery is something that many development teams have experienced after these frameworks came into the scene.

However, finding a good replacement for what jQuery UI used to offer in terms of drag/drop capabilities is not easy. If you are looking for a solution that is tied to your framework/library of choice, there are plenty of options for you. But if you are looking for a VanillaJS based and agnostic implementation of drag & drop, you can find yourself browsing for a couple of hours finding just a few consistent options.

[Shopify/Draggable](https://github.com/Shopify/draggable) is a nice alternative, although it has some crucial behavior changes compared with what jQuery UI used to offer. [SortableJS](https://github.com/SortableJS/sortablejs) offers something similar to what the jQuery UI`s Sortable widget offers. By looking at the examples, it seems to be even possible to mimic the behavior of the "connectToSortable" option of jQuery UI's Draggable widget, that allows an item to be dragged onto a list that has sort capabilities. Native Drag & Drop implementation from the browser? Forget it until it can support dragging an element using a cloned helper node. Furthermore, the API offered by the native implementation really sucks.

The solution? Translate the implementation of the Draggable, Droppable and Sortable widgets from jQuery UI into an agnostic, VanillaJS and ES6 based library. Most of the options and features found in the original widget implementations by jQuery UI's team are here. The ones that were not ported were just not part of the subset of features that I thought to be the most important ones. This doesn't mean that contributors cannot help finishing the taks of bringing them in.

## Install

Using NPM, type in the following command to install `agnostic-draggable`:

```
npm i agnostic-draggable --save
```

# Usage and Documentation

### Draggable

Enables dragging functionality on any DOM element. Move the Draggable element by clicking on it and dragging it anywhere within the viewport.

Elements modified or created will use the same CSS classes from jQuery UI:

-   ui-draggable: the element being dragged
-   ui-draggable-handle: the handle of the draggable element. By default, each draggable is also a handle
-   ui-draggable-helper: the dragging helper

#### Options

|                      Name                       |    Type     |                  Default                  |                               Description                                |
| :---------------------------------------------: | :---------: | :---------------------------------------: | :----------------------------------------------------------------------: |
|          **[`appendTo`](#appendTo-1)**          | `{String}`  |                 `parent`                  |                   Where to append the dragging helper.                   |
|              **[`axis`](#axis-1)**              | `{String}`  |                   null                    |                 Constraint dragging movement to an axis.                 |
|  **[`connectToSortable`](#connectToSortable)**  | `{String}`  |                   null                    | Allows the Draggable to be dropped onto the specified Sortable elements. |
|       **[`containment`](#containment-1)**       |  `{String   |                  Array}`                  |                                   null                                   | Constraints dragging movement to an element or region. |
|            **[`cursor`](#cursor-1)**            | `{String}`  |                   null                    |             Allows changing the cursor style while dragging.             |
|          **[`disabled`](#disabled-1)**          | `{Boolean}` |                  `false`                  |                 Allows disabling the dragging behaviour.                 |
|          **[`distance`](#distance-1)**          | `{Number}`  |                    `0`                    |              Distance in pixels before dragging can start.               |
|              **[`grid`](#grid-1)**              |  `{Array}`  |                   null                    |        Snaps the dragging helper to a grid, every x and y pixels.        |
|            **[`handle`](#handle-1)**            | `{String}`  |                   null                    |           Dragging only starts if click matches this selector.           |
|            **[`helper`](#helper-1)**            |  `{String   |                Function}`                 |                                `original`                                | Configures the dragging helper node. |
|           **[`opacity`](#opacity-1)**           | `{String}`  |                   null                    |               Allows changing the opacity while dragging.                |
|            **[`revert`](#revert-1)**            |  `{Boolean  |                  String                   |                                Function}`                                | `false` | Whether the element should be reverted after dragging stops. |
|    **[`revertDuration`](#revertDuration-1)**    | `{Number}`  |                   `200`                   |            Duration in milliseconds of the revert animation.             |
|             **[`scope`](#scope-1)**             | `{String}`  |                 `default`                 |    Used to group sets of Draggable, Droppable and Sortable elements.     |
|            **[`scroll`](#scroll-1)**            | `{Boolean}` |                  `true`                   |               Allows auto-scrolling within the container.                |
| **[`scrollSensitivity`](#scrollSensitivity-1)** | `{Number}`  |                   `20`                    |                      Scroll sensitivity in pixels.                       |
|       **[`scrollSpeed`](#scrollSpeed-1)**       | `{Number}`  |                   `10`                    |                         Scroll speed in pixels.                          |
|              **[`skip`](#skip-1)**              | `{String}`  | `input, textarea, button, select, option` |           Prevents dragging when this CSS selector is matched.           |
|              **[`stack`](#stack)**              | `{String}`  |                   null                    | Manages the z-indexes of Draggable elements matching this CSS selector.  |
|            **[`zIndex`](#zIndex-1)**            | `{Number}`  |                   null                    |               Allows changing the z-index while dragging.                |

### `appendTo`

Type: `String`
Default: `parent`
Accepted values: `parent` or a CSS selector

Which element the dragging helper should be appended to while dragging.
Only works when the [`helper`](#helper-1) option is set to not use the original element.

```html
<div id="drag1">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	appendTo: 'body'
});
```

### `axis`

Type: `String`
Default: null
Accepted values: `x` or `y`

Constrains dragging to either the horizontal (x) or vertical (y) axis.

```html
<div id="drag1">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	axis: 'x'
});
```

### `connectToSortable`

Type: `String`
Default: null
Accepted values: a CSS selector

Allows the Draggable to be dropped onto the specified Sortables. If this option is used, a Draggable can be dropped onto a Sortable list and then becomes part of it. Note: The `helper` option must be set to `clone` in order to work flawlessly.

```html
<div id="drag1">Drag Me</div>

<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Draggable, Sortable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	connectToSortable: '#sort1'
});
new Sortable(document.querySelector('#sort1'));
```

### `containment`

Type: `String|Array`
Default: null
Accepted values: `parent`, `document`, `window`, a CSS selector or an array of 4 numbers in the form `[x1, y1, x2, y2]`

Constrains dragging to within the bounds of the specified element or region.

```html
<div id="drag1">Drag Me</div>
<div id="drag2">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	containment: 'window'
});
new Draggable(document.querySelector('#drag2'), {
	containment: [100, 100, 800, 800]
});
```

### `cursor`

Type: `String`
Default: null
Accepted values: any values accepted by the `cursor` CSS property

Allows changing the cursor style while dragging the element.

```html
<div id="drag1">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	cursor: 'move'
});
```

### `disabled`

Type: `Boolean`
Default: `false`

Determines whether the Draggable instance should be disabled.

```html
<div id="drag1">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	disabled: true
});
```

### `distance`

Type: `Number`
Default: `0`

Distance in pixels that the mouse should move before the dragging should start. Prevents unwanted drags when the Draggable element is clicked.

```html
<div id="drag1">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	distance: 10
});
```

### `grid`

Type: `Array`
Default: null
Accepted values: an array of 2 numbers in the form `[x, y]`

Snaps the dragging helper to a grid, every x and y pixels.

```html
<div id="drag1">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	grid: [10, 10]
});
```

### `handle`

Type: `String`
Default: null
Accepted values: a CSS selector

If specified, restricts dragging from starting unless the mousedown occurs on the specified element(s). Only elements that descend from the Draggable element are permitted.

```html
<div id="drag1">
	<span class="handle">Drag Me</span>
</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	handle: '.handle'
});
```

### `helper`

Type: `String|Function`
Default: `original`
Accepted values: `original`, `helper` or a function

Allows for a helper element to be used for dragging display.
If set to `clone`, then the element will be cloned and the clone will be dragged.

```html
<div id="drag1">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	helper: 'clone'
});
```

### `opacity`

Type: `Number`
Default: null
Accepted values: values accepted by the `opacity` CSS property

Allows changing the opacity of the element while being dragged.

```html
<div id="drag1">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	opacity: 0.5
});
```

### `revert`

Type: `Boolean|String|Function`
Default: `false`
Accepted values: `invalid`, `valid`, `true`, `false` or a function

Whether the element should revert to its start position when dragging stops.
If set to `true`, the element will always revert.
If set to `invalid` or `valid` it will respectively revert if dropped on a droppable or not.

```html
<div id="drag1">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	revert: 'invalid'
});
```

### `revertDuration`

Type: `Number`
Default: `200`

Uses an animation with this specific duration in milliseconds when reverting the element.

```html
<div id="drag1">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	revert: 'invalid',
	revertDuration: 500
});
```

### `scope`

Type: `Stringr`
Default: `default`

Used to group sets of Draggable, Droppable and Sortable elements, in addition to Droppable's [`accept`](#accept) option. A Draggable with the same scope value as a Droppable will be accepted by it.

```html
<div id="drag1">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	scope: 'my-scope'
});
```

### `scroll`

Type: `Boolean`
Default: `true`

If this option is set to `true`, the container of the element will auto-scroll if needed.

```html
<div id="drag1">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	scroll: true
});
```

### `scrollSensitivity`

Type: `Number`
Default: `20`

Determines how close to the edge of the viewport the auto-scroll should happen. Distance is realtive to the mouse pointer, not to the dragging element.

> This option is ignored if [`scroll`](#scroll-1) is set to `false`.

```html
<div id="drag1">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	scroll: true,
	scrollSensitivity: 50
});
```

### `scrollSpeed`

Type: `Number`
Default: `10`

The speed in pixels at which the container should auto-scroll when the distance in [`scrollSensitivity`](#scrollSensitivity-1) is met.

> This option is ignored if [`scroll`](#scroll-1) is set to `false`.

```html
<div id="drag1">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	scroll: true,
	scrollSpeed: 20
});
```

### `skip`

Type: `String`
Default: `input, textarea, button, select, option`
Accepted values: a CSS selector

Prevents dragging if the clicked element matches the given CSS selector.

```html
<div id="drag1">
	<span class="skip">Don't Drag Me</span>
	<span>Drag Me</span>
</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	skip: '.skip'
});
```

### `stack`

Type: `String`
Default: null
Accepted values: a CSS selector

Manages the z-indexes of Draggable elements matching the given CSS selector.
Brings the currently dragged element to the front compared with other members of the stack.

```html
<div id="drag1" class="draggable">Drag Me</div>
<div id="drag2" class="draggable">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	stack: '.draggable'
});
new Draggable(document.querySelector('#drag2'), {
	stack: '.draggable'
});
```

### `zIndex`

Type: `Number`
Default: null

Allows to change the z-index of the element when being dragged.

```html
<div id="drag1">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	zIndex: 1000
});
```

#### Events

|          Name          |                                     Description                                     |
| :--------------------: | :---------------------------------------------------------------------------------: |
|  **`draggable:init`**  |                      Called when the Draggable is initialized.                      |
|    **`drag:start`**    |             Called when the drag operation is started. Can be canceled.             |
|    **`drag:move`**     |                 Called while dragging the element. Can be canceled.                 |
|    **`drag:stop`**     | Called when the drag operation stops. Can be canceled, preventing an unwanted drop. |
| **`draggable:destry`** |                       Called when the Draggable is destroyed.                       |

#### Cancelling an event

```html
<div id="drag1">Drag Me</div>
```

```js
import { Draggable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), null, {
	'drag:start': function (event) {
		event.cancel();
	}
});
```

### Droppable

Transforms elements into droppables or drop zones. This means that elements controlled by a [`Draggable`](#draggable) can be dropped into a droppable if accepted by them.

Elements modified or created will use the same CSS classes from jQuery UI:

-   ui-droppable: the droppable element
-   ui-droppable-active: identifies an active droppable element
-   ui-droppable-hover: used when the droppable has a draggable intersecting with it

#### Options

|              Name               |    Type     |   Default   |                            Description                            |
| :-----------------------------: | :---------: | :---------: | :---------------------------------------------------------------: |
|     **[`accept`](#accept)**     | `{String}`  |     `*`     |          Controls which Draggable elements are accepted.          |
|  **[`disabled`](#disabled-2)**  | `{Boolean}` |    null     |             Allows disabling the Droppable behaviour.             |
|     **[`greedy`](#greedy)**     | `{Boolean}` |   `false`   |       How to handle dropping on nested Droppable elements.        |
|     **[`scope`](#scope-2)**     | `{String}`  |  `default`  | Used to group sets of Draggable, Droppable and Sortable elements. |
| **[`tolerance`](#tolerance-1)** | `{String}`  | `intersect` |       Intersection mode between Draggables and Droppables.        |

### `accept`

Type: `String|Function`
Default: `*`
Accepted values: a CSS selector or a function

Controls which Draggable elements can be accepted by this Droppable.
It can be a CSS selector that needs to match the accepted Draggables or a function that receives each dragging element, accepting if it returns true.

```html
<div id="drag1">Drag Me</div>
<div id="drop1">Drop Here</div>
```

```js
import { Draggable, Droppable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'));
new Droppable(document.querySelector('#drop1'), {
	accept: '#drag1'
});
```

### `disabled`

Type: `Boolean`
Default: `false`

Allows disabling the Droppable if set to `true`.

```html
<div id="drag1">Drag Me</div>
<div id="drop1">Drop Here</div>
```

```js
import { Draggable, Droppable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'));
new Droppable(document.querySelector('#drop1'), {
	disabled: true
});
```

### `greedy`

Type: `Boolean`
Default: `false`

By default, when an element is dropped on nested Droppables, each Droppable will receive the element. However, by setting this option to `true`, any parent Droppables will not receive the element.

```html
<div id="drag1">Drag Me</div>
<div id="drop1">
	<div>Drop Here</div>
	<div id="drop2">Or Drop Here</div>
</div>
```

```js
import { Draggable, Droppable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'));
new Droppable(document.querySelector('#drop1'), {
	accept: '#drag1'
});
new Droppable(document.querySelector('#drop2'), {
	accept: '#drag1',
	greedy: true
});
```

### `scope`

Type: `String`
Default: `default`

Used to group sets of Draggable, Droppable and Sortable elements, in addition to the [`accept`](#accept) option. A Droppable will only accept a Draggable of the same scope.

```html
<div id="drag1">Drag Me</div>
<div id="drop1">Drop Here</div>
```

```js
import { Draggable, Droppable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'), {
	scope: 'my-scope'
});
new Droppable(document.querySelector('#drop1'), {
	scope: 'my-scope'
});
```

### `tolerance`

Type: `String`
Default: `intersect`
Accepted values: `fit`, `intersect`, `pointer`, `touch`

Specifies which mode to use for testing whether a Draggable is hovering over a Droppable.
The `fit` option requires the draggable to overlap the droppable entirely.
The `intersect` option requires the draggable to overlap the droppable at 50% in both directions.
The `pointer` requires the mouse pointer to overlap the droppable.
The `touch` requires the draggable to overlap the droppable in any amount or direction.

```html
<div id="drag1">Drag Me</div>
<div id="drop1">Drop Here</div>
```

```js
import { Draggable, Droppable } from 'agnostic-draggable';

new Draggable(document.querySelector('#drag1'));
new Droppable(document.querySelector('#drop1'), {
	disabled: true
});
```

#### Events

|            Name            |                            Description                            |
| :------------------------: | :---------------------------------------------------------------: |
|    **`droppable:init`**    |             Called when the Droppable is initialized.             |
|  **`droppable:activate`**  | Called when drag starts on a Draggable accepted by the Droppable. |
|    **`droppable:over`**    |      Called when a Draggable intersects with the Droppable.       |
|    **`droppable:drop`**    |      Called when a Draggable is dropped into the Droppable.       |
|    **`droppable:out`**     |   Called when a Draggable is dragged out of the Droppable area.   |
| **`droppable:deactivate`** | Called when drag stops on a Draggable accepted by the Droppable.  |
|   **`draggable:destry`**   |              Called when the Droppable is destroyed.              |

## Sortable

Transforms elements that contains multiple child nodes in a way that these child nodes can be sorted by using the mouse.

Elements modified or created will use the same CSS classes from jQuery UI:

-   ui-sortable: the element containing the sortable elements
-   ui-sortable-handle: the handle of each sortable item. By default, each sortable item is also a handle
-   ui-sortable-helper: the element shown when dragging a sortable item
-   ui-sortable-placeholder: the element used to show the future position of the item being dragged

> In order to use this component to sort table rows, the element passed should be the `tbody`, not the `table`.

#### Options

|                        Name                         |     Type     |                  Default                  |                             Description                             |
| :-------------------------------------------------: | :----------: | :---------------------------------------: | :-----------------------------------------------------------------: |
|            **[`appendTo`](#appendTo-2)**            |  `{String}`  |                    `*`                    |                 Where to append the sorting helper.                 |
|                **[`axis`](#axis-2)**                |  `{String}`  |                   null                    |               Constraint sorting movement to an axis.               |
|          **[`connectWith`](#connectWith)**          |  `{String}`  |                   null                    |           Allows to connect to other Sortable instances.            |
|         **[`containment`](#containment-2)**         |  `{String}`  |                   null                    |        Constraints sorting movement to an element or region.        |
|              **[`cursor`](#cursor-2)**              |  `{String}`  |                   null                    |                 Style for the cursor while sorting.                 |
|            **[`disabled`](#disabled-3)**            | `{Boolean}`  |                  `false`                  |               Allows disabling the sorting behaviour.               |
|            **[`distance`](#distance-2)**            |  `{Number}`  |                    `0`                    |            Distance in pixels before sorting can start.             |
|          **[`dropOnEmpty`](#dropOnEmpty)**          | `{Boolean}`  |                  `false`                  | Whether items from this Sortable can be dropped on empty Sortables. |
|      **[`forceHelperSize`](#forceHelperSize)**      | `{Boolean}`  |                  `false`                  |         Whether to force the sorting helper to have a size.         |
| **[`forcePlaceholderSize`](#forcePlaceholderSize)** | `{Boolean}`  |                  `false`                  |      Whether to force the sorting placeholder to have a size.       |
|                **[`grid`](#grid-2)**                |  `{Array}`   |                    `*`                    |      Snaps the sorting helper to a grid, every x and y pixels.      |
|              **[`handle`](#handle-2)**              |  `{String}`  |                   null                    |         Sorting only starts if click matches this selector.         |
|              **[`helper`](#helper-2)**              |  `{String}`  |                `original`                 |                 Configures the sorting helper node.                 |
|                **[`items`](#items)**                |  `{String}`  |                   null                    |              Specifies which items should be sortable.              |
|             **[`opacity`](#opacity-2)**             |  `{String}`  |                   null`                   |             Allows changing the opacity while sorting.              |
|              **[`revert`](#revert-2)**              |  `{Boolean   |                  String                   |                             Function}`                              | `false` | Whether the sortable item should be reverted after sort stops. |
|      **[`revertDuration`](#revertDuration-2)**      | `{ Number }` |                   `200`                   |          Duration in milliseconds of the revert animation.          |
|               **[`scope`](#scope-2)**               |  `{String}`  |                 `default`                 |  Used to group sets of draggable, droppable and sortable elements.  |
|              **[`scroll`](#scroll-2)**              | `{Boolean}`  |                  `true`                   |             Allows auto-scrolling within the container.             |
|   **[`scrollSensitivity`](#scrollSensitivity-2)**   |  `{Number}`  |                   `20`                    |                    Scroll sensitivity in pixels.                    |
|         **[`scrollSpeed`](scrollSpeed-2)**          |  `{Number}`  |                   `10`                    |                       Scroll speed in pixels.                       |
|                **[`skip`](#skip-2)**                |  `{String}`  | `input, textarea, button, select, option` |          Prevents sorting if this CSS selector is matched.          |
|           **[`tolerance`](#tolerance-2)**           |  `{String}`  |                `intersect`                |              Intersection mode between sortable items.              |
|              **[`zIndex`](#zIndex-2)**              |  `{Number}`  |                   null                    |             Allows changing the z-index while sorting.              |

### `appendTo`

Type: `String`
Default: `parent`
Accepted values: `parent` or a CSS selector

Which element the sorting helper should be appended to while sorting.
Only works when the [`helper`](#helper-2) option is set to not use the original element.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	appendTo: 'body'
});
```

### `axis`

Type: `String`
Default: null
Accepted values: `x` or `y`

Constrains sorting to either the horizontal (x) or vertical (y) axis.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	axis: 'x'
});
```

### `connectWith`

Type: `String`
Default: null
Accepted values: a CSS selector

A selector of other Sortable elements that the items from this list should be connected to. This is a one-way relationship, if you want the items to be connected in both directions, the `connectWith` option must be set on both Sortable elements.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
<div id="sort2">
	<div>Sort Me</div>
	<div>Sort Me</div>
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	connectWith: '#sort2'
});
```

### `containment`

Type: `String|Array`
Default: null
Accepted values: `parent`, `document`, `window`, a CSS selector or an array of 4 numbers in the form `[x1, y1, x2, y2]`

Constrains sorting to within the bounds of the specified element or region.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	containment: 'window'
});
```

### `cursor`

Type: `String`
Default: null
Accepted values: any values accepted by the `cursor` CSS property

Allows changing the cursor style while sorting items.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	cursor: 'move'
});
```

### `disabled`

Type: `Boolean`
Default: `false`
Accepted values: `true` or `false`

Determines whether the Sortable instance should be disabled.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	disabled: true
});
```

### `distance`

Type: `Number`
Default: `0`

Distance in pixels that the mouse should move before the sorting should start. Prevents unwanted sorts when sortable items are clicked.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	distance: 10
});
```

### `dropOnEmpty`

Type: `Boolean`
Default: `false`

If `false`, items from this Sortable can't be dropped on an empty connected Sortable (see the [`connectWith`](#connectWith) option.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
<div id="sort2">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	connectWith: '#sort2',
	dropOnEmpty: true
});
```

### `forceHelperSize`

Type: `Booleanr`
Default: `false`

Whether to force the sorting helper to have a size.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	forceHelperSize: true
});
```

### `forcePlaceholderSize`

Type: `Boolean`
Default: `false`

Whether to force the sorting placeholder to have a size.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	forcePlaceholderSize: true
});
```

### `grid`

Type: `Array`
Default: null
Accepted values: an array of 2 numbers in the form `[x, y]`

Snaps the sorting helper to a grid, every x and y pixels.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	grid: [10, 10]
});
```

### `handle`

Type: `String`
Default: null
Accepted values: a CSS selector

If specified, restricts sorting from starting unless the mousedown occurs on the specified element(s). Only elements that descend from the sortable items are permitted.

```html
<div id="sort1">
	<div>
		<div class="handle">Sort Me</div>
	</div>
	<div>
		<div class="handle">Sort Me</div>
	</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	handle: '.handle'
});
```

### `helper`

Type: `String|Function`
Default: `original`
Accepted values: `original`, `helper` or a function

Allows for a helper element to be used for sorting display.
If set to `clone`, then the item being sorted will be cloned and the clone will be dragged.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	helper: 'clone'
});
```

### `items`

Type: `String`
Default: null
Accepted values: a CSS selector

Specifies how to find the sortable items.

> By default, all the direct descendants of the node passed to Sortable will be considered sortable.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	items: 'div'
});
```

### `opacity`

Type: `Number`
Default: null
Accepted values: values accepted by the `opacity` CSS property

Allows changing the opacity of the items while being sorted.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	opacity: 0.5
});
```

### `revert`

Type: `Boolean|String|Function`
Default: `false`
Accepted values: `invalid`, `valid`, `true`, `false` or a function

Whether the element should revert to its start position when sorting stops.
If set to `true`, the element will always revert.
If set to `invalid` or `valid` it will respectively revert if dropped on a droppable or not.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	revert: 'invalid'
});
```

### `revertDuration`

Type: `Number`
Default: `200`

Uses an animation with this specific duration in milliseconds when reverting the items.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	revert: 'invalid',
	revertDuration: 500
});
```

### `scope`

Type: `String`
Default: `default`

Used to group sets of Draggable, Droppable and Sortable elements, in addition to Droppable's [`accept`](#accept) option. A Sortable with the same scope value as a Droppable will be accepted by it.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	scope: 'my-scope'
});
```

### `scroll`

Type: `Boolean`
Default: `true`

If this option is set to `true`, the container of the element will auto-scroll if needed.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	scroll: true
});
```

### `scrollSensitivity`

Type: `Number`
Default: `20`

Determines how close to the edge of the viewport the auto-scroll should happen. Distance is realtive to the mouse pointer, not to the sorting item.

> This option is ignored if [`scroll`](#scroll-2) is set to `false`.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	scroll: true,
	scrollSensitivity: 50
});
```

### `scrollSpeed`

Type: `Number`
Default: `10`

The speed in pixels at which the container should auto-scroll when the distance in [`scrollSensitivity`](#scrollSensitivity-2) is met.

> This option is ignored if [`scroll`](#scroll-2) is set to `false`.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	scroll: true,
	scrollSpeed: 20
});
```

### `skip`

Type: `String`
Default: `input, textarea, button, select, option`
Accepted values: a CSS selector

Prevents sorting if the clicked element matches the given CSS selector.

```html
<div id="sort1">
	<div>
		<span class="skip">Don't Sort Me</span>
		<span>Sort Me</span>
	</div>
	<div>
		<span class="skip">Don't Sort Me</span>
		<span>Sort Me</span>
	</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	skip: '.skip'
});
```

### `tolerance`

Type: `String`
Default: null
Accepted values: `intersect` and `pointer`

Specifies which mode to use for testing whether the item being moved is hovering over another item.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	tolerance: 'pointer'
});
```

### `zIndex`

Type: `Number`
Default: null

Allows to change the z-index of the item when being sorted.

```html
<div id="sort1">
	<div>Sort Me</div>
	<div>Sort Me</div>
</div>
```

```js
import { Sortable } from 'agnostic-draggable';

new Sortable(document.querySelector('#sort1'), {
	zIndex: 1000
});
```

#### Events

|           Name            |                                        Description                                         |
| :-----------------------: | :----------------------------------------------------------------------------------------: |
|    **`sortable:init`**    |                          Called when the Sortable is initialized.                          |
|  **`sortable:activate`**  |             Called when drag/sort starts on a connected Draggable or Sortable.             |
|     **`sort:start`**      |                Called when the sort operation is started. Can be canceled.                 |
|      **`sort:move`**      |                       Called while sorting an item. Can be canceled.                       |
|      **`sort:stop`**      | Called when the sort operation stops. Can be canceled to prevent an unwanted sort or drop. |
|    **`sortable:over`**    |      Called when a connected Draggable or Sortable item intersects with the Sortable.      |
|   **`sortable:change`**   |             Called whenever the sort order is changed within a Sortable list.              |
|   **`sortable:remove`**   |                      Called when an item is removed from a Sortable.                       |
|  **`sortable:receive`**   | Called when a new item (from a connected Draggable or Sortable) is received by a Sortable. |
|   **`sortable:update`**   |                     Called when the items of a Sortable were updated.                      |
|    **`sortable:out`**     |  Called when a connected Draggable or Sortable item is dragged out of the Sortable area.   |
| **`sortable:deactivate`** |             Called when drag/sort stops on a connected Draggable or Sortable.              |
|  **`sortable:destroy`**   |                           Called when the Sortable is destroyed.                           |

## Contributing

Feel free to submit pull requests.
The most wanted help would be bringing the remaining features from jQuery UI that were not ported.
However, other new features and fixes for any kind of defects are very welcome.

## License

[MIT](./LICENSE)
