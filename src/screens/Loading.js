import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <View style={{flex: 1}}>
      <LottieView source={require('../../assets/loading.json')} autoPlay loop />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
