import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import TagTrendCity from '../components/TagTrendCity';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useGlobalContext} from '../../globalContext';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';

export default function AddCityOption({navigation}) {
  const {api, trackedCityList, setTrackedCityList} = useGlobalContext();

  const [city, setCity] = useState('');
  const [pos, setPos] = useState({});

  const citiesVietNam = [
    'Hà Nội',
    'Cần Thơ',
    'Đà Nẵng',
    'Hải Phòng',
    'Thành phố Hồ Chí Minh',
    'Nha Trang',
  ];
  const citiesWorld = [
    'New York',
    'Paris',
    'London',
    'Rome',
    'Moscow',
    'Tokyo',
    'Seoul',
    'Beijing',
  ];

  const goListCity = () => {
    navigation.navigate('ListCity');
  };

  const goHome = () => {
    navigation.navigate('Home');
  };

  const handleInfoCity = async city => {
    // console.log(city);
    // console.log(trackedCityList);

    const url = `${api.baseUrl}/weather?q=${city}&units=metric&appid=${api.key}&lang=vi`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === 200) {
      let arrTrackedCityList = [...trackedCityList];

      if (!arrTrackedCityList.find(city => city?.nameCity === data.name)) {
        // if (arrTrackedCityList.length >= 3) {
        //   firestore()
        //     .collection('weatherCurrent')
        //     .doc(arrTrackedCityList[2].id)
        //     .delete();
        // }

        firestore().collection('weatherCurrent').add({
          nameCity: data.name,
          createAt: firestore.FieldValue.serverTimestamp(),
          temp: data.main.temp,
          icon: data.weather[0].icon,
        });
        ToastAndroid.showWithGravity(
          `Thêm thời tiết tại thành phố ${data.name}!!`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      } else {
        ToastAndroid.showWithGravity(
          `Đã thêm thời tiết về ${data.name} vào có trong danh sách thời tiết !`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      }
    } else {
      ToastAndroid.showWithGravity(
        [p]`Không tìm thấy thời tiết về ${city}!!`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }
    goHome();
  };

  // Xử lý khi search
  const fetchDataHandle = () => {
    if (city.length > 0) {
      handleInfoCity(city);
    } else {
      ToastAndroid.showWithGravity(
        'Vui lòng nhập tên thành phố!!',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }
  };

  // Xử lý khi chọn city
  const fetchDataHandleClick = cityName => {
    handleInfoCity(cityName);
  };

  // Tìm thời tiết tại vị trí hiện tại
  const handlePostionCity = async pos => {
    const url = `${api.baseUrl}/weather?lat=${pos?.latitude}&lon=${pos?.longitude}&units=metric&appid=${api.key}&lang=vi`;
    const res = await fetch(url);
    const data = await res.json();

    let arrTrackedCityList = [...trackedCityList];
    if (!arrTrackedCityList.find(city => city?.nameCity === data.name)) {
      if (data.cod === 200) {
        firestore().collection('weatherCurrent').add({
          nameCity: data.name,
          createAt: firestore.FieldValue.serverTimestamp(),
          temp: data.main.temp,
        });

        ToastAndroid.showWithGravity(
          `Thêm thời tiết tại thành phố ${data.name}!!`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      } else {
        ToastAndroid.showWithGravity(
          `Không tìm thấy thời tiết tại thành phố của bạn!!`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      }
    } else {
      ToastAndroid.showWithGravity(
        `Đã thêm thời tiết về ${data.name} vào có trong danh sách thời tiết !`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }
    goHome();
    // console.log(pos);
  };
  const isTracked = nameCity => {
    if (nameCity === 'Moscow') {
      return trackedCityList.find(e => {
        return e.nameCity.includes('Mát-xcơ-va');
      });
    }
    if (nameCity === 'London') {
      return trackedCityList.find(e => {
        return e.nameCity.includes('Luân Đôn');
      });
    }
    if (nameCity === 'Beijing') {
      return trackedCityList.find(e => {
        return e.nameCity.includes('Bắc Kinh');
      });
    }
    return trackedCityList.find(e => {
      return e.nameCity.includes(nameCity);
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.65} onPress={goHome}>
          <Text style={styles.textDelete}>Hủy</Text>
        </TouchableOpacity>
        <Text style={styles.textTitle}>Thêm thành phố</Text>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={28} color="#777" style={{fontSize: 15}} />
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm bằng ngôn ngữ hiện tại"
          onChangeText={setCity}
          value={city}
          onSubmitEditing={fetchDataHandle}
        />
      </View>

      <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.boxCities}>
          <Text style={styles.titleCities}>Thành phố hàng đầu</Text>
          <View style={styles.wrapper}>
            <TagTrendCity
              present
              nameCity={'Vị trí'}
              checkPos={() => {
                Geolocation.getCurrentPosition(pos => {
                  handlePostionCity(pos?.coords);
                });
              }}
              isTracked
            />
            {citiesVietNam.map((city, index) => (
              <TagTrendCity
                key={index}
                nameCity={city}
                handleFunc={fetchDataHandleClick}
                isTracked={isTracked(city)}
              />
            ))}
          </View>
        </View>

        <View style={styles.boxCities}>
          <Text style={styles.titleCities}>Thành phố hàng đầu - Thế giới</Text>
          <View style={styles.wrapper}>
            {citiesWorld.map((city, index) => (
              <TagTrendCity
                key={index}
                nameCity={city}
                handleFunc={fetchDataHandleClick}
                isTracked={isTracked(city)}
              />
            ))}
          </View>
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
    position: 'relative',
  },
  textDelete: {
    marginLeft: 12,
    fontWeight: '600',
    color: '#0969da',
    fontSize: 15,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -60}],
  },

  searchBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(200,200,200,0.3)',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  input: {
    fontSize: 14,
  },

  boxCities: {
    paddingLeft: -4,
    paddingRight: -4,
    paddingTop: 18,
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  titleCities: {
    paddingBottom: 4,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
  },

  scrollViewStyle: {
    // paddingBottom: 50,
  },
});
