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

import { useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { normalize, style } from '../../../theme/style';
import { androidFace, iosFace } from '../../../nativemodule/android.event';
import OtherHeader from '../../components/OtherHeader';
import axios from 'axios';
import { URL } from '../../constants';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Loading from '../../components/Loading';
import { t } from 'i18next';

const MyIdScreen = () => {
  const navigation = useNavigation();
  const { jshshir } = useRoute().params;
  console.log(jshshir);
  const [loading, setLoading] = useState(false);

  const Indentificator = useCallback(async () => {
    const nativeEvent = new NativeEventEmitter(NativeModules.MyIdModule);
    const postData = async data => {
      if (data) {
        setLoading(true);
        try {
          const response = await axios.post(URL + '/user/myidchecking', {
            code: data.code,
            jshshir: jshshir,
          });

          if (response.data.success && response.data.code === 1) {
            navigation.navigate('UpdatePassword', { user: response.data.data });
            setLoading(false);
          }
          if (
            response.data.success === false &&
            Number(response.data.code) === 3
          ) {
            setLoading(false);
            Toast.show({
              autoHide: true,
              visibilityTime: 3000,
              position: 'top',
              type: 'error2',
              props: {
                title: 'Xatolik',
                desc: 'Sizning malumotlaringiz ZeroX ilovasidagi shaxsingizga mos kelmadi.',
              },
            });
          }
        } catch (error) {
          console.log(error, 'error');
          setLoading(false);
        }
      }
    };

    if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener('code', async data => {
        console.log(data, 'myid screen');
        postData(data);
      });
      DeviceEventEmitter.addListener('error', data => {
        console.log(data, 'error');
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
  }, [navigation, jshshir]);

  useEffect(() => {
    Indentificator();
  }, [Indentificator]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <OtherHeader title={"Identifikatsiyadan o'tish"} backgroundColor={style.blue} iconColor="#fff" titleColor={style.backgroundColorDark} />
      <View style={styles.container}>
        <LottieView
          source={require('../../../images/scan.json')}
          autoPlay={true}
          renderMode="AUTOMATIC"
          resizeMode="cover"
          style={{
            width: normalize(150),
            height: normalize(150),
            marginBottom: normalize(50),
          }}
        />

        <Text style={styles.text}>{t('738')}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          Platform.OS === 'android' ? androidFace() : iosFace();
          //  navigation.navigate('ScanFaceMyId');
        }}
        style={[styles.enterButton]}>
        <Text
          style={[
            styles.enterText,
            { color: '#fff', fontFamily: style.fontFamilyMedium },
          ]}>
          {t('87')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyIdScreen;

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
    maxWidth: '80%',
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
