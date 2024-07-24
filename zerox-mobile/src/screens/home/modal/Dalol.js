import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { BackGroundIcon } from '../../../helper/homeIcon';
import { style } from '../../../theme/style';

import { useRoute } from '@react-navigation/native';
import MuddatUzaytirish from './MuddatUzaytirish';

import QarzdanVozKechish from './QarzdanVozKechish';
import QarzMuddatUzaytirish from './QarzMuddatUzaytirish';
import QarzniToliqQaytarish from './QarzniToliqQaytarish';
import QismanQaytarish from './QismanQaytarish';
import OtherHeader from '../../components/OtherHeader';
const Dalol = () => {
  const route = useRoute();
  const { type, data, date } = route.params;

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          height: style.height / 3,
          width: '100%',
        }}
      >
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={'Dalolatnoma'} />
      <View
        style={{
          marginTop: 20,
          backgroundColor: '#fff',
          flex: 1,
          marginBottom: 20,
          borderRadius: 12,
        }}
      >
        <ScrollView>
          <CheckingType
            type={type}
            data={data}
            date={date}
            sum={route?.params?.sum || 0}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const CheckingType = ({ type, data, date, sum }) => {
  switch (type) {
    case 1:
      return <MuddatUzaytirish data={data} />;
    case 2:
      return <QarzdanVozKechish data={data} />;
    case 3:
      return <QarzMuddatUzaytirish data={data} date={date} />;
    case 4:
      return <QarzniToliqQaytarish data={data} />;
    case 5:
      return <QismanQaytarish data={data} sum={sum} />;
  }
};
export default Dalol;

const styles = StyleSheet.create({
  container: {
    backgroundColor: style.backgroundColor,
    flex: 1,
  },
  buttonInsideContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  item: {
    flex: 1,
  },
  textButton: {
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
    color: '#fff',
  },
  registerButton: {
    width: '85%',
    height: style.buttonHeight,
    backgroundColor: style.blue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  info: {
    color: style.textColor,
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.small - 1,
    textAlign: 'left',
  },
  header: {
    backgroundColor: '#fff',
    height: style.height / 15,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    width: '90%',
    alignSelf: 'center',
  },
  aboutUsContainer: {
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 10,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    overflow: 'hidden',
  },
});
