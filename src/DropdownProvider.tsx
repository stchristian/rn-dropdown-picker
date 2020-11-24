import * as React from 'react';
import { DropdownProps } from './Dropdown';
import { DropdownContext } from './DropdownContext';

const DropdownProvider = (props: React.PropsWithChildren<{}>) => {
  const [dropdown, setDropdown] = React.useState<React.ReactElement<
    DropdownProps
  > | null>(null);

  const renderDropdown = React.useCallback(
    (newDropdown: React.ReactElement<DropdownProps>) => {
      console.log(
        new Date().toISOString() + ' ::DropdownProvider::renderDropdown()',
      );
      setDropdown(newDropdown);
    },
    [setDropdown],
  );

  return (
    <DropdownContext.Provider value={{ dropdown, renderDropdown }}>
      {props.children}
    </DropdownContext.Provider>
  );
};

export default React.memo(DropdownProvider);
