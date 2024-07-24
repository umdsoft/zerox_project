import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { style } from '../../theme/style';
import NewPasspord from '../../images/newpasspord.svg';
import { useDispatch } from 'react-redux';
import { CreatePasswordSendApi } from '../../store/api/auth';
import Check from '../../images/CheckIcon';
import PasswordInput from '../components/PasswordInput';
import OtherHeader from '../components/OtherHeader';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import MainText from '../components/MainText';
import { fontSize } from '../../theme/font';
import { colors } from '../../theme/colors';
import { t } from 'i18next';

const CreatePassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const [disabled, setDisabled] = useState(true);
  const { phone, code } = route.params;
  const [lower, setLower] = useState(false);
  const [upper, setUpper] = useState(false);
  const [number, setNumber] = useState(false);
  const [space, setSpace] = useState(true);
  const [symbole, setSymbole] = useState(false);
  const [min, setMin] = useState(false);
  const [password, setPassword] = useState({ password: '', confirmPassword: '' });

  const SendCreatePassword = async () => {
    try {
      const response = await dispatch(
        CreatePasswordSendApi({
          phone: phone.replace(/\s/g, ''),
          code,
          password,
        }),
      ).unwrap();

      if (response.success === true) {
        Toast.show({
          autoHide: true,
          type: 'omad',
          position: 'top',
          visibilityTime: 2000,
          props: {
            desc: 'Muvaffaqiyatli ro’yxatdan o’tdingiz.',
          },
        });
        setTimeout(() => {
          navigation.navigate('LoginWithPhone');
        }, 2000);
      }
    } catch (error) {
      Alert.alert('ERROR', JSON.stringify(error));
    }
  };
  const onChangeText = text => {
    setPassword({ ...password, password: text });
  };
  const onChangeTextNext = text => {
    setPassword({ ...password, confirmPassword: text });
  };
  useEffect(() => {
    if (
      password.password === password.confirmPassword &&
      password.password.length >= 8 &&
      password.confirmPassword.length >= 8
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password]);

  const renderValidation = useMemo(() => {
    return (
      <View style={{ width: '90%' }}>
        <View style={styles.icon}>
          <Check width={20} height={20} color={upper ? 'green' : '#000'} />
          <MainText mrLeft={8} size={fontSize[12]} color={upper ? colors.green : colors.black}>
            Kamida 1 ta katta harf
          </MainText>
        </View>
        <View style={styles.icon}>
          <Check width={20} height={20} color={min ? 'green' : '#000'} />
          <MainText mrLeft={8} size={fontSize[12]} color={min ? colors.green : colors.black}>
            Kamida 8 ta belgidan iborat
          </MainText>
        </View>
        <View style={styles.icon}>
          <Check width={20} height={20} color={lower ? 'green' : '#000'} />
          <MainText mrLeft={8} size={fontSize[12]} color={lower ? colors.green : colors.black}>
            Kamida 1 ta kichik harf
          </MainText>
        </View>
        <View style={styles.icon}>
          <Check width={20} height={20} color={number ? 'green' : '#000'} />
          <MainText mrLeft={8} size={fontSize[12]} color={number ? colors.green : colors.black}>
            Kamida 1 ta raqam
          </MainText>
        </View>
        <View style={styles.icon}>
          <Check width={20} height={20} color={symbole ? 'green' : '#000'} />
          <MainText mrLeft={8} size={fontSize[12]} color={symbole ? colors.green : colors.black}>
            Kamida 1 ta belgi
          </MainText>
        </View>
        <View style={styles.icon}>
          <Check width={20} height={20} color={space ? 'green' : '#000'} />
          <MainText mrLeft={8} size={fontSize[12]} color={space ? colors.green : colors.black}>
            Bo'sh joy bo'lmasligi
          </MainText>
        </View>
      </View >
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
      password.password === password.confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [lower, min, number, password, space, symbole, upper]);

  // if (loading) {
  //   return <Loading />;
  // }
  return (
    <View style={[styles.container]}>
      <OtherHeader
        title={'Parol yaratish'}
        titleColor="#000"
        iconColor={'#fff'}
        backgroundColor={style.blue}
      />
      <KeyboardAvoidingView behavior="height">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ width: style.width, height: style.height }}>
            <View
              style={{
                alignItems: 'center',
                flex: 0.6,
                justifyContent: 'center',
              }}>
              <NewPasspord width="70%" height="70%" />
            </View>

            <View style={styles.main}>
              <View style={{ width: '80%' }}>
                {/* <PhoneInput value={phone} /> */}
                <MainText size={fontSize[12]}>
                  Parol harf, raqam va boshqa belgilardan tashkil topgan kamida
                  8 ta belgidan iborat bo’lishi lozim.
                </MainText>
              </View>
            </View>
            <View style={styles.main}>
              <View style={{ width: '90%' }}>
                <PasswordInput
                  title={'Parolni kiriting'}
                  password={password.password}
                  onChangeText={onChangeText}
                  setLower={setLower}
                  setMin={setMin}
                  setSymbole={setSymbole}
                  setUpper={setUpper}
                  setNumber={setNumber}
                  setSpace={setSpace}
                />
                <View style={{ height: 20 }} />
                <PasswordInput
                  title={'Parolni takrorlang'}
                  password={password.confirmPassword}
                  onChangeText={onChangeTextNext}
                  setLower={setLower}
                  setMin={setMin}
                  setSymbole={setSymbole}
                  setUpper={setUpper}
                  setNumber={setNumber}
                  setSpace={setSpace}
                />
              </View>
              {renderValidation}
            </View>
            <View style={styles.enterButtonContainer}>
              <TouchableOpacity
                disabled={disabled}
                onPress={() => {
                  SendCreatePassword();
                }}
                activeOpacity={0.8}
                style={[
                  styles.enterButton,
                  {
                    backgroundColor: disabled
                      ? style.disabledButtonColor
                      : style.blue,
                  },
                ]}>
                <MainText color={colors.white} size={fontSize[16]}>
                  Tasdiqlash
                </MainText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: type => {
    return {
      color: type ? 'green' : '#000',
      marginLeft: 10,
      fontFamily: style.fontFamilyMedium,
      fontSize: style.fontSize.xx - 2,
    };
  },
  phoneNumberText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx,
    color: style.textColor,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
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
  inputFlag: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '22%',
    justifyContent: 'flex-end',
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
    paddingLeft: 10,
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
  },
});
