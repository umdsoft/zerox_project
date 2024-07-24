import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {style} from '../../../../theme/style';
import {settingDate} from '../../../../helper';
import {sortText} from '../../../components/StatisticCard';
import TextBold from '../../../components/TextBold';
const Qarzqaytarilganligitogrisida = ({
  item,
  okay,
  navigation,
  onToliqQaytgan,
}) => {
  if (item.creditor === item.reciver) {
    return (
      <View style={styles.container}>
        <View style={{marginVertical: 15, marginHorizontal: 15}}>
          <View>
            <TextBold>Qarz qaytarilganligi to‘g‘risida</TextBold>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.notification}>
              <Text
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}
              >
                {settingDate(item.created_at)}{' '}
              </Text>
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
              -sonli qarz shartnomasiga asosan{' '}
              <Text
                style={
                  (styles.notification, {fontFamily: style.fontFamilyBold})
                }
              >
                {item.dtypes === 2 ? item.debitor_name : null}
                {item.dtypes === 1 ? item.dcompany : null}
              </Text>{' '}
              olgan qarzidan{' '}
              <Text
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}
              >
                {sortText(item.inc)} {item.currency}
              </Text>{' '}
              miqdorda qaytardi.{'\n'}Qoldiq qarz miqdori –{' '}
              <Text
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}
              >
                {sortText(item.residual_amount)} {item.currency}
              </Text>
              {'\n'}
            </Text>
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <Text style={styles.notificationTitle}>
                <Text>{settingDate(item.creadted)}</Text>
              </Text>
              <Text style={styles.notificationTitle}>
                {' '}
                {item.time.slice(0, 5)}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  onToliqQaytgan(item, 1);
                }}
                activeOpacity={0.8}
                style={styles.button}
              >
                <Text
                  style={[
                    styles.notification,
                    {color: '#fff', fontSize: style.fontSize.xx},
                  ]}
                >
                  Tasdiqlash
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onToliqQaytgan(item, 2);
                }}
                activeOpacity={0.8}
                style={[styles.button, {backgroundColor: 'red'}]}
              >
                <Text
                  style={[
                    styles.notification,
                    {color: '#fff', fontSize: style.fontSize.xx},
                  ]}
                >
                  Rad etish
                </Text>
              </TouchableOpacity>
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
          <View>
            <TextBold>Qarz qaytarilganligi to‘g‘risida</TextBold>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.notification}>
              <Text
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}
              >
                {settingDate(item.created_at)}{' '}
              </Text>
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
              -sonli qarz shartnomasiga asosan{' '}
              <Text
                style={
                  (styles.notification, {fontFamily: style.fontFamilyBold})
                }
              >
                {item.ctypes === 2 ? item.creditor_name : null}
                {item.ctypes === 1 ? item.ccopmany : null}
              </Text>{' '}
              olgan qarzidan{' '}
              <Text
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}
              >
                {sortText(item.refundable_amount)} {item.currency}
              </Text>{' '}
              miqdorda qaytardi.{'\n'}Qoldiq qarz miqdori –{' '}
              <Text
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}
              >
                {sortText(item.residual_amount)} {item.currency}
              </Text>
              {'\n'}
            </Text>
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <Text style={styles.notificationTitle}>
                <Text>{settingDate(item?.created)} </Text>
              </Text>
              <Text style={styles.notificationTitle}>
                {' '}
                {item.time.slice(0, 5)}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => {
                  onToliqQaytgan(item, 1);
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
                  Tasdiqlash
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onToliqQaytgan(item, 2);
                }}
                activeOpacity={0.8}
                style={[styles.button, {backgroundColor: 'red'}]}
              >
                <Text
                  style={[
                    styles.notification,
                    {color: '#fff', fontSize: style.fontSize.xx - 2},
                  ]}
                >
                  Rad etish
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

export default memo(Qarzqaytarilganligitogrisida);

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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
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
