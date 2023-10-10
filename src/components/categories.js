import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

// LIBs IMPORTS //
import Animated, { FadeInDown } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CachedImage } from '../helpers/image';

// COMP IMPORTS

export default function Categories({ categories, activeCategory, handleChangeCategory }) {
    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className='space-x-4'
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {categories.map((cat, index) => {
                    let isActive = cat.strCategory == activeCategory;
                    let activeBtnClass = isActive ? ' bg-[#FEDC56]' : ' bg-black/10';
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleChangeCategory(cat.strCategory)}
                            className='flex items-center space-y-1'
                        >
                            <View className={'rounded-full p-[6px]' + activeBtnClass}>
                                {/* <Image
                                    source={{ uri: cat.strCategoryThumb }}
                                    style={{ width: hp(6), height: hp(6) }}
                                    className='rounded-full'
                                /> */}
                                <CachedImage
                                    uri={cat.strCategoryThumb}
                                    style={{ width: hp(6), height: hp(6) }}
                                    className='rounded-full'
                                />
                            </View>
                            <Text className='text-[#333]' style={{ fontSize: hp(1.6) }}>
                                {cat.strCategory}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </Animated.View>
    );
}
