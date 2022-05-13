import React from 'react';
import LottieView from 'lottie-react-native';
import {View, Text} from 'react-native';

function EmptyScreen({navigation}) {
  const goAddCityOption = () => {
    navigation.navigate('AddCityOption');
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
      <LottieView
        source={require('../../assets/emptyCategory.json')}
        autoPlay
        loop
      />
      <View>
        <Text style={{textAlign: 'center', fontSize: 15, marginBottom: 10}}>
          Hiện không có thành phố nào để hiển thị
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 15,
          }}>
          Hãy
          <Text
            style={{fontSize: 16, fontWeight: 'bold', color: '#4A91FF'}}
            onPress={goAddCityOption}>
            {' '}
            thêm{' '}
          </Text>
          thành phố
        </Text>
      </View>
    </View>
  );
}

export default EmptyScreen;
