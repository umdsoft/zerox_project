import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { normalize, style } from '../../theme/style';

import axios from 'axios';
import OtherHeader from '../components/OtherHeader';
import { URL } from '../constants';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../components/ToastConfig';
import { storage } from '../../store/api/token/getToken';
import Loading from '../components/Loading';
import Check from '../../images/CheckIcon';
import PasswordInput from '../components/PasswordInput';
import NewPasspord from '../../images/NewPassword';
import MainText from '../components/MainText';
import { colors } from '../../theme/colors';
import { fontSize } from '../../theme/font';
import { t } from 'i18next';
const RecoveryPassword = () => {
  // 1 type parolni uzgartirish
  // 2 parolni tiklash
  let scrollRef = useRef(null);

  const navigation = useNavigation();

  const [prevPas, setPrevPas] = useState('');
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [lower, setLower] = useState(false);
  const [upper, setUpper] = useState(false);
  const [number, setNumber] = useState(false);
  const [space, setSpace] = useState(true);
  const [symbole, setSymbole] = useState(false);
  const [min, setMin] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const onChangeText = text => {
    setPassword(text);
  };
  const onPrevPassChangeText = text => {
    setPrevPas(text);
  };

  const changePasswordHandle = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        URL + '/user/edit/password',
        {
          prevPass: prevPas,
          newPass: password,
        },
        { headers: { Authorization: 'Bearer ' + storage.getString('token') } },
      );

      if (data.code === 0) {
        setLoading(false);
        Toast.show({
          autoHide: true,
          visibilityTime: 3000,
          position: 'bottom',
          type: 'error2',
          props: { title: 'Xatolik', desc: 'Bunday foydalanuvchi topilmadi.' },
        });
      }
      if (data.code === 1) {
        setLoading(false);
        Toast.show({
          autoHide: true,
          visibilityTime: 3000,
          position: 'bottom',
          type: 'error2',
          props: { title: 'Xatolik', desc: "Joriy parol noto'g'ri." },
        });
      }
      if (data.code === 2) {
        setLoading(false);
        Toast.show({
          autoHide: true,
          visibilityTime: 3000,
          position: 'bottom',
          type: 'omad',
          props: { desc: "Parol o'zgartirildi." },
        });
        setTimeout(() => {
          navigation.navigate('BottomTabNavigator');
        }, 3000);
      }
      if (data.code === 3) {
        setLoading(false);
        Toast.show({
          autoHide: true,
          visibilityTime: 3000,
          position: 'bottom',
          type: 'error2',
          props: {
            title: 'Xatolik',
            desc: "Parolni o'zgartirishda xatolik sodir bo'ldi.",
          },
        });
      }
    } catch (error) {
      setLoading(false);
    }
  }, [password, prevPas, navigation]);
  const renderValidation = useMemo(() => {
    return (
      <View style={{ width: '90%', marginTop: 10 }}>
        <View style={styles.icon}>
          <Check width={20} height={20} color={min ? 'green' : '#000'} />
          <MainText mrLeft={4} color={colors.black} size={fontSize[12]}>
            {/* {t('63')} */}
            {t('72')}
          </MainText>
        </View>
        <View style={styles.icon}>
          <Check width={20} height={20} color={lower ? 'green' : '#000'} />
          <MainText mrLeft={4} color={colors.black} size={fontSize[12]}>
            {t('75')}
          </MainText>
        </View>
        <View style={styles.icon}>
          <Check width={20} height={20} color={upper ? 'green' : '#000'} />
          <MainText mrLeft={4} color={colors.black} size={fontSize[12]}>
            {t('69')}
          </MainText>
        </View>
        <View style={styles.icon}>
          <Check width={20} height={20} color={number ? 'green' : '#000'} />
          <MainText mrLeft={4} color={colors.black} size={fontSize[12]}>
            {t('78')}
          </MainText>
        </View>
        <View style={styles.icon}>
          <Check width={20} height={20} color={symbole ? 'green' : '#000'} />
          <MainText mrLeft={4} color={colors.black} size={fontSize[12]}>
            {t('81')}
          </MainText>
        </View>
        <View style={styles.icon}>
          <Check width={20} height={20} color={space ? 'green' : '#000'} />
          <MainText mrLeft={4} color={colors.black} size={fontSize[12]}>
            {t('84')}
          </MainText>
        </View>
      </View>
    );
  }, [lower, min, number, space, symbole, upper]);

  useEffect(() => {
    if (
      lower === true &&
      upper === true &&
      min === true &&
      number === true &&
      symbole === true &&
      space === true &&
      password === confirmPassword &&
      prevPas.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    confirmPassword,
    lower,
    min,
    number,
    password,
    prevPas,
    space,
    symbole,
    upper,
  ]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={[styles.container]}>
      <OtherHeader
        title={t('669')}
        titleColor="#000"
        iconColor={'#fff'}
        backgroundColor={style.blue}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{ bottom: 20 }}
          showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                alignItems: 'center',
                // flex: 0.5,
                justifyContent: 'center',
              }}>
              <NewPasspord width={normalize(150)} height={normalize(150)} />
            </View>

            <View style={styles.main}>
              <View style={{ width: '90%', paddingLeft: 0, paddingRight: 0, marginBottom: 15 }}>
                <MainText color={colors.black} size={fontSize[12]}  >
                  {t('63')}
                </MainText>
              </View>
              <View
                style={[
                  styles.TextInputLabelContainer,
                  { marginTop: 15, marginBottom: 15 },
                ]}>


                <View style={styles.title}>
                  <MainText color={colors.black} size={fontSize[12]}>
                    {t('684')}
                  </MainText>
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    value={prevPas}
                    onChangeText={onPrevPassChangeText}
                    keyboardType="default"
                    style={styles.TextInput}
                  />
                </View>
              </View>
              <View style={{ width: '90%' }}>
                <PasswordInput
                  title={t('687')}
                  password={password}
                  onChangeText={onChangeText}
                  setLower={setLower}
                  setMin={setMin}
                  setSymbole={setSymbole}
                  setUpper={setUpper}
                  setNumber={setNumber}
                  setSpace={setSpace}
                />
              </View>

              <View style={[styles.TextInputLabelContainer, { marginTop: 15 }]}>
                <View style={styles.title}>
                  <MainText color={colors.black} size={fontSize[12]}>
                    {t('690')}
                  </MainText>
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    value={confirmPassword}
                    onChangeText={text => {
                      setConfirmPassword(text);
                    }}
                    keyboardType="default"
                    style={styles.TextInput}
                  />
                </View>
              </View>
              {renderValidation}
            </View>
            <View style={styles.enterButtonContainer}>
              <TouchableOpacity
                disabled={disabled}
                activeOpacity={0.8}
                onPress={changePasswordHandle}
                style={[
                  styles.enterButton,
                  {
                    backgroundColor: disabled
                      ? style.disabledButtonColor
                      : style.blue,
                  },
                ]}>
                <MainText color={colors.white} size={fontSize[16]}>
                  {t('87')}
                </MainText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast config={toastConfig} />
    </View>
  );
};

export default RecoveryPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    position: 'absolute',
    marginLeft: 15,
    flex: 1,
    zIndex: 1,
    top: -10,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  phoneText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.small,
    color: style.textColor,
  },
  text: type => {
    return {
      color: type ? 'green' : '#000',
      marginLeft: 10,
      fontFamily: style.fontFamilyMedium,
      fontSize: style.fontSize.xx - 2,
    };
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
  enterButtonContainer: {
    marginTop: 20,
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
    borderRadius: 10,
    height: style.buttonHeight,
    alignSelf: 'center',
  },
  enterText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xs,
    color: style.textColor,
  },

  TextInput: {
    width: '100%',
    height: style.textInputHeight,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 15,
    fontSize: style.fontSize.small,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
  },
});
