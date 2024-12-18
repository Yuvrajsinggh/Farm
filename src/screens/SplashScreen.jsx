import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

const SplashScreen = ({ navigation, route }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Zoom in effect
        Animated.timing(scaleValue, {
            toValue: 1.5,  // Scale up by 1.5x
            duration: 2000,  // 2 seconds
            useNativeDriver: true,
        }).start(() => {
            // Navigate based on authentication state after animation
            const destination = route?.params?.isAuthenticated ? 'MainApp' : 'AuthNavigation';
            navigation.navigate(destination);
        });
    }, [navigation, route, scaleValue]);

    return (
        <View className="flex-1 items-center justify-center bg-[#447055]">
            <Animated.Image
                source={require('../assets/Farm.png')}
                style={{ transform: [{ scale: scaleValue }] }}
            />
        </View>
    );
};

export default SplashScreen;
