import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextBold from '../../../components/TextBold';
import {settingDate} from '../../../../helper';
import {style} from '../../../../theme/style';
const RecoveryPassword = ({item, okay, navigation}) => {
  const onOkay = async () => {
    okay(item.id);
  };
  return (
    <View style={styles.container}>
      <View style={{marginVertical: 15, marginHorizontal: 15}}>
        <View>
          <TextBold>
            Foydalanuvchi parolining qayta tiklanganligi to‘g‘risida
          </TextBold>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.notification}>
            Siz MyID orqali qayta identifikatsiyadan o’tgan holda parolingizni
            tikladingiz. Ushbu jarayonda “UZINFOCOM Davlat axborot tizimlarini
            yaratish va qo‘llab-quvvatlash bo‘yicha yagona integrator” MCHJ
            tomonidan xizmat haqi olinishi sababli mobil hisobingizdan{' '}
            <TextBold>
              {String(2500)?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} UZS
            </TextBold>{' '}
            yechildi.
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
};

export default RecoveryPassword;

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
