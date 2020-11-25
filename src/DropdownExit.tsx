import * as React from 'react';
import { DropdownContext } from './DropdownContext';

const DropdownExit = () => {
  const context = React.useContext(DropdownContext);

  return <React.Fragment>{context.dropdown}</React.Fragment>;
};

export default React.memo(DropdownExit);
