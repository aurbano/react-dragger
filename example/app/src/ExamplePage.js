import React from 'react';

import Example from './Example';

export default class Examples extends React.PureComponent {

  render() {
    return (
      <div>
        <h2>
          <a href="https://github.com/aurbano/react-dragger/blob/master/example/app/src/ExamplePage.js" className="right">
            <code>&lt;Source&gt;</code>
          </a>
          Example
        </h2>

        <Example />

        <h2 style={ { marginTop: '10em' } }>
          <a href="https://github.com/aurbano/react-dragger/blob/master/example/app/src/ExamplePage.js" className="right">
            <code>&lt;Source&gt;</code>
          </a>
          Inverted dragging
        </h2>

        <Example inverted />
      </div>
    );
  }
}