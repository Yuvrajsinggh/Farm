// Use This if user is not logged in amd show the following screens


//   --------------------------------
//  |  Login                       |
//  |  Register                    |
//  |  Forgot Password             |
//   --------------------------------

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Main from '../screens/Main';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
};

export default AuthNavigation;
