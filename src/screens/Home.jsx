import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFarms } from '../context/FarmContext';
import { useTranslation } from 'react-i18next';

const Home = ({ navigation }) => {
  const { farms } = useFarms();
  const [isAutoIrrigationOn, setIsAutoIrrigationOn] = useState(false);
  const { t } = useTranslation();

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Main Background Section */}
      <View className="bg-[#447055] p-4 pb-8 rounded-b-3xl mb-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-2xl font-bold">{t('dashboard')}</Text>
          <TouchableOpacity
            className="bg-white/20 p-2 rounded-full"
            onPress={() => navigation.navigate('Profile')}
          >
            <Icon name="person-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Weather Card */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white text-lg font-semibold">{t('weather')}</Text>
            <Icon name="partly-sunny-outline" size={24} color="white" />
          </View>
          <View className="bg-white/90 p-4 rounded-xl shadow-lg">
            <View className="flex-row items-center mb-3">
              <View className="bg-yellow-100 p-2 rounded-full">
                <Icon name="sunny-outline" size={24} color="#ca8a04" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-600 text-sm">{t('current')}</Text>
                <Text className="text-black text-xl font-bold">{t('sunny')}, 25°C</Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full">
                <Icon name="rainy-outline" size={24} color="#1d4ed8" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-600 text-sm">{t('forecast')}</Text>
                <Text className="text-black text-xl font-bold">{t('rainy')}, 22°C</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Irrigation Card */}
        <View>
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white text-lg font-semibold">{t('irrigation')}</Text>
            <Icon name="water-outline" size={24} color="white" />
          </View>
          <View className="bg-white/90 p-4 rounded-xl shadow-lg">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className="bg-blue-100 p-2 rounded-full">
                  <Icon name="water" size={24} color="#1d4ed8" />
                </View>
                <View className="ml-3">
                  <Text className="text-gray-600 text-sm">{t('waterLevel')}</Text>
                  <Text className="text-black text-xl font-bold">75%</Text>
                </View>
              </View>
              <TouchableOpacity
                className={`px-4 py-2 rounded-full flex-row items-center ${isAutoIrrigationOn ? 'bg-[#447055]' : 'bg-gray-200'
                  }`}
                onPress={() => setIsAutoIrrigationOn(!isAutoIrrigationOn)}
              >
                <Text className={`mr-2 ${isAutoIrrigationOn ? 'text-white' : 'text-gray-600'}`}>
                  {t('auto')}
                </Text>
                <View className={`w-6 h-6 rounded-full ${isAutoIrrigationOn ? 'bg-white' : 'bg-gray-400'
                  }`} />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center mt-3">
              <View className="bg-green-100 p-2 rounded-full">
                <Icon name="time-outline" size={24} color="#15803d" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-600 text-sm">{t('nextSchedule')}</Text>
                <Text className="text-black text-xl font-bold">6:00 AM</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Farms Section */}
      <View className="px-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-black text-xl font-bold">{t('myFarms')}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditFarm')}
            className="bg-[#447055] p-2 rounded-full"
          >
            <Icon name="add-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {farms.map(farm => (
          <TouchableOpacity
            key={farm.id}
            onPress={() => navigation.navigate('EditFarm', { farmId: farm.id })}
            className="mb-3"
          >
            <View className="p-4 bg-white rounded-xl shadow-lg border border-gray-100">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-800 mb-2">{farm.name || t('unnamedFarm')}</Text>
                  <View className="space-y-3">
                    <View className="flex-row items-center">
                      <View className="bg-green-100 p-1.5 rounded-full">
                        <Icon name="location-outline" size={18} color="#447055" />
                      </View>
                      <Text className="text-gray-600 ml-2">{farm.location || t('notSpecified')}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <View className="bg-green-100 p-1.5 rounded-full">
                        <Icon name="leaf-outline" size={18} color="#447055" />
                      </View>
                      <Text className="text-gray-600 ml-2">{farm.crop || t('notSpecified')}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <View className="bg-green-100 p-1.5 rounded-full">
                        <Icon name="earth-outline" size={18} color="#447055" />
                      </View>
                      <Text className="text-gray-600 ml-2">{farm.soil || t('notSpecified')}</Text>
                    </View>
                  </View>
                </View>
                <Icon name="chevron-forward-outline" size={24} color="#447055" />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {farms.length === 0 && (
          <View className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <View className="bg-green-100 p-4 rounded-full self-center mb-4 mx-auto">
              <Icon name="leaf-outline" size={40} color="#447055" />
            </View>
            <Text className="text-gray-500 text-center text-lg">{t('noFarmsAdded')}</Text>
            <Text className="text-gray-400 text-center text-sm mt-2">
              {t('tapToAddFarm')}
            </Text>
          </View>
        )}
      </View>

      <View className="h-6" />
    </ScrollView>
  );
};

export default Home;