import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFarms } from '../context/FarmContext';

const EditFarm = ({ navigation, route }) => {
  const { farmId } = route.params || {};
  const { farms, addFarm, updateFarm, deleteFarm } = useFarms();

  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState('');
  const [crop, setCrop] = useState('');
  const [soil, setSoil] = useState('');

  useEffect(() => {
    if (farmId) {
      const farm = farms.find(f => f.id === farmId);
      if (farm) {
        setFarmName(farm.name);
        setLocation(farm.location);
        setCrop(farm.crop);
        setSoil(farm.soil);
      }
    }
  }, [farmId, farms]);

  const handleSave = () => {
    const farmData = {
      name: farmName,
      location,
      crop,
      soil,
    };

    if (farmId) {
      updateFarm({ ...farmData, id: farmId });
    } else {
      addFarm(farmData);
    }
    navigation.goBack();
  };

  const handleNewFarm = () => {
    setFarmName('');
    setLocation('');
    setCrop('');
    setSoil('');
    route.params = { farmId: null };
  };

  const handleDelete = () => {
    if (farmId) {
      deleteFarm(farmId);
      navigation.goBack();
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#447055]">
      {/* Header Section */}
      <View className="p-6 pb-8">
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-white/20 p-2 rounded-full"
          >
            <Icon name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">
            {farmId ? '🌾 Edit Farm' : '🌱 New Farm'}
          </Text>
          <TouchableOpacity
            onPress={handleNewFarm}
            className="bg-white/20 p-2 rounded-full"
          >
            <Icon name="refresh-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Farm Icon */}
        <View className="items-center mb-6">
          <View className="bg-white/20 p-4 rounded-full">
            <Icon name="leaf-outline" size={40} color="white" />
          </View>
        </View>
      </View>

      {/* Form Section */}
      <View className="bg-white rounded-t-3xl flex-1 px-6 pt-6">
        <View className="space-y-4">
          {/* Farm Name Input */}
          <View>
            <Text className="text-gray-600 mb-2 font-medium ml-1">Farm Name </Text>
            <View className="relative">
              <View className="absolute left-3 top-3 z-10">
                <Icon name="business-outline" size={24} color="#447055" />
              </View>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 pl-12 text-gray-800"
                value={farmName}
                onChangeText={setFarmName}
                placeholder="Enter farm name"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Location Input */}
          <View>
            <Text className="text-gray-600 mb-2 font-medium ml-1">Location </Text>
            <View className="relative">
              <View className="absolute left-3 top-3 z-10">
                <Icon name="location-outline" size={24} color="#447055" />
              </View>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 pl-12 text-gray-800"
                value={location}
                onChangeText={setLocation}
                placeholder="Enter location"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Crop Input */}
          <View>
            <Text className="text-gray-600 mb-2 font-medium ml-1">Crop Type </Text>
            <View className="relative">
              <View className="absolute left-3 top-3 z-10">
                <Icon name="leaf-outline" size={24} color="#447055" />
              </View>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 pl-12 text-gray-800"
                value={crop}
                onChangeText={setCrop}
                placeholder="Enter crop type"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Soil Type Input */}
          <View>
            <Text className="text-gray-600 mb-2 font-medium ml-1">Soil Type </Text>
            <View className="relative">
              <View className="absolute left-3 top-3 z-10">
                <Icon name="earth-outline" size={24} color="#447055" />
              </View>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 pl-12 text-gray-800"
                value={soil}
                onChangeText={setSoil}
                placeholder="Enter soil type"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View className="space-y-3 mt-6">
            <TouchableOpacity
              className="bg-[#447055] rounded-xl p-4 flex-row justify-center items-center"
              onPress={handleSave}
            >
              <Icon name="save-outline" size={24} color="white" />
              <Text className="text-white font-bold text-lg ml-2">
                {farmId ? 'Save Changes ' : 'Add Farm '}
              </Text>
            </TouchableOpacity>

            {farmId && (
              <TouchableOpacity
                className="bg-red-500/90 rounded-xl p-4 flex-row justify-center items-center"
                onPress={handleDelete}
              >
                <Icon name="trash-outline" size={24} color="white" />
                <Text className="text-white font-bold text-lg ml-2">
                  Delete Farm
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Quick Tips */}
          <View className="mt-6 bg-blue-50 p-4 rounded-xl">
            <View className="flex-row items-center mb-2">
              <Icon name="information-circle-outline" size={24} color="#447055" />
              <Text className="text-[#447055] font-bold text-lg ml-2">Quick Tips </Text>
            </View>
            <Text className="text-gray-600">
              • Add detailed location for better tracking{'\n'}
              • Specify crop type for customized recommendations{'\n'}
              • Include soil type for optimal irrigation settings
            </Text>
          </View>
        </View>

        <View className="h-6" />
      </View>
    </ScrollView>
  );
};

export default EditFarm;