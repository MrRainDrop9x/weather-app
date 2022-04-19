import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import SunIcon from '../../assets/sun.svg';
import CloudIcon from '../../assets/cloudy.svg';
import MoonIcon from '../../assets/moon.svg';
import RainIcon from '../../assets/rain.svg';
import {useGlobalContext} from '../../globalContext';
import WTHourItem from '../components/WTHourItem';
import WeatherDayItem from './WeatherDayItem';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
const WeatherIcon = weatherType => {
  if (weatherType === 'Sunny') {
    return <SunIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === 'Rainy') {
    return <RainIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === 'Cloudy') {
    return <CloudIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === 'Night') {
    return <MoonIcon width={34} height={34} fill="#fff" />;
  }
};

const CityItem = ({location, bgImg}) => {
  const {weatherCityCurrent, weatherHourly, dtToHour, roundTemp} =
    useGlobalContext();
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const renderWeatherHourItem = ({item, index}) => {
    return (
      <WTHourItem
        key={index}
        temperature={roundTemp(item.temp)}
        hour={dtToHour(item.dt, weatherCityCurrent.timezoneCity)}
        img={item.weather[0].icon}
      />
    );
  };
  return (
    <ScrollView nestedScrollEnabled>
      <View style={{width: windowWidth, height: windowHeight}}>
        <ImageBackground
          source={bgImg}
          style={{
            flex: 1,
          }}>
          {/* current */}
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: 20,
            }}>
            <View style={styles.topInfoWrapper}>
              <View>
                <Text style={styles.city}>{location.city}</Text>
                <Text style={styles.time}>{location.dateTime}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  display: 'flex',
                }}>
                <View style={{flex: 1}}>
                  <Text style={styles.temparature}>{location.temparature}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.weatherDes}>U Am</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 10,
                marginLeft: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  color: 'white',
                  fontSize: 15,
                }}>{`10/3\u2103`}</Text>
              <Text
                style={{
                  color: 'white',
                  marginLeft: 10,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                Chủ Nhật
              </Text>
            </View>
            <View style={styles.bottomInfoWrapper}>
              <FlatList
                data={weatherHourly}
                renderItem={renderWeatherHourItem}
                horizontal
                nestedScrollEnabled={true}></FlatList>
              {/* <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollViewH}>
                {weatherHourly.map(
                  (item, index) =>
                    index < 12 && (
                      <WTHourItem
                        key={index}
                        temperature={roundTemp(item.temp)}
                        hour={dtToHour(
                          item.dt,
                          weatherCityCurrent.timezoneCity,
                        )}
                        img={item.weather[0].icon}
                      />
                    ),
                )}
              </ScrollView> */}
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Report weather 7 days */}
      <View>
        <View>
          <Text>Báo cáo thời tiết 7 ngày</Text>
        </View>
        <View>
          <WeatherDayItem />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topInfoWrapper: {
    flex: 1,
    marginTop: 120,
    justifyContent: 'space-between',
  },
  city: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  time: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  temparature: {
    color: '#fff',
    fontFamily: 'Lato-Light',
    fontSize: 60,
  },
  weatherDes: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 34,
    textAlign: 'right',
  },
  bottomInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 35,
    paddingRight: -50,
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  infoBar: {
    width: 45,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default CityItem;
