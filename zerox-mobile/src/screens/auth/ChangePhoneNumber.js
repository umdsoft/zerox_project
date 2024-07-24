import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { normalize, style } from '../../theme/style';
import ChangeNumber from '../../images/changeNumber';
import OtherHeader from '../components/OtherHeader';
import axios from 'axios';
import { URL } from '../constants';
import Loading from '../components/Loading';
import { storage } from '../../store/api/token/getToken';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { toastConfig } from '../components/ToastConfig';
import MainText from '../components/MainText';
import { fontSize } from '../../theme/font';
import { colors } from '../../theme/colors';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';


const ChangePhoneNumber = () => {
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { i18n } = useTranslation();

  const onPress = useCallback(async () => {
    const token = storage.getString('token');
    try {
      setLoading(true);
      const { data, status } = await axios.post(
        URL + '/user/rephone',
        {
          phone: '+998' + phone.replace(/\s/g, ''),
          step: 1,
          lang: i18n.language
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          'Content-Type': 'application/json',
        },
      );

      if (data.success) {
        setLoading(false);
        navigation.navigate('ChangePhoneNumberSmsCheck', {
          phone: '+998' + phone.replace(/\s/g, ''),
        });
      } else {
        setLoading(false);
        Toast.show({
          autoHide: true,
          visibilityTime: 2000,
          position: 'bottom',
          type: 'error2',
          props: {
            title: 'Xatolik',
            desc: t('699'),
          },
        });
      }
    } catch (error) {
      setLoading(false);
    }
  }, [navigation, phone]);

  const renderPhone = useMemo(() => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <MainText size={fontSize[14]} mrLeft={10}>
          +998
        </MainText>
        <TextInput
          onChangeText={text => {
            setPhone(text);
          }}
          placeholder={'__ ___ __ __'}
          value={checkingPhone(phone)}
          keyboardType="numeric"
          style={styles.TextInput}
        />
      </View>
    );
  }, [phone]);

  const renderButton = useMemo(() => {
    return (
      <TouchableOpacity
        disabled={phone.replace(/\s/g, '').length !== 9}
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          styles.enterButton,
          {
            backgroundColor: checkLength(phone),
          },
        ]}>
        <MainText color={colors.white} size={fontSize[16]}>
          {t('42')}
        </MainText>
      </TouchableOpacity>
    );
  }, [onPress, phone]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <OtherHeader
        title={t('693')}
        backgroundColor={style.blue}
        iconColor="#fff"
        titleColor="#000"
      />
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: normalize(90) }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <ChangeNumber />
            </View>
            <View style={styles.main}>
              <View>
                <View
                  style={[styles.TextInputLabelContainer, { marginBottom: 25 }]}>
                  <View style={styles.retryPassword}>
                    <MainText size={fontSize[12]}>{t('696')}</MainText>
                  </View>
                  <View style={{ flex: 1 }}>{renderPhone}</View>
                </View>
              </View>
            </View>
            <View style={styles.enterButtonContainer}>{renderButton}</View>
          </View>
        </ScrollView>
      </View>
      <Toast config={toastConfig} />
    </View>
  );
};

export default ChangePhoneNumber;

const checkingPhone = value => {
  let val = '';
  val = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
  val = !val[2]
    ? val[1]
    : ' ' +
    val[1] +
    ' ' +
    val[2] +
    (val[3] ? ' ' + val[3] : '') +
    (val[4] ? ' ' + val[4] : '');
  return val;
};

const checkLength = text => {
  return text.replace(/\s/g, '').length === 9
    ? style.blue
    : style.disabledButtonColor;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  time: {
    fontSize: style.fontSize.xx,
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
    fontSize: style.fontSize.xx,
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
    flex: 0.2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  phoneNumberText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx,
    color: style.textColor,
  },
  phoneText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx,
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
    marginTop: 15,
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
    paddingVertical: 18,
    alignSelf: 'center',
  },
  enterText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx + 1,
    color: style.textColor,
  },

  TextInput: {
    width: '100%',
    paddingVertical: 18,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 5,
    fontSize: fontSize[14],
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
  },
  country: {
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
    marginLeft: 10,
  },
});
