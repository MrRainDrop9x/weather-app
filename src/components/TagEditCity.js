import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import {useState} from 'react';

export default function TagEditCity({nameCity, checked}) {
  const [isSelected, setSelection] = useState(checked);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{nameCity}</Text>
      <CheckBox
        value={isSelected}
        onValueChange={setSelection}
        style={styles.checkbox}
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
