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