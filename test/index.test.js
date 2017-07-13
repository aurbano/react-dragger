import React from 'react';
import { shallow } from 'enzyme';
import { clone } from 'lodash';

import Draggable from '../src/index';

const defaultProps = {
  target: null,
  position: {
    top: 100,
    left: 200,
  },
  onStart: () => {},
  onDrag: () => {},
  onEnd: () => {},
};

describe('<Draggable />', () => {
  it('Sets up initial event listeners', () => {
    const mockTarget = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    const props = clone(defaultProps);
    props.target = mockTarget;
    props.onStart = jest.fn();

    const renderedComponent = shallow(
      <Draggable { ...props } />, { lifecycleExperimental: true }
    );

    expect(props.onStart).toHaveBeenCalledTimes(0);
    expect(mockTarget.addEventListener).toHaveBeenCalledTimes(2);
    expect(mockTarget.addEventListener).toHaveBeenCalledWith('mousedown', renderedComponent.instance().onMouseDown);
  });

  it('Update state and events on mouse down', () => {
    const mockTarget = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    const props = clone(defaultProps);
    props.target = mockTarget;
    props.onStart = jest.fn();

    const renderedComponent = shallow(
      <Draggable { ...props } />, { lifecycleExperimental: true }
    );

    // reset after init
    mockTarget.addEventListener.mockClear();
    mockTarget.removeEventListener.mockClear();

    const mockEvent = {
      pageX: 500,
      pageY: 600,
      button: 1,
    };

    // fake on mouse down
    renderedComponent.instance().onMouseDown(mockEvent);

    expect(renderedComponent.state().dragging).toBeTruthy();
    expect(renderedComponent.state().startPoint).toEqual({
      x: mockEvent.pageX,
      y: mockEvent.pageY,
    });
    expect(renderedComponent.state().position).toEqual({
      top: defaultProps.position.top,
      left: defaultProps.position.left,
    });

    expect(props.onStart).toHaveBeenCalledTimes(1);
    expect(mockTarget.addEventListener).toHaveBeenCalledTimes(2);
    expect(mockTarget.removeEventListener).toHaveBeenCalledTimes(0);
  });

  it('Update state and events on mouse move', () => {
    const mockTarget = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    const props = clone(defaultProps);
    props.target = mockTarget;
    props.onStart = jest.fn();
    props.onDrag = jest.fn();

    const renderedComponent = shallow(
      <Draggable { ...props } />, { lifecycleExperimental: true }
    );

    // reset after init
    mockTarget.addEventListener.mockClear();
    mockTarget.removeEventListener.mockClear();

    const mockEventOne = {
      pageX: 500,
      pageY: 600,
      button: 1,
    };

    const mockEventTwo = {
      preventDefault: jest.fn(),
      pageX: 800,
      pageY: -200,
      button: 1,
    };

    // fake on mouse down
    renderedComponent.instance().onMouseDown(mockEventOne);
    renderedComponent.instance().onMouseMove(mockEventTwo);

    expect(renderedComponent.state().dragging).toBeTruthy();
    expect(renderedComponent.state().startPoint).toEqual({
      x: mockEventOne.pageX,
      y: mockEventOne.pageY,
    });
    expect(renderedComponent.state().position).toEqual({
      top: defaultProps.position.top,
      left: defaultProps.position.left,
    });

    expect(mockEventTwo.preventDefault).toHaveBeenCalledTimes(1);

    expect(props.onStart).toHaveBeenCalledTimes(1);
    expect(props.onDrag).toHaveBeenCalledTimes(1);
    expect(props.onDrag).toHaveBeenCalledWith({
      left: defaultProps.position.left - (mockEventOne.pageX - mockEventTwo.pageX),
      top: defaultProps.position.top - (mockEventOne.pageY - mockEventTwo.pageY),
    });

    expect(mockTarget.addEventListener).toHaveBeenCalledTimes(2);
    expect(mockTarget.removeEventListener).toHaveBeenCalledTimes(0);
  });

  it('Update state and events on mouse up', () => {
    const mockTarget = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    const props = clone(defaultProps);
    props.target = mockTarget;
    props.onEnd = jest.fn();

    const renderedComponent = shallow(
      <Draggable { ...props } />, { lifecycleExperimental: true }
    );

    // reset after init
    mockTarget.addEventListener.mockClear();
    mockTarget.removeEventListener.mockClear();

    // fake on mouse up
    renderedComponent.instance().onDragEnd();

    expect(renderedComponent.state().dragging).toBeFalsy();
    expect(renderedComponent.state().startPoint).toBeNull();

    expect(props.onEnd).toHaveBeenCalledTimes(1);
    expect(mockTarget.addEventListener).toHaveBeenCalledTimes(0);
    expect(mockTarget.removeEventListener).toHaveBeenCalledTimes(3);
    expect(mockTarget.removeEventListener).toHaveBeenCalledWith('mousemove', renderedComponent.instance().onMouseMove);
    expect(mockTarget.removeEventListener).toHaveBeenCalledWith('mouseup', renderedComponent.instance().onDragEnd);
  });
});
