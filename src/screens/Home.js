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
} from 'react-native';

import MenuIcon from '../../assets//menu.svg';
import SearchIcon from '../../assets/search.svg';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import React from 'react';
import {useRef, useEffect} from 'react';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
import CityItem from '../components/CityItem';
import Loading from './Loading';
import {useGlobalContext} from '../../globalContext';

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
            return {nameCity: doc.data().nameCity, id: doc.id};
          }),
        );
      });
  }
  useEffect(() => {
    getTrackedCityList();
  }, []);

  useEffect(() => {
    setLocations([]);

    trackedCityList.map((city, index) => {
      const url = `${api.baseUrl}/weather?q=${city.nameCity}&units=metric&appid=${api.key}&lang=vi`;
      // console.log(url);
      const fetchData = async () => {
        // get the data from the api
        const data = await fetch(url);
        // convert data to json
        const json = await data.json();

        setLocations(locations => {
          if (locations.some(element => element.city == json.name))
            return locations;

          return [
            ...locations,
            {
              id: index,
              city: json?.name,
              dateTime: convertTime(json.dt, json.timezone),
              temparature: `${roundTemp(json?.main?.temp)}\u2103`,
              weatherType: json?.weather[0]?.main,
              weatherDes: json?.weather[0]?.description,
              wind: json?.wind?.speed,
              rain: 50,
              humidity: json?.main?.humidity,
              visibility: json?.visibility,
              windSpeed: json?.wind?.speed,
              humidity: json?.main?.humidity,
              pressure: json?.main.pressure,
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
  }, [trackedCityList]);

  LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native']);
  LogBox.ignoreLogs(['ColorPropType will be removed from React Native']);
  LogBox.ignoreLogs(['EdgeInsetsPropType will be removed from React Native']);
  LogBox.ignoreLogs(['PointPropType will be removed from React Native.']);

  const goFind = () => {
    navigation.navigate('Find');
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
      <ScrollView
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
            bgImg = require('../../assets/sunny.jpg');
          } else if (location.weatherType === 'Night') {
            bgImg = require('../../assets/night2.jpg');
          } else if (location.weatherType === 'Clouds') {
            bgImg = require('../../assets/cloudy.jpeg');
          } else if (location.weatherType === 'Rain') {
            bgImg = require('../../assets/rainy.jpg');
          }
          return <CityItem location={location} bgImg={bgImg} key={index} />;
        })}
      </ScrollView>
      <View style={styles.appHeader}>
        <TouchableOpacity onPress={goFind}>
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
