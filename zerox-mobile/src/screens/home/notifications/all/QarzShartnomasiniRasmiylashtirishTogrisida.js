import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { style } from '../../../../theme/style';
import TextBold from '../../../components/TextBold';
import { settingDate } from '../../../../helper';
import { sortText } from '../../../components/StatisticCard';
import { useSelector } from 'react-redux';

const QarzShartnomasiniRasmiylashtirishTogrisida = ({
  item,
  okay,
  navigation,
  onSuccess,
  onReject,
}) => {
  const { user, usd: usds } = useSelector(state => state.HomeReducer);
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
        cur_amount = String(100000)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
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

  if (item.debitor === item.reciver) {
    return (
      <View style={styles.container}>
        <View style={{ marginVertical: 15, marginHorizontal: 15 }}>
          <View>
            <TextBold>Qarz shartnomasini rasmiylashtirish to‘g‘risida</TextBold>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.notification}>
              <Text
                style={
                  (styles.notification, { fontFamily: style.fontFamilyBold })
                }>
                {item.dtypes === 2 ? item.creditor_name : null}
                {item.dtypes === 1 ? item.dcompany : null}
              </Text>{' '}
              Sizdan{' '}
              <Text
                style={[
                  styles.notification,
                  { fontFamily: style.fontFamilyBold },
                ]}>
                {sortText(item.amount)} {item.currency}
              </Text>{' '}
              miqdorida qarz berishingizni so‘ramoqda. Agar “Tasdiqlash”ni
              tanlasangiz,{' '}
              <Text
                onPress={() => {
                  navigation.navigate('DownloadStatistic', { item, id: item.id });
                }}
                style={(styles.notification, { color: style.blue })}>
                {item.number}
              </Text>
              -sonli qarz shartnomasi rasmiylashtiriladi.
              {'\n'}
            </Text>
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
              <Text style={styles.notificationTitle}>
                <Text>{settingDate(item?.created)} </Text>
              </Text>
              <Text style={styles.notificationTitle}>
                {item?.time.slice(0, 5)}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DownloadStatistic', { item, id: item.id });
                }}
                activeOpacity={0.8}
                style={styles.button}>
                <Text
                  style={[
                    styles.notification,
                    {
                      color: '#fff',
                      fontSize: style.fontSize.xx - 2,
                    },
                  ]}>
                  Batafsil
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onSuccess(item, 1, 'creditor');
                }}
                activeOpacity={0.8}
                style={styles.button}>
                <Text
                  style={[
                    styles.notification,
                    { color: '#fff', fontSize: style.fontSize.xx - 2 },
                  ]}>
                  Tasdiqlash
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onReject(item, 2, 'creditor');
                }}
                activeOpacity={0.8}
                style={[styles.button, { backgroundColor: 'red' }]}>
                <Text
                  style={[
                    styles.notification,
                    { color: '#fff', fontSize: style.fontSize.xx - 2 },
                  ]}>
                  Rad etish
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  if (item.creditor === item.reciver) {
    return (
      <View style={styles.container}>
        <View style={{ marginVertical: 15, marginHorizontal: 15 }}>
          <View>
            <TextBold>Qarz shartnomasini rasmiylashtirish to‘g‘risida</TextBold>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.notification}>
              <Text
                style={[
                  styles.notification,
                  { fontFamily: style.fontFamilyBold },
                ]}>
                {item.ctypes === 2 ? item.debitor_name : null}
                {item.ctypes === 1 ? item.ccopmany : null}
              </Text>{' '}
              Sizga{' '}
              <Text
                style={[
                  styles.notification,
                  { fontFamily: style.fontFamilyBold },
                ]}>
                {sortText(item.amount)} {item.currency}
              </Text>{' '}
              miqdorida qarz bermoqda. Agar “Tasdiqlash”ni tanlasangiz,{' '}
              <Text
                onPress={() => {
                  navigation.navigate('DownloadStatistic', { item, id: item.id });
                }}
                style={[styles.notification, { color: style.blue }]}>
                {item.number}
              </Text>
              -sonli qarz shartnomasi rasmiylashtiriladi
              {user.data.cnt === 0
                ? ' va mobil hisobingizdan xizmat haqi sifatida '
                : '.'}
              {user.data.cnt === 0 ? (
                <Text
                  style={[
                    styles.notification,
                    { fontFamily: style.fontFamilyBold },
                  ]}>
                  <TextBold>{checkingSum(item?.amount)}</TextBold>{' '}
                  <TextBold>UZS</TextBold> yechiladi.
                </Text>
              ) : null}
              {'\n'}
            </Text>
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
              <Text style={styles.notification}>
                <Text>{settingDate(item?.created)} </Text>
              </Text>
              <Text style={styles.notification}>{item?.time.slice(0, 5)}</Text>
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
                  navigation.navigate('DownloadStatistic', { item, id: item.id });
                }}
                activeOpacity={0.8}
                style={styles.button}>
                <Text
                  style={[
                    styles.notification,
                    { color: '#fff', fontSize: style.fontSize.xx - 2 },
                  ]}>
                  Batafsil
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onSuccess(item, 1, 'debitor');
                }}
                activeOpacity={0.8}
                style={styles.button}>
                <Text
                  style={[
                    styles.notification,
                    { color: '#fff', fontSize: style.fontSize.xx - 2 },
                  ]}>
                  Tasdiqlash
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onReject(item, 2, 'debitor');
                }}
                activeOpacity={0.8}
                style={[styles.button, { backgroundColor: 'red' }]}>
                <Text
                  style={[
                    styles.notification,
                    { color: '#fff', fontSize: style.fontSize.xx - 2 },
                  ]}>
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

export default memo(QarzShartnomasiniRasmiylashtirishTogrisida);

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
    paddingLeft: 12,
    paddingRight: 12,
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
