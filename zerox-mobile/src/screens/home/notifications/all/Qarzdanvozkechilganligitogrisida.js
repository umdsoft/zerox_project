import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {style} from '../../../../theme/style';
import {settingDate} from '../../../../helper';
import {sortText} from '../../../components/StatisticCard';
import TextBold from '../../../components/TextBold';

const Qarzdanvozkechilganligitogrisida = ({item, okay, navigation}) => {
  if (item.creditor === item.reciver) {
    return (
      <View style={styles.container}>
        <View style={{marginVertical: 15, marginHorizontal: 15}}>
          <View>
            <TextBold>Qarzdan voz kechilganligi to‘g‘risida</TextBold>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.notification}>
              <Text
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}
              >
                {item.dtypes === 2 ? item.debitor_name : null}
                {item.dtypes === 1 ? item.dcompany : null}
              </Text>{' '}
              <Text
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}
              >
                {settingDate(item.created_at)}
              </Text>{' '}
              yildagi{' '}
              <Text
                onPress={() => {
                  navigation.navigate('DownloadStatistic', {
                    item,
                    id: item.contract,
                  });
                }}
                style={(styles.notification, {color: style.blue})}
              >
                {item.number}
              </Text>
              -sonli qarz shartnomasi bo‘yicha Sizga bergan qarzidan voz kechdi.
              Voz kechilgan qarz miqdori -{' '}
              <Text
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}
              >
                {sortText(item.vos_summa)} {item.currency}
              </Text>
              {'\n'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.notificationTitle}>
                  <Text>{settingDate(item?.created)} </Text>
                </Text>
                <Text style={styles.notificationTitle}>
                  {' '}
                  {item.time.slice(0, 5)}
                </Text>
              </View>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      okay(item.id);
                    }}
                    activeOpacity={0.8}
                    style={styles.button}
                  >
                    <Text
                      style={[
                        styles.notification,
                        {color: '#fff', fontSize: style.fontSize.xx - 2},
                      ]}
                    >
                      Ok
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  if (item.debitor === item.reciver) {
    return (
      <View style={styles.container}>
        <View style={{marginVertical: 15, marginHorizontal: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          ></View>
          <View>
            <TextBold>Qarzdan voz kechilganligi to‘g‘risida</TextBold>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.notification}>
              <Text
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}
              >
                {item.ctypes === 2 ? item.creditor_name : null}
                {item.ctypes === 1 ? item.ccopmany : null}
              </Text>{' '}
              <Text
                style={
                  (styles.notification, {fontFamily: style.fontFamilyBold})
                }
              >
                {settingDate(item.created_at)}
              </Text>{' '}
              yildagi{' '}
              <Text
                onPress={() => {
                  navigation.navigate('DownloadStatistic', {
                    item,
                    id: item.contract,
                  });
                }}
                style={(styles.notification, {color: style.blue})}
              >
                {item.number}
              </Text>
              -sonli qarz shartnomasi bo‘yicha Sizga bergan qarzidan voz kechdi.
              Voz kechilgan qarz miqdori -{' '}
              <Text
                style={
                  (styles.notification, {fontFamily: style.fontFamilyBold})
                }
              >
                {sortText(item.vos_summa)} {item.currency}
              </Text>
              {'\n'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.notificationTitle}>
                  <Text>{settingDate(item?.created)} </Text>
                </Text>
                <Text style={styles.notificationTitle}>
                  {' '}
                  {item.time.slice(0, 5)}
                </Text>
              </View>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      okay(item.id);
                    }}
                    activeOpacity={0.8}
                    style={styles.button}
                  >
                    <Text
                      style={[
                        styles.notification,
                        {color: '#fff', fontSize: style.fontSize.xx - 2},
                      ]}
                    >
                      Ok
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

export default memo(Qarzdanvozkechilganligitogrisida);

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
