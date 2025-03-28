import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFarms } from '../context/FarmContext';
import { useTranslation } from 'react-i18next';
import { addFarmService, updateFarmService, deleteFarmService } from '../../utilities/FarmServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

const EditFarm = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { farmId } = route.params || {};
  console.log("ROUTE PARAMS::", route.params);

  const { farms, addFarm, updateFarm, deleteFarm } = useFarms();

  // State for form fields, using API-consistent property names
  const [farm_name, setFarmName] = useState('');
  const [location, setLocation] = useState('');
  const [crop_type, setCropType] = useState('');
  const [soil_type, setSoilType] = useState('');
  const [userId, setUserId] = useState(null);

  // Fetch userId from AsyncStorage once on mount
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userId'); // Adjust key if it's 'id' instead
      setUserId(id);
    };
    fetchUserId();
  }, []);

  // Populate form fields when editing an existing farm
  useEffect(() => {
    if (farmId) {
      const farm = farms.find((f) => f.id === Number(farmId)); // Ensure type match
      if (farm) {
        console.log('Farm data:', farm); // Debug farm object
        setFarmName(farm.farm_name || '');
        setLocation(farm.location || '');
        setCropType(farm.crop_type || '');
        setSoilType(farm.soil_type || '');
      } else {
        console.log('Farm not found with ID:', farmId);
      }
    }
  }, [farmId, farms]);

  // Handle creating a new farm with API call
  const handleCreateFarm = async (data) => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (!storedUserId) {
        throw new Error('User ID not found');
      }
      const payload = {
        user: parseInt(storedUserId),
        farm_name: data.farm_name,
        location: data.location,
        crop_type: data.crop_type,
        soil_type: data.soil_type,
      };
      const response = await addFarmService(payload);
      return response;
    } catch (error) {
      console.error('Create Farm error:', error);
      Alert.alert('Error', 'Failed to create farm. Please try again.');
      throw error;
    }
  };

  // Handle updating an existing farm with API call
  const handleUpdateFarm = async (farmId, data) => {
    console.log("Updating farm with ID:", farmId, "Data:", data);
    try {
      const payload = {
        farm_name: data.farm_name,
        location: data.location,
        crop_type: data.crop_type,
        soil_type: data.soil_type,
      };
      const response = await updateFarmService(farmId, payload);
      return response;
    } catch (error) {
      console.error('Update Farm error:', error);
      Alert.alert('Error', 'Failed to update farm. Please try again.');
      throw error;
    }
  };

  // Handle deleting a farm with API call
  const handleDeleteFarm = async (farmId) => {
    try {
      await deleteFarmService(farmId);
      return true;
    } catch (error) {
      console.error('Delete Farm error:', error);
      Alert.alert('Error', 'Failed to delete farm. Please try again.');
      throw error;
    }
  };

  // Handle saving (create or update) with validation and context update
  const handleSave = async () => {
    if (!farm_name.trim()) {
      Alert.alert('Error', 'Farm name is required');
      return;
    }

    const farmData = {
      farm_name,
      location,
      crop_type,
      soil_type,
    };

    try {
      if (!farmId) {
        // Create new farm
        const newFarm = await handleCreateFarm(farmData);
        if (newFarm) {
          addFarm(newFarm);
          ToastAndroid.show('Farm added successfully!', ToastAndroid.SHORT);
          navigation.goBack();
        }
      } else {
        // Update existing farm
        const updatedFarm = await handleUpdateFarm(farmId, farmData);
        if (updatedFarm) {
          updateFarm(updatedFarm);
          ToastAndroid.show('Farm updated successfully!', ToastAndroid.SHORT);
          navigation.goBack();
        }
      }
    } catch (error) {
      // Errors are handled in handleCreateFarm or handleUpdateFarm
    }
  };

  // Handle resetting the form for a new farm
  const handleNewFarm = () => {
    setFarmName('');
    setLocation('');
    setCropType('');
    setSoilType('');
  };

  // Handle deleting a farm and updating context
  const handleDelete = async () => {
    if (farmId) {
      try {
        await handleDeleteFarm(farmId);
        deleteFarm(farmId);
        ToastAndroid.show('Farm deleted successfully!', ToastAndroid.SHORT);
        navigation.goBack();
      } catch (error) {
        // Error is handled in handleDeleteFarm
      }
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
            {farmId ? t('editFarm') : t('newFarm')}
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
            <Text className="text-gray-600 mb-2 font-medium ml-1">{t('farmName')}</Text>
            <View className="relative">
              <View className="absolute left-3 top-3 z-10">
                <Icon name="business-outline" size={24} color="#447055" />
              </View>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 pl-12 text-gray-800"
                value={farm_name}
                onChangeText={setFarmName}
                placeholder={t('enterFarmName')}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Location Input */}
          <View>
            <Text className="text-gray-600 mb-2 font-medium ml-1">{t('location')}</Text>
            <View className="relative">
              <View className="absolute left-3 top-3 z-10">
                <Icon name="location-outline" size={24} color="#447055" />
              </View>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 pl-12 text-gray-800"
                value={location}
                onChangeText={setLocation}
                placeholder={t('enterLocation')}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Crop Type Input */}
          <View>
            <Text className="text-gray-600 mb-2 font-medium ml-1">{t('cropType')}</Text>
            <View className="relative">
              <View className="absolute left-3 top-3 z-10">
                <Icon name="leaf-outline" size={24} color="#447055" />
              </View>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 pl-12 text-gray-800"
                value={crop_type}
                onChangeText={setCropType}
                placeholder={t('enterCropType')}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Soil Type Input */}
          <View>
            <Text className="text-gray-600 mb-2 font-medium ml-1">{t('soilType')}</Text>
            <View className="relative">
              <View className="absolute left-3 top-3 z-10">
                <Icon name="earth-outline" size={24} color="#447055" />
              </View>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 pl-12 text-gray-800"
                value={soil_type}
                onChangeText={setSoilType}
                placeholder={t('enterSoilType')}
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
                {farmId ? t('saveChanges') : t('addFarm')}
              </Text>
            </TouchableOpacity>

            {farmId && (
              <TouchableOpacity
                className="bg-red-500/90 rounded-xl p-4 flex-row justify-center items-center"
                onPress={handleDelete}
              >
                <Icon name="trash-outline" size={24} color="white" />
                <Text className="text-white font-bold text-lg ml-2">{t('deleteFarm')}</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Quick Tips */}
          <View className="mt-6 bg-blue-50 p-4 rounded-xl">
            <View className="flex-row items-center mb-2">
              <Icon name="information-circle-outline" size={24} color="#447055" />
              <Text className="text-[#447055] font-bold text-lg ml-2">{t('quickTips')}</Text>
            </View>
            <Text className="text-gray-600">
              • {t('addDetailedLocation')}{'\n'}• {t('specifyCropType')}{'\n'}•
              {t('includeSoilType')}
            </Text>
          </View>
        </View>

        <View className="h-6" />
      </View>
    </ScrollView>
  );
};

export default EditFarm;