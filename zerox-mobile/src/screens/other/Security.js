import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { BackGroundIcon } from '../../helper/homeIcon';
import { normalize, style } from '../../theme/style';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import ChangePasswordIcon from '../../images/ChangePassword';
import PasswordIcon from '../../images/Password';
import FingerIcon from '../../images/Finger';
import { useTranslation } from 'react-i18next';
import OtherHeader from '../components/OtherHeader';
import { Switch } from 'react-native-paper';
import { storage } from '../../store/api/token/getToken';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import LottieView from 'lottie-react-native';
import { t } from 'i18next';

const rnBiometrics = new ReactNativeBiometrics();

const Security = () => {
  const navigation = useNavigation();
  const { i18n } = useTranslation();
  const [support, setSupport] = useState(false);
  const [value, setValue] = useState(() => {
    let a = storage.getBoolean('touch');
    if (a === true) {
      return true;
    } else {
      return false;
    }
  });

  const setTouch = useCallback(() => {
    let a = storage.getBoolean('touch');
    if (a) {
      storage.set('touch', false);
      setValue(false);
    } else {
      storage.set('touch', true);
      setValue(true);
    }

    console.log(storage.getBoolean('touch'))
  }, []);

  const onSupportScan = async () => {
    const { available } = await rnBiometrics.isSensorAvailable();
    setSupport(available ? true : false);
  };

  const renderSwitch = useMemo(() => {
    return (
      <View style={styles.TouchableOpacity}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FingerIcon size={30} color={style.blue} />
            <Text style={styles.optionTx}>Biometrik autentifikatsiya</Text>
          </View>
          <View style={{ marginRight: 10 }}>
            <Switch value={value} onValueChange={setTouch} thumbColor={value ? '#fff' : style.blue} trackColor={{ true: style.blue }} />
          </View>
        </View>
      </View>
    );
  }, [setTouch, value]);

  useFocusEffect(() => {
    onSupportScan();
  });

  return (
    <View style={styles.container}>
      <View style={styles.mainx}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={t('810')} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.main}>
            <View style={styles.aboutUsContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RecoveryPassword', { type: 1 });
                }}
                style={styles.TouchableOpacity}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <PasswordIcon size={30} color={style.blue} />
                  <Text style={styles.optionTx}>{t('669')}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // change localpassword type 1
                  navigation.navigate('ChangeLocalPassword');
                }}
                style={styles.TouchableOpacity}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ChangePasswordIcon size={30} />
                  <Text style={styles.optionTx}>{t('768')}</Text>
                </View>
              </TouchableOpacity>
              {support ? renderSwitch : null}
            </View>
          </View>
        </View>
        <View style={{ alignSelf: 'center', marginTop: normalize(100) }}>
          <LottieView
            autoPlay
            source={require('../../images/lottie/list/8tdue8bgdH.json')}
            style={{ width: normalize(120), height: normalize(120) }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Security;

const styles = StyleSheet.create({
  container: {
    backgroundColor: style.backgroundColor,
    flex: 1,
  },
  mainx: {
    height: style.height / 2.5,
    position: 'absolute',
    width: style.width,
  },
  TouchableOpacity: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 5,
  },
  optionTx: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xa + 2,
    color: '#000',
    marginLeft: 5,
  },
  name: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xa + 1,
    color: '#000',
  },
  info: {
    marginTop: 5,
  },
  title: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xa,
    color: style.blue,
  },
  userImageContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  main: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  aboutUsContainer: {
    backgroundColor: '#EAF2FB',

    borderRadius: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 10,
    paddingBottom: 10,
  },
});
