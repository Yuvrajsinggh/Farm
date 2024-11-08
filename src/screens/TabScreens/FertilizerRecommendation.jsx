import React, { useMemo } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

const NPKCard = ({ label, value, bgColor, iconColor }) => (
  <View className={`${bgColor} p-2 m-2 ml-4 rounded-lg flex-row items-center`}>
    <View className="flex-1">
      <Text className="text-gray-600 text-sm">{label}</Text>
      <Text className="text-black text-xl font-bold">{value}</Text>
    </View>
    <Ionicons name="analytics-outline" size={24} color={iconColor} />
  </View>
);

const FertilizerRow = ({ data }) => (
  <View className="bg-white rounded-lg p-4 mb-4">
    <Text className="text-black font-bold mb-3">{data.title}</Text>
    <View className="flex-row justify-around">
      {data.fertilizers.map((fertilizer, index) => (
        <View key={index} className="items-center bg-gray-50 p-3 rounded-lg flex-1 mx-1">
          <Ionicons name={fertilizer.icon} size={24} color="#447055" />
          <Text className="text-black font-medium mt-2">{fertilizer.name}</Text>
          <Text className="text-gray-600 text-sm">{fertilizer.amount}</Text>
        </View>
      ))}
    </View>
  </View>
);

const FertilizerRecommendation = () => {
  const { t } = useTranslation();

  const npkValues = useMemo(() => ({
    n: Math.floor(Math.random() * 101),
    p: Math.floor(Math.random() * 101),
    k: Math.floor(Math.random() * 101),
  }), []);

  const fertilizerData = [
    {
      title: t('firstApplication'),
      fertilizers: [
        { name: 'DAP', amount: '50kg', icon: 'leaf-outline' },
        { name: 'MOP', amount: '67kg', icon: 'water-outline' },
        { name: 'Urea', amount: '10kg', icon: 'flask-outline' },
      ],
    },
    {
      title: t('secondApplication'),
      fertilizers: [
        { name: 'DAP', amount: '70kg', icon: 'leaf-outline' },
        { name: 'MOP', amount: '45kg', icon: 'water-outline' },
        { name: 'Urea', amount: '15kg', icon: 'flask-outline' },
      ],
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header Section */}
      <View className="bg-[#447055] p-4 pb-8 rounded-b-3xl">
        <Text className="text-white text-xl font-bold mb-4">
          {t('npkValues')}
        </Text>

        {/* NPK Values Grid */}
        <View className="gap-3">
          <NPKCard
            label={t('nitrogen')}
            value={`${npkValues.n}%`}
            bgColor="bg-green-100"
            iconColor="#15803d"
          />
          <NPKCard
            label={t('phosphorus')}
            value={`${npkValues.p}%`}
            bgColor="bg-blue-100"
            iconColor="#1d4ed8"
          />
          <NPKCard
            label={t('potassium')}
            value={`${npkValues.k}%`}
            bgColor="bg-yellow-100"
            iconColor="#ca8a04"
          />
        </View>
      </View>

      {/* Main Content */}
      <View className="p-4">
        {/* Crop Image Section */}
        <View className="bg-white p-4 rounded-lg mb-4">
          <Text className="text-black font-bold mb-3">
            {t('cropImage')}
          </Text>
          <View className="h-48 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d',
              }}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Recommendations Section */}
        <Text className="text-black font-bold text-lg mb-3">
          {t('recommendedFertilizers')}
        </Text>

        {fertilizerData.map((row, index) => (
          <FertilizerRow key={index} data={row} />
        ))}
      </View>
    </ScrollView>
  );
};

export default FertilizerRecommendation;
