// Use This if user is not logged in amd show the followimg screeens


//   --------------------------------
//  |  Login                       |
//  |  Register                    |
//  |  Forgot Password             |
//   --------------------------------

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
};

export default AuthNavigation;