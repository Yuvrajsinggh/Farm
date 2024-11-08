import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

const DiseaseDetailModal = ({ disease, visible, onClose }) => {
  const { t } = useTranslation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl p-6 h-4/5">
          {/* Header with close button */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-black text-xl font-bold">{disease.name}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={28} color="#447055" />
            </TouchableOpacity>
          </View>

          {/* Disease Image */}
          <View className="h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
            <Image
              source={{ uri: disease.imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Detailed Content */}
          <ScrollView className="flex-1">
            <View className="mb-4">
              <Text className="text-gray-600 font-semibold mb-1">{t('symptoms')}:</Text>
              <Text className="text-gray-800">{disease.symptoms}</Text>
            </View>

            <View className="mb-4">
              <Text className="text-gray-600 font-semibold mb-1">{t('description')}:</Text>
              <Text className="text-gray-800">{disease.description}</Text>
            </View>

            <View className="mb-4">
              <Text className="text-gray-600 font-semibold mb-1">{t('howToCure')}:</Text>
              <Text className="text-gray-800">{disease.cure}</Text>
            </View>

            <View className="mb-4">
              <Text className="text-gray-600 font-semibold mb-1">{t('prevention')}:</Text>
              <Text className="text-gray-800">{disease.prevention}</Text>
            </View>

            <View>
              <Text className="text-gray-600 font-semibold mb-1">{t('impactLevel')}:</Text>
              <View className="flex-row items-center">
                <View className={`h-2 flex-1 rounded-full ${disease.impactLevel >= 7 ? 'bg-red-500' :
                  disease.impactLevel >= 4 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                <Text className="ml-2 text-gray-800">{disease.impactLevel}/10</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const DiseaseCard = ({ disease, onViewDetails }) => {
  const { t } = useTranslation();
  return (
    <View className="bg-white rounded-lg p-4 mb-4">
      {/* Disease Image */}
      <View className="h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
        <Image
          source={{ uri: disease.imageUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Disease Details */}
      <View>
        <Text className="text-black text-xl font-bold mb-2">{disease.name}</Text>

        <View className="mb-4">
          <Text className="text-gray-600 font-semibold mb-1">{t('description')}:</Text>
          <Text className="text-gray-800 numberOfLines={2}">{disease.description}</Text>
        </View>

        {/* View Details Button */}
        <TouchableOpacity
          onPress={onViewDetails}
          className="bg-[#447055] py-2 px-4 rounded-lg self-start mb-4"
        >
          <Text className="text-white font-semibold">{t('viewDetails')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DiseaseDetection = () => {
  const { t } = useTranslation();
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Sample disease data with extended information
  const sampleDiseases = [
    {
      id: 1,
      name: 'Leaf Blight',
      description: 'A fungal disease that causes brown spots on leaves, eventually leading to leaf death. Common in humid conditions.',
      symptoms: 'Brown lesions on leaves, yellowing around infected areas, wilting leaves, and eventual leaf death.',
      cure: 'Apply copper-based fungicide every 7-14 days. Improve air circulation around plants and avoid overhead watering.',
      prevention: 'Maintain proper plant spacing, avoid overhead irrigation, remove plant debris, and rotate crops annually.',
      impactLevel: 8,
      imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d',
    },
    {
      id: 2,
      name: 'Powdery Mildew',
      description: 'A fungal disease appearing as white powdery spots on leaves and stems. Spreads quickly in dry conditions with high humidity.',
      symptoms: 'White powdery coating on leaves, stunted growth, leaf curling, and premature leaf drop.',
      cure: 'Use sulfur-based fungicide. Remove infected parts and ensure proper spacing between plants.',
      prevention: 'Improve air circulation, avoid overcrowding plants, water at the base, and maintain proper humidity levels.',
      impactLevel: 6,
      imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae',
    },
  ];

  const handleViewDetails = (disease) => {
    setSelectedDisease(disease);
    setModalVisible(true);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header Section */}
      <View className="bg-[#447055] p-4 pb-8 rounded-b-3xl">
        <Text className="text-white text-xl font-bold mb-4">
          {t('diseaseDetection')}
        </Text>

        <TouchableOpacity className="bg-white p-4 rounded-lg flex-row items-center justify-center">
          <Ionicons name="camera" size={24} color="#447055" />
          <Text className="text-[#447055] font-bold ml-2">
            {t('scanPlant')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Disease Cards */}
      <View className="p-4">
        <Text className="text-black font-bold text-lg mb-3">
          {t('recentScans')}
        </Text>

        {sampleDiseases.map(disease => (
          <DiseaseCard
            key={disease.id}
            disease={disease}
            onViewDetails={() => handleViewDetails(disease)}
          />
        ))}
      </View>

      {/* Disease Detail Modal */}
      {selectedDisease && (
        <DiseaseDetailModal
          disease={selectedDisease}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </ScrollView>
  );
};

export default DiseaseDetection;