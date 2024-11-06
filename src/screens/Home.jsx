import { View, Image } from 'react-native';
import React from 'react';

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#447055' }}>

      <Image
        source={require('../assets/Farm.png')}
      />
    </View>
  );
};

export default Home;
