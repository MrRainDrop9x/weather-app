import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TagTrendCity({
  nameCity,
  present,
  handleFunc,
  checkPos,
  isTracked,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => (present ? checkPos() : handleFunc(nameCity))}
      style={isTracked ? styles.bgContainerTrecked : styles.bgContainer}>
      <Text style={isTracked ? styles.nameCity : styles.normal}>
        {nameCity === 'Thành phố Hồ Chí Minh' ? 'Tp Hồ Chí Minh' : nameCity}
      </Text>
      {present && (
        <Ionicons
          name="location"
          size={20}
          color="#fff"
          style={{fontSize: 15, marginLeft: 2, color: 'rgba(120,163,214,0.6)'}}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bgContainerTrecked: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 105,
    height: 40,
    margin: 2,
    backgroundColor: '#0969da',
    borderRadius: 5,
  },
  bgContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 105,
    height: 40,
    margin: 2,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  nameCity: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 12.5,
  },
  normal: {
    textAlign: 'center',
    color: '#333',
    fontSize: 12.5,
  },
});
