import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { normalize, style } from '../../theme/style';
import CheckSms from '../../images/changeNumber';
import Loading from '../components/Loading';
import OtherHeader from '../components/OtherHeader';
import { storage } from '../../store/api/token/getToken';
import axios from 'axios';
import { URL } from '../constants';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../components/ToastConfig';
import { useDispatch } from 'react-redux';
import { HomeApi } from '../../store/api/home';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

const ChangePhoneNumberSmsCheck = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const { phone } = route.params;
  const navigation = useNavigation();
  const { i18n } = useTranslation();


  const SendSmsCode = useCallback(async () => {
    const token = storage.getString('token');
    try {
      setLoading(true);
      const { data } = await axios.post(
        URL + '/user/rephone',
        {
          phone: phone,
          step: 2,
          code: '11111',
          lang: i18n.language
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          'Content-Type': 'application/json',
        },
      );

      if (data.success) {
        setLoading(false);
        Toast.show({
          autoHide: true,
          visibilityTime: 3000,
          position: 'bottom',
          type: 'omad',
          props: {
            title: 'Muvaffaqiyatli',
            desc: "Sizning telefon raqamingiz o'zgartirildi.",
          },
        });
        dispatch(HomeApi());
        setTimeout(() => {
          navigation.navigate('BottomTabNavigator');
        }, 2000);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (code.length === 5) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [code]);

  const renderInput = useMemo(() => {
    return (
      <TextInput
        placeholder="00000"
        placeholderTextColor={style.placeHolderColor}
        maxLength={5}
        keyboardType="decimal-pad"
        onChangeText={text => {
          setCode(text);
        }}
        style={styles.TextInput}
      />
    );
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <OtherHeader
        title={t('852')}
        backgroundColor={style.blue}
        iconColor="#fff"
        titleColor="#000"
      />
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: normalize(90) }}>
            <View style={{ alignItems: 'center' }}>
              <CheckSms />
            </View>
            <View style={styles.main}>
              <View>
                <View
                  style={[styles.TextInputLabelContainer, { marginBottom: 25 }]}
                >
                  <View style={styles.retryPassword}>
                    <Text style={styles.phoneText}>
                      {t('853')}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>{renderInput}</View>
                </View>
              </View>
            </View>

            <View style={styles.enterButtonContainer}>
              <TouchableOpacity disabled={disabled} activeOpacity={0.8} onPress={() => { SendSmsCode(); }} style={[styles.enterButton, { backgroundColor: disabled ? style.disabledButtonColor : style.blue, },]}>
                <Text style={[styles.enterText, { color: '#fff' }]}>
                  {t('42')}
                </Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.footerContainer}>
              <View style={styles.footerInside}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.retryPasswordSend}
                >
                  <Text style={styles.retryPasswordText}>
                    Kodni qayta {'\n'} yuborish
                  </Text>
                </TouchableOpacity>
                <View style={styles.timeContainer}>
                  <Text style={styles.time}>02 : 00</Text>
                </View>
              </View>
            </View> */}
          </View>
        </ScrollView>
      </View>
      <Toast config={toastConfig} />
    </View>
  );
};

export default ChangePhoneNumberSmsCheck;

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
