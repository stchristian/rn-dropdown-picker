import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import DropdownEntry from './DropdownEntry';
import Dropdown, { Option } from './Dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import constants from './constants';

const DropdownPicker = ({
  options = [],
  onOptionClicked,
  selectedContainerStyle,
  textInputStyle,
  itemTextStyle,
  leftIconForSelected,
  indicatorIcon,
  showIndicatorIcon = true,
  searchable = false,
  searchPlaceholder,
  searchPlaceholderTextColor,
  onSearch,
  dropdownContainerStyle,
  openSelectedContainerStyle,
  placeholder,
}: {
  options?: Option[];
  leftIconForSelected?: () => JSX.Element;
  textInputStyle?: StyleProp<TextStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  dropdownContainerStyle?: StyleProp<ViewStyle>;
  selectedContainerStyle?: StyleProp<ViewStyle>;
  openSelectedContainerStyle?: StyleProp<ViewStyle>;
  selectedValueContainerStyle?: StyleProp<ViewStyle>;
  iconElement?: () => JSX.Element;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (text: string) => any;
  showIndicatorIcon?: boolean;
  searchPlaceholderTextColor?: string;
  placeholder?: string;
  indicatorIcon?: (isOpen: boolean) => JSX.Element;
  onOptionClicked?: (option: Option) => any;
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const textRef = useRef<TextInput>(null);
  const containerRef = useRef<any>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (containerRef) {
      setTimeout(() => {
        containerRef.current?.measure(
          (
            x: number,
            y: number,
            width: number,
            height: number,
            pageX: number,
            pageY: number,
          ) => {
            console.log(width, height, pageX, pageY);
            setDropdownPosition({ y: height + pageY, x: pageX, width });
          },
        );
      });
    }
  }, [containerRef, setDropdownPosition]);

  const handleOptionClicked = useCallback(
    (option: Option) => {
      setSelectedOption(option);
      console.log(option);
      onOptionClicked && onOptionClicked(option);
      setDropdownOpen(false);
    },
    [setSelectedOption, onOptionClicked],
  );

  return (
    <React.Fragment>
      <TouchableWithoutFeedback onPress={() => setDropdownOpen(!dropdownOpen)}>
        <View
          ref={containerRef}
          style={[
            styles.container,
            selectedContainerStyle,
            dropdownOpen ? openSelectedContainerStyle : undefined,
          ]}
          onLayout={() => {}}>
          {leftIconForSelected &&
            React.cloneElement(leftIconForSelected(), {
              style: styles.leftIconForSelected,
            })}
          <Text
            ref={textRef}
            numberOfLines={1}
            style={[
              styles.textStyle,
              leftIconForSelected ? styles.textWithIcon : undefined,
              !selectedOption ? styles.noSelectedValue : undefined,
              dropdownOpen ? styles.openDropdownTextStyle : undefined,
              textInputStyle,
            ]}>
            {selectedOption
              ? selectedOption.label
              : placeholder || 'Select an option...'}
          </Text>
          {showIndicatorIcon &&
            (indicatorIcon ? (
              indicatorIcon(dropdownOpen)
            ) : (
              <Icon
                name={
                  dropdownOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                }
                style={styles.indicatorIconStyle}
              />
            ))}
        </View>
      </TouchableWithoutFeedback>
      <DropdownEntry>
        <Dropdown
          containerStyle={dropdownContainerStyle}
          placeHolderTextColor={searchPlaceholderTextColor}
          isOpen={dropdownOpen}
          options={options}
          position={dropdownPosition}
          onOptionClicked={handleOptionClicked}
          itemTextStyle={itemTextStyle}
          searchable={searchable}
          searchPlaceholder={searchPlaceholder}
          onSearch={onSearch}
          // iconElement={iconElement}
        />
      </DropdownEntry>
    </React.Fragment>
  );
};

export default React.memo(DropdownPicker);

const styles = StyleSheet.create({
  leftIconForSelected: {
    // position: 'absolute',
    zIndex: 10,
    paddingLeft: 10,
    // top: 14,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // borderBottomWidth: 1,
    borderBottomColor: '#aaaaaa',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  icon: {
    // position: 'absolute',
  },
  indicatorIconStyle: {
    fontSize: constants.FONT_SIZE * 1.5,
    color: '#aaaaaa',
  },
  openDropdownTextStyle: {
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0,
  },
  textStyle: {
    flex: 1,
    fontSize: constants.FONT_SIZE,
    lineHeight: constants.ITEM_HEIGHT,
    color: '#000000',
  },
  textWithIcon: {
    marginLeft: 5,
  },
  noSelectedValue: {
    color: '#aaaaaa',
  },
});
