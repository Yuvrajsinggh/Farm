import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import FertilizerRecommendation from '../screens/TabScreens/FertilizerRecommendation';
import CropRecommendation from '../screens/TabScreens/CropRecommendation';
import DiseaseDetection from '../screens/TabScreens/DiseaseDetection';
import ProfileManagement from '../screens/TabScreens/ProfileManagement';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Fertilizer" component={FertilizerRecommendation} />
            <Tab.Screen name="Crop" component={CropRecommendation} />
            <Tab.Screen name="Disease" component={DiseaseDetection} />
            <Tab.Screen name="Profile" component={ProfileManagement} />
        </Tab.Navigator>
    );
};

export default TabNavigation;
