import React from 'react';
import LottieView from 'lottie-react-native';
import {View, Text} from 'react-native';
function EmptyScreen() {
  return (
    <View style={{flex: 1, backgroundColor: '#3490dc'}}>
      <LottieView
        source={require('../../assets/emptyCategory.json')}
        autoPlay
        loop
      />
      <View>
        <Text>asdasd</Text>
      </View>
    </View>
  );
}

export default EmptyScreen;
