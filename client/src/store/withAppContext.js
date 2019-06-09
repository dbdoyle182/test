import React from 'react';
import { AppContext } from './appProvider';

// Creates and exports the higher order class management component
export function withAppContext(Component) {
  return function WrapperComponent(props) {
    return (
      <AppContext.Consumer>
        {state => <Component {...props} context={state} />}
      </AppContext.Consumer>
    );
  };
}
