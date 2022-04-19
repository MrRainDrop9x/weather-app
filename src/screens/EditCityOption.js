import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TagEditCity from '../components/TagEditCity';

export default function EditCityOption({navigation}) {
  const goListCity = () => {
    navigation.navigate('ListCity');
  };

  const [citiesVietNam, setCitiesVietNam] = useState([
    {name: 'Hà Nội', checked: false},
    {name: 'Cần Thơ', checked: false},
    {name: 'Đà Nẵng', checked: false},
    {name: 'Hải Phòng', checked: false},
    {name: 'Tp Hồ Chí Minh', checked: false},
  ]);

  const checkAll = () => {
    setCitiesVietNam(citiesVietNam.map(city => ({name: city.name, checked: true})));
    console.log(citiesVietNam.map(city => ({name: city.name, checked: true})));
  };

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
            nameCity={city.name}
            checked={city.checked}
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
