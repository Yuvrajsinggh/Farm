import { View, Image } from 'react-native';
import React from 'react';

const Details = ({ navigation }) => {
  return (
    <View className="flex-1 items-center justify-center bg-[#447055]">
      <Image
        source={require('../assets/Farm.png')}
      />
    </View>
  );
};

export default Details;
