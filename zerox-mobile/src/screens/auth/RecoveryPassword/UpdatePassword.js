import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { style } from '../../../theme/style';
import ResetPassword from '../../../images/RecoveryPassword';
import axios from 'axios';
import OtherHeader from '../../components/OtherHeader';
import { URL } from '../../constants';
import Check from '../../../images/CheckIcon';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../../components/ToastConfig';
import { t } from 'i18next';

import Loading from '../../components/Loading';
import PasswordInput from '../../components/PasswordInput';
const UpdatePassword = () => {
  const navigation = useNavigation();
  const { user } = useRoute().params;
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [loading, setLoading] = useState(false);
  const [lower, setLower] = useState(false);
  const [upper, setUpper] = useState(false);
  const [number, setNumber] = useState(false);
  const [space, setSpace] = useState(true);
  const [symbole, setSymbole] = useState(false);
  const [min, setMin] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const onHandle = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.post(URL + '/user/updatePassword', {
        jshshir: user?.pinfl,
        password: value,
      });

      if (response.data.success) {
        navigation.navigate('LoginWithPhone');
        setLoading(false);
      } else {
        if (response.data.code === 1) {
          setLoading(false);
          Toast.show({ autoHide: true, visibilityTime: 3000, position: 'top', type: 'error2', props: { title: 'Xatolik', desc: 'Foydalanuvchi topilmadi.', }, });
        }
      }
    } catch (error) {
      console.log(error, 'error');
      setLoading(false);
      Toast.show({
        autoHide: true,
        visibilityTime: 3000,
        position: 'top',
        type: 'error2',
        props: {
          desc: 'Serverga ulanishda xatolik.',
        },
      });
    }
  }, [navigation, value, user]);
  const onChangeText = text => {
    setValue(text);
  };
  const onChangeText2 = text => {
    setValue2(text);
  };

  const renderValidation = useMemo(() => {
    return (
      <View style={{ width: '90%' }}>
        <View style={styles.icon}>
          <Check width={20} height={20} color={min ? 'green' : '#000'} />
          <Text style={styles.text(min)}>{t('72')}</Text>
        </View>
        <View style={styles.icon}>
          <Check width={20} height={20} color={lower ? 'green' : '#000'} />
          <Text style={styles.text(lower)}>{t('75')}</Text>
        </View>
        <View style={styles.icon}>
          <Check width={20} height={20} color={upper ? 'green' : '#000'} />
          <Text style={styles.text(upper)}>{t('69')}</Text>
        </View>
        <View style={styles.icon}>
          <Check width={20} height={20} color={number ? 'green' : '#000'} />
          <Text style={styles.text(number)}>{t('78')}</Text>
        </View>
        <View style={styles.icon}>
          <Check width={20} height={20} color={symbole ? 'green' : '#000'} />
          <Text style={styles.text(symbole)}>{t('81')}</Text>
        </View>
        <View style={styles.icon}>
          <Check width={20} height={20} color={space ? 'green' : '#000'} />
          <Text style={styles.text(space)}>{t('84')}</Text>
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
      value === value2
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [lower, min, number, space, symbole, upper, value, value2]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={[styles.container]}>
      <OtherHeader
        title={'Parolni tiklash'}
        titleColor={'#000'}
        iconColor="#fff"
        backgroundColor={style.blue}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
            <ResetPassword />
          </View>

          <View style={styles.main}>
            <View style={{ flex: 1 }}>
              <View style={styles.TextInputLabelContainer}>
                <View style={{ flex: 1 }}>
                  <View style={{ width: '100%' }}>
                    <PasswordInput
                      title={t('687')}
                      password={value}
                      onChangeText={onChangeText}
                      setLower={setLower}
                      setMin={setMin}
                      setSymbole={setSymbole}
                      setUpper={setUpper}
                      setNumber={setNumber}
                      setSpace={setSpace}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.TextInputLabelContainer, { marginTop: 20 }]}>
                <View
                  style={{
                    position: 'absolute',
                    marginLeft: 15,
                    flex: 1,
                    zIndex: 1,
                    top: -10,
                    backgroundColor: '#fff',
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                >
                  <Text style={styles.phoneText}>{t('845')}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    value={value2}
                    onChangeText={onChangeText2}
                    keyboardType="default"
                    style={styles.TextInput}
                  />
                </View>
              </View>
            </View>
            {renderValidation}
          </View>

          <View style={styles.enterButtonContainer}>
            <TouchableOpacity
              disabled={disabled}
              activeOpacity={0.8}
              onPress={onHandle}
              style={[
                styles.enterButton,
                {
                  backgroundColor: !disabled
                    ? style.blue
                    : style.disabledButtonColor,
                },
              ]}
            >
              <Text style={[styles.enterText, { color: '#fff' }]}>
                {t('42')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Toast config={toastConfig} />
    </View>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  bbb: {
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
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
  },
  text: type => {
    return {
      color: type ? 'green' : '#000',
      marginLeft: 10,
      fontFamily: style.fontFamilyMedium,
      fontSize: style.fontSize.xx - 2,
    };
  },
  TextInputLabelContainer: {
    width: '90%',
    flexDirection: 'row',
  },
  registerButton: {
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: style.blue,
    borderRadius: 6,
    paddingBottom: 10,
    paddingTop: 10,
  },
  BackButton: {
    position: 'absolute',
    marginLeft: 15,
    marginTop: 15,
    zIndex: 1,
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
    height: style.textInputHeight,
    alignSelf: 'center',
  },
  enterText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xs,
    color: style.textColor,
  },
  phoneText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.small,
    color: style.textColor,
  },
  phoneNumberText: {
    marginLeft: 5,
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.small,
    color: style.textColor,
  },
  TextInput: {
    width: '100%',
    height: style.textInputHeight,
    paddingLeft: 15,
    fontSize: style.fontSize.small,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
    borderColor: '#000',
    borderWidth: 0.5,
    borderRadius: 8,
  },
});
