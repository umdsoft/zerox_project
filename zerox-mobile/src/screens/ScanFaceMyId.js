import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import LottieView from 'lottie-react-native';
import { normalize, style } from '../theme/style';
import { androidFace, iosFace } from '../nativemodule/android.event';
import OtherHeader from './components/OtherHeader';
import { storage } from '../store/api/token/getToken';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { HomeApi, getMe } from '../store/api/home';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { contractModalShow } from '../store/reducers/HomeReducer';
import { useTranslation } from 'react-i18next';
import Loading from './components/Loading';

const ScanFaceMyId = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const Indentificator = useCallback(async () => {
    const nativeEvent = new NativeEventEmitter(NativeModules.MyIdModule);

    const postData = async data => {
      let token = storage.getString('token');
      try {
        const response = await axios.post(
          'https://app.zerox.uz/api/v1/user/isactivate',
          { code: data.code, },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (response.data.success) {
          setLoading(true);
          dispatch(getMe()).then(val => {
            console.log(val, 'value');
            if (val?.payload?.user?.data?.is_contract === 1) {
              setLoading(false);
              navigation.navigate('BottomTabNavigator');
            } else {
              setLoading(false);
              dispatch(HomeApi());
              navigation.navigate('BottomTabNavigator');
              setTimeout(() => {
                dispatch(contractModalShow({ show: true }));
              }, 1000);
            }
          });
        } else {
          response.data.msg === 'user-is-active'
            ? Toast.show({
              autoHide: true,
              visibilityTime: 3000,
              position: 'top',
              type: 'error2',
              props: {
                // title: 'Xatolik',
                desc: 'Siz ZeroX ilovasida muqaddam identifikatsiyadan o’tgansiz',
              },
            })
            : Toast.show({
              autoHide: true,
              visibilityTime: 3000,
              position: 'top',
              type: 'error2',
              props: {
                // title: 'Xatolik',
                desc: "Xatolik sodir bo'ldi.",
              },
            });
        }
      } catch (err) {
        console.log(JSON.stringify(err, null, 2));
        console.log(err.message, 'ERROR');
      }
    };
    if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener('code', async data => {
        console.log(data, 'scan face');
        postData(data);
      });
      DeviceEventEmitter.addListener('error', data => {
        console.log(data, 'error face');
      });
    }
    if (Platform.OS === 'ios') {
      nativeEvent.addListener('onSuccess', data => {
        console.log(data, 'data');
        postData(data);
      });
      nativeEvent.addListener('onError', data => {
        console.log(data, 'errorr');
      });
      nativeEvent.addListener('onUserExited', data => {
        console.log(data, 'user find');
      });
    }
  }, [dispatch, navigation]);

  useEffect(() => {
    Indentificator();
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <OtherHeader
        title={"Identifikatsiyadan o'tish"}
        backgroundColor={style.blue}
        iconColor="#fff"
        titleColor={style.backgroundColorDark}
      />
      <View style={styles.container}>
        <LottieView
          source={require('../images/scan.json')}
          autoPlay={true}
          renderMode="AUTOMATIC"
          resizeMode="cover"
          style={{
            width: normalize(150),
            height: normalize(150),
            marginBottom: normalize(50),
          }}
        />

        <Text style={styles.text}>
          Ilovadan foydalanishingiz uchun shaxsingizni tasdiqlashingiz kerak.
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          Platform.OS === 'android'
            ? androidFace(
              i18n.language.toString() === 'uz' ||
                i18n.language.toString() === 'kril'
                ? 'uz'
                : 'ru',
            )
            : iosFace();
        }}
        style={[styles.enterButton]}>
        <Text
          style={[
            styles.enterText,
            { color: '#fff', fontFamily: style.fontFamilyMedium },
          ]}>
          Tasdiqlash
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScanFaceMyId;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(50),
  },
  text: {
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
    color: '#000',
    marginTop: 20,
    textAlign: 'center',
  },
  enterButton: {
    width: '90%',
    backgroundColor: style.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: style.buttonHeight,
    alignSelf: 'center',
    marginTop: normalize(20),
  },
  enterText: {
    fontFamily: style.fontFamilyBold,
    fontSize: style.fontSize.xs,
    color: style.textColor,
  },
});
