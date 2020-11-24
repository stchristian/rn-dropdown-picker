import React, { useContext } from 'react';
import { DropdownContext } from './DropdownContext';

const DropdownExit = () => {
  const context = useContext(DropdownContext);

  return <>{context.dropdown}</>;
};

export default React.memo(DropdownExit);
