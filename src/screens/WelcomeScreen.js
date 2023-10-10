import { View, Image, Text } from 'react-native';
import React, { useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const ringOnePadding = useSharedValue(0);
    const ringTwoPadding = useSharedValue(0);
    const navigation = useNavigation();

    useEffect(() => {
        ringOnePadding.value = 0;
        ringTwoPadding.value = 0;

        setTimeout(() => (ringOnePadding.value = withSpring(ringOnePadding.value + hp(5))), 100);
        setTimeout(() => (ringTwoPadding.value = withSpring(ringTwoPadding.value + hp(5.5))), 300);
        setTimeout(() => navigation.navigate('Home'), 3000);
    }, []);
    return (
        <View className='flex-1 justify-center items-center bg-[#FEDC56]' style={{ padding: hp(0.5) }}>
            {/* Logo */}
            <Animated.View className='bg-white/20 rounded-full' style={{ padding: ringOnePadding }}>
                <Animated.View className='bg-white/20 rounded-full ' style={{ padding: ringTwoPadding }}>
                    <Image
                        source={require('../../assets/images/YouEat.png')}
                        style={{
                            width: hp(20),
                            height: hp(20),
                            tintColor: '#FF6B6B',
                        }}
                    />
                </Animated.View>
            </Animated.View>

            {/* Title */}
            <View className='flex items-center space-y-2'>
                <Text className='font-bold text-[#FF6B6B] tracking-widest' style={{ fontSize: hp(8) }}>
                    Yumly
                </Text>
                <Text className='font-bold text-[#333]' style={{ fontSize: hp(2) }}>
                    A dash of joy in every bite!
                </Text>
            </View>
        </View>
    );
}
