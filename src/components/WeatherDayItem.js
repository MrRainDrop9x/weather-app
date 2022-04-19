import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function WeatherDayItem() {
  return (
    <View style={styles.weatherDayItem}>
      <Text>17 thg 4</Text>
      <Text>Hôm nay</Text>
      <View>
        <View></View>
        <Text></Text>
      </View>
      <Text>{`10/3\u2103`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherDayItem: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
