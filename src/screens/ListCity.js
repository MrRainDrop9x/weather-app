import {StyleSheet, Text, View, TouchableOpacity, LogBox} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CityOfList from '../components/CityOfList';
import {useGlobalContext} from '../../globalContext';

export default function ListCity({navigation}) {
  LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native']);
  LogBox.ignoreLogs(['ColorPropType will be removed from React Native']);
  LogBox.ignoreLogs(['EdgeInsetsPropType will be removed from React Native']);
  LogBox.ignoreLogs(['PointPropType will be removed from React Native.']);

  const {locations} = useGlobalContext();

  // locations
  // const [currentCities, setCurrentCities] = useState
  const currentCities = [
    {
      name: 'Nam Từ Liêm',
      temp: 19,
      desc: 'Sương mù',
      present: true,
    },
    {
      name: 'Hà Nội',
      temp: 15,
      desc: 'Sương mù',
    },
    {
      name: 'Quảng Ninh',
      temp: 24,
      desc: 'Trời quang',
    },
  ];

  const backHome = () => {
    navigation.navigate('Home');
  };

  const goAddCityOption = () => {
    navigation.navigate('AddCityOption');
  };

  const goEditCityOption = () => {
    navigation.navigate('EditCityOption');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity activeOpacity={0.8} onPress={backHome}>
            <AntDesign name="arrowleft" size={22} color="#0969da" />
          </TouchableOpacity>
          <Text style={styles.title}>Thêm thành phố</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.icon}
            onPress={goEditCityOption}>
            <AntDesign name="edit" size={22} color="#0969da" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginTop: 10}}>
        {locations.map((city, index) => (
          <CityOfList
            key={index}
            nameCity={city.city}
            temp={city.temparature}
            description={city.weatherDes}
            handleFunc={backHome}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 22,
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
    color: '#000',
    fontWeight: '500',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingHorizontal: 8,
  },
});
