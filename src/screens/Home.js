/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Animated,
  LogBox,
  NativeModules,
} from 'react-native';

import MenuIcon from '../../assets/menu.svg';
import SearchIcon from '../../assets/search.svg';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import React from 'react';
import {useRef, useEffect} from 'react';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import firestore from '@react-native-firebase/firestore';
import CityItem from '../components/CityItem';
import Loading from './Loading';
import EmptyScreen from './EmptyScreen';
import {useGlobalContext} from '../../globalContext';

const SharedStorage = NativeModules.SharedStorage;

export default function Home({navigation}) {
  const {
    api,
    trackedCityList,
    setTrackedCityList,
    locations,
    setLocations,
    roundTemp,
    isLoading,
    setIsLoading,
    convertTime,
  } = useGlobalContext();

  //get tracked city from firestore
  function getTrackedCityList() {
    firestore()
      .collection('weatherCurrent')
      .orderBy('createAt', 'desc')
      .onSnapshot(snapshot => {
        setTrackedCityList(
          snapshot.docs.map(doc => {
            // console.log(doc.data().createAt.seconds);
            return {
              nameCity: doc.data().nameCity,
              createAt: doc.data().createAt,
              temp: doc.data().temp,
              icon: doc.data().icon,
              id: doc.id,
            };
          }),
        );
      });
  }
  useEffect(() => {
    getTrackedCityList();
  }, []);

  const handleWidget = () => {
    SharedStorage.set(
      JSON.stringify({
        text: trackedCityList[0]?.nameCity,
        temp: `${trackedCityList[0]?.temp}°C`,
        icon: trackedCityList[0]?.icon,
      }),
    );
  };

  const loadData = () => {
    setLocations([]);
    trackedCityList.map((city, index) => {
      const url = `${api.baseUrl}/weather?q=${city.nameCity}&units=metric&appid=${api.key}&lang=vi`;
      // console.log(url);
      const fetchData = async () => {
        // get the data from the api
        const data = await fetch(url);
        // convert data to json
        const json = await data.json();

        //URL AQI
        const aqiUrl = `${api.baseUrl}/air_pollution?lat=${json.coord.lat}&lon=${json.coord.lon}&appid=${api.key}`;
        // const aqiUrl = `${api.baseUrl}/air_pollution?lat={lat}&lon={lon}&appid={API key}`;

        const dataAqi = await fetch(aqiUrl);
        const aqi = await dataAqi.json();

        setLocations(locations => {
          let weatherDes = json?.weather[0]?.description;

          if (weatherDes == 'bầu trời quang đãng') {
            let temp = weatherDes.split(' ');
            weatherDes = `${temp[2]} ${temp[3]}`;
          }
          if (locations.some(element => element.city == json.name))
            return locations;

          return [
            ...locations,
            {
              lon: json.coord.lon,
              lat: json.coord.lat,
              dt: json.dt,
              timezoneCity: json.timezone,
              id: index,
              city: json?.name,
              dateTime: convertTime(json.dt, json.timezone),
              temparature: `${roundTemp(json?.main?.temp)}\u2103`,
              weatherType: json?.weather[0]?.main,
              weatherDes: weatherDes,
              wind: json?.wind?.speed,
              rain: 50,
              humidity: json?.main?.humidity,
              visibility: `${json?.visibility / 1000}`,
              windSpeed: json?.wind?.speed,
              humidity: json?.main?.humidity,
              pressure: `${json?.main.pressure / 1000}`,
              // aqi: aqi.data.current.pollution.aqius,
              aqi: aqi?.list[0]?.main?.aqi,
              PM10: aqi?.list[0]?.components?.pm10,
            },
          ];
        });
      };

      fetchData()
        // make sure to catch any error
        .catch(console.error)
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  useEffect(() => {
    loadData();
    handleWidget();
  }, [trackedCityList]);

  LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native']);
  LogBox.ignoreLogs(['ColorPropType will be removed from React Native']);
  LogBox.ignoreLogs(['EdgeInsetsPropType will be removed from React Native']);
  LogBox.ignoreLogs(['PointPropType will be removed from React Native.']);

  const goAddCityOption = () => {
    navigation.navigate('AddCityOption');
  };

  const goListCity = () => {
    navigation.navigate('ListCity');
  };

  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <StatusBar barStyle="light-content" />
      {trackedCityList.length > 0 ? (
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={1}>
          {locations?.map((location, index) => {
            let bgImg;
            //Thunderstorm,Drizzle,Snow,Mist
            if (location.weatherType === 'Clear') {
              bgImg = require('../../assets/gif/clear.gif');
            } else if (location.weatherType === 'Fog') {
              bgImg = require('../../assets/gif/fog.gif');
            } else if (location.weatherType === 'Clouds') {
              bgImg = require('../../assets/gif/clouds.gif');
            } else if (location.weatherType === 'Rain') {
              bgImg = require('../../assets/gif/rain.gif');
            } else if (location.weatherType === 'Snow') {
              bgImg = require('../../assets/gif/snow.gif');
            } else if (location.weatherType === 'Thunderstorm') {
              bgImg = require('../../assets/gif/thunder.gif');
            } else if (location.weatherType === 'Mist') {
              bgImg = require('../../assets/gif/fog.gif');
            } else if (location.weatherType === 'Drizzle') {
              bgImg = require('../../assets/gif/rain.gif');
            } else {
              bgImg = require('../../assets/gif/clear.gif');
            }

            return (
              <CityItem
                location={location}
                bgImg={bgImg}
                loadData={loadData}
                key={index}
                navigation={navigation}
              />
            );
          })}
        </Animated.ScrollView>
      ) : (
        <EmptyScreen navigation={navigation} />
      )}
      <View style={styles.appHeader}>
        <TouchableOpacity onPress={goAddCityOption}>
          <SearchIcon width={24} height={24} fill="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={goListCity}>
          <MenuIcon width={24} height={24} fill="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.indicatorWrapper}>
        {locations?.map((location, index) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (index - 1),
              windowWidth * index,
              windowWidth * (index + 1),
            ],
            outputRange: [5, 12, 5],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View style={[styles.normalDot, {width}]} key={index} />
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appHeader: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: getStatusBarHeight() + 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  topInfoWrapper: {
    flex: 1,
    marginTop: 160,
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
    fontSize: 85,
  },
  weatherType: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 34,
    marginLeft: 10,
  },
  bottomInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
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
  indicatorWrapper: {
    position: 'absolute',
    top: 100,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalDot: {
    height: 5,
    width: 5,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
});
