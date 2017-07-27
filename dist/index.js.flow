// @flow

/**
 *
 * Dragger
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

type Point = {
  x: number,
  y: number,
}

type Props = {
  target: HTMLElement,
  onStart(): void,
  onDrag({ top: number, left: number }): void,
  onEnd(): void,
  position: {
    top: number,
    left: number,
  },
  inverted?: boolean,
  ignoreTargets?: Array<string>,
};

type State = {
  bound: boolean,
  dragging: boolean,
  startPoint: ?Point,
  position: {
    top: number,
    left: number,
  }
};

export default class Dragger extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      bound: false,
      dragging: false,
      startPoint: null,
      position: {
        top: props.position.top,
        left: props.position.left,
      },
    };
  }

  componentDidMount() {
    this.bind(this.props.target);
  }

  componentDidUpdate(prevProps: Props) {
    if ((this.props.target && prevProps.target && this.props.target !== prevProps.target) || !this.state.bound) {
      this.reset(prevProps.target);
      this.bind(this.props.target);
    }
  }

  componentWillUnmount() {
    if (this.props.target) {
      this.reset(this.props.target);
    }
    if (this.state.dragging) {
      this.props.onEnd();
    }
  }

  /**
   * Handle drag start - common code for touch and mouse interactions
   */
  onDragStart = (x: number, y: number, e: Event): boolean => {
    if (this.props.ignoreTargets) {
      const Target = (e.target: any);
      if (!Target.matches) {
        // polyfill matches
        Target.matches =
          Target.matchesSelector ||
          Target.mozMatchesSelector ||
          Target.msMatchesSelector ||
          Target.oMatchesSelector ||
          Target.webkitMatchesSelector ||
          function (s) {
            const matches = (this.document || this.ownerDocument).querySelectorAll(s);
            let i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {} // eslint-disable-line no-empty
            return i > -1;
          };
      }
      if (Target.matches && Target.matches(this.props.ignoreTargets.join(','))) {
        return false;
      }
    }

    this.setState({
      dragging: true,
      startPoint: {
        x,
        y,
      },
      position: {
        top: this.props.position.top,
        left: this.props.position.left,
      },
    });

    this.props.onStart();
    return true;
  };

  /**
   * Update the location while item is being dragged
   * @param x
   * @param y
   */
  onDrag = (x: number, y: number) => {
    if (this.state.dragging && this.state.startPoint) {
      const currentLocation: Point = {
        x,
        y,
      };

      const diff = {
        dx: this.state.startPoint.x - currentLocation.x,
        dy: this.state.startPoint.y - currentLocation.y,
      };

      if (this.props.inverted) {
        diff.dx = -diff.dx;
        diff.dy = -diff.dy;
      }

      this.props.onDrag({
        left: this.state.position.left - diff.dx,
        top: this.state.position.top - diff.dy,
      });
    }
  };

  /**
   * Finish dragging
   */
  onDragEnd = () => {
    this.reset(this.props.target, false);
    this.setState({
      dragging: false,
      startPoint: null,
    });
    this.props.onEnd();
  };

  bind = (ref: ?HTMLElement) => {
    if (ref) {
      ref.addEventListener('mousedown', this.onMouseDown);
      ref.addEventListener('touchstart', this.onTouchStart);
      this.setState({
        bound: true,
      });
    }
  };

  reset = (ref: ?HTMLElement, removeDown: boolean = true) => {
    if (ref) {
      if (removeDown) {
        ref.removeEventListener('mousedown', this.onMouseDown);
        ref.removeEventListener('touchstart', this.onTouchStart);
      }
      ref.removeEventListener('mousemove', this.onMouseMove);
      ref.removeEventListener('touchmove', this.onTouchMove);
      ref.removeEventListener('mouseup', this.onDragEnd);
    }
  };

  /* Touch Handlers */
  onTouchStart = (e: TouchEvent) => {
    if (e.touches.length !== 2) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if (this.onDragStart(e.touches[0].pageX, e.touches[0].pageY, e)) {
      this.props.target.addEventListener('touchmove', this.onTouchMove);
      this.props.target.addEventListener('touchend', this.onDragEnd);
    }
  };

  onTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    this.onDrag(e.touches[0].pageX, e.touches[0].pageY);
  };

  /* Mouse Handlers */
  onMouseDown = (e: MouseEvent) => {
    if (e.button === 2 || (e.nativeEvent && e.nativeEvent.which === 2)) {
      return;
    }

    if (this.onDragStart(e.pageX, e.pageY, e)) {
      this.props.target.addEventListener('mousemove', this.onMouseMove);
      this.props.target.addEventListener('mouseup', this.onDragEnd);
    }
  };

  onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    this.onDrag(e.pageX, e.pageY);
  };

  render() {
    return null;
  }
}

// PropTypes
Dragger.propTypes = {
  target: PropTypes.object,
  onStart: PropTypes.func,
  onDrag: PropTypes.func.isRequired,
  onEnd: PropTypes.func,
  position: PropTypes.object,
  inverted: PropTypes.bool,
  ignoreTargets: PropTypes.array,
};
