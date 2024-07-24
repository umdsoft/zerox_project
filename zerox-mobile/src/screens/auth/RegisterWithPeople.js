import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import { style } from '../../theme/style';
import RegisterWithPeopleIcon from '../../images/auth/illustrationregisterwithpeople.svg';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { UserDataPostApi } from '../../store/api/auth';
import PhoneInput from '../components/PhoneInput';
import MainText from '../components/MainText';
import { font, fontSize } from '../../theme/font';
import { colors } from '../../theme/colors';
import { t } from 'i18next';
import { successStatus, URL } from '../../screens/constants';
import axios from 'axios';
import { useTranslation } from 'react-i18next';


const RegisterWithPeople = () => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const { loading } = useSelector(state => state.RegisterWithPeoplePhoneNumberReducer);
  const route = useRoute();
  const { type } = route.params;
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const { i18n } = useTranslation();


  const PostData = async () => {
    console.log(i18n.language)
    await axios.post(URL + '/user/register', { phone: '+998' + phone.replace(/\s/g, ''), type: 2, step: 1, lang: i18n.language })
      .then((res) => {
        const data = res.data;
        setError(false)
        if (data.success === true) {
          navigation.navigate(type === 1 ? 'CheckSmsPassword' : 'ChangePhoneNumber', { phone: phone.replace(/\s/g, '') });
        }
        if (data.success === false && data.message == "user-already-exist") {
          setError(true)
        }
      })
      .catch((error) => {
        setError(true)
      })
  };

  useEffect(() => {
    if (phone.replace(/\s/g, '').length === 9) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [phone]);
  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={[
              styles.BackButton,
              // {marginTop: Platform.OS === 'android' ? 10 : normalize(35)},
            ]}>
            <BackButton
              navigation={navigation}
              IconColor="#fff"
              backgroundColor={style.blue}
            />
          </View>
          <View style={{ width: style.width, height: style.height }}>
            <View
              style={{
                alignItems: 'center',
                flex: 0.5,
                justifyContent: 'center',
              }}>
              <RegisterWithPeopleIcon width="70%" height="70%" />
            </View>
            <View style={{ alignItems: 'center' }}>
              <MainText size={fontSize[16]} ft={font.bold} color={colors.black}>
                {t('39')}
              </MainText>
            </View>
            <View style={styles.main}>
              <View>
                <PhoneInput
                  onChangeText={text => {
                    setPhone(text);
                  }}
                  value={phone}
                  icon={true}
                  max={13}
                />
              </View>
            </View>
            {error && (
              <View
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  width: '90%',
                }}>
                <MainText color={colors.red} size={fontSize[12]}>
                  {t('45')}
                </MainText>
              </View>
            )}
            <View style={styles.enterButtonContainer}>
              <TouchableOpacity
                disabled={disabled}
                onPress={() => {
                  PostData();
                }}
                style={[
                  styles.enterButton,
                  {
                    backgroundColor: disabled
                      ? style.disabledButtonColor
                      : style.blue,
                  },
                ]}>
                <MainText color={colors.white} size={fontSize[16]}>
                  {t('42')}
                </MainText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterWithPeople;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  enterButtonContainer: {
    marginTop: 20,
  },
  phoneNumberText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx,
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
  BackButton: {
    position: 'absolute',
    marginLeft: 15,
    marginTop: Platform.OS === 'android' ? 40 : null,
    zIndex: 1,
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
    fontSize: style.fontSize.xs,
    color: style.textColor,
  },

  TextInput: {
    width: '100%',
    height: style.textInputHeight,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
  },
});
