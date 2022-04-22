import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CheckBox from 'react-native-check-box';
import {useState} from 'react';

export default function TagEditCity({
  id,
  nameCity,
  checked,
  citiesVietNam,
  changeValue,
}) {
  // const { id, nameCity, checked } = city;

  const [check, setCheck] = useState(checked);
  // let check = citiesVietNam.find(city => city?.id === id)[0]?.;

  const handleChecked = () => {
    changeValue(citiesVietNam.map(city => {
      if (city?.id === id) {
        return {...city, checked: !check}
      }
      return {...city}
    }));

    setCheck(!check);

    // console.log(citiesVietNam);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{nameCity}</Text>
      <CheckBox
        style={styles.checkbox}
        onClick={() => handleChecked()}
        isChecked={check}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    paddingVertical: 4,
    color: '#000',
  },
  checkbox: {
    alignSelf: 'center',
  },
});
