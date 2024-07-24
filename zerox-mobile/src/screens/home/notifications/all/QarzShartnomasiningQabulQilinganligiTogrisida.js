import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';

import {style} from '../../../../theme/style';
import {sortText} from '../../../components/StatisticCard';
import TextBold from '../../../components/TextBold';
import {settingDate} from '../../../../helper';
import {useSelector} from 'react-redux';

const QarzShartnomasiningQabulQilinganligiTogrisida = ({
  item,
  okay,
  navigation,
}) => {
  const {user, usd: usds} = useSelector(state => state.HomeReducer);

  const checkingSum = sum => {
    let usd = usds;
    let cur_amount;
    if (item.currency === 'USD') {
      let dd = item.amount * usd;
      if (dd > 100000000) {
        cur_amount = String(100000).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return cur_amount;
      } else {
        if (dd <= 1000000) {
          cur_amount = String(1000).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
          return cur_amount;
        } else {
          cur_amount = String(
            Math.floor(item.amount * usd * (0.1 / 100)),
          ).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
          return cur_amount;
        }
      }
    } else {
      if (item.amount > 100000000) {
        cur_amount = String(100000).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return cur_amount;
      } else {
        if (item.amount <= 1000000) {
          cur_amount = String(1000).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
          return cur_amount;
        } else {
          cur_amount = String(Math.floor(item.amount * (0.1 / 100)))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
          return cur_amount;
        }
      }
    }
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
            <TextBold>
              Qarz shartnomasining qabul qilinganligi to'grisida
            </TextBold>
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
              va Sizning o'rtangizda{' '}
              <Text
                onPress={() => {
                  navigation.navigate('DownloadStatistic', {item, id: item.id});
                }}
                style={[styles.notification, {color: style.blue}]}>
                {item.number}
              </Text>
              -sonli qarz shartnomasi rasmiylashtirildi. Ushbu shartnoma asosida
              Siz{' '}
              <Text
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}>
                {item.debitor_name}
              </Text>
              dan{' '}
              <Text
                style={
                  (styles.notification, {fontFamily: style.fontFamilyBold})
                }>
                {sortText(item.amount)} {item.currency}
              </Text>{' '}
              miqdorida qarz oldingiz.
              {'\n'}
              {user?.data?.cnt === 0 ? (
                <Text>
                  Xizmat haqi sifatida hisobingizdan{' '}
                  <TextBold>{checkingSum(item?.amout)} UZS</TextBold> yechildi.
                </Text>
              ) : null}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
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
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      okay(item.id);
                    }}
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
          />
          <View>
            <TextBold>
              Qarz shartnomasining qabul qilinganligi to'grisida
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
              </Text>{' '}
              va Sizning o'rtangizda{' '}
              <Text
                onPress={() => {
                  navigation.navigate('DownloadStatistic', {item, id: item.id});
                }}
                style={(styles.notification, {color: style.blue})}>
                {item.number}
              </Text>
              -sonli qarz shartnomasi rasmiylashtirildi. Ushbu shartnoma asosida
              Siz{' '}
              <Text
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}>
                {item.creditor_name}
              </Text>
              ga{' '}
              <Text
                style={
                  (styles.notification, {fontFamily: style.fontFamilyBold})
                }>
                {sortText(item.amount)} {item.currency}
              </Text>{' '}
              miqdorida qarz berdingiz.
              {'\n'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
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
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      okay(item.id);
                    }}
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
        </View>
      </View>
    );
  }
};

export default memo(QarzShartnomasiningQabulQilinganligiTogrisida);

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
