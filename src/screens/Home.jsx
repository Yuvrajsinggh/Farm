import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFarms } from '../context/FarmContext';

const Home = ({ navigation }) => {
  const { farms } = useFarms();
  const [isAutoIrrigationOn, setIsAutoIrrigationOn] = useState(false);

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Main Background Section */}
      <View className="bg-[#447055] p-4 pb-8 rounded-b-3xl mb-4">
        <Text className="text-white text-xl font-bold mb-4">Dashboard</Text>

        {/* Weather Card */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white text-lg font-semibold">Weather</Text>
            <Icon name="partly-sunny-outline" size={24} color="white" />
          </View>
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <View className="flex-row items-center mb-3">
              <Icon name="sunny-outline" size={24} color="#ca8a04" />
              <View className="ml-3">
                <Text className="text-gray-600 text-sm">Current</Text>
                <Text className="text-black text-xl font-bold">Sunny, 25°C</Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <Icon name="rainy-outline" size={24} color="#1d4ed8" />
              <View className="ml-3">
                <Text className="text-gray-600 text-sm">Forecast</Text>
                <Text className="text-black text-xl font-bold">Rainy, 22°C</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Irrigation Card */}
        <View>
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white text-lg font-semibold">Irrigation</Text>
            <Icon name="water-outline" size={24} color="white" />
          </View>
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Icon name="water" size={24} color="#1d4ed8" />
                <View className="ml-3">
                  <Text className="text-gray-600 text-sm">Water Level</Text>
                  <Text className="text-black text-xl font-bold">75%</Text>
                </View>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-600 mr-2">Auto</Text>
                <TouchableOpacity onPress={() => setIsAutoIrrigationOn(!isAutoIrrigationOn)}>
                  <Icon
                    name={isAutoIrrigationOn ? 'toggle' : 'toggle-outline'}
                    size={44}
                    color={isAutoIrrigationOn ? '#447055' : '#4B5563'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row items-center mt-3">
              <Icon name="time-outline" size={24} color="#15803d" />
              <View className="ml-3">
                <Text className="text-gray-600 text-sm">Next Schedule</Text>
                <Text className="text-black text-xl font-bold">6:00 AM</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Farms Section */}
      <View className="px-4">
        <Text className="text-black text-xl font-bold mb-3">My Farms</Text>
        
        {farms.map(farm => (
          <TouchableOpacity
            key={farm.id}
            onPress={() => navigation.navigate('EditFarm', { farmId: farm.id })}
            className="mb-3"
          >
            <View className="p-4 bg-white rounded-xl shadow-sm">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-800 mb-2">{farm.name || 'Unnamed Farm'}</Text>
                  <View className="space-y-2">
                    <View className="flex-row items-center">
                      <Icon name="location-outline" size={18} color="#447055" />
                      <Text className="text-gray-600 ml-2">{farm.location || 'Not specified'}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Icon name="leaf-outline" size={18} color="#447055" />
                      <Text className="text-gray-600 ml-2">{farm.crop || 'Not specified'}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Icon name="earth-outline" size={18} color="#447055" />
                      <Text className="text-gray-600 ml-2">{farm.soil || 'Not specified'}</Text>
                    </View>
                  </View>
                </View>
                <Icon name="chevron-forward-outline" size={24} color="#447055" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
        
        {farms.length === 0 && (
          <View className="p-6 bg-white rounded-xl shadow-sm">
            <Icon name="leaf-outline" size={40} color="#447055" className="self-center mb-2" />
            <Text className="text-gray-500 text-center text-base">No farms added yet</Text>
          </View>
        )}
      </View>
      
      <View className="h-4" />
    </ScrollView>
  );
};

export default Home;
