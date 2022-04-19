import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TagTrendCity({nameCity, present}) {
  return (
    <View style={styles.bgContainer}>
      <Text style={styles.nameCity}>{nameCity}</Text>
      {present && <Ionicons name="location" size={30} color="#fff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    margin: 4,
    backgroundColor: '#0969da',
    borderRadius: 10,
  },
  nameCity: {
    textAlign: 'center',
    color: '#fff',
  },
});
