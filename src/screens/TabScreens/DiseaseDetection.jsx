import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

// Define the API endpoint
const API_URL = 'https://major2-production.up.railway.app/api/detect-plant-disease/';

// DiseaseDetailModal component
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
                <View
                  className={`h-2 flex-1 rounded-full ${disease.impactLevel >= 7
                    ? 'bg-red-500'
                    : disease.impactLevel >= 4
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                    }`}
                />
                <Text className="ml-2 text-gray-800">{disease.impactLevel}/10</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// DiseaseCard component
const DiseaseCard = ({ disease, onViewDetails }) => {
  const { t } = useTranslation();
  return (
    <View className="bg-white rounded-lg p-4 mb-4">
      {/* Disease Image */}
      <View className="h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
        <Image source={{ uri: disease.imageUrl }} className="w-full h-full" resizeMode="cover" />
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

// ResultModal component
const ResultModal = ({ result, visible, onClose }) => {
  const { t } = useTranslation();

  const getCleanText = (text) => {
    return text?.replace(/\*\*/g, '').replace(/^- /, '') || 'N/A';
  };

  const getImpactLevel = (text) => {
    if (!text) return 0;
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const getPreventionItems = () => {
    const preventionItems = [];
    for (const key in result) {
      if (key.startsWith('* **') && key.includes('Prevention')) {
        preventionItems.push(getCleanText(result[key]));
      }
    }
    return preventionItems.length > 0 ? preventionItems : ['N/A'];
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className="bg-white w-full rounded-2xl p-6 max-h-[80%]">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-[#447055]">{t('analysisResult')}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={28} color="#447055" />
            </TouchableOpacity>
          </View>

          <ScrollView className="space-y-4">
            {/* Disease Name */}
            <View>
              <Text className="text-gray-600 font-semibold">{t('diseaseName')}:</Text>
              <Text className="text-lg text-black">
                {getCleanText(result['- **Disease Name'])}
              </Text>
            </View>

            {/* Symptoms */}
            <View>
              <Text className="text-gray-600 font-semibold">{t('symptoms')}:</Text>
              <Text className="text-black">
                {getCleanText(result['- **Symptoms'])}
              </Text>
            </View>

            {/* Description */}
            <View>
              <Text className="text-gray-600 font-semibold">{t('description')}:</Text>
              <Text className="text-black">
                {getCleanText(result['- **Description'])}
              </Text>
            </View>

            {/* How to Cure */}
            <View>
              <Text className="text-gray-600 font-semibold">{t('treatment')}:</Text>
              <Text className="text-black">
                {getCleanText(result['- **How to Cure'])}
              </Text>
            </View>

            {/* Prevention */}
            <View>
              <Text className="text-gray-600 font-semibold">{t('prevention')}:</Text>
              {getPreventionItems().map((item, index) => (
                <View key={index} className="flex-row items-start mt-1">
                  <Text className="text-black mr-2">•</Text>
                  <Text className="text-black flex-1">{item}</Text>
                </View>
              ))}
            </View>

            {/* Impact Level */}
            <View>
              <Text className="text-gray-600 font-semibold">{t('impactLevel')}:</Text>
              <View className="flex-row items-center mt-2">
                <View className="flex-1 bg-gray-200 h-2 rounded-full">
                  <View
                    className={`h-full rounded-full ${getImpactLevel(result['- **Impact Level']) >= 7
                      ? 'bg-red-500'
                      : getImpactLevel(result['- **Impact Level']) >= 4
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                      }`}
                    style={{
                      width: `${(getImpactLevel(result['- **Impact Level']) / 10) * 100}%`,
                    }}
                  />
                </View>
                <Text className="ml-2 text-black">
                  {getImpactLevel(result['- **Impact Level'])}/10
                </Text>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={onClose}
            className="bg-[#447055] py-3 rounded-xl mt-6"
          >
            <Text className="text-white text-center font-semibold">
              {t('close')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
// Main DiseaseDetection component
const DiseaseDetection = () => {
  const { t } = useTranslation();
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  // Sample disease data with extended information
  const sampleDiseases = [
    {
      id: 1,
      name: 'Leaf Blight',
      description:
        'A fungal disease that causes brown spots on leaves, eventually leading to leaf death. Common in humid conditions.',
      symptoms:
        'Brown lesions on leaves, yellowing around infected areas, wilting leaves, and eventual leaf death.',
      cure:
        'Apply copper-based fungicide every 7-14 days. Improve air circulation around plants and avoid overhead watering.',
      prevention:
        'Maintain proper plant spacing, avoid overhead irrigation, remove plant debris, and rotate crops annually.',
      impactLevel: 8,
      imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d',
    },
    {
      id: 2,
      name: 'Powdery Mildew',
      description:
        'A fungal disease appearing as white powdery spots on leaves and stems. Spreads quickly in dry conditions with high humidity.',
      symptoms: 'White powdery coating on leaves, stunted growth, leaf curling, and premature leaf drop.',
      cure: 'Use sulfur-based fungicide. Remove infected parts and ensure proper spacing between plants.',
      prevention:
        'Improve air circulation, avoid overcrowding plants, water at the base, and maintain proper humidity levels.',
      impactLevel: 6,
      imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae',
    },
  ];

  // Request camera permission when showCamera is true
  useEffect(() => {
    if (showCamera) {
      requestCameraPermission();
    }
  }, [showCamera]);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission to detect plant diseases.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (err) {
        console.warn(err);
        setHasPermission(false);
      }
    } else {
      setHasPermission(true); // iOS permissions are handled in Info.plist
    }
  };

  // Function to take a picture
  const takePicture = async () => {
    if (!camera) {
      console.error('Camera is not initialized');
      return;
    }
    try {
      const options = { quality: 0.5, };
      const data = await camera.takePictureAsync(options);
      console.log(data, 'dataad ccb bddc ::::::::::::::::::::a');

      setImage(data.uri);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  // Function to analyze disease via API
  const analyzeDisease = async (imageUri) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'plant_image.jpg',
      });

      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Check if there's a raw response indicating no disease detected
      if (response.data.raw_response && response.data.raw_response.includes('No disease detected')) {
        Alert.alert(
          'No Disease Detected',
          'The image does not appear to contain a plant. Please take a clear picture of a plant leaf.',
          [
            { text: 'OK', onPress: () => setImage(null) }
          ]
        );
        return;
      }

      // Check if we have valid detection results
      if (response.data &&
        response.data.detection_result &&
        Object.keys(response.data.detection_result).length > 0) {
        setDiseaseResult(response.data.detection_result);
        setShowCamera(false);
        setShowResultModal(true);
      } else {
        Alert.alert(
          'Analysis Failed',
          'Could not analyze the image. Please try again with a clearer picture of the plant.',
          [
            { text: 'OK', onPress: () => setImage(null) }
          ]
        );
      }
    } catch (error) {
      console.error('Error analyzing disease:', error);
      let errorMessage = 'An unexpected error occurred.';

      if (error.response) {
        errorMessage = `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Network error: Please check your connection.';
      }

      Alert.alert(
        'Error',
        errorMessage,
        [
          { text: 'OK', onPress: () => setImage(null) }
        ]
      );
    } finally {
      setLoading(false);
    }
  };
  // Handle confirmation after taking a picture
  const handleConfirm = async () => {
    if (image) {
      await analyzeDisease(image);
    }
  };

  // Handle opening the camera
  const handleOpenCamera = () => {
    setShowCamera(true);
    setDiseaseResult(null);
    setImage(null);
  };

  // Handle viewing disease details
  const handleViewDetails = (disease) => {
    setSelectedDisease(disease);
    setModalVisible(true);
  };

  if (showCamera) {
    if (hasPermission === null) {
      return <StyledView />;
    }
    if (hasPermission === false) {
      return (
        <StyledView className="flex-1 justify-center items-center">
          <StyledText>No access to camera</StyledText>
          <StyledTouchableOpacity
            onPress={requestCameraPermission}
            className="bg-[#447055] p-2 mt-4 rounded"
          >
            <StyledText className="text-white">Retry</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      );
    }

    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <StyledView className="flex-1 bg-[#447055]">
          {!image ? (
            <StyledView className="flex-1">
              <RNCamera
                ref={(ref) => setCamera(ref)}
                style={styles.camera}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
              >
                <StyledView className="flex-1 bg-transparent justify-end pb-10">
                  <StyledView className="flex-row justify-center items-center">
                    <StyledTouchableOpacity onPress={takePicture} className="bg-white rounded-full p-4">
                      <Ionicons name="camera" size={30} color="#447055" />
                    </StyledTouchableOpacity>
                  </StyledView>
                </StyledView>
              </RNCamera>
            </StyledView>
          ) : (
            <StyledView className="flex-1">
              <Image source={{ uri: image }} style={{ flex: 1 }} />
              <StyledView className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
                <StyledView className="flex-row justify-between items-center">
                  <StyledTouchableOpacity onPress={() => setImage(null)} className="bg-red-500 rounded-full p-4">
                    <Ionicons name="close" size={30} color="white" />
                  </StyledTouchableOpacity>
                  <StyledTouchableOpacity
                    onPress={handleConfirm}
                    disabled={loading}
                    className={`${loading ? 'bg-gray-500' : 'bg-green-500'} rounded-full p-4`}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Ionicons name="checkmark" size={30} color="white" />
                    )}
                  </StyledTouchableOpacity>
                </StyledView>
              </StyledView>
            </StyledView>
          )}
        </StyledView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView
        className="flex-1 bg-gray-100"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View className="bg-[#447055] p-4 pb-8 rounded-b-3xl">
          <Text className="text-white text-xl font-bold mb-4">{t('diseaseDetection')}</Text>
          <TouchableOpacity
            onPress={handleOpenCamera}
            className="bg-white p-4 rounded-lg flex-row items-center justify-center"
          >
            <Ionicons name="camera" size={24} color="#447055" />
            <Text className="text-[#447055] font-bold ml-2">{t('scanPlant')}</Text>
          </TouchableOpacity>
        </View>

        {/* Disease Cards */}
        <View className="p-4">
          <Text className="text-black font-bold text-lg mb-3">{t('recentScans')}</Text>
          {sampleDiseases.map((disease) => (
            <DiseaseCard
              key={disease.id}
              disease={disease}
              onViewDetails={() => handleViewDetails(disease)}
            />
          ))}
        </View>

        {/* Result Modal */}
        {diseaseResult && (
          <ResultModal
            result={diseaseResult}
            visible={showResultModal}
            onClose={() => setShowResultModal(false)}
          />
        )}

        {/* Disease Detail Modal */}
        {selectedDisease && (
          <DiseaseDetailModal
            disease={selectedDisease}
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});

export default DiseaseDetection;