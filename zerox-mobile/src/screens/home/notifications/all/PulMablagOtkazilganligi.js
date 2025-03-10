import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';

import {style} from '../../../../theme/style';
import {settingDate} from '../../../../helper';

import TextBold from '../../../components/TextBold';
import {useSelector} from 'react-redux';
const PulMablagOtkazilganligi = ({item, okay, navigation}) => {
  const {user} = useSelector(state => state.HomeReducer);

  const onOkay = async () => {
    okay(item.id);
  };

  if (user?.data?.id === item.creditor) {
    return (
      <View style={styles.container}>
        <View style={{marginVertical: 15, marginHorizontal: 15}}>
          <View>
            <TextBold>Pul mablag‘i qabul qilinganligi to‘g‘risida</TextBold>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.notification}>
              Sizning mobil hisobingizga{' '}
              <TextBold
                style={[
                  styles.notification,
                  {fontFamily: style.fontFamilyBold},
                ]}
              >
                {item.dtypes === 2 ? item.debitor_name : null}
                {item.dtypes === 1 ? item.dcompany : null}
              </TextBold>{' '}
              {item.duid} tomonidan{' '}
              <TextBold>
                {item.token.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                UZS
              </TextBold>{' '}
              miqdorida mablag’ o’tkazildi.
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
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
              <TouchableOpacity
                onPress={onOkay}
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
    );
  }
};

export default memo(PulMablagOtkazilganligi);

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
