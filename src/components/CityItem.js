import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import {useGlobalContext} from '../../globalContext';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import DetailWeather from './DetailWeather';

// const WeatherIcon = weatherType => {
//   if (weatherType === 'Sunny') {
//     return <SunIcon width={34} height={34} fill="#fff" />;
//   }
//   if (weatherType === 'Rainy') {
//     return <RainIcon width={34} height={34} fill="#fff" />;
//   }
//   if (weatherType === 'Cloudy') {
//     return <CloudIcon width={34} height={34} fill="#fff" />;
//   }
//   if (weatherType === 'Night') {
//     return <MoonIcon width={34} height={34} fill="#fff" />;
//   }
// };

const CityItem = ({location, bgImg, loadData, navigation}) => {
  const {weatherCityCurrent, setTrackedCityList, dtToHour, roundTemp} =
    useGlobalContext();
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    // hold on refresh event
    setRefreshing(true);

    // reload data LOCATIONS list
    await loadData();
    setRefreshing(false);
  }, []);
  return (
    <ScrollView
      nestedScrollEnabled
      refreshControl={
        <RefreshControl
          progressBackgroundColor={'rgba(0,0,0,0)'}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <View style={{width: windowWidth, height: windowHeight}}>
        <ImageBackground
          resizeMode="cover"
          source={bgImg}
          style={{
            flex: 1,
          }}>
          {/* current */}
          <View
            style={{
              flex: 1,
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
                  <Text style={styles.weatherDes} numberOfLines={1}>
                    {location.weatherDes}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.bottomInfoWrapper}>
              <DetailWeather location={location} navigation={navigation} />
            </View>
          </View>
        </ImageBackground>
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
    textShadowColor: 'rgba(0, 0, 0, .3)',
    textShadowOffset: {width: -2, height: 3},
    textShadowRadius: 1,
  },
  time: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, .2)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 1,
  },
  temparature: {
    color: '#fff',
    fontFamily: 'Lato-Light',
    fontSize: 75,
    textShadowColor: 'rgba(0, 0, 0, .1)',
    textShadowOffset: {width: -2, height: 3},
    textShadowRadius: 1,
  },
  weatherDes: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 34,
    textAlign: 'right',
    textTransform: 'capitalize',
    textShadowColor: 'rgba(0, 0, 0, .1)',
    textShadowOffset: {width: -2, height: 3},
    textShadowRadius: 1,
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
