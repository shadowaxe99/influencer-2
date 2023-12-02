import React from 'react';
import { CSSTransition } from 'react-transition-group';

const Transitions = ({ children, transitionName, duration, inProp }) => {
  return (
    <CSSTransition
      in={inProp}
      timeout={duration}
      classNames={transitionName}
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

export default Transitions;