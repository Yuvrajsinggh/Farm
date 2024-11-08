import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import FertilizerRecommendation from '../screens/TabScreens/FertilizerRecommendation';
import CropRecommendation from '../screens/TabScreens/CropRecommendation';
import DiseaseDetection from '../screens/TabScreens/DiseaseDetection';
import ProfileManagement from '../screens/TabScreens/ProfileManagement';
import EditFarm from '../screens/EditFarm';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={Home}  />
      <Stack.Screen name="EditFarm" component={EditFarm} options={{ title: 'Edit Farm' }} />
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Fertilizer" component={FertilizerRecommendation} />
      <Tab.Screen name="Crop" component={CropRecommendation} />
      <Tab.Screen name="Disease" component={DiseaseDetection} />
      <Tab.Screen name="Profile" component={ProfileManagement} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
