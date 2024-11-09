import React, { useMemo } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styled } from 'nativewind';
import { useTranslation } from 'react-i18next';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

const ConditionCard = ({ label, value, icon }) => (
  <StyledView className="bg-white/10 p-4 rounded-xl backdrop-blur-lg mb-3">
    <StyledView className="flex-row justify-between items-center">
      <StyledView className="flex-1">
        <StyledText className="text-white/70 text-sm mb-1">{label}</StyledText>
        <StyledText className="text-white text-xl font-bold">{value}</StyledText>
      </StyledView>
      <StyledView className="bg-white/20 p-2 rounded-full">
        <Icon name={icon} size={24} color="#ffffff" />
      </StyledView>
    </StyledView>
  </StyledView>
);

const CropCard = ({ name, season, icon }) => (
  <StyledView className="bg-white/10 p-4 rounded-xl backdrop-blur-lg flex-1 mx-1">
    <StyledView className="items-center">
      <StyledView className="bg-white/20 p-3 rounded-full mb-2">
        <Icon name={icon} size={24} color="#ffffff" />
      </StyledView>
      <StyledText className="text-white font-bold text-base">{name}</StyledText>
      <StyledText className="text-white/70 text-sm mt-1">{season}</StyledText>
    </StyledView>
  </StyledView>
);

const RecommendationSection = ({ title, crops, reason }) => (
  <StyledView className="bg-white/10 p-4 rounded-xl backdrop-blur-lg mb-4">
    <StyledText className="text-white font-bold text-lg mb-4">{title}</StyledText>
    <StyledView className="flex-row justify-between mb-3">
      {crops.map((crop, index) => (
        <CropCard key={index} {...crop} />
      ))}
    </StyledView>
    <StyledText className="text-white/70 text-sm">{reason}</StyledText>
  </StyledView>
);

const CropRecommendation = () => {
  const { t } = useTranslation();

  const soilConditions = useMemo(() => ({
    temp: Math.floor(Math.random() * 41),
    humidity: Math.floor(Math.random() * 101),
    ph: (Math.random() * (8 - 5) + 5).toFixed(1),
  }), []);

  const npkValues = useMemo(() => ({
    n: Math.floor(Math.random() * 101),
    p: Math.floor(Math.random() * 101),
    k: Math.floor(Math.random() * 101),
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
    <StyledScrollView className="flex-1 bg-[#447055]">
      {/* Header Section */}
      <StyledView className="p-6">
        <StyledView className="items-center mb-8">
          <Icon name="leaf-outline" size={80} color="#ffffff" />
          <StyledText className="text-4xl font-bold text-white text-center mt-4">
            {t('soilAnalysis')}
          </StyledText>
          <StyledText className="text-white text-lg opacity-80 mt-2">
            {t('analyzeAndRecommend')}
          </StyledText>
        </StyledView>

        {/* Soil Conditions */}
        <StyledView className="mb-6">
          <StyledText className="text-white text-xl font-bold mb-4">
            {t('soilConditions')}
          </StyledText>
          <ConditionCard
            label={t('temperature')}
            value={`${soilConditions.temp}°C`}
            icon="thermometer-outline"
          />
          <ConditionCard
            label={t('humidity')}
            value={`${soilConditions.humidity}%`}
            icon="water-outline"
          />
          <ConditionCard
            label={t('soilPH')}
            value={soilConditions.ph}
            icon="flask-outline"
          />
        </StyledView>

        {/* NPK Values */}
        <StyledView className="mb-6">
          <StyledText className="text-white text-xl font-bold mb-4">
            {t('npkValues')}
          </StyledText>
          <ConditionCard
            label={t('nitrogen')}
            value={`${npkValues.n}%`}
            icon="analytics-outline"
          />
          <ConditionCard
            label={t('phosphorus')}
            value={`${npkValues.p}%`}
            icon="analytics-outline"
          />
          <ConditionCard
            label={t('potassium')}
            value={`${npkValues.k}%`}
            icon="analytics-outline"
          />
        </StyledView>

        {/* Soil Image */}
        <StyledView className="bg-white/10 p-4 rounded-xl backdrop-blur-lg mb-6">
          <StyledText className="text-white font-bold text-lg mb-3">
            {t('soilImage')}
          </StyledText>
          <StyledView className="h-48 rounded-lg overflow-hidden">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae',
              }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </StyledView>
        </StyledView>

        {/* Recommendations */}
        <StyledText className="text-white text-xl font-bold mb-4">
          {t('recommendedCrops')}
        </StyledText>
        {cropData.map((section, index) => (
          <RecommendationSection key={index} {...section} />
        ))}
      </StyledView>

      {/* Info Section */}

    </StyledScrollView>
  );
};

export default CropRecommendation;