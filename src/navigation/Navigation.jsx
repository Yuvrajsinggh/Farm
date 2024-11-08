import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/Authcontext';
import { LanguageContext } from '../context/LanguageContext';
import TabNavigation from './TabNavigation';
import AuthNavigation from './AuthNavigation';
import SplashScreen from '../screens/SplashScreen';
import LanguageSelection from '../screens/LanguageSelection';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const { isLanguageSelected } = useContext(LanguageContext);
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSplashVisible(false);
        }, 2500); // Adjust the delay as needed
        return () => clearTimeout(timer);
    }, []);
    console.log(isAuthenticated);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isSplashVisible ? (
                    <Stack.Screen name="Splash" component={SplashScreen} />
                ) : !isLanguageSelected ? (
                    <Stack.Screen name="LanguageSelection" component={LanguageSelection} />
                ) : isAuthenticated ? (
                    <Stack.Screen name="MainApp" component={TabNavigation} />
                ) : (
                    <Stack.Screen name="AuthStack" component={AuthNavigation} /> // Render AuthNavigation here
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;
