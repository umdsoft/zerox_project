import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { normalize, style } from '../../theme/style';
import PhoneLoginImage from '../../images/phoneloginimage.svg';

import { useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import { LoginWithPhoneSendPasswordApi } from '../../store/api/auth';

import { storage } from '../../store/api/token/getToken';
import Eye from '../../images/auth/Eye';
import EyeClose from '../../images/auth/CloseEye';
import PhoneInput from '../components/PhoneInput';

import BackButton from '../components/BackButton';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import MainText from '../components/MainText';
import { colors } from '../../theme/colors';
import { fontSize } from '../../theme/font';
import { t } from 'i18next';


const LoginWithPhone = () => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const [eye, setEye] = useState(true);
  const SendLogin = async () => {
    try {
      setLoading(true);
      const response = await dispatch(
        LoginWithPhoneSendPasswordApi({
          phone: phone.replace(/\s/g, ''),
          password: password,
        }),
      ).unwrap();
      if (response.msg === 'user-nft' && response.success === false) {
        Toast.show({
          autoHide: true,
          visibilityTime: 4000,
          position: 'bottom',
          type: 'error2',
          props: {
            desc: "Ro'yxatdan o'tish oxirigacha amalga oshirilmagan. Iltimos, ro'yxatdan o'tish jarayonini yakunlang.",
          },
        });
      }

      if (response.success) {
        storage.set('token', response.token);
        if (storage.getString('token').length > 0) {
          const is = storage.getString('isMust');
          if (is === undefined) {
            setLoading(false);
            navigation.navigate('SetLocalPassword');
          } else {
            navigation.reset({
              routes: [
                { name: 'BottomTabNavigator', params: { token: response.token } },
              ],
              index: 0,
            });
            setLoading(false);
          }
        }
      }
    } catch (e) {
      if (e.message === 'user-not-found' || 'error') {
        setError(true);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const renderPassword = useMemo(() => {
    return (
      <View style={styles.TextInputLabelContainer}>
        {/* <View style={styles.inputTitle}>
                  <Text style={styles.phoneText}>Parolni kiriting</Text>
                </View> */}
        <View
          style={{
            flex: 1,
            // backgroundColor: 'red',
          }}>
          <TextInput
            secureTextEntry={eye}
            placeholderTextColor={style.placeHolderColor}
            placeholder={t('66')}
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
            keyboardType="default"
            style={[styles.TextInput, { paddingLeft: 15 }]}
          />
          <View style={styles.eye}>
            <TouchableOpacity
              onPress={() => {
                setEye(!eye);
              }}
            // style={styles.eye}
            >
              {eye ? (
                <Eye color={style.blue} width={22} height={22} />
              ) : (
                <EyeClose color={style.blue} width={22} height={22} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }, [password, eye]);
  const renderPhone = useMemo(() => {
    return (
      <PhoneInput
        onChangeText={text => {
          setPhone(text);
        }}
        max={13}
        value={phone}
        icon={true}
      />
    );
  }, [phone]);

  useEffect(() => {
    if (phone.length === 13 && password.length >= 8) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [phone, password]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar animated={true} backgroundColor={style.blue} />
      <View
        style={[
          styles.BackButton,
          { marginTop: Platform.OS === 'android' ? 10 : normalize(35) },
        ]}>
        <BackButton
          navigation={navigation}
          IconColor="#fff"
          backgroundColor={style.blue}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ width: style.width, height: style.height }}>
            <View
              style={{
                alignItems: 'center',
                flex: 0.6,
                justifyContent: 'center',
              }}>
              <PhoneLoginImage width="70%" height="70%" />
            </View>
            {/* <View style={{alignItems: 'center'}}>
              <MainText
                color={colors.black}
                size={fontSize[14]}
                style={[styles.enterText]}>
                Kirish
              </MainText>
            </View> */}
            <View style={styles.main}>
              <View>{renderPhone}</View>
            </View>
            <View style={styles.main}>
              <View>{renderPassword}</View>
            </View>
            {error && (
              <View style={{ alignSelf: 'center' }}>
                <MainText
                  mTop={6}
                  color={colors.red}
                  size={fontSize[12]}
                  style={styles.error}>
                  {t('186')}
                </MainText>
              </View>
            )}
            <View style={styles.enterButtonContainer}>
              <TouchableOpacity
                disabled={disabled}
                activeOpacity={0.8}
                onPress={() => {
                  SendLogin();
                }}
                style={[
                  styles.enterButton,
                  {
                    backgroundColor: disabled
                      ? style.disabledButtonColor
                      : style.blue,
                  },
                ]}>
                <MainText
                  color={colors.white}
                  size={fontSize[16]}
                  style={[
                    styles.enterText,
                    { color: '#fff', fontFamily: style.fontFamilyMedium },
                  ]}>
                  {t('21')}
                </MainText>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('EnterJsh');
                  }}>
                  <MainText
                    color={colors.blue}
                    size={fontSize[13]}
                    style={[styles.forgotPasswordText, { color: style.blue }]}>
                    {t('30')}
                  </MainText>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('RegisterWithPeople', { type: 1 });
                  }}
                  style={styles.registerButton}>
                  <MainText
                    color={colors.white}
                    size={fontSize[13]}
                    style={styles.forgotPasswordText}>
                    {t('33')}
                  </MainText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginWithPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputFlag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    // justifyContent: 'flex-end',
  },
  error: {
    color: 'red',
    fontFamily: style.fontFamilyMedium,
    textAlign: 'center',
    marginTop: 8,
    fontSize: fontSize[12],
  },
  eye: {
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    height: '100%',
    paddingRight: 10,
  },
  BackButton: {
    position: 'absolute',
    marginLeft: 15,
    zIndex: 1,
    marginTop: Platform.OS === 'android' ? 40 : null,
  },
  inputTitle: {
    position: 'absolute',
    marginLeft: 15,
    flex: 1,
    zIndex: 1,
    top: -10,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: style.fontSize.small,
    fontFamily: style.fontFamilyMedium,
  },
  TextInputLabelContainer: {
    borderColor: style.textColor,
    borderWidth: 0.5,
    borderRadius: 6,
    width: '90%',
    flexDirection: 'row',
    marginTop: 30,
  },
  registerButton: {
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: style.blue,
    borderRadius: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  enterButtonContainer: {
    marginTop: 20,
  },
  main: {
    alignItems: 'center',
  },
  enterButton: {
    width: '90%',
    backgroundColor: style.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: style.buttonHeight,
    alignSelf: 'center',
  },
  enterText: {
    fontFamily: style.fontFamilyBold,
    fontSize: style.fontSize.xs,
    color: style.textColor,
  },
  phoneText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.small,
    color: style.textColor,
  },
  phoneNumberText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx,
    color: style.textColor,
    marginLeft: 5,
  },
  TextInput: {
    width: '100%',
    height: style.textInputHeight,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 5,
    fontSize: fontSize[14],
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
  },
});
