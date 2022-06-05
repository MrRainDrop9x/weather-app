import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState,useRef} from 'react';
import TagEditCity from '../components/TagEditCity';
import {useGlobalContext} from '../../globalContext';
import firestore from '@react-native-firebase/firestore';

export default function EditCityOption({navigation}) {
  const {trackedCityList, setLocations,setIsLoading} = useGlobalContext();
  let lengthOfTrackList = useRef(trackedCityList.length).current
  
  const goListCity = async() => {
    let arr = {}
    let sum = 0
    await citiesVietNam.forEach(city => {
      if (city.checked) {
        arr[city.id] = city.id
        firestore().collection('weatherCurrent').doc(city.id).delete();
        ++sum;
      }
    });

    // console.log(arr);
    await trackedCityList.filter((item) => {

      return !arr[item.id]
    })
    
    lengthOfTrackList -= sum
    console.log(lengthOfTrackList-sum);
    console.log(trackedCityList.length);
    if(lengthOfTrackList != trackedCityList.length) {
      console.log('asdasdasd');
      lengthOfTrackList = trackedCityList.length
      setIsLoading(true)
      setCitiesVietNam(citiesVietNam.map(city => ({...city, checked: false})));
    }
    

    // await setIsLoading(false)
    navigation.navigate('Home');

  };

  const initCities = trackedCityList.map(item => ({
    id: item.id,
    name: item.nameCity,
    checked: false,
  }));

  const [citiesVietNam, setCitiesVietNam] = useState(initCities);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const checkAll = () => {
    setCitiesVietNam(
      citiesVietNam.map(city => {
        if (isCheckAll) {
          return {...city, checked: false};
        }
        return {...city, checked: true};
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.65} onPress={goListCity}>
          <Text style={styles.textDelete}>Xong</Text>
        </TouchableOpacity>
        <View>
          <Text style={[styles.textTitle, {marginLeft: 20}]}>
            Chọn thẻ thời tiết
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.65}
          style={{
            alignSelf: 'center',
            width: 10,
          }}>
          <Text
            onPress={() => {
              setIsCheckAll(!isCheckAll);
              checkAll();
            }}
            style={[styles.textDelete, {marginRight: -65}]}>
            {!isCheckAll ? 'Chọn tất cả' : 'Hủy tất cả'}
          </Text>
        </TouchableOpacity>
        <View style={styles.titleBox}></View>
      </View>
      <ScrollView style={{marginRight: 12}}>
        {citiesVietNam.map((city, index) => (
          <TagEditCity
            key={index}
            id={city?.id}
            nameCity={city?.name}
            checked={city?.checked}
            citiesVietNam={citiesVietNam}
            changeValue={setCitiesVietNam}
          />
        ))}
      </ScrollView>
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
    paddingVertical: 16,
  },
  titleBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textDelete: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0969da',
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'center',
  },

  titleBox: {},
});
