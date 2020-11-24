import React, { ReactElement, useContext, useEffect } from 'react';
import { DropdownProps } from './Dropdown';
import { DropdownContext } from './DropdownContext';

const DropdownEntry = ({
  children,
}: {
  children: ReactElement<DropdownProps>;
}) => {
  const context = useContext(DropdownContext);

  console.log(new Date().toISOString() + ' ::DropdownEntry::render');
  useEffect(() => {
    console.log(
      new Date().toISOString() + ' ::DropdownEntry::renderDropdown() called',
    );
    context.renderDropdown(children);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return null;
};

export default React.memo(DropdownEntry);
