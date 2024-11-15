import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { styled } from 'nativewind';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { FertilizerCombination } from './FertilizerAlgorithm';
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

const FertilizerCard = ({ name, amount, icon, description }) => (
  <StyledView className="bg-white/10 p-4 rounded-xl backdrop-blur-lg mb-3">
    <StyledView className="flex-row items-center mb-2">
      <StyledView className="bg-white/20 p-2 rounded-full mr-3">
        <Icon name={icon} size={24} color="#ffffff" />
      </StyledView>
      <StyledView className="flex-1">
        <StyledText className="text-white font-bold text-lg">{name}</StyledText>
        <StyledText className="text-white/70">{amount}</StyledText>
      </StyledView>
    </StyledView>
    <StyledText className="text-white/70 text-sm mt-2">{description}</StyledText>
  </StyledView>
);

const FertilizerRecommendation = () => {
  const { t } = useTranslation();
  const [showResults, setShowResults] = useState(false);
  const [selectedFertilizerData, setSelectedFertilizerData] = useState(null);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      cropType: '',
      soilType: '',
      area: '',
    }
  });

  const mpFertilizerData = {
    wheat: {
      title: t('wheatFertilizerRecommendation'),
      fertilizers: [
        {
          name: 'DAP (Di-ammonium Phosphate)',
          amount: '100 kg/hectare',
          icon: 'leaf-outline',
          description: t('applyBeforeSowing')
        },
        {
          name: 'Urea',
          amount: '120 kg/hectare',
          icon: 'flask-outline',
          description: t('splitApplications')
        },
        {
          name: 'MOP (Muriate of Potash)',
          amount: '60 kg/hectare',
          icon: 'water-outline',
          description: t('applyWithDAP')
        }
      ]
    },
    soybean: {
      title: t('soybeanFertilizerRecommendation'),
      fertilizers: [
        {
          name: 'DAP',
          amount: '80 kg/hectare',
          icon: 'leaf-outline',
          description: t('applyAtSowing')
        },
        {
          name: 'SSP (Single Super Phosphate)',
          amount: '200 kg/hectare',
          icon: 'flask-outline',
          description: t('applyAsBasal')
        },
        {
          name: 'MOP',
          amount: '40 kg/hectare',
          icon: 'water-outline',
          description: t('applyAtSowing')
        }
      ]
    }
  };
  const fertilizers = {
    Urea: [46, 0, 0],
    DAP: [18, 46, 0],
    MOP: [0, 0, 60],
  };


  const cropRequirements = [
    { crop_name: "Wheat", nitrogen_needed: 120, phosphorus_needed: 50, potassium_needed: 60 },
    { crop_name: "Rice", nitrogen_needed: 100, phosphorus_needed: 40, potassium_needed: 30 },
  ];

  const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const fertilizerCombination = new FertilizerCombination(fertilizers, cropRequirements);
  const onSubmit = (data) => {
    const { cropType, area, soilType } = data;

    // Prepare input for the algorithm

    const input = {
      cropName: cropType, // `cropType` from the form
      farmArea: parseFloat(area.size), // Area in numeric value
      // n: parseFloat(soilType.n), // Soil nitrogen
      // p: parseFloat(soilType.p), // Soil phosphorus
      // k: parseFloat(soilType.k), // Soil potassium
      n: 40, // Soil nitrogen (kg/ha)
      p: 10, // Soil phosphorus (kg/ha)
      k: 20, // Soil potassium (kg/ha)
    };



    // Get recommendations
    const results = fertilizerCombination.getCombination(input);
    console.log('results', results);

    // Display results
    if (results) {
      alert('DAP ' + results[0].DAP + "\nUrea  " + results[0].Urea + "\nMOP " + results[0].MOP + "\nCompost in kg " + getRandomValue(100, 200));
      // alert(results)
      console.log(results);

    } else if (results.length === 0) {
      alert("No valid fertilizer combinations found.");
    } else {
      setSelectedFertilizerData(results);
      setShowResults(true);
    }
  };

  return (

    <StyledScrollView className="flex-1 bg-[#447055]">
      {/* Header Section */}
      <StyledView className="p-6">
        <StyledView className="items-center mb-8">
          <Icon name="flask-outline" size={80} color="#ffffff" />
          <StyledText className="text-4xl font-bold text-white text-center mt-4">
            {t('fertilizerGuide')}
          </StyledText>
          <StyledText className="text-white text-lg opacity-80 mt-2">
            {t('mpRecommendations')}
          </StyledText>
        </StyledView>

        {/* Input Form */}
        <StyledView className="bg-white/10 p-4 rounded-xl backdrop-blur-lg mb-6">
          <Controller
            control={control}
            name="cropType"
            rules={{ required: t('cropTypeRequired') }}
            render={({ field: { onChange, value } }) => (
              <StyledView className="mb-4">
                <StyledText className="text-white mb-2">{t('cropType')}</StyledText>
                <StyledView className="bg-white/20 rounded-xl">
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={{ color: '#ffffff' }}
                  >
                    <Picker.Item label={t('selectCropType')} value="" />
                    <Picker.Item label={t('wheat')} value="wheat" />
                    <Picker.Item label={t('rice')} value="rice" />
                  </Picker>
                </StyledView>
                {errors.cropType && (
                  <StyledText className="text-red-300 text-sm mt-1">
                    {errors.cropType.message}
                  </StyledText>
                )}
              </StyledView>
            )}
          />

          <Controller
            control={control}
            name="soilType"
            rules={{ required: t('soilTypeRequired') }}
            render={({ field: { onChange, value } }) => (
              <StyledView className="mb-4">
                <StyledText className="text-white mb-2">{t('soilType')}</StyledText>
                <StyledView className="bg-white/20 rounded-xl">
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={{ color: '#ffffff' }}
                  >
                    <Picker.Item label={t('selectSoilType')} value="" />
                    <Picker.Item label={t('black')} value="black" />
                    <Picker.Item label={t('red')} value="red" />
                    <Picker.Item label={t('clay')} value="clay" />
                  </Picker>
                </StyledView>
                {errors.soilType && (
                  <StyledText className="text-red-300 text-sm mt-1">
                    {errors.soilType.message}
                  </StyledText>
                )}
              </StyledView>
            )}
          />

          <Controller
            control={control}
            name="area"
            rules={{ required: t('areaRequired') }}
            render={({ field: { onChange, value } }) => (
              <StyledView className="mb-4">
                <StyledText className="text-white mb-2">{t('area')}</StyledText>
                <StyledView className="flex-row items-center bg-white/20 rounded-xl p-2">
                  <TextInput
                    style={{ flex: 1, color: '#ffffff', padding: 8 }}
                    placeholder={t('selectArea')}
                    placeholderTextColor="#ffffff"
                    keyboardType="numeric"
                    value={value.size}
                    onChangeText={(text) => onChange({ ...value, size: text })}
                  />
                  <Picker
                    selectedValue={value.unit}
                    onValueChange={(unit) => onChange({ ...value, unit })}
                    style={{ color: '#ffffff', flex: 1 }}
                  >
                    <Picker.Item label={t('hectare')} value="hectare" />
                    <Picker.Item label={t('bigha')} value="bigha" />
                  </Picker>
                </StyledView>
                {errors.area && (
                  <StyledText className="text-red-300 text-sm mt-1">
                    {errors.area.message}
                  </StyledText>
                )}
              </StyledView>
            )}
          />


          <StyledTouchableOpacity
            className="bg-white mt-4 p-4 rounded-xl flex-row justify-center items-center"
            onPress={handleSubmit(onSubmit)}
          >
            <Icon name="calculator-outline" size={24} color="#447055" />
            <StyledText className="text-[#447055] font-bold text-lg ml-2">
              {t('calculateRecommendation')}
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        {/* Results Section */}
        {showResults && selectedFertilizerData && (
          <StyledView>
            <StyledText className="text-white text-xl font-bold mb-4">
              {selectedFertilizerData.title}
            </StyledText>

            {/* Additional Tips */}
            <StyledView className="bg-white/10 p-4 rounded-xl mt-6">
              <StyledView className="flex-row items-center mb-2">
                <Icon name="information-circle-outline" size={24} color="#ffffff" />
                <StyledText className="text-white font-bold text-lg ml-2">
                  {t('applicationTips')}
                </StyledText>
              </StyledView>
              <StyledText className="text-white/70">
                • {t('applyMorningEvening')}{'\n'}
                • {t('avoidHeavyWinds')}{'\n'}
                • {t('ensureSoilMoisture')}{'\n'}
                • {t('followDosage')}
              </StyledText>
            </StyledView>
          </StyledView>
        )}
      </StyledView>
    </StyledScrollView>
  );
};

export default FertilizerRecommendation;