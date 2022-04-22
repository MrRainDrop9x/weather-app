import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import TagEditCity from '../components/TagEditCity';
import {useGlobalContext} from '../../globalContext';
import firestore from "@react-native-firebase/firestore";

export default function EditCityOption({navigation}) {
  const goListCity = () => {
    navigation.navigate('ListCity');

    citiesVietNam.forEach(city => {
      if (city.checked) {
        firestore().collection('weatherCurrent')
          .doc(city.id)
          .delete();
        // console.log(city);
      }
    })

    setCitiesVietNam(
      citiesVietNam.map(city => ({...city, checked: false})),
    );
  };

  const {trackedCityList} = useGlobalContext();

  const initCities = trackedCityList.map(item => ({
    id: item.id,
    name: item.nameCity,
    checked: false,
  }));

  const [citiesVietNam, setCitiesVietNam] = useState(initCities);

  const checkAll = () => {
    setCitiesVietNam(
      citiesVietNam.map(city => ({...city, checked: true})),
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.65} onPress={goListCity}>
          <Text style={styles.textDelete}>Xong</Text>
        </TouchableOpacity>
        <Text style={styles.textTitle}>Chọn thẻ thời tiết</Text>
        <TouchableOpacity activeOpacity={0.65} onPress={checkAll}>
          <Text style={styles.textDelete}>Chọn tất cả</Text>
        </TouchableOpacity>
        <View style={styles.titleBox}></View>
      </View>
      <ScrollView>
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
    paddingBottom: 120,
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
    // marginRight: 18,
    fontWeight: '600',
    color: '#0969da',
  },
  textTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  titleBox: {},
});
