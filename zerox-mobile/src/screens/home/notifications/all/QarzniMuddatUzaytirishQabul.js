import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';

import {style} from '../../../../theme/style';
import {settingDate} from '../../../../helper';

import TextBold from '../../../components/TextBold';
import {formatDate} from '../../../other/DebtDateLengthAsk';
import {useSelector} from 'react-redux';
const QarzniMuddatUzaytirishQabul = ({item, okay, navigation}) => {
  const {user} = useSelector(state => state.HomeReducer);
  const onOkay = async () => {
    okay(item.id);
  };

  const onPress = () => {
    navigation.navigate('DownloadStatistic', {item: item, id: item.id});
  };
  if (user.data.id === item.creditor) {
    return (
      <View style={styles.container}>
        <View style={{marginVertical: 15, marginHorizontal: 15}}>
          <View>
            <TextBold>
              Qarz muddatini uzaytirish rad etilganligi to‘g‘risida
            </TextBold>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.notification}>
              <TextBold>{settingDate(item.created)}</TextBold> yilda{' '}
              <Text onPress={onPress} style={styles.number}>
                {item.number}
              </Text>
              -sonli qarz shartnomasi yuzasidan qarz muddatini uzaytirish
              bo‘yicha so’rovingiz <TextBold>{item.debitor_name}</TextBold>{' '}
              tomonidan <TextBold>{settingDate(item.created)}</TextBold> yilda{' '}
              yil soat 23:59 ga qadar qabul qilinmaganligi sababli tizim
              tomonidan bekor qilindi. Qayta so’rov yuborishingiz mumkin.
              tomonidan{' '}
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.notificationTitle}>
                  <Text>{settingDate(item?.created)} </Text>
                </Text>
                <Text style={styles.notificationTitle}>
                  {' '}
                  {item.time.slice(0, 5)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={onOkay}
                activeOpacity={0.8}
                style={styles.button}>
                <Text
                  style={[
                    styles.notification,
                    {color: '#fff', fontSize: style.fontSize.xx - 2},
                  ]}>
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  if (user.data.id === item.debitor) {
    return (
      <View style={styles.container}>
        <View style={{marginVertical: 15, marginHorizontal: 15}}>
          <View>
            <TextBold>
              Qarz muddatini uzaytirish rad etilganligi to‘g‘risida
            </TextBold>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.notification}>
              <Text
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}>
                {item.ctypes === 2 ? item.creditor_name : null}
                {item.ctypes === 1 ? item.ccopmany : null}
              </Text>
              tomonidan <TextBold>{settingDate(item.created)}</TextBold> yilda{' '}
              <Text onPress={onPress} style={styles.number}>
                {item.number}
              </Text>
              -sonli qarz shartnomasining muddatini uzaytirish bo‘yicha Sizga
              so’rov yuborilgan. Ushbu so’rov Siz tomoningizdan{' '}
              <TextBold>{settingDate(item.created)}</TextBold> yil soat 23:59 ga
              qadar qabul qilinmaganligi sababli tizim tomonidan bekor qilindi.
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.notificationTitle}>
                  <Text>{settingDate(item?.created)} </Text>
                </Text>
                <Text style={styles.notificationTitle}>
                  {' '}
                  {item.time.slice(0, 5)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={onOkay}
                activeOpacity={0.8}
                style={styles.button}>
                <Text
                  style={[
                    styles.notification,
                    {color: '#fff', fontSize: style.fontSize.xx - 2},
                  ]}>
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

export default memo(QarzniMuddatUzaytirishQabul);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    borderRadius: 10,
    elevation: 7,
  },
  number: {
    fontFamily: style.fontFamilyMedium,
    color: style.blue,
  },
  button: {
    backgroundColor: style.blue,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification: {
    fontSize: style.fontSize.xx - 2,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
  },
  notificationTitle: {
    fontSize: style.fontSize.xx - 2,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
  },
});
