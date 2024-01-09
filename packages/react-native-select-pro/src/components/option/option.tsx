import type { ForwardedRef } from 'react';
import React, { forwardRef, memo } from 'react';
import isEqual from 'react-fast-compare';
import type { TextStyle, View, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text, View as Box } from 'react-native';

import { COLORS, FONT_SIZE, ITEM_HEIGHT, PADDING, PRESSED_STYLE } from '../../constants';
import type { OnChooseOption } from '../../types';

import type { OptionProps } from './option.types';

const OptionComponent = forwardRef(
    <T,>(
        {
            isSelected,
            option,
            optionIndex,
            overrideWithDisabledStyle,
            onPressOption,
            optionButtonProps,
            optionTextProps,
            optionCustomStyles,
            isDisabled,
        }: OptionProps<T>,
        ref: ForwardedRef<View>,
    ) => {
        const onChooseOption: OnChooseOption = () => {
            onPressOption(option, optionIndex);
        };

        const { label } = option;

        return (
            <Box
                style={
                    isSelected
                        ? {
                              paddingBottom: 2,
                              paddingHorizontal: 1,
                              borderBottomLeftRadius: 5,
                              borderBottomRightRadius: 5,
                              backgroundColor: '#FCFCFC',
                              shadowColor: '#000',
                              shadowOffset: {
                                  width: 0,
                                  height: 3,
                              },
                              shadowOpacity: 0.27,
                              shadowRadius: 4.65,
                              elevation: 6,
                          }
                        : {}
                }
            >
                <Pressable
                    accessibilityLabel={`Select ${label}`}
                    {...optionButtonProps}
                    ref={ref}
                    accessibilityRole="menuitem"
                    accessibilityState={{ disabled: isDisabled }}
                    disabled={isDisabled}
                    style={({ pressed }) => [
                        styles.option,
                        optionCustomStyles?.container,
                        isSelected && [styles.selected, optionCustomStyles?.selected?.container],
                        pressed && (optionCustomStyles?.pressed ?? PRESSED_STYLE),
                        overrideWithDisabledStyle && styles.disabled,
                    ]}
                    onPress={onChooseOption}
                >
                    <Text
                        numberOfLines={1}
                        {...optionTextProps}
                        style={[
                            styles.text,
                            optionCustomStyles?.text,
                            isSelected && optionCustomStyles?.selected?.text,
                        ]}
                    >
                        {label}
                    </Text>
                </Pressable>
            </Box>
        );
    },
);

type Styles = {
    option: ViewStyle;
    selected: ViewStyle;
    text: TextStyle;
    disabled: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    option: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        paddingHorizontal: PADDING,
    },
    text: {
        fontSize: FONT_SIZE,
        color: COLORS.BLACK,
        textAlign: 'left',
    },
    selected: {
        backgroundColor: COLORS.SELECTED,
    },
    disabled: {
        backgroundColor: COLORS.DISABLED,
    },
});

OptionComponent.displayName = 'OptionComponent';

export const Option = memo(OptionComponent, isEqual);
