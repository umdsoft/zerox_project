import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import BackButton from '../components/BackButton';
import {normalize, style} from '../../theme/style';
import {useNavigation, useRoute} from '@react-navigation/native';
import Flash from '../../images/flash';
import Logo from '../../images/TextAndLogo';
import axios from 'axios';
import {URL} from '../constants';
import {useSelector} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {toastConfig} from '../components/ToastConfig';
import {RNCamera} from 'react-native-camera';
import {t} from 'i18next';

const {height, width} = Dimensions.get('screen');
const QrScan = () => {
  const [flash, setFlash] = useState(false);
  const {user} = useSelector(state => state.HomeReducer);
  const navigation = useNavigation();
  const {type} = useRoute().params;

  const OnRead = useCallback(
    e => {
      const id = e.data?.slice(-8);
      axios
        .get(URL + `/user/candidate/${id}`)
        .then(res => {
          if (res.data.success === true) {
            if (res.data.data.uid === user.data.uid) {
              Toast.show({
                autoHide: true,
                position: 'bottom',
                visibilityTime: 3000,
                type: 'error2',
                props: {
                  title: 'Xatolik',
                  desc: "Foydalanuvchi ma'lumotlari to'g'ri kelmadi.",
                },
              });
            } else {
              navigation.navigate('UserInfo', {
                user: res.data.data,
                type: type,
              });
            }
          } else {
            return;
          }
        })
        .catch(() => {
          console.warn('error');
        });
    },
    [navigation, type, user.data.uid],
  );
  return (
    <View style={styles.flex}>
      <View style={styles.back}>
        <BackButton
          navigation={navigation}
          backgroundColor={'#fff'}
          IconColor={style.blue}
        />
      </View>

      <TouchableOpacity onPress={() => setFlash(!flash)} style={styles.flash}>
        <Flash />
        <Text style={styles.flashText}>Chiroq</Text>
      </TouchableOpacity>
      <View style={styles.logo}>
        <Logo
          width={normalize(80)}
          height={normalize(30)}
          color={'red'}
          fill={style.blue}
        />
      </View>
      <View style={styles.border} />
      <View style={styles.title}>
        <Text style={[styles.text, {fontSize: style.fontSize.xs}]}>
          {t('792')}
        </Text>
      </View>

      <RNCamera
        style={{width: width, height: height}}
        onBarCodeRead={e => {
          if (e.data.length > 0) {
            OnRead(e);
          }
        }}
        flashMode={flash ? 'torch' : 'off'}
      />
      {/* <QRCodeScanner
        reactivate={true}
        containerStyle={styles.flex}
        onRead={OnRead}
        fadeIn={true}
        cameraStyle={{height}}
        checkAndroid6Permissions={true}
        vibrate={false}
        flashMode={flash ? 'torch' : 'off'}
      /> */}
      <Toast config={toastConfig} />
    </View>
  );
};

export default QrScan;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
    marginTop: 20,
  },
  flex: {flex: 1},
  flashText: {color: '#fff'},
  flash: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    marginTop: normalize(500),
    alignItems: 'center',
  },
  text: {
    color: style.blue,
    fontSize: style.fontSize.xs + 15,
    fontFamily: style.fontFamilyMedium,
  },
  logo: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: normalize(100),
    zIndex: 1,
  },
  title: {
    position: 'absolute',
    zIndex: 1,
    marginTop: normalize(450),
    alignSelf: 'center',
  },
  border: {
    position: 'absolute',
    zIndex: 1,
    borderWidth: 2,
    borderColor: style.blue,
    width: normalize(250),
    height: normalize(250),
    marginTop: normalize(150),
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  back: {
    marginTop: Platform.OS === 'ios' ? normalize(35) : 10,
    position: 'absolute',
    marginLeft: 15,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBold: {
    fontWeight: '500',
    color: '#fff',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
