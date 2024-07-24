import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {style} from '../../../../theme/style';
import {settingDate} from '../../../../helper';
import {sortText} from '../../../components/StatisticCard';
import TextBold from '../../../components/TextBold';

const Qarzniqaytarishtalabqilinganligitogrisida = ({
  item,
  okay,
  navigation,
}) => {
  const onOkay = async () => {
    okay(item.id);
  };
  if (item.creditor === item.reciver) {
    return (
      <View style={styles.container}>
        <View style={{marginVertical: 15, marginHorizontal: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          />
          <View>
            <TextBold>Qarzni qaytarish talab qilinganligi to‘g‘risida</TextBold>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.notification}>
              <Text
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}>
                {item.dtypes === 2 ? item.debitor_name : null}
                {item.dtypes === 1 ? item.dcompany : null}
              </Text>{' '}
              Sizdan{' '}
              <Text
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}>
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
                style={(styles.notification, {color: style.blue})}>
                {item.number}
              </Text>
              -sonli qarz shartnomasiga asosan berilgan{' '}
              <Text
                style={
                  (styles.notification, {fontFamily: style.fontFamilyBold})
                }>
                {sortText(item.amount)} {item.currency}
              </Text>{' '}
              qarzni qaytarishingizni talab qilmoqda.
              {'\n'}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.notification}>
                <Text>{settingDate(item?.created)} </Text>
              </Text>
              <Text style={styles.notification}> {item.time.slice(0, 5)}</Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DebtTakeSelect', {
                    item: {id: item.contract},
                  });
                }}
                activeOpacity={0.8}
                style={styles.button}>
                <Text
                  style={[
                    styles.notification,
                    {color: '#fff', fontSize: style.fontSize.xx - 2},
                  ]}>
                  Qarzni qaytarish
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onOkay}
                activeOpacity={0.8}
                style={styles.button}>
                <Text
                  style={[
                    styles.notification,
                    {
                      color: '#fff',
                      fontSize: style.fontSize.xx - 2,
                      paddingHorizontal: 10,
                    },
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
  if (item.debitor === item.reciver) {
    return (
      <View style={styles.container}>
        <View style={{marginVertical: 15, marginHorizontal: 15}}>
          <View>
            <TextBold>Qarzni qaytarish talab qilinganligi to‘g‘risida</TextBold>
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
              </Text>{' '}
              Sizdan{' '}
              <Text
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}>
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
                style={(styles.notification, {color: style.blue})}>
                {item.number}
              </Text>
              -sonli qarz shartnomasiga asosan berilgan{' '}
              <Text
                style={
                  (styles.notification, {fontFamily: style.fontFamilyBold})
                }>
                {sortText(item.amount)} {item.currency}
              </Text>{' '}
              qarzni qaytarishingizni talab qilmoqda.
              {'\n'}
            </Text>
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <Text style={styles.notification}>
                <Text>{settingDate(item?.created)} </Text>
              </Text>
              <Text style={styles.notification}> {item.time.slice(0, 5)}</Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DebtTakeSelect', {
                    item: {id: item.contract},
                  });
                }}
                activeOpacity={0.8}
                style={styles.button}>
                <Text style={[styles.notification, {color: '#fff'}]}>
                  Qarzni qaytarish
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onOkay}
                activeOpacity={0.8}
                style={styles.button}>
                <Text
                  style={[
                    styles.notification,
                    {color: '#fff', paddingHorizontal: 20},
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

export default memo(Qarzniqaytarishtalabqilinganligitogrisida);

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
    paddingHorizontal: 10,
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
