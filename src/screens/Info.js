import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import WTHourItem from '../components/WTHourItem';
import WTDayItem from '../components/WTDayItem';
import {useGlobalContext} from '../../globalContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Loading from './Loading';

export default function Info({navigation}) {
  const {
    weatherCityCurrent,
    weatherHourly,
    weatherDaily,
    roundTemp,
    dtToHour,
    dtToDayMonthDaily,
    roundTempAfterComma,
    isLoading,
    setIsLoading,
  } = useGlobalContext();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          // 'rgba(162, 162, 162, 1)',
          'rgba(255, 255, 225, 1)',
          'rgba(245, 213, 255, 1)',
          'rgba(0, 0, 0, 1)',
          // 'rgba(74, 155, 248, .8)',
          // 'rgba(74, 152, 250, 1)',
          // 'rgba(74, 152, 250, 1)',
          // 'rgba(74, 152, 250, 1)',
        ]}
        style={styles.background}>
        <View>
          <View style={styles.title}>
            <Text style={styles.textMain}>Hôm nay</Text>
            <Text style={styles.dateToday}>{`${dtToDayMonthDaily(
              weatherCityCurrent.dt,
              weatherCityCurrent.timezoneCity,
            )}`}</Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollViewH}>
            {weatherHourly.map(
              (item, index) =>
                index < 12 && (
                  <WTHourItem
                    key={index}
                    temperature={roundTempAfterComma(item.temp)}
                    hour={dtToHour(item.dt, weatherCityCurrent.timezoneCity)}
                    img={item.weather[0].icon}
                  />
                ),
            )}
          </ScrollView>
        </View>
        <View>
          <View style={styles.title}>
            <Text style={styles.textMain}>Dự báo trong tuần</Text>
            <MaterialIcons name="calendar-today" size={24} color="#fff" />
          </View>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={true}
            style={styles.scrollViewV}>
            {weatherDaily.map((item, index) => (
              <WTDayItem
                key={index}
                dateTime={dtToDayMonthDaily(
                  item.dt,
                  weatherCityCurrent.timezoneCity,
                )}
                img={item.weather[0].icon}
                temperature={roundTemp(item.temp.day)}
              />
            ))}
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingTop: 35,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 310,
    // height: 300,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  scrollViewH: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 12,
  },
  scrollViewV: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 12,
    paddingBottom: 100,
  },
  textMain: {
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 24,
    lineHeight: 30,
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: -2, height: 3},
    textShadowRadius: 1,
  },
  dateToday: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 23,
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: -2, height: 3},
    textShadowRadius: 1,
  },
  nextForecast: {},

  backHome: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  backBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleBack: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 23,
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: -2, height: 3},
    textShadowRadius: 1,
  },
  backIcon: {
    fontSize: 12,
    color: '#000',
  },
  settingIcon: {
    fontSize: 12,
    color: '#000',
  },
  calendarMonthIcon: {
    fontSize: 12,
    color: '#000',
  },
});
