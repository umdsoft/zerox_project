import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { normalize, style } from '../../theme/style';
import CheckSms from '../../images/changeNumber';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { SmsCheckCodeApi, UserDataPostApi } from '../../store/api/auth';
import OtherHeader from '../components/OtherHeader';
import BackgroundTimer from 'react-native-background-timer';
import { secToMin } from '../other/SaveUserDetails';
import MainText from '../components/MainText';
import { colors } from '../../theme/colors';
import { fontSize } from '../../theme/font';
import { useSmsUserConsent } from '@eabdullazyanov/react-native-sms-user-consent';
import { t } from 'i18next';

const CheckSmsPassword = () => {
  let timerRef = useRef(null);
  const route = useRoute();
  const { phone } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  // eslint-disable-next-line no-undef
  const recieve = useSmsUserConsent(5);
  const [timer, setTimer] = useState(120);
  const { loading, error, status } = useSelector(
    state => state.RegisterWithPeopleCheckSmsCodeReducer,
  );
  const SendSmsCode = async () => {
    try {
      const response = await dispatch(SmsCheckCodeApi({ phone: phone, code: code })).unwrap();
      if (response.success) {
        navigation.navigate('CreatePassword', { phone: phone, code: code });
        BackgroundTimer.clearInterval(timerRef);
        BackgroundTimer.stopBackgroundTimer();
        BackgroundTimer.stop();
      }
    } catch (err) {
      throw err;
    }
  };
  const startTimer = useCallback(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timerRef = BackgroundTimer.setInterval(() => {
      setTimer(v => {
        if (v === 0) {
          BackgroundTimer.clearInterval(timerRef);
          return 120;
        } else {
          return v - 1;
        }
      });
    }, 1000);
  }, [timer]);
  const resendSms = async () => {
    try {
      await dispatch(UserDataPostApi(phone.replace(/\s/g, ''))).unwrap();
    } catch {
      throw error;
    }
  };

  useEffect(() => {
    startTimer();
    return () => {
      BackgroundTimer.clearInterval(timerRef);
      BackgroundTimer.stopBackgroundTimer();
      BackgroundTimer.stop();
    };
  }, []);

  useEffect(() => {
    if (recieve) {
      setCode(recieve);
    }
  }, [recieve]);

  const renderInput = useMemo(() => {
    return (
      <TextInput
        placeholder="00000"
        placeholderTextColor={style.placeHolderColor}
        maxLength={5}
        value={code}
        autoComplete="sms-otp"
        keyboardType="decimal-pad"
        onChangeText={text => {
          setCode(text);
        }}
        style={styles.TextInput}
      />
    );
  }, [code]);

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <OtherHeader title={t('36')} backgroundColor={style.blue} iconColor="#fff" titleColor="#000" />
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: normalize(90) }}>
            <View style={{ alignItems: 'center' }}>
              <CheckSms />
            </View>
            <View style={styles.main}>
              <View>
                <View style={[styles.TextInputLabelContainer, { marginBottom: 25 }]}>
                  <View style={styles.retryPassword}>
                    <MainText color={colors.black} size={fontSize[12]}>
                      {t('54')}
                    </MainText>
                  </View>
                  <View style={{ flex: 1 }}>{renderInput}</View>
                </View>
              </View>
            </View>
            {error && (
              <View style={{ alignSelf: 'center' }}>
                <MainText color={colors.red} size={fontSize[12]}>
                  {t('729')}
                </MainText>
              </View>
            )}
            <View style={styles.enterButtonContainer}>
              <TouchableOpacity disabled={code.length !== 5} activeOpacity={0.8} onPress={() => { SendSmsCode(); }} style={[styles.enterButton, { backgroundColor: code.length !== 5 ? style.disabledButtonColor : style.blue, },]}>
                <MainText color={colors.white} size={fontSize[16]}>
                  {t('42')}
                </MainText>
              </TouchableOpacity>
            </View>
            <View style={styles.footerContainer}>
              <View style={styles.footerInside}>
                <TouchableOpacity onPress={() => { startTimer(); resendSms(); }} disabled={timer !== 120} activeOpacity={0.8} style={[styles.retryPasswordSend, { backgroundColor: timer !== 120 ? style.disabledButtonColor : style.blue, },]}>
                  <MainText size={fontSize[12]} color={colors.white}>
                    {t('57')}
                  </MainText>
                </TouchableOpacity>
                <View style={styles.timeContainer}>
                  <MainText size={fontSize[12]} color={colors.black}>
                    {secToMin(timer)}
                  </MainText>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CheckSmsPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx,
  },
  time: {
    fontSize: style.fontSize.small,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
  },
  timeContainer: {
    borderWidth: 1,
    borderColor: style.blue,
    borderRadius: 5,
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(80),
  },
  retryPasswordText: {
    fontSize: style.fontSize.small - 1,
    color: '#fff',
    fontFamily: style.fontFamilyMedium,
    textAlign: 'center',
  },
  retryPasswordSend: {
    borderRadius: 6,
    backgroundColor: style.blue,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    padding: 10,
    marginRight: 20,
  },
  footerInside: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  enterButtonContainer: {
    marginTop: 5,
  },
  footerContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  phoneNumberText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.small,
    color: style.textColor,
  },
  phoneText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.small,
    color: style.textColor,
  },
  retryPassword: {
    position: 'absolute',
    marginLeft: 15,
    flex: 1,
    zIndex: 1,
    top: -10,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
  },

  TextInputLabelContainer: {
    borderColor: style.textColor,
    borderWidth: 0.5,
    borderRadius: 6,
    width: '90%',
    flexDirection: 'row',
  },

  main: {
    alignItems: 'center',
    marginTop: 20,
  },
  enterButton: {
    width: '90%',
    backgroundColor: style.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    height: style.textInputHeight,
    alignSelf: 'center',
  },
  enterText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx,
    color: style.textColor,
  },

  TextInput: {
    width: '100%',
    height: style.textInputHeight,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 15,
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
  },
});
