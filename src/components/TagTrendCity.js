import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TagTrendCity({
  nameCity,
  present,
  handleFunc,
  checkPos,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => (present ? checkPos() : handleFunc(nameCity))}
      style={styles.bgContainer}>
      <Text style={styles.nameCity}>{nameCity}</Text>
      {present && (
        <Ionicons
          name="location"
          size={20}
          color="#fff"
          style={{position: 'absolute', right: 115}}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
