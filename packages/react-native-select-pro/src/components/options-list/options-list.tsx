import React, { forwardRef, useCallback } from 'react';
import type { ListRenderItem, SectionListRenderItem, View } from 'react-native';
import { Pressable, Text, Image, View as Box } from 'react-native';

import { getReducedSectionData } from '../../helpers';
import type { OptionType, SectionOptionType } from '../../types';
import { isSectionOptionsType } from '../../types';
import { FlatOptionsList } from '../flat-options-list';
import { Option } from '../option';
import { OptionsListWrapper } from '../options-list-wrapper';
import { SectionOptionsList } from '../section-options-list';

import { useOptionsList } from './options-list.hooks';

type Props = {
    onAddOptionLabel?: string;
    onAddOption?: () => void;
};

export const OptionsList = forwardRef<View>((props: Props, optionsListRef) => {
    const {
        getItemLayout,
        measuredRef,
        findSelectedOption,
        findSelectedOptionIndex,
        resolvedData,
        scrollToSelectedOption,
        sectionListProps,
        flatListProps,
        selectedOption,
        optionCustomStyles,
        initialScrollIndex,
        accessibilityState,
        disabled,
        onPressOption,
        optionButtonProps,
        optionTextProps,
        isDisabledResolveOption,
    } = useOptionsList();

    const isSectionedOptions = isSectionOptionsType(resolvedData);

    const renderSection: SectionListRenderItem<OptionType> = useCallback(
        ({ item, index, section }) => {
            const data = resolvedData as SectionOptionType[];
            const { value } = item;
            const isSelected = findSelectedOption(item);
            const sectionTitle = section?.title;
            const optionIndex = getReducedSectionData(data).indexOf(item);
            const sectionObject = {
                title: sectionTitle,
                index: data.findIndex((el) => el.title === sectionTitle),
            };
            const isDisabledOption = isDisabledResolveOption(isSelected);
            const sectionItem = { ...item, section: sectionObject };

            return (
                <Option
                    key={value}
                    ref={index === 0 ? measuredRef : undefined}
                    option={sectionItem}
                    isSelected={isSelected}
                    optionIndex={optionIndex}
                    overrideWithDisabledStyle={!!disabled}
                    optionButtonProps={optionButtonProps}
                    optionTextProps={optionTextProps}
                    optionCustomStyles={optionCustomStyles}
                    isDisabled={isDisabledOption}
                    onPressOption={onPressOption}
                />
            );
        },
        [
            disabled,
            findSelectedOption,
            isDisabledResolveOption,
            measuredRef,
            onPressOption,
            optionButtonProps,
            optionCustomStyles,
            optionTextProps,
            resolvedData,
        ],
    );

    const renderFlatItem: ListRenderItem<OptionType> = useCallback(
        ({ item, index }) => {
            const { value } = item;
            const isSelected = findSelectedOption(item);
            const optionIndex = findSelectedOptionIndex(item) ?? index;
            const isDisabledOption = isDisabledResolveOption(isSelected);

            return (
                <Option
                    key={value}
                    ref={index === 0 ? measuredRef : undefined}
                    option={item}
                    isSelected={isSelected}
                    optionIndex={optionIndex}
                    overrideWithDisabledStyle={!!disabled}
                    optionButtonProps={optionButtonProps}
                    optionTextProps={optionTextProps}
                    optionCustomStyles={optionCustomStyles}
                    isDisabled={isDisabledOption}
                    onPressOption={onPressOption}
                />
            );
        },
        [
            disabled,
            findSelectedOption,
            findSelectedOptionIndex,
            isDisabledResolveOption,
            measuredRef,
            onPressOption,
            optionButtonProps,
            optionCustomStyles,
            optionTextProps,
        ],
    );

    return (
        <OptionsListWrapper ref={optionsListRef}>
            {props?.onAddOptionLabel && (
                <Box
                    style={{
                        paddingBottom: 3,
                        paddingHorizontal: 2,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor: '#FCFCFC',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,

                        elevation: 6,
                    }}
                >
                    <Pressable
                        style={[
                            {
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingVertical: 12,
                                paddingHorizontal: 8,
                                marginBottom: 2,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                borderTopRightRadius: 0,
                                borderTopLeftRadius: 0,
                            },
                            optionCustomStyles?.pressed,
                            optionCustomStyles?.container,
                        ]}
                        onPress={props?.onAddOption}
                    >
                        <Text style={optionCustomStyles?.text}>{props?.onAddOptionLabel}</Text>
                        <Image source={require('../../assets/icons/plus.png')} />
                    </Pressable>
                </Box>
            )}
            {isSectionedOptions ? (
                <SectionOptionsList
                    resolvedData={resolvedData}
                    getItemLayout={getItemLayout}
                    renderItem={renderSection}
                    accessibilityState={accessibilityState}
                    selectedOption={selectedOption}
                    scrollToSelectedOption={scrollToSelectedOption}
                    sectionListProps={sectionListProps}
                    disabled={disabled}
                />
            ) : (
                <FlatOptionsList
                    initialScrollIndex={initialScrollIndex}
                    getItemLayout={getItemLayout}
                    renderItem={renderFlatItem}
                    accessibilityState={accessibilityState}
                    resolvedData={resolvedData}
                    flatListProps={flatListProps}
                    disabled={disabled}
                />
            )}
        </OptionsListWrapper>
    );
});

OptionsList.displayName = 'OptionsList';
