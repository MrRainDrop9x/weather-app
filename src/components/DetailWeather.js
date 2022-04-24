import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DetailWeather = ({location}) => {
  return (
    <View style={styles.wrapperDetail}>
      <View>
        <Text style={styles.detail}>Chi tiết thời tiết</Text>
      </View>
      <View style={styles.wrapperInfo}>
        <View style={styles.info}>
          <View style={styles.info_item}>
            <Text style={[styles.main]}>{`${location.temparature}`}</Text>
            <Text style={styles.sub}>độ C nhiệt độ</Text>
          </View>
          <View style={styles.info_item}>
            <Text
              style={[
                styles.main,
                {textAlign: 'right'},
              ]}>{`${location.temparature}`}</Text>
            <Text style={styles.sub}>Độ hiển thị</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.info_item}>
            <Text style={styles.main}>
              {`${location.windSpeed} `}
              <Text style={{fontSize: 15}}>km/h</Text>
            </Text>
            <Text style={styles.sub}>Tốc độ gió</Text>
          </View>
          <View style={styles.info_item}>
            <View>
              <Text style={styles.main}>{`${location.humidity}%`}</Text>
            </View>
            <Text style={styles.sub}>Độ ẩm</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.info_item}>
            <Text style={styles.main}>
              {`${location.pressure} `}
              <Text style={{fontSize: 15}}>hPa</Text>
            </Text>
            <Text style={styles.sub}>Áp suất không khí</Text>
          </View>
          <View style={styles.info_item}>
            <Text
              style={[
                styles.main,
                {textAlign: 'right'},
              ]}>{`${location.visibility} km`}</Text>
            <Text style={styles.sub}>Độ hiển thị</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailWeather;

const font = 'Lato-Regular';
const styles = StyleSheet.create({
  wrapperDetail: {},
  detail: {
    color: '#fff',
    fontFamily: font,
    fontSize: 15,
    fontWeight: 'bold',
  },
  wrapperInfo: {
    width: 300,
    paddingHorizontal: 20,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info_item: {
    marginTop: 20,
  },
  main: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 2,
  },
  sub: {
    color: 'rgba(255,255,255,0.7)',
  },
});
