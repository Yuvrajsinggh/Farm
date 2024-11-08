import React, { useMemo } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

const ConditionCard = ({ label, value, bgColor, iconColor }) => (
  <View className={`${bgColor} p-2 m-2 ml-4 rounded-lg flex-row items-center`}>
    <View className="flex-1">
      <Text className="text-gray-600 text-sm">{label}</Text>
      <Text className="text-black text-xl font-bold">{value}</Text>
    </View>
    <Ionicons name="thermometer-outline" size={24} color={iconColor} />
  </View>
);

const CropRow = ({ data }) => (
  <View className="bg-white rounded-lg p-4 mb-4">
    <Text className="text-black font-bold mb-3">{data.title}</Text>
    <View className="flex-row justify-around">
      {data.crops.map((crop, index) => (
        <View key={index} className="items-center bg-gray-50 p-3 rounded-lg flex-1 mx-1">
          <Ionicons name={crop.icon} size={24} color="#447055" />
          <Text className="text-black font-medium mt-2">{crop.name}</Text>
          <Text className="text-gray-600 text-sm">{crop.season}</Text>
        </View>
      ))}
    </View>
    <Text className="text-gray-600 mt-3 text-sm">{data.reason}</Text>
  </View>
);

const CropRecommendation = () => {
  const { t } = useTranslation();

  const soilConditions = useMemo(() => ({
    temp: Math.floor(Math.random() * 41),
    humidity: Math.floor(Math.random() * 101),
    ph: (Math.random() * (8 - 5) + 5).toFixed(1),
  }), []);

  const cropData = [
    {
      title: t('primaryRecommendation'),
      crops: [
        { name: t('wheat'), season: t('winter'), icon: 'nutrition-outline' },
        { name: t('rice'), season: t('monsoon'), icon: 'leaf-outline' },
        { name: t('corn'), season: t('summer'), icon: 'flower-outline' },
      ],
      reason: t('primaryReason'),
    },
    {
      title: t('alternativeOptions'),
      crops: [
        { name: t('barley'), season: t('winter'), icon: 'nutrition-outline' },
        { name: t('soybean'), season: t('spring'), icon: 'leaf-outline' },
        { name: t('millet'), season: t('summer'), icon: 'flower-outline' },
      ],
      reason: t('alternativeReason'),
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header Section */}
      <View className="bg-[#447055] p-4 pb-8 rounded-b-3xl">
        <Text className="text-white text-xl font-bold mb-4">
          {t('soilConditions')}
        </Text>

        {/* Condition Values Grid */}
        <View className="gap-3">
          <ConditionCard
            label={t('temperature')}
            value={`${soilConditions.temp}°C`}
            bgColor="bg-orange-100"
            iconColor="#ea580c"
          />
          <ConditionCard
            label={t('humidity')}
            value={`${soilConditions.humidity}%`}
            bgColor="bg-blue-100"
            iconColor="#1d4ed8"
          />
          <ConditionCard
            label={t('soilPH')}
            value={soilConditions.ph}
            bgColor="bg-purple-100"
            iconColor="#7e22ce"
          />
        </View>
      </View>

      {/* Main Content */}
      <View className="p-4">
        {/* Soil Image Section */}
        <View className="bg-white p-4 rounded-lg mb-4">
          <Text className="text-black font-bold mb-3">
            {t('soilAnalysis')}
          </Text>
          <View className="h-48 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae',
              }}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Recommendations Section */}
        <Text className="text-black font-bold text-lg mb-3">
          {t('recommendedCrops')}
        </Text>

        {cropData.map((row, index) => (
          <CropRow key={index} data={row} />
        ))}
      </View>
    </ScrollView>
  );
};

export default CropRecommendation;