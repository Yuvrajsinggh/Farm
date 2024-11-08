import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
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
    <View className="flex-1 bg-gray-100 p-4">
      <View className="bg-white rounded-lg p-4">
        <Text className="text-black mb-2">Farm Name</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-2 mb-4 text-black"
          value={farmName}
          onChangeText={setFarmName}
        />

        <Text className="text-black mb-2">Location</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-2 mb-4 text-black"
          value={location}
          onChangeText={setLocation}
        />

        <Text className="text-black mb-2">Crop</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-2 mb-4 text-black"
          value={crop}
          onChangeText={setCrop}
        />

        <Text className="text-black mb-2">Soil Type</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-2 mb-4 text-black"
          value={soil}
          onChangeText={setSoil}
        />

        <TouchableOpacity
          className="bg-blue-500 rounded-md p-3 mb-3"
          onPress={handleSave}
        >
          <Text className="text-white text-center font-bold">
            {farmId ? 'Save Changes' : 'Add Farm'}
          </Text>
        </TouchableOpacity>

        {farmId && (
          <TouchableOpacity
            className="bg-red-500 rounded-md p-3 mb-3"
            onPress={handleDelete}
          >
            <Text className="text-white text-center font-bold">Delete Farm</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          className="bg-green-500 rounded-md p-3"
          onPress={handleNewFarm}
        >
          <Text className="text-white text-center font-bold">Clear Form</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditFarm;
