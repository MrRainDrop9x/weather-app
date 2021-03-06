import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Right from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useGlobalContext} from '../../globalContext';

export default function DetailWeather({location, navigation}) {
  const {setWeatherCityCurrent, setIsLoading, weatherCityCurrent} =
    useGlobalContext();

  const goInfo = () => {
    if (location != weatherCityCurrent) setIsLoading(true);
    setWeatherCityCurrent(location);
    navigation.navigate('Info');
  };
  let aqiDes = '';
  switch (location.aqi) {
    case 1:
      aqiDes = 'Tốt';
      break;
    case 2:
      aqiDes = 'Trung bình';
      break;
    case 3:
      aqiDes = 'Kém';
      break;
    case 4:
      aqiDes = 'Xấu';
      break;
    case 5:
      aqiDes = 'Rất xấu';
      break;
    default:
      break;
  }
  return (
    <View style={styles.wrapperDetail}>
      <View>
        <TouchableOpacity>
          <Text onPress={goInfo} style={styles.detail}>
            Chi tiết thời tiết
            <Right name="right" size={14} color="#208df8" />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.wrapperInfo}>
        <View style={styles.info}>
          <View style={styles.info_item}>
            <Text style={[styles.main]}>
              {`${location.aqi}`}
              <Text style={{fontSize: 12}}> {`(${aqiDes})`}</Text>
            </Text>
            <Text style={[styles.sub, {textAlign: 'left'}]}>{`AQI`}</Text>
          </View>
          <View style={styles.info_item}>
            <Text
              style={[
                styles.main,
                {textAlign: 'right'},
              ]}>{`${location.PM10}`}</Text>
            <Text style={styles.sub}>
              PM
              <Text style={{fontSize: 10}}>10</Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.wrapperInfo}>
        <View style={styles.info}>
          <View style={styles.info_item}>
            <Text style={styles.main}>
              {`${location.windSpeed} `}
              <Text style={{fontSize: 15}}>km/h</Text>
            </Text>
            <Text style={[styles.sub, {textAlign: 'left'}]}>Tốc độ gió</Text>
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
}

const font = 'Lato-Regular';
const styles = StyleSheet.create({
  wrapperDetail: {},
  detail: {
    color: '#4A91FF',
    fontFamily: font,
    fontSize: 15,
    fontWeight: 'bold',
  },
  wrapperInfo: {
    width: 300,
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, .1)',
    textShadowOffset: {width: -2, height: 3},
    textShadowRadius: 1,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textShadowColor: 'rgba(0, 0, 0, .1)',
    textShadowOffset: {width: -2, height: 3},
    textShadowRadius: 1,
  },
  info_item: {
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, .1)',
    textShadowOffset: {width: -2, height: 3},
    textShadowRadius: 1,
  },
  main: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, .1)',
    textShadowOffset: {width: -2, height: 3},
    textShadowRadius: 1,
  },
  sub: {
    color: 'rgba(255,255,255,0.7)',
    textShadowColor: 'rgba(0, 0, 0, .1)',
    textShadowOffset: {width: -2, height: 3},
    textShadowRadius: 1,
    textAlign: 'right',
  },
});
