import * as React from 'react';
import { DropdownContext } from './DropdownContext';

const DropdownExit = () => {
  const context = React.useContext(DropdownContext);

  return <>{context.dropdown}</>;
};

export default React.memo(DropdownExit);
