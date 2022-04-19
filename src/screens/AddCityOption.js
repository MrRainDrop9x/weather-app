import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import TagTrendCity from '../components/TagTrendCity';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AddCityOption({navigation}) {
  const [city, setCity] = useState('');

  const citiesVietNam = [
    'Vị trí',
    'Hà Nội',
    'Cần Thơ',
    'Đà Nẵng',
    'Hải Phòng',
    'Tp Hồ Chí Minh',
    'Nha Trang',
  ];
  const citiesWorld = ['New York', 'Paris', 'London', 'Tokyo', 'Rome'];

  const goListCity = () => {
    navigation.navigate('ListCity');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.65} onPress={goListCity}>
          <Text style={styles.textDelete}>Hủy</Text>
        </TouchableOpacity>
        <Text style={styles.textTitle}>Thêm thành phố</Text>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={28} color="#777" />
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm bằng ngôn ngữ hiện tại"
          onChangeText={setCity}
          value={city}
        />
      </View>

      <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.boxCities}>
          <Text style={styles.titleCities}>Thành phố hàng đầu</Text>
          {citiesVietNam.map((city, index) => (
            <TagTrendCity key={index} nameCity={city} />
          ))}
        </View>

        <View style={styles.boxCities}>
          <Text style={styles.titleCities}>Thành phố hàng đầu - Thế giới</Text>
          {citiesWorld.map((city, index) => (
            <TagTrendCity key={index} nameCity={city} />
          ))}
        </View>
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
    paddingVertical: 16,
  },
  textDelete: {
    marginRight: 45,
    fontWeight: '600',
    color: '#0969da',
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },

  searchBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 18,
    paddingHorizontal: 8,
  },

  boxCities: {
    paddingLeft: -4,
    paddingRight: -4,
    paddingTop: 18,
  },
  titleCities: {
    paddingBottom: 4,
  },

  scrollViewStyle: {
    // paddingBottom: 50,
  },
});
