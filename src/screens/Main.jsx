import React from 'react';
import { View, Image } from 'react-native';
import TabNavigation from '../navigation/TabNavigation';
import Icon from 'react-native-vector-icons/Ionicons';

const Main = () => {
    return (
        <>
            <View className="flex-row justify-between p-4 bg-green-700">
                <Image source={require('../assets/Farm.png')} className="w-70 h-15" />
                <Icon name="person-circle-outline" size={24} color="white" />
            </View>
            <TabNavigation />
        </>
    );
};

export default Main;
