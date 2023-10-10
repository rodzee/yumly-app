import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loading = (props) => {
    return (
        <View className='flex-1 justify-center items-center'>
            <ActivityIndicator {...props} />
        </View>
    );
};

export default Loading;
