import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFarms } from '../context/FarmContext';
import { useTranslation } from 'react-i18next';
import { getFarmsService, getWeatherData } from '../../utilities/FarmServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';

const Home = ({ navigation }) => {
  const { farms, setFarms } = useFarms();
  const [isAutoIrrigationOn, setIsAutoIrrigationOn] = useState(false);
  const [userData, setUserData] = useState(null);
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Request location permission (Android-specific)
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location for weather updates.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        console.log('Permission status:', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          return true;
        } else {
          console.log('Location permission denied');
          setErrorMsg('Location permission denied');
          return false;
        }
      }
      return true;
    } catch (err) {
      console.warn('Permission request error:', err);
      setErrorMsg('Error requesting location permission');
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check and request location permissions
        const hasPermission = await requestLocationPermission();
        console.log('Has permission:', hasPermission);

        if (hasPermission) {
          setLoading(true);
          Geolocation.getCurrentPosition(
            async (position) => {
              console.log('Position received:', position);
              setLocation(position);
              try {
                const weather = await getWeatherData(
                  position.coords.latitude,
                  position.coords.longitude
                );
                setWeatherData(weather);
              } catch (weatherError) {
                console.error('Weather fetch failed:', weatherError);
                setErrorMsg('Failed to fetch weather data');
              } finally {
                setLoading(false);
              }
            },
            (error) => {
              console.error('Geolocation error:', error);
              setErrorMsg('Unable to get location');
              setLoading(false);
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000,
            }
          );
        }

        // Fetch user data and farms
        const userDataString = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userDataString);
        setUserData(user);

        if (user && user.id) {
          const farmsResponse = await getFarmsService(user.id);
          console.log('Farms response:', farmsResponse);

          setFarms(farmsResponse);
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
        setErrorMsg('An error occurred while fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [setFarms]);

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

          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : weatherData ? (
            <View className="bg-white/90 p-4 rounded-xl shadow-lg">
              {/* Current Weather */}
              <View className="flex-row items-center mb-3">
                <Image
                  source={{
                    uri: `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`,
                  }}
                  style={{ width: 50, height: 50 }}
                />
                <View className="ml-3">
                  <Text className="text-gray-600 text-sm">{t('current')}</Text>
                  <Text className="text-black text-xl font-bold">
                    {Math.round(weatherData.current.temp)}°C -{' '}
                    {weatherData.current.weather[0].description}
                  </Text>
                </View>
              </View>
              {/* 5-Day Forecast */}
              <View>
                <Text className="text-gray-600 text-sm mb-2">{t('forecast')}</Text>
                {weatherData.daily.slice(1, 6).map((day, index) => (
                  <View key={index} className="flex-row items-center mb-2">
                    <Text className="text-gray-600 text-sm w-20">
                      {new Date(day.dt * 1000).toLocaleDateString()}
                    </Text>
                    <Image
                      source={{
                        uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
                      }}
                      style={{ width: 30, height: 30, marginHorizontal: 10 }}
                    />
                    <Text className="text-black text-sm flex-1">
                      {Math.round(day.temp.day)}°C - {day.weather[0].description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <Text className="text-red-500 text-sm">
              {errorMsg || 'No weather data available'}
            </Text>
          )}
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
                <Text
                  className={`mr-2 ${isAutoIrrigationOn ? 'text-white' : 'text-gray-600'}`}
                >
                  {t('auto')}
                </Text>
                <View
                  className={`w-6 h-6 rounded-full ${isAutoIrrigationOn ? 'bg-white' : 'bg-gray-400'
                    }`}
                />
              </TouchableOpacity>
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

        {farms.map((farm) => (
          <TouchableOpacity
            key={farm.id}
            onPress={() =>


              navigation.navigate('EditFarm', {
                farmId: farm.id,
                farmName: farm.farm_name,
                location: farm.location,
                cropType: farm.crop_type,
                soilType: farm.soil_type,
              })
            }
            className="mb-3"
          >
            <View className="p-4 bg-white rounded-xl shadow-lg border border-gray-100">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-800 mb-2">
                    {farm.farm_name || t('unnamedFarm')}
                  </Text>
                  <View className="space-y-3">
                    <View className="flex-row items-center">
                      <View className="bg-green-100 p-1.5 rounded-full">
                        <Icon name="location-outline" size={18} color="#447055" />
                      </View>
                      <Text className="text-gray-600 ml-2">
                        {farm.location || t('notSpecified')}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <View className="bg-green-100 p-1.5 rounded-full">
                        <Icon name="leaf-outline" size={18} color="#447055" />
                      </View>
                      <Text className="text-gray-600 ml-2">
                        {farm.crop_type || t('notSpecified')}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <View className="bg-green-100 p-1.5 rounded-full">
                        <Icon name="earth-outline" size={18} color="#447055" />
                      </View>
                      <Text className="text-gray-600 ml-2">
                        {farm.soil_type || t('notSpecified')}
                      </Text>
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