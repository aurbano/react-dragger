# React Dragger
> Tiny React Dragging library - mobile ready and with no dependencies!

[![Travis](https://img.shields.io/travis/aurbano/react-dragger.svg)](https://travis-ci.org/aurbano/react-dragger)
[![npm](https://img.shields.io/npm/v/react-dragger.svg)](https://www.npmjs.com/package/react-dragger)
[![Coverage Status](https://coveralls.io/repos/github/aurbano/react-dragger/badge.svg?branch=master)](https://coveralls.io/github/aurbano/react-dragger?branch=master)
[![npm](https://img.shields.io/npm/dm/react-dragger.svg)](https://www.npmjs.com/package/react-dragger)
[![npm](https://img.shields.io/npm/l/react-dragger.svg)](https://www.npmjs.com/package/react-dragger)
[![Codacy grade](https://img.shields.io/codacy/grade/e2589a609bdc4c56bd49c232a65dab4e.svg)](https://www.codacy.com/app/aurbano/react-dragger)

I wrote this library because I couldn't find any existing one to make elements draggable super easily, ignoring where they are dropped.

In some cases you really need an unobtrusive way to make items draggable, this will do just that.

I use React-DnD a lot as well, but sometimes you really just want to make an element draggable :smile:


## Installation

```console
$ npm i react-dragger
```
Or if you prefer yarn
```console
$ yarn add react-dragger
```

## Usage

```jsx
<Dragger
    target={ this.state.ref }
    onStart={ this.onStart }
    onDrag={ this.onDrag }
    onEnd={ this.onEnd }
    position={ this.state.itemLocation }
    inverted={ this.props.inverted }
/>
```

### Props

Docs on each prop, see them in action in the example below.

#### `target`

Element that will be draggable. This is to scope the mouse/touch event handlers and make sure that it doesn't affect your whole web app.

It must be a React `ref`, it should also exist, so you may want to check if it's already initialized before rendering the `Dragger` component.

#### `onStart`

This will be fired when the element starts being dragged.

#### `onDrag`

This will be fired while the element is being dragged. It will receive an object with the `top` and `left` coordinates of the element.

```js
onDrag({
  top: number,
  left: number,
});
```

#### `onEnd`

This will be fired when the element stops being dragged.

#### `inverted` *(Optional)*

Whether you want the dragging to be inverted (drag mouse up -> element goes down)

## Example

This example was taken from [`example/app/src/Example.js`](https://github.com/aurbano/react-dragger/blob/master/example/app/src/Example.js) which you can see running at https://aurbano.eu/react-dragger/

```jsx
import React from 'react';
import Dragger from 'react-dragger';

import './react-dragger.css';

export default class Example extends React.PureComponent {

  constructor() {
    super();

    this.state = {
      ref: null,
      dragState: 'waiting',
      itemLocation: {
        top: 10,
        left: 260,
      },
    };
  }

  onStart = () => {
    this.setState({
      dragState: 'started',
    });
  };

  onDrag = (itemLocation) => {
    this.setState({
      dragState: 'dragging',
      itemLocation,
    });
  };

  onEnd = () => {
    this.setState({
      dragState: 'ended',
    });
  };

  render() {
    const itemStyle = {
      ...this.state.itemLocation,
    };
    return (
      <div style={ { position: 'relative', marginBottom: '10em' } }>
        <p>State: <code>{ this.state.dragState }</code></p>
        <div className='item' ref={ (ref) => this.setState({ ref }) } style={ itemStyle }>
          Drag me!
        </div>

        { this.state.ref && (
          <Dragger
            target={ this.state.ref }
            onStart={ this.onStart }
            onDrag={ this.onDrag }
            onEnd={ this.onEnd }
            position={ this.state.itemLocation }
            inverted={ this.props.inverted }
          />
        ) }
      </div>
    );
  }
}
```

## Contributing

Only edit the files in the `src` folder. I'll update `dist` manually before publishing new versions to npm.

To run the tests simply run `npm test`. Add tests as you see fit to the `test` folder, they must be called `{string}.test.js`.

## Meta

Copyright &copy; [Alejandro U. Alvarez](https:/aurbano.eu) 2017. MIT Licensed.
