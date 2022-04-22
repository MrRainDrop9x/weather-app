import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CityOfList({nameCity, temp, description, present, handleFunc}) {
  return (
    <TouchableOpacity onPress={handleFunc}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#45b3d8', '#578ed9']}
          style={styles.linearGradient}>
          <View style={styles.boxLeft}>
            <Text style={styles.nameCity}>
              {nameCity.length > 12 ? `${nameCity.slice(0, 12)}...` : nameCity}
            </Text>
            {present && <Ionicons name="location" size={14} color="#fff" />}
          </View>
          <View style={styles.boxRight}>
            <Text style={styles.text}>{`${temp}`}</Text>
            <Text style={styles.textDes}>{description.length > 12 ? `${description.slice(0, 12)}...` : description}</Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderWidth: 0,
    borderRadius: 18,
    marginBottom: 8,
    overflow: 'hidden',
  },
  linearGradient: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxRight: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  nameCity: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginRight: 4,
  },
  text: {
    color: '#ebeef1',
  },
  textDes: {
    color: '#ebeef1',
    textTransform: 'capitalize',
  }
});
