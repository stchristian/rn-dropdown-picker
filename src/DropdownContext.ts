import React from 'react';
import { DropdownProps } from './Dropdown';
type DropdownContextType = {
  dropdown: React.ReactElement<DropdownProps> | null;
  renderDropdown: (dropdown: React.ReactElement<DropdownProps>) => any;
};

export const DropdownContext = React.createContext<DropdownContextType>({
  dropdown: null,
  renderDropdown: () => {},
});
