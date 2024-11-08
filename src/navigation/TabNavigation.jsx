import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

const getTabBarIcon = (route, focused, color, size) => {
  let iconName;
  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Fertilizer') {
    iconName = focused ? 'leaf' : 'leaf-outline';
  } else if (route.name === 'Crop') {
    iconName = focused ? 'nutrition' : 'nutrition-outline';
  } else if (route.name === 'Disease') {
    iconName = focused ? 'bug' : 'bug-outline';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person' : 'person-outline';
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route, focused, color, size),
        tabBarActiveTintColor: '#447055',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Fertilizer" component={FertilizerRecommendation} />
      <Tab.Screen name="Crop" component={CropRecommendation} />
      <Tab.Screen name="Disease" component={DiseaseDetection} />
      <Tab.Screen name="Profile" component={ProfileManagement} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
