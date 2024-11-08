import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFarms } from '../context/FarmContext';

const Home = ({ navigation }) => {
  const { farms } = useFarms();

  return (
    <ScrollView className="flex-1 bg-[#447055]">
      {/* Weather Card */}
      <View className="p-2 bg-white m-2 rounded-lg">
        <Text className="text-lg font-bold text-black">Weather</Text>
        <Text className="text-black">Current: Sunny, 25°C</Text>
        <Text className="text-black">Forecast: Rainy, 22°C</Text>
      </View>

      {farms.map(farm => (
        <TouchableOpacity
          key={farm.id}
          onPress={() => navigation.navigate('EditFarm', { farmId: farm.id })}
        >
          <View className="p-2 bg-white m-2 rounded-lg flex-row justify-between items-start">
            <View>
              <Text className="text-lg font-bold text-black">{farm.name || 'Unnamed Farm'}</Text>
              <Text className="text-gray-600">Location: {farm.location || 'Not specified'}</Text>
              <Text className="text-gray-600">Crop: {farm.crop || 'Not specified'}</Text>
              <Text className="text-gray-600">Soil: {farm.soil || 'Not specified'}</Text>
            </View>
            <Icon name="pencil-outline" size={24} color="#4B5563" />
          </View>
        </TouchableOpacity>
      ))}
      {farms.length === 0 && (
        <View className="p-4 bg-white m-2 rounded-lg">
          <Text className="text-gray-500 text-center">No farms added yet</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Home;
