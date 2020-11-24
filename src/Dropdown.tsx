import React, { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import * as constants from './constants';

export type Option = {
  label: string;
  value: any;
};

export type DropdownProps = {
  searchable?: boolean;
  options?: Option[];
  position: {
    y: number;
    x: number;
    width: number;
  };
  isOpen?: boolean;
  itemTextStyle: StyleProp<TextStyle>;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
  searchPlaceholder?: string;
  placeHolderTextColor?: string;
  noItemFoundText?: string;
  onOptionClicked?: (option: Option) => any;
  onSearch?: (searchValue: string) => any;
};

const Dropdown = ({
  options = [],
  position,
  containerStyle = {},
  onOptionClicked,
  iconLeft,
  iconRight,
  isOpen = false,
  itemTextStyle,
  searchable = false,
  placeHolderTextColor,
  noItemFoundText,
  onSearch,
  searchPlaceholder,
}: DropdownProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  console.log(new Date().toISOString() + ' ::Dropdown::render()');

  const handleOnChangeText = useCallback(
    (newVal: string) => {
      setSearchValue(newVal);
      if (!onSearch) {
        setFilteredOptions(
          options.filter((opt) => opt.label.toLowerCase().startsWith(newVal)),
        );
      } else {
        onSearch(newVal);
      }
    },
    [setFilteredOptions, options, setSearchValue, onSearch],
  );

  if (!isOpen) return null;

  const _options = onSearch ? options : filteredOptions;

  return (
    <ScrollView
      style={[
        styles.dropdownContainer,
        { top: position.y, left: position.x, width: position.width },
        containerStyle,
      ]}>
      {searchable && (
        <View style={styles.dropdownItem}>
          <TextInput
            placeholderTextColor={
              placeHolderTextColor ? placeHolderTextColor : '#aaaaaa'
            }
            editable={searchable}
            placeholder={searchPlaceholder || 'Search for an option'}
            value={searchValue}
            style={[styles.searchInput]}
            onChangeText={handleOnChangeText}
          />
        </View>
      )}
      {_options.length === 0 && (
        <View style={styles.dropdownItem}>
          <Text style={[styles.dropdownText, styles.noItemFoundText]}>
            {noItemFoundText ? noItemFoundText : 'No item found'}
          </Text>
        </View>
      )}
      {_options.map((option) => (
        <Pressable
          key={option.label}
          style={[
            styles.dropdownItem,
            // array.length - 1 === index
            //   ? styles.itemNoBottomBorder
            //   : styles.itemBottomBorder,
          ]}
          onPress={() => {
            console.log('ONPRESS');
            onOptionClicked && onOptionClicked(option);
          }}>
          {iconLeft &&
            React.cloneElement(iconLeft, { style: styles.leftIconStyle })}
          <Text
            numberOfLines={1}
            style={[
              styles.dropdownText,
              iconLeft ? styles.textWithLeftIcon : undefined,
              iconRight ? styles.textWithRightIcon : undefined,
              itemTextStyle,
            ]}>
            {option.label}
          </Text>
          {iconRight &&
            React.cloneElement(iconRight, { style: styles.rightIconStyle })}
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default React.memo(Dropdown);

const styles = StyleSheet.create({
  dropdownContainer: {
    maxHeight: 200,
    position: 'absolute',
    zIndex: 99999,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  searchInput: {
    borderBottomColor: '#aaaaaa',
    borderBottomWidth: 1,
    padding: 0,
    height: constants.ITEM_HEIGHT,
    fontSize: constants.FONT_SIZE,
  },
  dropdownItem: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  itemNoBottomBorder: {
    borderBottomWidth: 0,
  },
  itemBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#bbbbbb',
  },
  leftIconStyle: {
    position: 'absolute',
    fontSize: 15,
    left: 5,
  },
  rightIconStyle: {
    position: 'absolute',
    fontSize: 15,
    right: 5,
  },
  textWithLeftIcon: {
    paddingLeft: 40,
  },
  textWithRightIcon: {
    paddingRight: 40,
  },
  noItemFoundText: {
    textAlign: 'center',
    color: '#aaaaaa',
  },
  dropdownText: {
    fontSize: constants.FONT_SIZE,
    lineHeight: constants.ITEM_HEIGHT,
  },
});
